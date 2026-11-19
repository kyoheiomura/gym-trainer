import Link from "next/link";
import { PLATES } from "@/data/vocab";
import { getAllPurposes } from "@/lib/purposes-index";

/**
 * 目的の一覧（/purpose/）。プレートの色のしるし・目的・ひとこと・人数。
 * まだ取材していない目的も載せる（人数の代わりに「これから」と出す）。
 */
export function PurposeDirectory({ headingLevel = "h2" }: { headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return (
    <ul className="grid gap-4 min-[640px]:grid-cols-2">
      {getAllPurposes().map((p) => {
        const c = PLATES[p.plate];
        return (
          <li key={p.slug}>
            <Link
              href={`/purpose/${p.slug}/`}
              className="group flex h-full gap-4 rounded-[4px] border border-line bg-paper p-4 hover:bg-chalk min-[768px]:p-5"
            >
              <span
                aria-hidden="true"
                className="w-4 shrink-0 rounded-[2px] min-[768px]:w-5"
                style={{ background: c.bg, boxShadow: "inset 0 0 0 2px #1d1e20" }}
              />
              <span className="flex-1">
                <span className="flex items-baseline justify-between gap-3">
                  <Heading className="text-lg group-hover:underline min-[768px]:text-xl">{p.label}</Heading>
                  <span className="shrink-0 text-sm font-bold text-sub">
                    {p.count > 0 ? (
                      <>
                        <span className="num text-xl text-ink">{p.count}</span>人
                      </>
                    ) : (
                      "これから取材します"
                    )}
                  </span>
                </span>
                <span className="mt-1.5 block text-[0.875rem] leading-[1.8] text-sub">{p.lead}</span>
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
