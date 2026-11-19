/** サイト名はここだけで決める。変えるときは NAME と NAME_EN を直せば全ページに反映される */
const NAME = "バディ";
/** ロゴと OGP に使う欧文の表記 */
const NAME_EN = "BUDDY";
const KIND = "ジムトレーナーメディア";

export const SITE = {
  name: NAME,
  nameEn: NAME_EN,
  /** title の末尾などに添える種別 */
  kind: KIND,
  /** ロゴの横に添える、何のメディアかの一言 */
  descriptor: "ジムトレーナーのインタビューメディア",
  /** コンセプト。トップとフッター・OGP で使う */
  tagline: ["「この人に", "教わりたい」に", "出会える。"],
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://buddy-trainer.example").replace(/\/$/, ""),
  /** トップの title。ほかのページは titleSuffix を付ける */
  defaultTitle: `${NAME}｜あなたに合ったジムトレーナーが見つかる${KIND}`,
  titleSuffix: `｜${NAME} ${KIND}`,
  description:
    "バディは、ジムのトレーナー一人ひとりに話を聞き、教え方と人柄を本人の言葉で届けるメディアです。初回の流れや料金、教えているジムの情報もあわせて載せています。",
  /** お問い合わせ・取材の希望の窓口（運営会社のフォーム） */
  contactUrl: "https://0450.co.jp/contact",
  /** 掲載中のトレーナー・ジムがダミーのあいだは true。robots.txt で全面ブロックする */
  isDummyContent: true,
} as const;

/** 1ページに並べるトレーナーの数 */
export const PAGE_SIZE = 24;
/** エリアページ・目的ページをインデックスさせる最少人数 */
export const AREA_INDEX_MIN = 3;
