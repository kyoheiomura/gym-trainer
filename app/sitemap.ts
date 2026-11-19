import type { MetadataRoute } from "next";
import { AREA_INDEX_MIN, SITE } from "@/data/site";
import { getAreaTree } from "@/lib/areas-index";
import { getPurposeIndex } from "@/lib/purposes-index";
import { getAllVenues, getAllTrainers } from "@/lib/content";

// noindex のページ（少人数のエリア・目的）は入れない
export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => `${SITE.url}${path}`;
  const trainer = getAllTrainers();
  const latest = trainer[0]?.publishedAt;

  const fixed = ["/", "/trainer/", "/purpose/", "/area/", "/join/", "/privacy/"].map(
    (p) => ({ url: url(p), lastModified: ["/", "/trainer/"].includes(p) ? latest : undefined }),
  );

  const areas = getAreaTree().flatMap((p) => [
    ...(p.count >= AREA_INDEX_MIN ? [{ url: url(`/area/${p.slug}/`) }] : []),
    ...p.cities.filter((c) => c.count >= AREA_INDEX_MIN).map((c) => ({ url: url(`/area/${p.slug}/${c.slug}/`) })),
  ]);

  const purposes = getPurposeIndex()
    .filter((s) => s.count >= AREA_INDEX_MIN)
    .map((s) => ({ url: url(`/purpose/${s.slug}/`) }));

  return [
    ...fixed,
    ...purposes,
    ...trainer.map((s) => ({ url: url(`/trainer/${s.slug}/`), lastModified: s.updatedAt ?? s.publishedAt })),
    ...getAllVenues().map((c) => ({ url: url(`/gym/${c.slug}/`), lastModified: c.verifiedAt })),
    ...areas,
  ];
}
