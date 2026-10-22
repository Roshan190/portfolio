"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { SiteLink } from "@/components/site-link";
import { site } from "@/content/site";
import { useOpenPier, usePlainDefault, useReducedMotion } from "@/lib/device";
import { sound } from "@/components/pier/sound";

const PierExperience = dynamic(
  () => import("@/components/pier/pier-experience").then((mod) => mod.PierExperience),
  {
    ssr: false,
    loading: () => (
      <p className="load-meter" role="status">
        Loading the pier
      </p>
    ),
  },
);

type Mode = "entry" | "pier";

export function EntryGate() {
  const [mode, setMode] = useState<Mode>("entry");
  const [soundOn, setSoundOn] = useState(false);
  const plainDefault = usePlainDefault();
  const reduced = useReducedMotion();
  const openPier = useOpenPier();

  function enter(withSound: boolean) {
    if (withSound) sound.enable();
    else sound.disable();
    setSoundOn(withSound);
    setMode("pier");
  }

  if (mode === "pier" || (openPier && !plainDefault)) {
    return <PierExperience soundOn={soundOn} reduced={reduced} />;
  }

  return (
    <section className={`entry${plainDefault ? " is-plain" : ""}`}>
      <Image
        className="entry-still"
        src="/pier-still.jpg"
        alt="Lantern-lit pier at night on still water, the explorable view of the projects"
        fill
        priority
        sizes="100vw"
      />
      <div className="entry-scrim" aria-hidden="true" />
      <header className="entry-bar">
        <p className="brand-lockup">
          <span className="brand-mark" aria-hidden="true">
            RS
          </span>
          <span className="sr-only">{site.name}</span>
        </p>
        <SiteLink className="projects-link" href="/work">
          Projects
        </SiteLink>
      </header>
      <div className="entry-copy">
        <p className="kicker">{site.location}</p>
        <h1>{site.name}</h1>
        <p className="entry-role">{site.role}</p>
        <p className="entry-headline">{site.headline}</p>
        <p className="entry-availability">{site.availability}</p>
        {plainDefault ? (
          <p className="entry-note">
            This device gets the still image. 3D loads only if you ask for it.
          </p>
        ) : (
          <p className="entry-note">A lantern pier at night. Sound stays off until you enter with it.</p>
        )}
        <div className="entry-actions">
          <button type="button" className={plainDefault ? "btn btn-ghost" : "btn btn-amber"} onClick={() => enter(true)}>
            {plainDefault ? "Load 3D" : "Enter"}
          </button>
          <button type="button" className="btn btn-ghost" onClick={() => enter(false)}>
            {plainDefault ? "Load 3D without sound" : "Enter without sound"}
          </button>
          <SiteLink className={plainDefault ? "btn btn-amber" : "btn btn-line"} href="/work">
            Just show me the work
          </SiteLink>
        </div>
      </div>
    </section>
  );
}
