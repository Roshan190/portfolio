import type { Metadata } from "next";
import { EntryGate } from "@/components/entry-gate";
import { site } from "@/content/site";
import { getBasePath } from "@/lib/url";

export const metadata: Metadata = {
  description: site.description,
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <link rel="preload" as="image" href={`${getBasePath()}/pier-still.jpg`} />
      <EntryGate />
    </>
  );
}
