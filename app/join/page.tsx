import { TextPage } from "@/components/TextPage";
import { SITE } from "@/data/site";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta({
  title: "掲載を希望するトレーナーの方へ（取材のご案内）",
  description: `${SITE.name}での取材・掲載を希望するスポーツトレーナーの方へのご案内です。`,
  path: "/join/",
});

export default function JoinPage() {
  return (
    <TextPage
      crumbs={[{ href: "/join/", label: "掲載を希望するトレーナーの方へ" }]}
      en="For trainers"
      title="掲載を希望するトレーナーの方へ"
      lead={<p>読んだ人が「自分に合うトレーナー」を見つけられるように、教え方と人柄を、ご本人の言葉で届けたいと考えています。</p>}
    >
      <section aria-labelledby="who">
        <h2 id="who">取材をお願いしたい方</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>パーソナルジム、総合フィットネスジム、スタジオなどで、トレーニングを教えている方。フリーランスの方も歓迎します。</li>
          <li>得意な目的や、教えている相手の年齢・経験は問いません。大会での成績も問いません。</li>
        </ul>
      </section>

      <section aria-labelledby="flow">
        <h2 id="flow">取材の流れ</h2>
        <ol className="list-decimal space-y-2 pl-5">
          <li>お問い合わせフォームからご連絡ください。得意な目的と教えているジム、ご連絡先をお書き添えください。</li>
          <li>事前に、初回の流れや料金などをうかがう質問シートにお答えいただきます。</li>
          <li>お話を伺い、原稿にまとめます。進め方はご相談のうえで決めます。</li>
          <li>原稿をご確認いただいてから公開します。</li>
        </ol>
      </section>

      <section aria-labelledby="contact">
        <h2 id="contact">ご連絡先</h2>
        <p>
          <a href={SITE.contactUrl} target="_blank" rel="noopener" className="link">
            お問い合わせフォーム<span aria-hidden="true">↗</span>
            <span className="sr-only">（新しいタブで開きます）</span>
          </a>
        </p>
      </section>
    </TextPage>
  );
}
