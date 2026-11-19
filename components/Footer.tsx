import Link from "next/link";
import { Logo } from "@/components/Logo";
import { SITE } from "@/data/site";

const GROUPS = [
  {
    label: "さがす",
    links: [
      { href: "/trainer/", label: "トレーナーをさがす" },
      { href: "/purpose/", label: "目的からさがす" },
      { href: "/area/", label: "エリアからさがす" },
    ],
  },
  {
    label: "このサイトについて",
    links: [
      { href: "/join/", label: "掲載を希望するトレーナーの方へ" },
      { href: "/privacy/", label: "プライバシーポリシー" },
      { href: SITE.contactUrl, label: "お問い合わせ" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-night text-white">
      <div className="container-page grid gap-12 py-16 min-[768px]:grid-cols-12 min-[768px]:py-20">
        <div className="min-[768px]:col-span-6">
          <Logo size="lg" invert />
          <p className="mt-6 max-w-[24rem] text-[0.9375rem] leading-[1.9] text-white/85">
            {SITE.tagline.join("")}ジムのトレーナー一人ひとりに話を聞き、教え方と人柄を本人の言葉で届けます。
          </p>
        </div>
        {GROUPS.map((g) => (
          <nav key={g.label} aria-label={`フッター（${g.label}）`} className="min-[768px]:col-span-3">
            <p className="eyebrow !tracking-[0.2em]">{g.label}</p>
            <ul className="mt-4 space-y-3 text-[0.875rem]">
              {g.links.map((l) => (
                <li key={l.href}>
                  {l.href.startsWith("/") ? (
                    <Link href={l.href} className="text-white/90 hover:text-white hover:underline">
                      {l.label}
                    </Link>
                  ) : (
                    <a href={l.href} target="_blank" rel="noopener" className="text-white/90 hover:text-white hover:underline">
                      {l.label}
                      <span aria-hidden="true"> ↗</span>
                      <span className="sr-only">（新しいタブで開きます）</span>
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      {/* 画面幅いっぱいのロゴ。飾りなので読み上げない */}
      <div aria-hidden="true" className="h-[19vw] overflow-hidden px-2">
        <p className="text-center font-num text-[33vw] leading-[0.78] font-extrabold tracking-[-0.01em] text-white/[0.07] select-none">BUDDY</p>
      </div>
      <div className="container-page flex flex-wrap gap-x-4 gap-y-1 border-t border-white/10 py-6 text-[0.75rem] text-white/50">
        <span>
          © {SITE.name} {SITE.kind}
        </span>
      </div>
    </footer>
  );
}
