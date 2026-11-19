"use client";

/**
 * トレーナー一覧の絞り込みと並び替え。並び順は「新着順」と「エリア順」の2つだけ。
 * 条件は URL のクエリに残す（トップの検索パネルからも同じパラメータで来る）。
 * 最初の描画は条件なし＝静的 HTML と同じ。
 */
import { useEffect, useMemo, useRef, useState } from "react";
import { SampleNote, TrainerCard } from "@/components/TrainerCard";
import { CheckIcon, SearchIcon, SlidersIcon } from "@/components/icons";
import { PAGE_SIZE } from "@/data/site";
import { GOALS, PURPOSES } from "@/data/vocab";
import { CONDITIONS } from "@/lib/conditions";
import type { TrainerSummary } from "@/lib/view";

type AreaOption = { slug: string; name: string; cities: { slug: string; name: string }[] };
type Sort = "new" | "area";
type Filters = {
  purposes: string[];
  pref: string;
  city: string;
  goals: string[];
  conds: string[];
  q: string;
  sort: Sort;
};

const EMPTY: Filters = { purposes: [], pref: "", city: "", goals: [], conds: [], q: "", sort: "new" };

function fromQuery(q: URLSearchParams): Filters {
  const list = (k: string) => q.getAll(k).flatMap((v) => v.split(",")).filter(Boolean);
  // 検索パネルは area=tokyo/setagaya の形で送ってくる
  const [areaPref, areaCity] = (q.get("area") ?? "").split("/");
  return {
    purposes: list("purpose"),
    pref: q.get("pref") || areaPref || "",
    city: q.get("city") || areaCity || "",
    goals: list("goal"),
    conds: list("cond"),
    q: q.get("q")?.trim() ?? "",
    sort: q.get("sort") === "area" ? "area" : "new",
  };
}

function toQuery(f: Filters) {
  const q = new URLSearchParams();
  if (f.purposes.length) q.set("purpose", f.purposes.join(","));
  if (f.pref) q.set("pref", f.pref);
  if (f.city) q.set("city", f.city);
  if (f.goals.length) q.set("goal", f.goals.join(","));
  if (f.conds.length) q.set("cond", f.conds.join(","));
  if (f.q) q.set("q", f.q);
  if (f.sort !== "new") q.set("sort", f.sort);
  const s = q.toString();
  return s ? `?${s}` : "";
}

const toggle = (arr: string[], v: string) => (arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);
const norm = (s: string) => s.normalize("NFKC").toLowerCase();

