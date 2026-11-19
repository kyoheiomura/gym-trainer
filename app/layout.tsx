import type { Metadata, Viewport } from "next";
import "./globals.css";
import { DevFeedback } from "@/components/DevFeedback";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { RevealObserver } from "@/components/RevealObserver";
import { SITE } from "@/data/site";
import { num, sans, serif } from "@/lib/fonts";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: SITE.defaultTitle, template: `%s${SITE.titleSuffix}` },
  description: SITE.description,
  applicationName: SITE.name,
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={`${sans.variable} ${serif.variable} ${num.variable}`} suppressHydrationWarning>
      <head>
        {/* スクロールの演出を使うときだけ、出る前の要素を隠す印を付ける（JS が動かない・動きを減らす設定では最初から見えている） */}
        <script
          dangerouslySetInnerHTML={{
            __html: `if(!matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.setAttribute("data-motion","")`,
          }}
        />
      </head>
      <body className="min-h-dvh antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-paper focus:px-4 focus:py-2 focus:font-bold"
        >
          本文へ移動
        </a>
        <Header />
        <main id="main" className="pb-24 min-[768px]:pb-36 has-[>.flush-footer]:pb-0">{children}</main>
        <Footer />
        <RevealObserver />
        {process.env.NODE_ENV === "development" && <DevFeedback />}
      </body>
    </html>
  );
}
