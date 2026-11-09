export type Level = 0 | 1 | 2 | 3 | 4;
export interface Day {
  date: string;
  level: Level;
}
export interface ContributionData {
  total: number;
  levels: Map<string, Level>;
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DAY_MS = 86_400_000;

function jan1(year: number): Date {
  return new Date(Date.UTC(year, 0, 1));
}

/** Every date of the year, with a level from the map (default 0). */
export function buildYear(year: number, levels: Map<string, Level>): Day[] {
  const start = jan1(year).getTime();
  const days: Day[] = [];
  for (let t = start; new Date(t).getUTCFullYear() === year; t += DAY_MS) {
    const date = new Date(t).toISOString().slice(0, 10);
    days.push({ date, level: levels.get(date) ?? 0 });
  }
  return days;
}

/** Column-major cells (Sunday-first weeks): leading/trailing nulls pad whole weeks. */
export function layoutCells(year: number, days: Day[]): Array<Day | null> {
  const lead = jan1(year).getUTCDay();
  const cells: Array<Day | null> = [...Array<null>(lead).fill(null), ...days];
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

export function weekCount(year: number, days: Day[]): number {
  return layoutCells(year, days).length / 7;
}

/** A month is labelled on the first week column whose Sunday falls in that month (Jan -> col 0). */
export function monthLabels(year: number): Array<{ label: string; col: number }> {
  const lead = jan1(year).getUTCDay();
  const sundayMonth = (c: number) => new Date(jan1(year).getTime() + (7 * c - lead) * DAY_MS).getUTCMonth();
  return MONTHS.map((label, m) => {
    if (m === 0) return { label, col: 0 };
    let c = 1;
    while (sundayMonth(c) !== m) c++;
    return { label, col: c };
  });
}

interface ApiResponse {
  total?: Record<string, number>;
  contributions?: Array<{ date: string; count: number; level: number }>;
}

/**
 * Live data from the public jogruber contributions API (assumed data source; the reference does
 * not say where the original gets its numbers). Returns null on any failure.
 */
export async function fetchContributions(user: string, year: number): Promise<ContributionData | null> {
  try {
    const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${user}?y=${year}`, {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return null;
    const json = (await res.json()) as ApiResponse;
    if (!json.contributions?.length) return null;
    const levels = new Map<string, Level>();
    let sum = 0;
    for (const c of json.contributions) {
      levels.set(c.date, Math.min(4, Math.max(0, c.level)) as Level);
      sum += c.count;
    }
    return { total: json.total?.[String(year)] ?? sum, levels };
  } catch {
    return null;
  }
}
