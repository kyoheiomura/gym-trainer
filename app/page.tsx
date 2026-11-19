import Image from "next/image";
import Link from "next/link";
import { Barbell } from "@/components/Barbell";
import { JsonLd } from "@/components/JsonLd";
import { SectionHead } from "@/components/SectionHead";
import { PurposeMarquee } from "@/components/PurposeMarquee";
import { TrainerGrid } from "@/components/TrainerCard";
import { SITE } from "@/data/site";
import { getAreaTree } from "@/lib/areas-index";
import { getAllTrainers } from "@/lib/content";
import { pageMeta } from "@/lib/meta";
import { toSummary } from "@/lib/view";

/*
 * トップは「目的を選んで、一覧へ送り出す」ページ。主役はバーベル（プレート1枚＝目的1つ）。
 * その下：目的の帯 → 考え（写真に重ねる）→ 使い方（SET 01〜03）→ 新着インタビュー（夜の面・3枚同じ大きさ）→ 特徴 → エリア → トレーナーの方へ。
 */
export const metadata = pageMeta({ absoluteTitle: SITE.defaultTitle, path: "/" });

const PHOTO = { talk: "/images/top/talk.jpg" };

/** 読み方。実際に順番のある手順なので番号を付ける */
const STEPS = [
  {
    verb: "読む",
    what: "インタビュー",
    body: "トレーナーになったきっかけ、初回の進め方、どんな人に来てほしいか。本人の言葉で、3つの章にまとめています。",
  },
  {
    verb: "確かめる",
    what: "初回の流れと料金",
    body: "初回の時間配分、通うペース、料金、教えているジムの場所と営業時間。通う前に知っておきたいことも、記事の中にまとめています。",
  },
  {
    verb: "体験に行く",
    what: "申し込みはジムへ",
    body: "会ってみたい人が決まったら、記事の最後にあるジムの窓口から体験を申し込めます。バディは予約を受け付けません。",
  },
];

/** バディの特徴 */
const FEATURES = [
  ["本人の言葉で、人柄が伝わる。", "トレーナーになったきっかけや、教えるときに大切にしていること。経歴の紹介ではなく、その人の考え方がわかるインタビューです。"],
  ["通う前に知りたいことも、まとめて載せている。", "初回の時間配分、料金、教えているジムの最寄り駅や営業時間まで。体験を申し込む前に、通えそうかどうかを確かめられます。"],
  ["目的とエリアから、すぐに見つかる。", "ダイエット、姿勢、産後の体力づくりなど8つの目的と、都道府県・市区町村から探せます。"],
];

