/**
 * 比較項目で使う決まった語彙。自由入力にすると絞り込みと比較が崩れるので、増やすときはここに足す。
 */

/**
 * 目的（サイトの主な探し方）。slug は URL（/purpose/[slug]/）に使うので、公開後は変えない。
 * plate はトップのバーベルに付くプレートの色。目的ごとに1色で、カードや個別ページでも同じ色を使う。
 * 並びは一覧・絞り込み・バーベルの順（前半4つが左、後半4つが右）。
 * lead は目的ページの冒頭の文。結果や期間を約束する言い方は書かない。
 */
export const PLATES = {
  red: { bg: "#b4472f", fg: "#ffffff" },
  blue: { bg: "#34518c", fg: "#ffffff" },
  yellow: { bg: "#c9a23e", fg: "#1d1e20" },
  green: { bg: "#4d6b4f", fg: "#ffffff" },
  white: { bg: "#e7e3da", fg: "#1d1e20" },
  black: { bg: "#3b3d42", fg: "#ffffff" },
  steel: { bg: "#9aa0a7", fg: "#1d1e20" },
  pink: { bg: "#c4959a", fg: "#1d1e20" },
} as const;
export type PlateColor = keyof typeof PLATES;

export type Purpose = { slug: string; label: string; short: string; en: string; plate: PlateColor; lead: string };
export const PURPOSES: Purpose[] = [
  {
    slug: "diet",
    label: "ダイエット",
    short: "ダイエット",
    en: "Weight",
    plate: "red",
    lead: "食事と運動の両方から、無理なく続く形を一緒に探すトレーナーたちです。",
  },
  {
    slug: "body-make",
    label: "ボディメイク",
    short: "ボディメイク",
    en: "Shape",
    plate: "blue",
    lead: "なりたい体の形をことばにして、そこへ向かうトレーニングを組み立てるトレーナーたちです。",
  },
  {
    slug: "strength",
    label: "筋力アップ",
    short: "筋力アップ",
    en: "Strength",
    plate: "yellow",
    lead: "ビッグ3をはじめ、重さを扱う種目のフォームと組み立てをていねいに教えるトレーナーたちです。",
  },
  {
    slug: "posture",
    label: "姿勢・体の使い方",
    short: "姿勢",
    en: "Posture",
    plate: "green",
    lead: "立ち方・座り方のくせや、肩・腰まわりの使い方を見直すトレーナーたちです。",
  },
  {
    slug: "habit",
    label: "運動習慣づくり",
    short: "運動習慣",
    en: "Habit",
    plate: "white",
    lead: "運動が久しぶりの人や苦手な人と、通い続けられるペースを一緒につくるトレーナーたちです。",
  },
  {
    slug: "athlete",
    label: "競技のための体づくり",
    short: "競技",
    en: "Athletic",
    plate: "black",
    lead: "部活や競技、市民大会に向けて、動きの土台になる体をつくるトレーナーたちです。",
  },
  {
    slug: "senior",
    label: "シニアの体力づくり",
    short: "シニア",
    en: "Senior",
    plate: "steel",
    lead: "階段や歩くことを楽にしたい、という毎日の体力に寄り添うトレーナーたちです。",
  },
  {
    slug: "postpartum",
    label: "産後の体力づくり",
    short: "産後",
    en: "Postpartum",
    plate: "pink",
    lead: "出産のあとの体と生活のリズムに合わせて、運動を再開するトレーナーたちです。",
  },
];
export const PURPOSE_SLUGS = PURPOSES.map((s) => s.slug) as [string, ...string[]];
export const findPurpose = (slug: string) => PURPOSES.find((s) => s.slug === slug);
export const purposeLabel = (slug: string) => findPurpose(slug)?.label ?? slug;

/** よく受ける相談。「できるようになること」「何kg痩せる」とは書かない（結果を約束する表示になるため） */
export const GOALS = [
  { slug: "hajimete", label: "ジムがはじめてで不安" },
  { slug: "nigate", label: "運動に苦手意識がある" },
  { slug: "tsuzukanai", label: "ひとりだと続かない" },
  { slug: "shokuji", label: "食事のことも相談したい" },
  { slug: "saikai", label: "久しぶりに運動を再開したい" },
  { slug: "form", label: "マシンやフォームを教わりたい" },
  { slug: "shincho", label: "体に不安があり慎重に進めたい" },
  { slug: "jikan", label: "忙しくて時間が限られている" },
  { slug: "kigen", label: "期限のある目標がある" },
  { slug: "kinchou", label: "人に見られるのが苦手" },
] as const;
export const GOAL_SLUGS = GOALS.map((g) => g.slug) as [string, ...string[]];
export const goalLabel = (slug: string) => GOALS.find((g) => g.slug === slug)?.label ?? slug;

/** 教えている相手 */
export const TARGETS = ["運動がはじめての大人", "経験者", "女性", "シニア", "中高生", "競技をしている人"] as const;

/** 教え方の温度感。優劣ではなく相性の項目 */
export const TONES = ["おだやかに見守る", "理屈からていねいに", "熱く引っぱる", "相手に合わせる"] as const;
/** 伝え方の中心 */
export const FEEDBACKS = ["言葉で細かく伝える", "見本を見せる", "鏡や動画で一緒に確かめる", "図やメモで整理して伝える"] as const;
/** 食事のサポートの仕方 */
export const NUTRITIONS = ["トレーニングのみ", "聞かれたら助言する", "記録を見て助言する", "食事も一緒に組み立てる"] as const;
export const FORMATS = ["マンツーマン", "ペア", "少人数グループ", "オンライン"] as const;
export const ROLES = ["代表", "所属トレーナー", "業務委託", "フリーランス"] as const;

export const VENUE_KINDS = ["パーソナルジム", "総合フィットネスジム", "24時間ジム", "レンタルジム", "スタジオ", "その他"] as const;
export const WEEKDAYS = ["月", "火", "水", "木", "金", "土", "日", "祝"] as const;
export const FEATURES = [
  "完全個室",
  "女性専用",
  "シャワー",
  "ウェア・タオルの貸し出し",
  "駐車場",
  "キッズスペース",
  "出張トレーニング",
  "オンライン対応",
  "英語対応",
] as const;
