"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * スクロールの演出のきっかけ。対象が画面の下から約2割の線を越えたら .is-in を付ける（一度付けたら外さない）。
 * 動き自体は globals.css の「出てくる演出」が決まった時間で最後まで再生する。
 * 横に並んだもの（カードなど）は、画面の左からの位置に応じて少しずつ遅らせる。
 * 「もっと見る」で後から増えたカードにも効くよう、DOM の追加も見張る。
 */
const TARGETS = ".rise, .reveal, .reveal-fade, .draw-top, .wipe, .slide-in, .pop-num";

export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    if (!document.documentElement.hasAttribute("data-motion")) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const el = e.target as HTMLElement;
          const passed = e.boundingClientRect.top < (e.rootBounds?.top ?? 0);
          if (!e.isIntersecting && !passed) continue;
          const x = Math.max(0, e.boundingClientRect.left) / window.innerWidth;
          el.style.setProperty("--stagger", `${Math.round(x * 420)}ms`);
          el.classList.add("is-in");
          io.unobserve(el);
        }
      },
      { rootMargin: "0px 0px -20% 0px" },
    );

    // 見張り済みの印は、この effect の中だけで持つ（開発時に effect が2回走っても取りこぼさない）
    const watched = new WeakSet<Element>();
    const scan = () => {
      document.querySelectorAll<HTMLElement>(TARGETS).forEach((el) => {
        if (watched.has(el) || el.classList.contains("is-in")) return;
        watched.add(el);
        io.observe(el);
      });
    };
    scan();

    let raf = 0;
    const mo = new MutationObserver(() => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(scan);
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [pathname]);

  return null;
}
