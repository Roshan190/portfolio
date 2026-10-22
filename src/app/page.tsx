import type { Metadata } from "next";
import { EntryGate } from "@/components/entry-gate";
import { site } from "@/content/site";

export const metadata: Metadata = {
  description: site.description,
  alternates: { canonical: "/" },
};

export default function Home() {
  return <EntryGate />;
}
