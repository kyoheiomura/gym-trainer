import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CompareFieldsList } from "@/components/CompareFieldsList";
import { JsonLd } from "@/components/JsonLd";
import { TrainerGrid } from "@/components/TrainerCard";
import { SITE } from "@/data/site";
import { findPurpose, PLATES } from "@/data/vocab";
import { venuesOf, getAllTrainers, getTrainer } from "@/lib/content";
import { chaptersOf, renderInterview } from "@/lib/mdx";
import { pageMeta } from "@/lib/meta";
import { areaOf, formatDate, formatMonth, formatYen, hoursLabel, purposesLabel, stationLabel, toCompareData, toSummary } from "@/lib/view";

/*
 * トレーナーの取材記事。上から、
 *   見出し（名前・場所・更新日）→ 写真 → 導入文 → 目次 → 章ごとの質問と答え
 *   → 教え方のまとめ → 教わるには（場所・料金・申し込み）
 * の順。記事が主役で、まとめと連絡先は読み終えたあとに置く。
 */
type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllTrainers().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props) {
  const s = getTrainer((await params).slug);
  if (!s) return {};
  const area = areaOf(venuesOf(s)[0]);
  return pageMeta({
    title: `${s.name}さんの取材記事（${purposesLabel(s.purposes)}／${area.label}）`,
    description: s.lead ?? `${area.fullLabel}の${purposesLabel(s.purposes)}、${s.name}さんの取材記事。${s.compare.belief}`,
    path: `/trainer/${s.slug}/`,
    ogType: "article",
  });
}

