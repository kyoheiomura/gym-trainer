import { AreaLinks } from "@/components/AreaLinks";
import { PageHero } from "@/components/PageHero";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta({
  title: "エリアからジムトレーナーを探す",
  description: "取材したジムトレーナーを、都道府県・市区町村から探せます。",
  path: "/area/",
});

export default function AreaIndexPage() {
  return (
    <>
      <PageHero
        crumbs={[{ href: "/area/", label: "エリアからさがす" }]}
        en="Area"
        label="47 prefectures"
        title="エリアからさがす"
        lead="数字は、話を聞いたトレーナーの人数です。数字のない都道府県は、これから取材します。"
      />
      <div className="container-page pt-14 min-[768px]:pt-20">
        <div>
          <AreaLinks headingLevel="h2" />
        </div>
      </div>
    </>
  );
}