export default function Home() {
  const all = getAllTrainers();
  const latest = all.slice(0, 3).map(toSummary);
  const prefs = getAreaTree();

  return (
    <>
      {/* ゴムの床の面：見出しとプレート */}
      <section aria-labelledby="hero-title" className="rubber overflow-x-clip text-white">
        <div className="container-page pt-14 pb-20 min-[768px]:pt-24 min-[768px]:pb-28">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="eyebrow">Interview media for gym trainers</p>
            <p aria-hidden="true" className="eyebrow !text-white/45">
              Trainers <span className="text-white">{String(all.length).padStart(2, "0")}</span>
              <span className="mx-3">/</span>
              Purposes <span className="text-white">08</span>
            </p>
          </div>
          <div className="rule-brass mt-6" />
          <div className="mt-14 grid gap-10 min-[768px]:mt-20 min-[1024px]:grid-cols-12 min-[1024px]:items-end min-[1024px]:gap-10">
            <h1 id="hero-title" className="serif text-[clamp(2.4rem,7.2vw,5.5rem)] leading-[1.18] tracking-[0.04em] min-[1024px]:col-span-8">
              {SITE.tagline.map((l, i) => (
                <span key={l} className="reveal-clip whitespace-nowrap">
                  <span className="hero-line block" style={{ "--i": i } as React.CSSProperties}>
                    <TightPunct text={l} />
                  </span>
                </span>
              ))}
            </h1>
            <div className="min-[1024px]:col-span-4 min-[1024px]:pb-3">
              <div className="space-y-4 text-[1rem] leading-[1.9] text-white/90 min-[768px]:text-[1.0625rem]">
                <p><Phrases parts={["ジムのトレーナーは、", "教え方も", "声のかけ方も、", "一人ずつ違います。"]} /></p>
                <p><Phrases parts={[`${SITE.name}は、`, "トレーナー本人に", "話を聞いて、", "その違いを", "読めるようにした", "メディアです。"]} /></p>
              </div>
              <p className="mt-9">
                <Link href="/trainer/" className="btn-brass">
                  トレーナーをさがす
                  <span aria-hidden="true">→</span>
                </Link>
              </p>
            </div>
          </div>

          <div className="mt-24 min-[768px]:mt-32">
            <div className="mb-12 flex flex-wrap items-end justify-between gap-x-6 gap-y-3 min-[768px]:mb-16">
              <p>
                <span aria-hidden="true" className="eyebrow block">Select your plate</span>
                <span className="serif mt-3 block text-[1.375rem] min-[768px]:text-[1.75rem]">目的からさがす</span>
              </p>
              <span className="text-[0.8125rem] tracking-[0.06em] text-white/50">プレートを選ぶと、その目的のトレーナーが並びます</span>
            </div>
            <Barbell />
          </div>
        </div>
        <PurposeMarquee invert />
      </section>

      {/* 写真の上に考えを重ねる */}
      <section aria-labelledby="idea-title" className="relative isolate overflow-clip bg-night text-white">
        <Image src={PHOTO.talk} alt="" fill sizes="100vw" className="drift -z-10 object-cover opacity-55" />
        <span aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-night via-night/85 to-night/10" />
        <div className="container-page flex min-h-[38rem] items-center py-28 min-[768px]:min-h-[46rem]">
          <div className="max-w-[34rem]">
            <p aria-hidden="true" className="reveal eyebrow flex items-center gap-4">
              <span className="reveal-clip">
                <span className="reveal-line">No.01</span>
              </span>
              <span className="rule-brass reveal-rule w-12" />
              <span className="reveal-clip">
                <span className="reveal-line" style={{ "--d": 2 } as React.CSSProperties}>Philosophy</span>
              </span>
            </p>
            <h2 id="idea-title" className="reveal serif mt-10 text-[clamp(2rem,4.2vw,3.5rem)] leading-[1.5]">
              {["100人いれば、", "100通りの", "教え方がある。"].map((l, i) => (
                <span key={l} className="reveal-clip">
                  <span className="reveal-line" style={{ "--d": 3 + i * 3 } as React.CSSProperties}>
                    {l}
                  </span>
                </span>
              ))}
            </h2>
            <div className="reveal-fade mt-10 space-y-5 text-[1rem] leading-[2] text-white/90 min-[768px]:text-[1.0625rem]">
              <p><Phrases parts={["トレーナーが", "100人いれば、", "教え方も、", "トレーニングについての", "考え方も、", "これまでの経歴も、", "100通りあります。"]} /></p>
              <p><Phrases parts={["メニューを", "きっちり決めてくる", "人もいれば、", "その日の体調を", "聞いてから", "組み立てる人もいる。", "元アスリートもいれば、", "会社員から", "転職した人もいる。"]} /></p>
              <p><Phrases parts={["大事なのは、", "自分に合うかどうか。", "会う前に", "本人の話を読めば、", "それが分かります。"]} /></p>
            </div>
          </div>
        </div>
      </section>

      {/* 使い方：トレーニング記録の SET のように数える */}
      <section aria-labelledby="steps-title" className="py-28 min-[768px]:py-40">
        <div className="container-page">
          <SectionHead id="steps-title" no="02" en="How it works" ja="バディの使い方" />
          <ol className="mt-16 grid min-[768px]:mt-24 min-[768px]:grid-cols-3">
            {STEPS.map((s, i) => (
              <li key={s.verb} className="rise border-line not-first:border-t pt-8 pb-10 min-[768px]:not-first:border-t-0 min-[768px]:not-first:border-l min-[768px]:px-8 min-[768px]:first:pl-0 min-[768px]:last:pr-0">
                <p aria-hidden="true" className="flex items-end justify-between">
                  <span className="eyebrow">Set</span>
                  <span className="num-outline pop-num text-[6.5rem] min-[768px]:text-[8rem]">{String(i + 1).padStart(2, "0")}</span>
                </p>
                <div className="rule-brass mt-6" />
                <p className="serif mt-8 text-[1.625rem]">{s.verb}</p>
                <p className="mt-1 text-[0.8125rem] font-bold tracking-[0.08em] text-sub">{s.what}</p>
                <p className="mt-5 text-[0.9375rem] leading-[2.05]">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 夜の面：新着インタビュー */}
      <section aria-labelledby="latest-title" className="bg-night py-28 text-white min-[768px]:py-40">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHead id="latest-title" no="03" en="Interviews" ja="新しいインタビュー" invert />
            <Link href="/trainer/" className="link-quiet text-brass-soft">
              {all.length}人すべてを見る →
            </Link>
          </div>
          <div className="mt-16 min-[768px]:mt-24">
            <TrainerGrid people={latest} priorityCount={3} />
          </div>
        </div>
      </section>

      {/* 特徴：大きな番号と明朝の見出し */}
      <section aria-labelledby="rules-title" className="py-28 min-[768px]:py-40">
        <div className="container-page grid gap-16 min-[1024px]:grid-cols-12 min-[1024px]:gap-14">
          <div className="min-[1024px]:col-span-4">
            <SectionHead id="rules-title" no="04" en="Why Buddy" ja="バディの特徴" />
          </div>
          <ol className="min-[1024px]:col-span-8">
            {FEATURES.map(([t, d], i) => (
              <li key={t} className="rise draw-top grid grid-cols-[4.5rem_1fr] gap-6 border-t border-line py-10 last:border-b min-[768px]:grid-cols-[7rem_1fr] min-[768px]:py-12">
                <span aria-hidden="true" className="num-outline spot-num text-[4rem] [--stroke:var(--color-brass)] min-[768px]:text-[5.5rem]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="serif text-[1.375rem] leading-[1.6] min-[768px]:text-[1.625rem]">{t}</h3>
                  <p className="mt-4 text-[0.9375rem] leading-[2.05] text-sub">{d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* チョークの面：エリア。県名を大きな欧文で */}
      <section aria-labelledby="area-title" className="overflow-x-clip bg-chalk py-28 min-[768px]:py-40">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHead id="area-title" no="05" en="Area" ja="エリアからさがす" />
            <Link href="/area/" className="link-quiet">
              47都道府県の一覧を見る →
            </Link>
          </div>
          <ul className="mt-16 border-t border-ink/80 min-[768px]:mt-24">
            {prefs.map((p) => (
              <li key={p.slug} className="rise group relative grid items-baseline gap-x-8 gap-y-3 border-b border-ink/15 py-8 min-[768px]:grid-cols-12 min-[768px]:py-10">
                <span aria-hidden="true" className="slide-in font-num text-[clamp(3rem,7vw,6rem)] leading-[0.85] font-light tracking-[0.02em] uppercase transition-colors duration-500 group-hover:text-brass min-[768px]:col-span-6">
                  {p.slug}
                </span>
                <p className="flex items-baseline gap-4 min-[768px]:col-span-3">
                  <Link href={`/area/${p.slug}/`} className="serif text-[1.375rem] after:absolute after:inset-0 after:content-['']">
                    {p.name}
                  </Link>
                  <span className="text-[0.8125rem] text-sub">
                    <span className="num mr-0.5 text-xl text-ink">{p.count}</span>人
                  </span>
                </p>
                <p className="relative z-10 flex flex-wrap gap-x-4 gap-y-1 text-[0.875rem] min-[768px]:col-span-3 min-[768px]:justify-end">
                  {p.cities.map((c) => (
                    <Link key={c.slug} href={`/area/${p.slug}/${c.slug}/`} className="text-sub underline decoration-ink/20 underline-offset-4 hover:text-ink">
                      {c.name}
                    </Link>
                  ))}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* トレーナー向けの案内 */}
      <section aria-labelledby="join-title" className="flush-footer rubber overflow-x-clip border-b border-white/10 text-white">
        <div className="container-page grid gap-10 py-24 min-[768px]:grid-cols-12 min-[768px]:items-end min-[768px]:py-32">
          <h2 id="join-title" className="min-[768px]:col-span-7">
            <span aria-hidden="true" className="eyebrow mb-6 flex items-center gap-4">
              <span>No.06</span>
              <span className="rule-brass w-12" />
            </span>
            <span aria-hidden="true" className="display-en pan-x block whitespace-nowrap">
              For trainers
            </span>
            <span className="serif mt-5 block text-[1.125rem] text-white/80 min-[768px]:text-[1.375rem]">ジムで教えているトレーナーの方へ</span>
          </h2>
          <div className="min-[768px]:col-span-5">
            <p className="text-[0.9375rem] leading-[2.05] text-white/70">取材を受けていただけるトレーナーを探しています。取材の流れと、載せる内容をまとめました。</p>
            <p className="mt-8">
              <Link href="/join/" className="btn-brass">
                掲載について読む
                <span aria-hidden="true">→</span>
              </Link>
            </p>
          </div>
        </div>
      </section>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: SITE.name,
          alternateName: `${SITE.name} ${SITE.kind}`,
          url: `${SITE.url}/`,
          description: SITE.description,
          inLanguage: "ja",
        }}
      />
    </>
  );
}

/**
 * 見出し用：かぎ括弧の余白を詰める（Zen Old Mincho は palt 非対応のため手で詰める）。
 * 「 は字面が右半分、」 は左半分にあるので、空いている側の半角ぶんを負のマージンで消す。
 */
function TightPunct({ text }: { text: string }) {
  return (
    <>
      {[...text].map((ch, i) =>
        ch === "「" ? (
          <span key={i} className="-ml-[0.5em] -mr-[0.22em]">{ch}</span>
        ) : ch === "」" ? (
          <span key={i} className="-mr-[0.5em]">{ch}</span>
        ) : (
          ch
        ),
      )}
    </>
  );
}

/** 文節ごとにまとめて、文節の途中（「一／人ずつ」「声の／かけ方」など）で改行しないようにする */
function Phrases({ parts }: { parts: string[] }) {
  return (
    <>
      {parts.map((t, i) => (
        <span key={i} className="inline-block">
          {t}
        </span>
      ))}
    </>
  );
}
