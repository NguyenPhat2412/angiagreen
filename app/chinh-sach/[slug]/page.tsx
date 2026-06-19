"use client";

import { useParams } from "next/navigation";
import { PolicyPage } from "@/components/pages/chinh-sach/PolicyPage/PolicyPage";

export default function DynamicPolicyPage() {
  const params = useParams();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;

  return <PolicyPage slug={slug ?? ""} />;
}
