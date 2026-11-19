import Link from "next/link";
import { SearchIcon } from "@/components/icons";
import { GOALS, PURPOSES } from "@/data/vocab";
import { getAreaTree } from "@/lib/areas-index";
import { CONDITIONS } from "@/lib/conditions";

/**
 * トレーナーをさがす検索フォーム。下線だけの静かな入力欄。
 * JS なしでも動く GET フォームで、/trainer/ に条件を渡す（area / purpose / goal / cond / q）
 */
export function SearchPanel() {
  const areas = getAreaTree();
  return (
    <form action="/trainer/" method="get" role="search" aria-label="トレーナーをさがす">
      <div className="grid grid-cols-2 gap-x-6 gap-y-6 min-[768px]:grid-cols-4 min-[768px]:gap-x-10">
        <Field label="目的">
          <select name="purpose" defaultValue="" className="field">
            <option value="">すべて</option>
            {PURPOSES.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.label}
              </option>
            ))}
          </select>
        </Field>
        <Field label="エリア">
          <select name="area" defaultValue="" className="field">
            <option value="">すべて</option>
            {areas.map((p) => (
              <optgroup key={p.slug} label={p.name}>
                <option value={p.slug}>{p.name}すべて</option>
                {p.cities.map((c) => (
                  <option key={c.slug} value={`${p.slug}/${c.slug}`}>
                    {c.name}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </Field>
        <Field label="相談したいこと">
          <select name="goal" defaultValue="" className="field">
            <option value="">すべて</option>
            {GOALS.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.label}
              </option>
            ))}
          </select>
        </Field>
        <Field label="特徴・こだわり">
          <select name="cond" defaultValue="" className="field">
            <option value="">すべて</option>
            {CONDITIONS.map((c) => (
              <option key={c.key} value={c.key}>
                {c.label}
              </option>
            ))}
          </select>
        </Field>
      </div>
      <div className="mt-8 flex flex-col gap-6 min-[768px]:flex-row min-[768px]:items-end min-[768px]:gap-10">
        <label className="relative block flex-1">
          <span className="text-xs font-bold text-sub">フリーワード</span>
          <span className="relative mt-1 block">
            <SearchIcon size={17} className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-sub" />
            <input type="search" name="q" placeholder="名前・駅名・ジム名など" className="field !pl-10 font-normal" />
          </span>
        </label>
        <div className="flex items-center gap-6">
          <button type="submit" className="btn-primary !min-h-12 !px-8">
            トレーナーをさがす
          </button>
          <Link href="/trainer/#filters" className="link-quiet">
            さらに条件で絞り込む
          </Link>
        </div>
      </div>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs font-bold text-sub">{label}</span>
      <span className="mt-1 block">{children}</span>
    </label>
  );
}
