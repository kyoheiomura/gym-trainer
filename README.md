# バディ（BUDDY｜ジムトレーナーメディア）

ジムのトレーナーへのインタビューを軸にした「トレーナーを読んで選べる」メディア。
コンセプトは **相棒は、読んで選ぶ。** 教え方や声のかけ方は人によって違うので、星・口コミ・ランキングでは並べない。判断材料は「インタビュー本文」と、初回の流れ・料金・ジム情報などの「通う前に知りたいこと」。

スポーツコーチのメディア「ホイッスル」（`../sports_coach`）と同じ仕組みを土台にし、トレーナー向けに作り替えた姉妹サイト。デザインは別物。

- 取材の質問シート: [docs/interview-question-sheet.md](docs/interview-question-sheet.md)
- 原稿テンプレート: [templates/trainer.mdx](templates/trainer.mdx)・[templates/gym.yaml](templates/gym.yaml)

## 技術

Next.js（App Router・全ページ静的生成）／TypeScript／Tailwind CSS v4／MDX＋frontmatter（Zod で検証）。

## コマンド

| コマンド | 内容 |
|---|---|
| `npm run dev` | 開発サーバー（http://localhost:3000） |
| `npm run build` | 原稿の検査 → ビルド → title の検査。どれかで失敗したら止まる |
| `npm run lint:content` | 原稿の検査だけ（スキーマ・参照・NG ワード・情報の鮮度） |
| `npm run check:titles` | ビルド後の全ページの title に「トレーナー」が入っているか |
| `npm run typecheck` | 型チェック |
| `FORCE=1 bash scripts/generate-photos.sh` | ダミーの写真を AI（Codex）で作り直す（FORCE なしなら、無い写真だけ作る） |

## トレーナー・ジムを追加する

1. `templates/gym.yaml` を `content/gym/<slug>.yaml` にコピーして埋める（地域は `data/areas.ts` にある値だけ。無ければ市区町村を足す）
2. `templates/trainer.mdx` を `content/trainer/<slug>.mdx` にコピーして埋める。写真は `public/images/trainer/`（縦 4:5）と `public/images/interview/`
3. `npm run lint:content` で検査 → `draft: false` にして公開
4. ファイル名が `_` で始まるものは読み込まれない（下書き置き場）。`SHOW_DRAFTS=1 npm run dev` で下書きも表示
5. 目的を増やすときは `data/vocab.ts` の `PURPOSES` に足す（プレートの色も1つ決める）

## URL

| URL | 中身 |
|---|---|
| `/` | トップ（目的のプレート8枚・使い方・新着・決まり・エリア） |
| `/trainer/` | 一覧（フリーワード・目的・エリア・相談したいこと・特徴で絞り込み。新着順／エリア順） |
| `/trainer/<slug>/` | 取材記事＋教え方の項目＋トレーニングを受けるには |
| `/purpose/`・`/purpose/<slug>/` | 目的から |
| `/area/`・`/area/<pref>/`・`/area/<pref>/<city>/` | エリアから（47都道府県） |
| `/gym/<slug>/` | ジムの情報と、そこで教えているトレーナー |
| `/join/`・`/privacy/` | 掲載希望の方へ・プライバシーポリシー |

## デザインの決まり

- 題材はジムの床。チョークのグレーの面、マットなゴムの床の濃い面、くすんだ色のプレート
- **プレートの8色は「目的」だけを表す**（`data/vocab.ts` の `PLATES`）。カードの帯・個別ページ・目的ページで同じ色
- 和文は Zen Kaku Gothic New。欧文の大見出し・数字・ロゴは Barlow Condensed
- 罫線は細く、影は使わない。動きはトップのプレートが転がって入る一度だけ（とホバー）
- 詳しくは `app/globals.css` の冒頭

## 守ること（コンセプトから）

- 口コミ・星・点数・ランキング・「人気順」「おすすめ順」は作らない。並び順は新着順とエリア順だけ
- ビフォーアフター・体重の減り幅・「何か月で」などの結果の約束は載せない（`data/ng-words.ts` で検査。公開前・有料掲載の開始前に専門家の確認を受ける）
- 大会の成績や教えた人数など、肩書きの大きさを比べる項目は作らない
- 有料掲載でも表示順を変えない。`listing: paid` のトレーナーには「掲載プラン利用」と自動で表示する
- 料金は通常の額だけ。割引・体験価格を強調しない

## 公開前にやること

- サイト名「バディ／BUDDY」の商標・同名サービスを確認する
- 公開する場所を決める（ホイッスルと同じく media.raxus.inc 配下なら `/gym-coach/` などのパスで配信する設定が必要）
- `data/site.ts` の `isDummyContent` を `false` にする（robots.txt の全面ブロックが外れる）
- `NEXT_PUBLIC_SITE_URL` を本番ドメインに設定する
- ダミーのトレーナー・ジム（`content/`）と AI 生成の写真を、実際の取材内容と写真に差し替える
- プライバシーポリシーを確定する
