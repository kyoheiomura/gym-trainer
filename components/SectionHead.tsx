/**
 * セクション見出し：真鍮色の小さな番号ラベル → 細い大きな欧文（読み上げない）→ 明朝の和文見出し。
 * 欧文は飾りなので aria-hidden。見出しの名前は和文だけ。
 */
export function SectionHead({
  id,
  en,
  ja,
  no,
  invert = false,
  className = "",
}: {
  id?: string;
  en: string;
  ja: string;
  no?: string;
  invert?: boolean;
  className?: string;
}) {
  return (
    <h2 id={id} className={`reveal ${className}`}>
      {no && (
        <span aria-hidden="true" className="eyebrow mb-6 flex items-center gap-4">
          <span className="reveal-clip">
            <span className="reveal-line">No.{no}</span>
          </span>
          <span className="rule-brass reveal-rule w-12" />
        </span>
      )}
      <span aria-hidden="true" className={`display-en reveal-clip ${invert ? "text-white" : "text-ink"}`}>
        <SplitChars text={en} start={2} />
      </span>
      <span className={`serif reveal-clip mt-5 text-[1.125rem] min-[768px]:text-[1.375rem] ${invert ? "text-white/80" : "text-ink/80"}`}>
        <span className="reveal-line" style={{ "--d": en.replace(/ /g, "").length * 0.75 + 3 } as React.CSSProperties}>
          {ja}
        </span>
      </span>
    </h2>
  );
}

/** 欧文を単語ごとに枠で切り、1文字ずつずらしてせり上げる（単語の間では普通に折り返す） */
function SplitChars({ text, start }: { text: string; start: number }) {
  let n = 0;
  const words = text.split(" ");
  return (
    <>
      {words.map((w, wi) => (
        <span key={wi}>
          <span className="reveal-word">
            {[...w].map((ch, ci) => (
              <span key={ci} className="reveal-char" style={{ "--d": start + n++ } as React.CSSProperties}>
                {ch}
              </span>
            ))}
          </span>
          {wi < words.length - 1 && " "}
        </span>
      ))}
    </>
  );
}
