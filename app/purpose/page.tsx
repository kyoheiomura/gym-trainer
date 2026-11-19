import { PageHero } from "@/components/PageHero";
import { PurposeDirectory } from "@/components/PurposeDirectory";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta({
  title: "目的からジムトレーナーを探す",
  description: "取材したジムトレーナーを、ダイエット・ボディメイク・筋力アップ・姿勢など、ジムに通う目的から探せます。",
  path: "/purpose/",
});

export default function PurposeIndexPage() {
  return (
    <>
      <PageHero
        crumbs={[{ href: "/purpose/", label: "目的からさがす" }]}
        en="Purpose"
        label="Select your plate"
        title="目的からさがす"
        lead="ジムに通う目的ごとに、その目的の相談をよく受けるトレーナーをまとめています。数字は、話を聞いたトレーナーの人数です。"
      />
      <div className="container-page pt-14 min-[768px]:pt-20">
        <div>
          <PurposeDirectory headingLevel="h2" />
        </div>
      </div>
    </>
  );
}
