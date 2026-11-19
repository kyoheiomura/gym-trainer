import { SITE } from "@/data/site";

/**
 * ロゴ：横から見たバーベル（赤と青のプレート）＋欧文の「BUDDY」＋小さなカタカナ＋何のメディアかの一言。
 * 読み上げは外側のリンクの aria-label が担当するので、ここは飾りとして扱う。
 */
export function Logo({ size = "md", invert = false }: { size?: "md" | "lg"; invert?: boolean }) {
  const ink = invert ? "#ffffff" : "#1d1e20";
  return (
    <span aria-hidden="true" className={`inline-flex items-center gap-2.5 ${invert ? "text-white" : "text-ink"}`}>
      <svg viewBox="0 0 40 24" className={`shrink-0 ${size === "lg" ? "h-9 w-[60px]" : "h-6 w-10 min-[768px]:h-7 min-[768px]:w-[47px]"}`}>
        <rect x="0" y="10.5" width="40" height="3" rx="1" fill={ink} />
        <rect x="5" y="2" width="5" height="20" rx="1" fill="#b4472f" />
        <rect x="10.5" y="5" width="3" height="14" rx="0.8" fill="#34518c" />
        <rect x="30" y="2" width="5" height="20" rx="1" fill="#b4472f" />
        <rect x="26.5" y="5" width="3" height="14" rx="0.8" fill="#34518c" />
      </svg>
      <span className={`font-num leading-none font-extrabold tracking-[0.04em] ${size === "lg" ? "text-[2.75rem]" : "text-[1.75rem] min-[768px]:text-[2rem]"}`}>
        {SITE.nameEn}
      </span>
      <span className={`hidden self-end pb-[0.15em] text-[0.6875rem] font-bold min-[640px]:inline ${invert ? "text-white/70" : "text-sub"}`}>
        {SITE.name}
        <span className="ml-2 hidden font-normal min-[1024px]:inline">{SITE.descriptor}</span>
      </span>
    </span>
  );
}
