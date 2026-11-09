export function TagList({ tags, className = "" }: { tags: string[]; className?: string }) {
  if (!tags.length) return null;
  return (
    <ul className={`flex flex-wrap gap-2 ${className}`} aria-label="Technologies">
      {tags.map((t) => (
        <li key={t} className="h-[19px] rounded border border-white/10 bg-chip px-[4.5px] text-[11px] leading-[17px] text-muted">
          {t}
        </li>
      ))}
    </ul>
  );
}
