import type { Metadata } from "next";
import { WorkView } from "@/components/work-view";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Projects",
  description: site.description,
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return <WorkView />;
}
