import type { ReactNode } from "react";
import { type Crumb } from "@/components/Breadcrumbs";
import { PageHero } from "@/components/PageHero";

/** 読み物ページ（about・ポリシーなど）の共通の形 */
export function TextPage({
  crumbs,
  en = "About",
  title,
  lead,
  aside,
  children,
}: {
  crumbs: Crumb[];
  /** 見出し帯の大きな欧文 */
  en?: string;
  title: string;
  lead?: ReactNode;
  aside?: ReactNode;
  children: ReactNode;
}) {
  return (
    <>
      <PageHero crumbs={crumbs} en={en} title={title} lead={lead}>
        {aside && <div className="mt-8">{aside}</div>}
      </PageHero>
      <div className="container-page pt-6 min-[768px]:pt-10">
        <div className="container-text mt-14 space-y-16 [&_h2]:text-xl min-[768px]:[&_h2]:text-2xl [&_p]:mt-4 [&_ul]:mt-4">
          {children}
        </div>
      </div>
    </>
  );
}
