import { ImageResponse } from "next/og";
import { SITE } from "@/data/site";

// サイト共通の OGP 画像。チョークの地に、コンセプトと目的のプレートの色
export const alt = SITE.defaultTitle;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const TEXT = `${SITE.name}${SITE.nameEn}${SITE.kind}${SITE.tagline.join("")}`;

/** 使う文字だけを Google Fonts から取得する（ビルド時に1回） */
async function loadFont(family: string, weight: number) {
  const css = await fetch(
    `https://fonts.googleapis.com/css2?family=${family}:wght@${weight}&text=${encodeURIComponent(TEXT)}`,
  ).then((r) => r.text());
  const src = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/)?.[1];
  if (!src) throw new Error(`OGP 用フォントを取得できませんでした: ${family}`);
  return fetch(src).then((r) => r.arrayBuffer());
}

export default async function OgImage() {
  const gothic = await loadFont("Zen+Kaku+Gothic+New", 900);
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px 100px",
          background: "#f1f2ef",
          color: "#1b2233",
          borderBottom: "24px solid #1b2233",
          fontFamily: "Gothic",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          {SITE.tagline.map((l) => (
            <div key={l} style={{ fontSize: 80, lineHeight: 1.25, display: "flex" }}>
              {l}
            </div>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "baseline", borderTop: "4px solid #1b2233", paddingTop: 28 }}>
          <span style={{ fontSize: 44 }}>{SITE.nameEn}</span>
          <span style={{ fontSize: 26, marginLeft: 20 }}>{SITE.name}</span>
          <span style={{ fontSize: 26, marginLeft: 24, color: "#525b6a" }}>{SITE.kind}</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Gothic", data: gothic, weight: 900, style: "normal" }],
    },
  );
}
