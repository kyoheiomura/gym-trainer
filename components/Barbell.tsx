import Link from "next/link";
import { PLATES } from "@/data/vocab";
import { getAllPurposes } from "@/lib/purposes-index";

/**
 * トップの主役：目的のプレート8枚。正面から見た競技用プレートで、1枚が目的1つ。押すとその目的のトレーナー一覧へ。
 * 縁（リム）に目的の英語名を回し、下に和文の名前と人数を添える。
 * 濃い面（ゴムの床）の上に置く前提。読み込み時に一度だけ、転がるように入ってくる（globals.css の .plate-roll）。
 */
export function Barbell() {
  const all = getAllPurposes();
  return (
    <nav aria-label="目的からさがす">
      <ul className="grid grid-cols-2 gap-x-4 gap-y-10 min-[640px]:grid-cols-4 min-[640px]:gap-x-6 min-[768px]:gap-y-14 min-[1024px]:gap-x-10">
        {all.map((p, i) => (
          <li key={p.slug} className="plate-roll" style={{ "--i": i, "--tilt": `${((i * 37) % 13) - 6}deg` } as React.CSSProperties}>
            <Link href={`/purpose/${p.slug}/`} className="group block text-center">
              <PlateFace en={p.en} color={p.plate} id={p.slug} />
              <span className="mt-4 block text-[0.9375rem] leading-snug font-bold tracking-[0.06em] min-[768px]:text-base">{p.label}</span>
              <span className="mt-1 block text-[0.75rem] text-white/55">
                <span className="num mr-0.5 text-[0.9375rem] text-white/80">{p.count}</span>人
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/**
 * 正面から見たプレート（SVG）。縁・一段高い輪・金属のハブ・中心の穴。
 * 艶（光の映り込み）は回転しない別レイヤーに描く。ホバーでプレートが回っても、光は左上から当たったまま。
 */
export function PlateFace({
  en,
  color,
  id,
  spin = true,
  className = "mx-auto block w-full max-w-[13.5rem] drop-shadow-[0_18px_24px_rgb(0_0_0/0.45)]",
}: {
  en: string;
  color: keyof typeof PLATES;
  id: string;
  spin?: boolean;
  className?: string;
}) {
  const c = PLATES[color];
  const rimText = `${en.toUpperCase()} — BUDDY — ${en.toUpperCase()} — BUDDY — `;
  return (
    <span aria-hidden="true" className={`relative ${className}`}>
      <svg viewBox="0 0 200 200" className={`block h-auto w-full ${spin ? "plate-spin" : ""}`}>
        <defs>
          <linearGradient id={`hub-${id}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f2f4f6" />
            <stop offset="50%" stopColor="#9aa1a8" />
            <stop offset="100%" stopColor="#d4d8dc" />
          </linearGradient>
          <path id={`rim-${id}`} d="M100,100 m-80,0 a80,80 0 1,1 160,0 a80,80 0 1,1 -160,0" />
        </defs>
        {/* 本体 */}
        <circle cx="100" cy="100" r="98" fill={c.bg} />
        {/* 縁の段差 */}
        <circle cx="100" cy="100" r="90" fill="none" stroke="#000" strokeOpacity="0.22" strokeWidth="1.2" />
        <circle cx="100" cy="100" r="70" fill="none" stroke="#000" strokeOpacity="0.18" strokeWidth="1" />
        <circle cx="100" cy="100" r="68.5" fill="none" stroke="#fff" strokeOpacity="0.12" strokeWidth="1" />
        {/* 縁の文字 */}
        <text fill={c.fg} fillOpacity="0.85" style={{ fontFamily: "var(--font-num)", fontWeight: 800, fontSize: 11.5, letterSpacing: "0.18em" }}>
          <textPath href={`#rim-${id}`} textLength="495" lengthAdjust="spacing">
            {rimText}
          </textPath>
        </text>
        {/* ハブと穴 */}
        <circle cx="100" cy="100" r="30" fill={`url(#hub-${id})`} />
        <circle cx="100" cy="100" r="30" fill="none" stroke="#000" strokeOpacity="0.35" strokeWidth="1" />
        <circle cx="100" cy="100" r="13" fill="#141517" />
      </svg>

      {/* 艶：回転しない光のレイヤー（左上から光が当たる） */}
      <svg viewBox="0 0 200 200" className="pointer-events-none absolute inset-0 h-full w-full">
        <defs>
          {/* 全体の陰影：左上は明るく、右下に落ちる */}
          <radialGradient id={`shade-${id}`} cx="34%" cy="28%" r="80%">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.22" />
            <stop offset="45%" stopColor="#fff" stopOpacity="0" />
            <stop offset="100%" stopColor="#000" stopOpacity="0.38" />
          </radialGradient>
          {/* 本体に映る、ぼけた光の帯 */}
          <radialGradient id={`spec-${id}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.55" />
            <stop offset="55%" stopColor="#fff" stopOpacity="0.14" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
          {/* 外周の照り返し */}
          <linearGradient id={`edge-${id}`} x1="0.15" y1="0.1" x2="0.85" y2="0.9">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.7" />
            <stop offset="45%" stopColor="#fff" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#000" stopOpacity="0.45" />
          </linearGradient>
          <filter id={`blur-${id}`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.4" />
          </filter>
          <clipPath id={`body-${id}`}>
            <circle cx="100" cy="100" r="98" />
          </clipPath>
          <mask id={`ring-${id}`}>
            <circle cx="100" cy="100" r="30" fill="#fff" />
            <circle cx="100" cy="100" r="13" fill="#000" />
          </mask>
        </defs>
        <g clipPath={`url(#body-${id})`}>
          <circle cx="100" cy="100" r="98" fill={`url(#shade-${id})`} />
          {/* 左上の大きなハイライト */}
          <ellipse cx="66" cy="58" rx="46" ry="20" transform="rotate(-38 66 58)" fill={`url(#spec-${id})`} filter={`url(#blur-${id})`} />
          {/* 右下の弱い照り返し */}
          <ellipse cx="146" cy="150" rx="26" ry="7" transform="rotate(-42 146 150)" fill="#fff" fillOpacity="0.12" filter={`url(#blur-${id})`} />
        </g>
        <circle cx="100" cy="100" r="97.2" fill="none" stroke={`url(#edge-${id})`} strokeWidth="1.6" />
        {/* ハブの金属の光 */}
        <g mask={`url(#ring-${id})`}>
          <ellipse cx="88" cy="84" rx="13" ry="5" transform="rotate(-40 88 84)" fill="#fff" fillOpacity="0.85" filter={`url(#blur-${id})`} />
          <ellipse cx="114" cy="118" rx="9" ry="3" transform="rotate(-40 114 118)" fill="#fff" fillOpacity="0.35" filter={`url(#blur-${id})`} />
        </g>
      </svg>
    </span>
  );
}
