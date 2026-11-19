import type { ReactNode } from "react";
import { type Crumb } from "@/components/Breadcrumbs";
import { PageHero } from "@/components/PageHero";
import { TrainerGrid } from "@/components/TrainerCard";
import type { PlateColor } from "@/data/vocab";
import type { TrainerSummary } from "@/lib/view";

/** 目的別・エリア別・場所別など、条件が決まった静的な一覧ページの共通の形 */
export function ListPage({
  crumbs,
  en,
  label,
  title,
  lead,
  people,
  plate,
  children,
}: {
  crumbs: Crumb[];
  /** 見出し帯の大きな欧文 */
  en: string;
  label?: string;
  title: string;
  lead: ReactNode;
  people: TrainerSummary[];
  /** 目的のページだけ：その目的のプレート */
  plate?: { color: PlateColor; en: string; id: string };
  children?: ReactNode;
}) {
  return (
    <>
      <PageHero crumbs={crumbs} en={en} label={label} title={title} lead={lead} plate={plate} />
      <div className="container-page pt-14 min-[768px]:pt-20">
        {children}
        <div className="mt-10 min-[768px]:mt-14">
          <TrainerGrid people={people} headingLevel="h2" priorityCount={2} />
        </div>
      </div>
    </>
  );
}
