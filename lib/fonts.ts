import { Barlow_Condensed, Zen_Kaku_Gothic_New, Zen_Old_Mincho } from "next/font/google";

// 和文の本文：Zen Kaku Gothic New（400/700）。
export const sans = Zen_Kaku_Gothic_New({
  weight: ["400", "700", "900"],
  subsets: ["latin"],
  display: "swap",
  preload: false,
  variable: "--font-sans-jp",
});

// 和文の大見出し：Zen Old Mincho。トップの見出し・セクション見出し・一言など、大きく見せる和文だけに使う
export const serif = Zen_Old_Mincho({
  weight: ["500", "700"],
  subsets: ["latin"],
  display: "swap",
  preload: false,
  variable: "--font-serif-jp",
});

// 欧文と数字：幅の狭いグロテスク。ロゴ・人数は太く（800）、大きな欧文の見出しは細く（300）字間を広げて使う
export const num = Barlow_Condensed({
  weight: ["300", "500", "600", "800"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-num",
});
