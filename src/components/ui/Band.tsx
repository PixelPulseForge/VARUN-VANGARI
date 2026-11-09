import { cn } from "@/lib/utils";

/** Full-width horizontal section with a bottom rule. */
export function Band({
  className,
  hatch,
  children,
  as: Tag = "section",
}: {
  className?: string;
  hatch?: boolean;
  children?: React.ReactNode;
  as?: "section" | "header" | "div";
}) {
  return <Tag className={cn("w-full border-b border-line", hatch && "hatch", className)}>{children}</Tag>;
}

/** Centered 705px column with vertical rules. */
export function Column({ className, children }: { className?: string; children?: React.ReactNode }) {
  return (
    <div className={cn("mx-auto h-full w-full max-w-column border-x border-line", className)}>{children}</div>
  );
}