export function TrainerBrowser({ people, areas }: { people: TrainerSummary[]; areas: AreaOption[] }) {
  const [f, setF] = useState<Filters>(EMPTY);
  const [limit, setLimit] = useState(PAGE_SIZE);
  const panel = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    setF(fromQuery(new URLSearchParams(window.location.search)));
    // 「さらに条件で絞り込む」から来たら絞り込みを開いておく
    if (window.location.hash === "#filters" && panel.current) panel.current.open = true;
  }, []);

  const update = (next: Filters) => {
    setF(next);
    setLimit(PAGE_SIZE);
    window.history.replaceState(null, "", `${window.location.pathname}${toQuery(next)}${window.location.hash}`);
  };

  const results = useMemo(() => {
    const words = norm(f.q).split(/\s+/).filter(Boolean);
    const filtered = people.filter(
      (s) =>
        (!f.purposes.length || f.purposes.some((t) => s.purposes.includes(t))) &&
        (!f.pref || s.prefSlug === f.pref) &&
        (!f.city || s.citySlugs.includes(f.city)) &&
        (!f.goals.length || f.goals.some((c) => s.goals.includes(c))) &&
        f.conds.every((k) => CONDITIONS.find((c) => c.key === k)?.test(s) ?? true) &&
        words.every((w) => norm(s.searchText).includes(w)),
    );
    // people は新着順で渡ってくる。エリア順は地域コード順で、同じ地域の中は新着順
    return f.sort === "area" ? [...filtered].sort((a, b) => a.areaCode - b.areaCode) : filtered;
  }, [people, f]);

  const pref = areas.find((a) => a.slug === f.pref);
  const chips = [
    ...(f.q ? [{ label: `「${f.q}」`, remove: { ...f, q: "" } }] : []),
    ...f.purposes.map((t) => ({ label: PURPOSES.find((x) => x.slug === t)?.label ?? t, remove: { ...f, purposes: toggle(f.purposes, t) } })),
    ...(f.city && pref
      ? [{ label: pref.cities.find((c) => c.slug === f.city)?.name ?? f.city, remove: { ...f, city: "" } }]
      : f.pref && pref
        ? [{ label: pref.name, remove: { ...f, pref: "" } }]
        : []),
    ...f.goals.map((c) => ({
      label: GOALS.find((x) => x.slug === c)?.label ?? c,
      remove: { ...f, goals: toggle(f.goals, c) },
    })),
    ...f.conds.map((k) => ({
      label: CONDITIONS.find((c) => c.key === k)?.label ?? k,
      remove: { ...f, conds: toggle(f.conds, k) },
    })),
  ];

  return (
    <div>
      <label className="mb-6 block">
        <span className="sr-only">フリーワード</span>
        <span className="relative block">
          <SearchIcon size={17} className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-sub" />
          <input
            type="search"
            value={f.q}
            onChange={(e) => update({ ...f, q: e.target.value })}
            placeholder="名前・駅名・ジム名などで探す"
            className="field !pl-11 font-normal"
          />
        </span>
      </label>
      <div className="border-y border-line py-3">
        <details ref={panel} id="filters" open className="group scroll-mt-24">
          <summary className="inline-flex min-h-11 cursor-pointer list-none items-center gap-2 px-1 text-[0.9375rem] font-bold text-accent [&::-webkit-details-marker]:hidden">
            <SlidersIcon size={18} />
            条件で絞り込む
            <span aria-hidden="true" className="transition-transform group-open:rotate-180">
              ▾
            </span>
          </summary>
          <div className="mt-3 grid gap-6 border-t border-line pt-5 min-[768px]:grid-cols-2">
            <fieldset>
              <legend className="text-xs font-bold text-sub">目的</legend>
              <div className="mt-2 flex flex-wrap gap-2">
                {PURPOSES.map((v) => (
                  <CheckChip key={v.slug} checked={f.purposes.includes(v.slug)} onChange={() => update({ ...f, purposes: toggle(f.purposes, v.slug) })}>
                    {v.label}
                  </CheckChip>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className="text-xs font-bold text-sub">エリア</legend>
              <div className="mt-2 grid grid-cols-2 gap-3">
                <label>
                  <span className="sr-only">都道府県</span>
                  <select value={f.pref} onChange={(e) => update({ ...f, pref: e.target.value, city: "" })} className="field">
                    <option value="">都道府県</option>
                    {areas.map((a) => (
                      <option key={a.slug} value={a.slug}>
                        {a.name}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  <span className="sr-only">市区町村</span>
                  <select
                    value={f.city}
                    disabled={!pref}
                    onChange={(e) => update({ ...f, city: e.target.value })}
                    className="field disabled:text-sub disabled:opacity-60"
                  >
                    <option value="">市区町村</option>
                    {pref?.cities.map((c) => (
                      <option key={c.slug} value={c.slug}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            </fieldset>

            <fieldset className="min-[768px]:col-span-2">
              <legend className="text-xs font-bold text-sub">相談したいこと（よく受ける相談）</legend>
              <div className="mt-2 flex flex-wrap gap-2">
                {GOALS.map((c) => (
                  <CheckChip
                    key={c.slug}
                    checked={f.goals.includes(c.slug)}
                    onChange={() => update({ ...f, goals: toggle(f.goals, c.slug) })}
                  >
                    {c.label}
                  </CheckChip>
                ))}
              </div>
            </fieldset>

            <fieldset className="min-[768px]:col-span-2">
              <legend className="text-xs font-bold text-sub">特徴・こだわり</legend>
              <div className="mt-2 flex flex-wrap gap-2">
                {CONDITIONS.map((c) => (
                  <CheckChip key={c.key} checked={f.conds.includes(c.key)} onChange={() => update({ ...f, conds: toggle(f.conds, c.key) })}>
                    {c.label}
                  </CheckChip>
                ))}
              </div>
            </fieldset>
          </div>
        </details>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <p aria-live="polite" className="font-bold">
          <span className="num text-3xl">{results.length}</span>人のトレーナー
        </p>
        <fieldset className="flex items-center gap-0 rounded-[4px] border border-line p-0.5 text-sm">
          <legend className="sr-only">並び順</legend>
          {(
            [
              ["new", "新着順"],
              ["area", "エリア順"],
            ] as const
          ).map(([v, label]) => (
            <label
              key={v}
              className={`cursor-pointer rounded-[2px] px-4 py-1.5 font-bold has-[:focus-visible]:outline has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-accent ${
                f.sort === v ? "bg-ink text-white" : "text-sub hover:text-ink"
              }`}
            >
              <input
                type="radio"
                name="sort"
                value={v}
                checked={f.sort === v}
                onChange={() => update({ ...f, sort: v })}
                className="sr-only"
              />
              {label}
            </label>
          ))}
        </fieldset>
      </div>

      {chips.length > 0 && (
        <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
          {chips.map((c) => (
            <button
              key={c.label}
              type="button"
              onClick={() => update(c.remove)}
              className="inline-flex min-h-9 items-center gap-1 rounded-[4px] bg-accent-soft px-3 font-bold text-accent-deep hover:bg-[#d5e1f8]"
            >
              {c.label}
              <span aria-hidden="true">×</span>
              <span className="sr-only">の条件を外す</span>
            </button>
          ))}
          <button type="button" onClick={() => update({ ...EMPTY, sort: f.sort })} className="ml-1 text-sub underline">
            すべて外す
          </button>
        </div>
      )}

      {results.length === 0 ? (
        <div className="card mt-8 p-8 text-center">
          <p className="font-bold">
            この条件では、まだ取材していません。
          </p>
          <p className="mt-2 text-sm text-sub">上の「×」で条件を1つ外してみてください。</p>
        </div>
      ) : (
        <ul className="mt-6 grid gap-5 min-[640px]:grid-cols-2 min-[1024px]:grid-cols-3 min-[1024px]:gap-6">
          {results.slice(0, limit).map((s, i) => (
            <li key={s.slug}>
              <TrainerCard s={s} headingLevel="h2" priority={i < 2} />
            </li>
          ))}
        </ul>
      )}
      {results.length > 0 && <SampleNote className="mt-8" />}

      {results.length > limit && (
        <p className="mt-10 text-center">
          <button type="button" onClick={() => setLimit(limit + PAGE_SIZE)} className="btn-outline">
            もっと見る（残り{results.length - limit}人）
          </button>
        </p>
      )}
    </div>
  );
}

function CheckChip({
  checked,
  onChange,
  children,
}: {
  checked: boolean;
  onChange: () => void;
  children: React.ReactNode;
}) {
  return (
    <label
      className={`inline-flex min-h-10 cursor-pointer items-center gap-1 rounded-[4px] border-2 px-3 text-[0.8125rem] font-bold has-[:focus-visible]:outline has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent ${
        checked ? "border-ink bg-ink text-white" : "border-line bg-paper hover:border-ink"
      }`}
    >
      <input type="checkbox" checked={checked} onChange={onChange} className="sr-only" />
      {checked && <CheckIcon size={14} />}
      {children}
    </label>
  );
}
