import Link from "next/link";
import { PLATES, PURPOSES } from "@/data/vocab";

/**
 * 目的の英語名が流れる帯（床に貼るテープのイメージ）。各語の前に、その目的のプレートの色の丸を置く。
 * 帯の中身は2回並べてつなぎ目を消す。2回目は読み上げない。
 */
export function PurposeMarquee({ invert = false }: { invert?: boolean }) {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {PURPOSES.map((p) => (
        <li key={p.slug} className="flex items-center">
          <Link
            href={`/purpose/${p.slug}/`}
            tabIndex={hidden ? -1 : undefined}
            className="group flex items-center gap-5 px-6 min-[768px]:gap-7 min-[768px]:px-9"
          >
            <span aria-hidden="true" className="card-plate block size-5 rounded-full min-[768px]:size-7" style={{ background: `radial-gradient(circle, #141517 0 18%, #b9bec4 19% 34%, ${PLATES[p.plate].bg} 35%)` }} />
            <span className="font-num text-[clamp(2.5rem,6vw,5rem)] leading-none font-light tracking-[0.04em] uppercase transition-colors duration-500 group-hover:text-brass-soft">
              {p.en}
            </span>
            <span className="sr-only">（{p.label}）</span>
          </Link>
        </li>
      ))}
    </ul>
  );
  return (
    <nav aria-label="目的の一覧" className={`marquee border-y py-6 min-[768px]:py-8 ${invert ? "border-white/10 text-white/85" : "border-line text-ink"}`}>
      <div className="marquee-track">
        {row(false)}
        {row(true)}
      </div>
    </nav>
  );
}