export default async function TrainerPage({ params }: Props) {
  const s = getTrainer((await params).slug);
  if (!s) notFound();

  const venues = venuesOf(s);
  const main = areaOf(venues[0]);
  const data = toCompareData(s);
  const chapters = chaptersOf(s.body);
  const interview = await renderInterview(s.body);
  const purpose = findPurpose(s.purposes[0]);
  const station = venues[0].stations[0];

  // 「おすすめ」ではなく、同じ地域で話を聞いたトレーナーを新着順に
  const others = getAllTrainers().filter((o) => o.slug !== s.slug);
  const sameCity = others.filter((o) => toSummary(o).citySlugs.some((c) => data.citySlugs.includes(c)));
  const related = (sameCity.length ? sameCity : others.filter((o) => toSummary(o).prefSlug === main.pref.slug))
    .slice(0, 3)
    .map(toSummary);

  return (
    <>
      <section className="rubber text-white">
        <Breadcrumbs
          invert
          items={[
            ...(purpose ? [{ href: `/purpose/${purpose.slug}/`, label: purpose.label }] : []),
            { href: `/trainer/${s.slug}/`, label: `${s.name}さん` },
          ]}
        />
        <header className="container-page grid gap-10 pt-10 pb-16 min-[768px]:grid-cols-12 min-[768px]:gap-12 min-[768px]:pt-14 min-[768px]:pb-24">
          <div className="min-[768px]:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden bg-night">
              <Image src={s.photo.src} alt={s.photo.alt} fill priority sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" />
              <span
                aria-hidden="true"
                className="absolute right-5 bottom-5 block size-20 rounded-full shadow-[0_10px_20px_rgb(0_0_0/0.35)]"
                style={{ background: `radial-gradient(circle, #141517 0 14%, #c9cdd2 15% 30%, rgb(0 0 0/0.25) 31% 32%, ${PLATES[data.plate].bg} 33% 88%, rgb(0 0 0/0.2) 89% 90%, ${PLATES[data.plate].bg} 91%)` }}
              />
            </div>
          </div>
          <div className="flex flex-col min-[768px]:col-span-7 min-[768px]:pt-2">
            <p aria-hidden="true" className="eyebrow flex flex-wrap items-center gap-4">
              <span>Interview</span>
              <span className="rule-brass w-12" />
              <span>{s.purposes.map((p) => findPurpose(p)?.en).join(" / ")}</span>
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3 text-[0.8125rem] text-white/65">
              <span>{s.purposes.map((p) => findPurpose(p)?.label).join("／")}</span>
              {/* 有料掲載は必ず明示する。表示順には影響しない */}
              {s.listing === "paid" && <span className="border border-white/30 px-2 text-[0.75rem] leading-[1.8]">掲載プラン利用</span>}
            </div>
            <h1 className="serif mt-5 leading-[1.3]">
              <span className="block text-[2.75rem] tracking-[0.08em] min-[768px]:text-[4.25rem]">{s.name}</span>
              <span className="mt-3 block text-[1rem] tracking-[0.12em] text-white/70 min-[768px]:text-[1.125rem]">さんの取材記事</span>
            </h1>
            <p className="mt-6 text-[0.9375rem] font-bold">
              {venues.map((c) => c.name).join("／")}
              <span className="ml-2 text-[0.8125rem] font-normal text-white/60">
                （{main.label}／{station.name}駅）
              </span>
            </p>
            <p className="serif mt-10 border-l border-brass pl-6 text-[1.375rem] leading-[1.7] min-[768px]:text-[1.75rem]">
              <span className="-ml-[0.5em]">「</span>
              {s.catchphrase}」
            </p>
            {s.lead && <p className="mt-8 text-[0.9375rem] leading-[2.1] text-white/75">{s.lead}</p>}
            <p className="mt-auto pt-8 text-xs text-white/50">
              取材日 {formatDate(s.interviewedAt)}／聞き手 {s.interviewer}
              {s.photographer && `／撮影 ${s.photographer}`}／最終更新日 {formatDate(s.updatedAt ?? s.publishedAt)}
            </p>
          </div>
        </header>
      </section>

      <article aria-label={`${s.name}さんの取材記事の本文`} className="container-page pt-4">
        <div className="mx-auto mt-12 max-w-[46rem] min-[768px]:mt-16">
          {chapters.length > 0 && (
            <nav aria-labelledby="toc" className="border-y border-ink/80 py-8 min-[768px]:py-10">
              <p id="toc" className="flex items-center gap-4">
                <span aria-hidden="true" className="eyebrow">Contents</span>
                <span className="serif text-[1rem]">この記事の目次</span>
              </p>
              <ol className="mt-6 space-y-3">
                {chapters.map((c) => (
                  <li key={c.id}>
                    <a href={`#${c.id}`} className="flex gap-3 text-[0.9375rem] font-bold [word-break:auto-phrase] hover:text-accent hover:underline">
                      <span className="num w-8 shrink-0 text-lg leading-[1.6] font-light text-brass">{String(Number(c.no)).padStart(2, "0")}</span>
                      {c.title}
                    </a>
                  </li>
                ))}
                <li>
                  <a href="#fields" className="flex gap-3 text-[0.9375rem] font-bold [word-break:auto-phrase] hover:text-accent hover:underline">
                    <span aria-hidden="true" className="w-8 shrink-0 text-brass">＋</span>
                    {s.name}さんの教え方・トレーニングを受けるには
                  </a>
                </li>
              </ol>
            </nav>
          )}

          <div className="interview mt-12 min-[768px]:mt-16">{interview}</div>
          <div className="clear-both" />
        </div>

        <section id="fields" aria-labelledby="fields-title" className="mx-auto max-w-[56rem] scroll-mt-24 pt-24 min-[768px]:pt-32">
          <h2 id="fields-title">
            <span aria-hidden="true" className="eyebrow block">Profile</span>
            <span className="serif mt-4 block text-[1.625rem] min-[768px]:text-[2.25rem]">{s.name}さんの教え方</span>
          </h2>
          <p className="mt-3 text-[0.875rem] text-sub">声のかけ方、初回の流れ、食事のサポート、料金など、会う前に知っておきたいことをまとめています。</p>
          <div className="mt-8 border-t border-ink/80 pt-2">
            <CompareFieldsList data={data} />
          </div>
        </section>

        <section id="visit" aria-labelledby="visit-title" className="mx-auto max-w-[56rem] scroll-mt-24 pt-20 min-[768px]:pt-28">
          <h2 id="visit-title">
            <span aria-hidden="true" className="eyebrow block">Visit</span>
            <span className="serif mt-4 block text-[1.625rem] min-[768px]:text-[2.25rem]">{s.name}さんのトレーニングを受けるには</span>
          </h2>
          <div className="mt-8 grid gap-5 min-[768px]:grid-cols-2">
            {venues.map((c, i) => (
              <section key={c.slug} aria-labelledby={`venue-${c.slug}`} className="bg-chalk p-6 min-[768px]:p-9">
                <h3 id={`venue-${c.slug}`} className="serif text-[1.25rem]">
                  <Link href={`/gym/${c.slug}/`} className="hover:text-accent">
                    {c.name}
                  </Link>
                  {s.venues[i].days && <span className="badge ml-2 align-middle">{s.venues[i].days}に担当</span>}
                </h3>
                <dl className="mt-4 space-y-2.5 text-sm">
                  <Row label="場所">
                    {areaOf(c).fullLabel}
                    {c.address.line}
                    {c.address.building && ` ${c.address.building}`}
                  </Row>
                  <Row label="最寄り駅">{stationLabel(c)}</Row>
                  <Row label="時間帯">
                    {hoursLabel(c)}
                    {c.hoursNote && <span className="block text-sub">{c.hoursNote}</span>}
                  </Row>
                  {i === 0 && (
                    <Row label="料金（税込）">
                      体験 {formatYen(s.compare.price.trial)}／通常 1回 {formatYen(s.compare.price.regular)}
                      {s.compare.price.admission !== undefined && `／入会金 ${formatYen(s.compare.price.admission)}`}
                      {s.compare.price.note && <span className="block text-sub">{s.compare.price.note}</span>}
                    </Row>
                  )}
                </dl>
                <div className="mt-6 flex flex-wrap gap-3">
                  {c.booking.url && (
                    <a href={c.booking.url} target="_blank" rel="noopener" className="btn-outline">
                      公式サイトで申し込み方法を見る<span aria-hidden="true">↗</span>
                      <span className="sr-only">（新しいタブで開きます）</span>
                    </a>
                  )}
                  {c.booking.phone && (
                    <a href={`tel:${c.booking.phone}`} className="btn-outline">
                      電話する（{c.booking.phone}）
                    </a>
                  )}
                  {c.booking.line && (
                    <a href={c.booking.line} target="_blank" rel="noopener" className="btn-outline">
                      LINEで問い合わせる<span aria-hidden="true">↗</span>
                      <span className="sr-only">（新しいタブで開きます）</span>
                    </a>
                  )}
                </div>
              </section>
            ))}
          </div>
          <p className="mt-4 text-xs text-sub">体験や入会の申し込みは、それぞれの窓口で受け付けています。</p>
        </section>

        <footer className="mx-auto max-w-[56rem] pt-10">
          <div className="space-y-1.5 rounded-[4px] bg-chalk p-5 text-xs leading-relaxed text-sub min-[768px]:p-6">
            <p>掲載している情報は{formatMonth(s.verifiedAt)}に確認したものです。料金や時間帯は変わることがあります。</p>
            <p>体の変わり方には個人差があります。持病や痛み、出産後など体調に不安があるときは、先に医療機関に相談してください。</p>
          </div>
        </footer>
      </article>

      {related.length > 0 && (
        <section aria-labelledby="related" className="container-page pt-24 min-[768px]:pt-36">
          <h2 id="related">
            <span aria-hidden="true" className="eyebrow block">More interviews</span>
            <span className="serif mt-4 block text-[1.625rem] min-[768px]:text-[2.25rem]">同じエリアで話を聞いたトレーナー</span>
          </h2>
          <div className="mt-6">
            <TrainerGrid people={related} />
          </div>
        </section>
      )}

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: `${s.name}さんの取材記事「${s.catchphrase}」`,
          datePublished: s.publishedAt.toISOString(),
          dateModified: (s.updatedAt ?? s.publishedAt).toISOString(),
          image: `${SITE.url}${s.photo.src}`,
          inLanguage: "ja",
          author: { "@type": "Organization", name: SITE.name, url: `${SITE.url}/` },
          publisher: { "@type": "Organization", name: SITE.name, url: `${SITE.url}/` },
          mainEntityOfPage: `${SITE.url}/trainer/${s.slug}/`,
          about: {
            "@type": "Person",
            name: s.name,
            jobTitle: purposesLabel(s.purposes),
            hasCredential: s.qualifications.map((l) => ({ "@type": "EducationalOccupationalCredential", name: l })),
            worksFor: venues.map((c) => ({
              "@type": "ExerciseGym",
              name: c.name,
              url: `${SITE.url}/gym/${c.slug}/`,
            })),
          },
        }}
      />
    </>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[5.5rem_1fr] gap-3">
      <dt className="font-bold text-sub">{label}</dt>
      <dd>{children}</dd>
    </div>
  );
}
