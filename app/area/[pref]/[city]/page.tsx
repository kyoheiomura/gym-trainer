import { notFound } from "next/navigation";
import { ListPage } from "@/components/ListPage";
import { AREA_INDEX_MIN } from "@/data/site";
import { getAreaTree, trainersInCity } from "@/lib/areas-index";
import { pageMeta } from "@/lib/meta";
import { toSummary } from "@/lib/view";

type Props = { params: Promise<{ pref: string; city: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getAreaTree().flatMap((p) => p.cities.map((c) => ({ pref: p.slug, city: c.slug })));
}

async function resolve(params: Props["params"]) {
  const { pref: prefSlug, city: citySlug } = await params;
  const pref = getAreaTree().find((p) => p.slug === prefSlug);
  const city = pref?.cities.find((c) => c.slug === citySlug);
  return pref && city ? { pref, city } : null;
}

export async function generateMetadata({ params }: Props) {
  const area = await resolve(params);
  if (!area) return {};
  const { pref, city } = area;
  return pageMeta({
    title: `${city.name}（${pref.name}）のジムトレーナー`,
    description: `${pref.name}${city.name}で取材したジムトレーナー${city.count}人のインタビュー。教え方と人柄から、習う相手を選べます。`,
    path: `/area/${pref.slug}/${city.slug}/`,
    // 薄いページを増やさないため、少ないうちはインデックスさせない
    noindex: city.count < AREA_INDEX_MIN,
  });
}

export default async function CityPage({ params }: Props) {
  const area = await resolve(params);
  if (!area) notFound();
  const { pref, city } = area;
  return (
    <ListPage
      crumbs={[
        { href: "/area/", label: "エリアからさがす" },
        { href: `/area/${pref.slug}/`, label: pref.name },
        { href: `/area/${pref.slug}/${city.slug}/`, label: city.name },
      ]}
      en={city.slug.replace(/-/g, " ")}
      label={`Area — ${pref.slug}`}
      title={`${city.name}のトレーナー`}
      lead={
        <p>
          {pref.name}
          {city.name}で話を聞いたジムトレーナーは{city.count}人です（新着順）。
        </p>
      }
      people={trainersInCity(pref.slug, city.slug).map(toSummary)}
    />
  );
}
