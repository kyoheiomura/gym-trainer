/**
 * 取材記事の本文（MDX）で使える部品。CMS のリッチテキストに置き換えやすいよう、数を絞る。
 *   ## 章の見出し            章（目次に出る）。lib/mdx.tsx が <ChapterTitle> に置きかえる
 *   <Q>質問</Q>              聞き手の質問（小見出し）。答えは、その下にふつうの段落で書く
 *   <Photo src alt caption align />  写真。align="left" で文章の左に回りこむ（省くと中央）
 *   <Quote>言葉</Quote>      本文から抜き出した、大きく見せる言葉（使わなくてもよい）
 */
import Image from "next/image";
import type { ReactNode } from "react";

export function ChapterTitle({ id, no, children }: { id: string; no: string; children: ReactNode }) {
  return (
    <h2 id={id} className="!mt-24 scroll-mt-24 first:!mt-0 min-[768px]:!mt-32">
      <span aria-hidden="true" className="flex items-end justify-between gap-6 border-b border-ink/80 pb-4">
        <span className="eyebrow">Chapter</span>
        <span className="num-outline text-[4.5rem] min-[768px]:text-[6rem]">{String(Number(no)).padStart(2, "0")}</span>
      </span>
      <span className="serif mt-8 block text-[1.5rem] leading-[1.6] min-[768px]:text-[2rem]">{children}</span>
    </h2>
  );
}

export function Q({ children }: { children: ReactNode }) {
  return (
    <h3 className="!mt-12 clear-both flex gap-3 text-[1.0625rem] leading-[1.7] min-[768px]:text-[1.1875rem]">
      <span aria-hidden="true" className="shrink-0 font-num text-[1.375rem] leading-[1.35] font-light text-brass">
        Q.
      </span>
      <span>{children}</span>
    </h3>
  );
}

export function Quote({ children }: { children: ReactNode }) {
  return (
    <blockquote className="serif relative !my-16 clear-both border-y border-brass/60 py-10 text-center text-[1.375rem] leading-[1.8] min-[768px]:text-[1.75rem]">
      {children}
    </blockquote>
  );
}

export function Photo({ src, alt, caption, align = "center" }: { src: string; alt: string; caption?: string; align?: "center" | "left" }) {
  return (
    <figure className={align === "left" ? "!mt-6 min-[768px]:float-left min-[768px]:mr-8 min-[768px]:mb-3 min-[768px]:w-[44%]" : "!my-8 clear-both mx-auto min-[768px]:w-[82%]"}>
      <div className="relative aspect-[3/2] overflow-hidden bg-chalk">
        <Image src={src} alt={alt} fill sizes={align === "left" ? "(min-width: 768px) 360px, 100vw" : "(min-width: 768px) 680px, 100vw"} className="object-cover" />
      </div>
      {caption && <figcaption className="mt-2 text-xs leading-relaxed text-sub">{caption}</figcaption>}
    </figure>
  );
}

export const mdxComponents = { ChapterTitle, Q, Quote, Photo };
