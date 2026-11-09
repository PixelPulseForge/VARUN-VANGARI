import { Band, Column } from "@/components/ui/Band";
import { CONTRIBUTION_YEAR, FALLBACK_CONTRIBUTION_TOTAL, GITHUB_USER, githubProfileUrl } from "@/lib/data";
import { buildYear, fetchContributions, layoutCells, monthLabels, weekCount, type Level } from "@/lib/contributions";

const levelClass: Record<Level, string> = {
  0: "bg-white/[0.06]",
  1: "bg-[#27272a]",
  2: "bg-[#3f3f46]",
  3: "bg-[#52525b]",
  4: "bg-[#8e8e93]",
};

export function ContributionGraphView({
  year,
  total,
  levels,
}: {
  year: number;
  total: number;
  levels: Map<string, Level>;
}) {
  const days = buildYear(year, levels);
  const cells = layoutCells(year, days);
  const weeks = weekCount(year, days);
  return (
    <Band>
      <Column className="px-3.5 pb-[7px] pt-1.5">
        <div className="relative h-[22px] text-xs text-body" aria-hidden="true">
          {monthLabels(year).map((m) => (
            <span key={m.label} className="absolute top-0" style={{ left: `${(m.col / weeks) * 100}%` }}>
              {m.label}
            </span>
          ))}
        </div>
        <div
          role="img"
          aria-label={`Contribution graph for ${year}`}
          className="grid grid-flow-col grid-rows-7 gap-[3px]"
          style={{ gridTemplateColumns: `repeat(${weeks}, minmax(0, 1fr))` }}
        >
          {cells.map((c, i) =>
            c ? (
              <span key={i} title={c.date} className={`aspect-square rounded-[2px] ${levelClass[c.level]}`} />
            ) : (
              <span key={i} className="aspect-square" />
            ),
          )}
        </div>
        <div className="mt-3 flex items-center justify-between text-[13.6px] text-muted">
          <p>
            {total} contributions in {year} on{" "}
            <a href={githubProfileUrl} className="underline underline-offset-2">
              GitHub
            </a>
            .
          </p>
          <div className="flex items-center gap-1" aria-hidden="true">
            <span className="mr-1">Less</span>
            {([0, 1, 2, 3, 4] as Level[]).map((l) => (
              <span key={l} className={`size-[10px] rounded-[2px] ${levelClass[l]}`} />
            ))}
            <span className="ml-1">More</span>
          </div>
        </div>
      </Column>
    </Band>
  );
}

export async function ContributionGraph() {
  const data = await fetchContributions(GITHUB_USER, CONTRIBUTION_YEAR);
  return (
    <ContributionGraphView
      year={CONTRIBUTION_YEAR}
      total={data?.total ?? FALLBACK_CONTRIBUTION_TOTAL}
      levels={data?.levels ?? new Map()}
    />
  );
}
