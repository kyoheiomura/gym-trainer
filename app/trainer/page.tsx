import { PageHero } from "@/components/PageHero";
import { TrainerBrowser } from "@/components/TrainerBrowser";
import { getAreaTree } from "@/lib/areas-index";
import { getAllTrainers } from "@/lib/content";
import { pageMeta } from "@/lib/meta";
import { toSummary } from "@/lib/view";

export const metadata = pageMeta({
  title: "トレーナーをさがす（ジムトレーナーのインタビュー一覧）",
  description:
    "取材したジムトレーナーの一覧です。目的・エリア・相談したいことで絞り込んで、気になるトレーナーのインタビューを読めます。",
  path: "/trainer/",
});

export default function TrainerListPage() {
  const people = getAllTrainers().map(toSummary);
  const areas = getAreaTree().map((p) => ({
    slug: p.slug,
    name: p.name,
    cities: p.cities.map((c) => ({ slug: c.slug, name: c.name })),
  }));

  return (
    <>
      <PageHero
        crumbs={[{ href: "/trainer/", label: "トレーナーをさがす" }]}
        en="Trainers"
        label={`Interviews ${String(people.length).padStart(2, "0")}`}
        title="トレーナーをさがす"
        lead={`${people.length}人のジムトレーナーに話を聞きました。目的やエリアで絞り込んで、気になる人から読んでみてください。`}
      />
      <div className="container-page pt-10 min-[768px]:pt-14">
        <div>
          <TrainerBrowser people={people} areas={areas} />
        </div>
      </div>
    </>
  );
}
