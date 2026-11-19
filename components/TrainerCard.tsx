import Image from "next/image";
import Link from "next/link";
import { PLATES, findPurpose } from "@/data/vocab";
import type { TrainerSummary } from "@/lib/view";

type Props = {
  s: TrainerSummary;
  headingLevel?: "h2" | "h3";
  priority?: boolean;
  /** トップの1枚目など、大きく見せるとき */
  large?: boolean;
};

/**
 * インタビューカード。写真の上に目的の英語名（大きなコンデンス体）を重ね、写真の右下に目的の色のプレートを置く。
 * 写真の下は一言 → 名前・ジム・エリア。ホバーで写真が寄り、プレートが回る。
 */
export function TrainerCard({ s, headingLevel = "h3", priority, large = false }: Props) {
  const Heading = headingLevel;
  const en = s.purposes.map((p) => findPurpose(p)?.en).filter(Boolean);
  return (
    <article className="group relative flex h-full flex-col">
      <div className={`wipe relative overflow-clip bg-rubber ${large ? "aspect-[4/5] min-[1024px]:aspect-auto min-[1024px]:flex-1" : "aspect-[4/5]"}`}>
        <span className="zoom-in absolute inset-0 block">
        <Image
          src={s.photo.src}
          alt=""
          fill
          sizes={large ? "(min-width: 1024px) 55vw, 100vw" : "(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"}
          priority={priority}
          className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]"
        />
        </span>
        <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/0 to-black/10" />
        <p aria-hidden="true" className={`absolute top-4 left-4 font-num leading-[0.9] font-light tracking-[0.04em] text-white uppercase min-[768px]:top-5 min-[768px]:left-5 text-[clamp(2.25rem,3.6vw,3rem)]`}>
          {en.map((e) => (
            <span key={e} className="block">
              {e}
            </span>
          ))}
        </p>
        <span
          aria-hidden="true"
          className={`card-plate absolute right-4 bottom-4 block rounded-full shadow-[0_10px_20px_rgb(0_0_0/0.35)] ${large ? "size-20" : "size-14"}`}
          style={{ background: `radial-gradient(circle, #141517 0 14%, #c9cdd2 15% 30%, rgb(0 0 0/0.25) 31% 32%, ${PLATES[s.plate].bg} 33% 88%, rgb(0 0 0/0.2) 89% 90%, ${PLATES[s.plate].bg} 91%)` }}
        />
      </div>
      <div className="flex flex-col pt-5">
        <p className="text-[0.75rem] font-bold tracking-[0.06em] opacity-60">{s.purposeLabels.join(" ／ ")}</p>
        <p className={`mt-2 leading-[1.6] font-bold ${large ? "text-[1.375rem] min-[768px]:text-[1.75rem]" : "text-[1.1875rem] min-[768px]:text-[1.25rem]"}`}>
          <span className="-ml-[0.5em]">「</span>
          {s.catchphrase}」
        </p>
        <div className="mt-5 flex items-baseline justify-between gap-3 border-t border-current/20 pt-4">
          <Heading className="shrink-0 text-[0.9375rem] font-bold">
            <Link href={`/trainer/${s.slug}/`} className="after:absolute after:inset-0 after:content-[''] group-hover:underline">
              {s.name}
              <span className="sr-only">さんのインタビューを読む</span>
            </Link>
          </Heading>
          <p className="text-right text-[0.75rem] leading-[1.6] opacity-70">
            {s.venueName}（{s.areaLabel}）
          </p>
        </div>
      </div>
    </article>
  );
}

export function TrainerGrid({
  people,
  headingLevel,
  priorityCount = 0,
}: {
  people: TrainerSummary[];
  headingLevel?: "h2" | "h3";
  priorityCount?: number;
}) {
  return (
    <>
      <ul className="grid gap-x-6 gap-y-14 min-[640px]:grid-cols-2 min-[1024px]:grid-cols-3 min-[1024px]:gap-x-8 min-[1024px]:gap-y-16">
        {people.map((s, i) => (
          <li key={s.slug} className="rise">
            <TrainerCard s={s} headingLevel={headingLevel} priority={i < priorityCount} />
          </li>
        ))}
      </ul>
      <SampleNote />
    </>
  );
}

/**
 * いま載っているトレーナーは掲載イメージ用の架空の人物なので、カードの一覧の下に必ず添える。
 * 白地・夜の面のどちらでも読めるよう、文字色は親から受け継いで薄くする。
 * 実際の取材記事に入れ替えたら、このコンポーネントごと消す。
 */
export function SampleNote({ className = "mt-10" }: { className?: string }) {
  return (
    <p className={`${className} text-[0.8125rem] leading-[1.9] tracking-[0.04em] opacity-60`}>
      ※ 掲載イメージです。トレーナーとジムは架空のもので、写真はAIで作成しています。
    </p>
  );
}
