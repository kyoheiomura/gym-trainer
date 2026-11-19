import { findPurpose, PLATES } from "@/data/vocab";

/** 目的のしるし（小さなプレート＋名前）を並べる */
export function PurposeChips({ slugs, className = "" }: { slugs: string[]; className?: string }) {
  return (
    <ul className={`flex flex-wrap gap-x-3 gap-y-1 ${className}`}>
      {slugs.map((slug) => {
        const p = findPurpose(slug);
        if (!p) return null;
        return (
          <li key={slug} className="plate-chip" style={{ "--plate": PLATES[p.plate].bg } as React.CSSProperties}>
            {p.label}
          </li>
        );
      })}
    </ul>
  );
}
