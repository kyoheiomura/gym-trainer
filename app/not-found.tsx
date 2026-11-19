import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: { absolute: `ページが見つかりません${SITE.titleSuffix}` },
  robots: { index: false },
};

export default function NotFound() {
  return (
    <div className="container-page py-24 min-[768px]:py-32">
      <p aria-hidden="true" className="display-en">404</p>
      <h1 className="serif mt-6 text-[1.75rem] min-[768px]:text-[2.25rem]">ページが見つかりません</h1>
      <p className="mt-6 text-sub">移動したか、削除された可能性があります。</p>
      <Link href="/trainer/" className="btn-primary mt-10">
        トレーナーをさがす
      </Link>
    </div>
  );
}
