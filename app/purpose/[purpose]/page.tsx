import Link from "next/link";
import { notFound } from "next/navigation";
import { ListPage } from "@/components/ListPage";
import { AREA_INDEX_MIN } from "@/data/site";
import { PLATES } from "@/data/vocab";
import { pageMeta } from "@/lib/meta";
import { trainersOfPurpose, getAllPurposes } from "@/lib/purposes-index";
import { toSummary } from "@/lib/view";

type Props = { params: Promise<{ purpose: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  // まだ取材していない目的のページも作る（「これから取材します」と出す。少ないうちは noindex）
  return getAllPurposes().map((s) => ({ purpose: s.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { purpose: purposeSlug } = await params;
  const purpose = getAllPurposes().find((s) => s.slug === purposeSlug);
  if (!purpose) return {};
  return pageMeta({
    title: `${purpose.label}のトレーナーを探す`,
    description: `${purpose.label}を教えるトレーナーのインタビュー。教え方と人柄を、トレーナー本人の言葉で紹介しています。`,
    path: `/purpose/${purpose.slug}/`,
    // 薄いページを増やさないため、少ないうちはインデックスさせない
    noindex: purpose.count < AREA_INDEX_MIN,
  });
}

export default async function PurposePage({ params }: Props) {
  const { purpose: purposeSlug } = await params;
  const purpose = getAllPurposes().find((s) => s.slug === purposeSlug);
  if (!purpose) notFound();
  return (
    <ListPage
      crumbs={[
        { href: "/purpose/", label: "目的からさがす" },
        { href: `/purpose/${purpose.slug}/`, label: purpose.label },
      ]}
      en={purpose.en}
      label="Purpose"
      title={`${purpose.label}のトレーナー`}
      lead={
        <p>
          {purpose.lead}
          指導の仕方も考え方も、トレーナーによってさまざまです。それぞれのインタビューで確かめてください。
        </p>
      }
      plate={{ color: purpose.plate, en: purpose.en, id: purpose.slug }}
      people={trainersOfPurpose(purpose.slug).map(toSummary)}
    >
      {purpose.count === 0 && (
        <div className="card mt-12 p-8 text-center">
          <p className="font-bold">{purpose.label}のトレーナーは、これから取材します。</p>
          <p className="mt-2 text-sm text-sub">
            <Link href="/trainer/" className="link">
              ほかの目的のトレーナーを見る
            </Link>
          </p>
        </div>
      )}
    </ListPage>
  );
}
