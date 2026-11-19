import { COMPARE_GROUPS } from "@/lib/compare-fields";
import type { TrainerCompareData } from "@/lib/view";

/** 個別ページの「このトレーナーの教え方」。すべてのトレーナーで同じ順・同じ言い回しで出す */
export function CompareFieldsList({ data }: { data: TrainerCompareData }) {
  return (
    <div className="space-y-10">
      {COMPARE_GROUPS.map((g) => (
        <section key={g.key} id={`cf-${g.key}`} aria-labelledby={`cf-${g.key}-title`} className="scroll-mt-24">
          <h3
            id={`cf-${g.key}-title`}
            className="block border-b border-ink pb-2 text-[1.125rem] font-bold"
          >
            {g.label}
          </h3>
          <dl className="mt-2 divide-y divide-line">
            {g.fields.map((f) => {
              const v = f.get(data);
              const values = Array.isArray(v) ? v : [v];
              return (
                <div key={f.key} className="grid gap-1 py-3.5 min-[768px]:grid-cols-[13rem_1fr] min-[768px]:gap-6">
                  <dt className="text-[0.875rem] font-bold text-sub">{f.label}</dt>
                  <dd className="text-[0.9375rem]">
                    {f.kind === "list" ? (
                      <ul className="flex flex-wrap gap-1.5">
                        {values.map((x) => (
                          <li key={x} className="rounded-[2px] border border-ink/40 px-2.5 py-0.5 text-[0.8125rem] font-normal">
                            {x}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      values.map((x) => <p key={x}>{x}</p>)
                    )}
                  </dd>
                </div>
              );
            })}
          </dl>
        </section>
      ))}
    </div>
  );
}
