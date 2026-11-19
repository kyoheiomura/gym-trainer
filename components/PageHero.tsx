import type { ReactNode } from "react";
import { PlateFace } from "@/components/Barbell";
import { Breadcrumbs, type Crumb } from "@/components/Breadcrumbs";
import type { PlateColor } from "@/data/vocab";

/**
 * 内側のページの見出し帯。ゴムの床の面に、真鍮色のラベル → 細い大きな欧文（読み上げない）→ 明朝の h1 → 導入文。
 * 目的のページでは、右側にその目的のプレートを大きく半分だけ見せる。
 */
export function PageHero({
  crumbs,
  en,
  label,
  title,
  lead,
  plate,
  children,
}: {
  crumbs: Crumb[];
  en: string;
  label?: string;
  title: ReactNode;
  lead?: ReactNode;
  plate?: { color: PlateColor; en: string; id: string };
  children?: ReactNode;
}) {
  return (
    <section className="rubber relative isolate overflow-hidden text-white">
      {plate && (
        <div aria-hidden="true" className="pointer-events-none absolute top-1/2 -right-40 -z-10 w-[26rem] -translate-y-1/2 opacity-90 min-[768px]:-right-28 min-[768px]:w-[34rem]">
          <PlateFace en={plate.en} color={plate.color} id={`hero-${plate.id}`} spin={false} className="plate-roll block w-full drop-shadow-[0_30px_40px_rgb(0_0_0/0.5)]" />
        </div>
      )}
      <Breadcrumbs items={crumbs} invert />
      <div className="container-page pt-14 pb-16 min-[768px]:pt-20 min-[768px]:pb-24">
        <p aria-hidden="true" className="eyebrow flex items-center gap-4">
          <span>{label ?? "Buddy"}</span>
          <span className="rule-brass w-12" />
        </p>
        <p aria-hidden="true" className="display-en mt-6 max-w-[60rem]">
          {en}
        </p>
        <h1 className="serif mt-6 max-w-[40rem] text-[1.625rem] leading-[1.5] min-[768px]:text-[2.25rem]">{title}</h1>
        {lead && <div className="mt-6 max-w-[38rem] text-[0.9375rem] leading-[2.05] text-white/70">{lead}</div>}
        {children}
      </div>
    </section>
  );
}
