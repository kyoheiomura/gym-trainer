import Link from "next/link";
import { Logo } from "@/components/Logo";
import { MenuIcon } from "@/components/icons";
import { SITE } from "@/data/site";

const NAV = [
  { href: "/trainer/", label: "トレーナーをさがす" },
  { href: "/purpose/", label: "目的から" },
  { href: "/area/", label: "エリアから" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between gap-6">
        <Link href="/" aria-label={`${SITE.name} ホーム`} className="shrink-0 py-2">
          <Logo />
        </Link>

        <nav aria-label="メイン" className="hidden min-[768px]:block">
          <ul className="flex items-center gap-2 text-[0.8125rem] font-bold tracking-[0.06em]">
            {NAV.map((n, i) => (
              <li key={n.href}>
                <Link
                  href={n.href}
                  className={
                    i === 0
                      ? "ml-3 inline-flex min-h-10 items-center bg-ink px-5 tracking-[0.12em] text-white transition-colors duration-500 hover:bg-brass hover:text-night"
                      : "inline-flex min-h-10 items-center px-3 hover:opacity-60"
                  }
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* モバイル */}
        <details className="group min-[768px]:hidden">
          <summary className="flex h-11 w-11 cursor-pointer list-none items-center justify-center [&::-webkit-details-marker]:hidden">
            <span className="sr-only">メニュー</span>
            <MenuIcon size={24} />
          </summary>
          <nav aria-label="メイン" className="fixed inset-x-0 top-16 z-40 h-[calc(100dvh-4rem)] border-t border-line bg-paper px-4 pt-2">
            <ul className="text-lg font-bold">
              {NAV.map((n) => (
                <li key={n.href} className="border-b border-line">
                  <Link href={n.href} className="flex py-5">
                    {n.label}
                  </Link>
                </li>
              ))}
              <li className="border-b border-line">
                <Link href="/join/" className="flex py-5 text-base font-bold text-sub">
                  掲載を希望するトレーナーの方へ
                </Link>
              </li>
            </ul>
          </nav>
        </details>
      </div>
    </header>
  );
}
