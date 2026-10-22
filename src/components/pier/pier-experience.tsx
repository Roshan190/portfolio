"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Canvas } from "@react-three/fiber";
import { useProgress } from "@react-three/drei";
import { SiteLink } from "@/components/site-link";
import { PierScene } from "@/components/pier/pier-scene";
import { sceneProjects, type ViewpointId } from "@/lib/projects";
import { sound } from "@/components/pier/sound";

type PierExperienceProps = {
  soundOn: boolean;
  reduced: boolean;
};

export function PierExperience({ soundOn, reduced }: PierExperienceProps) {
  const router = useRouter();
  const shellRef = useRef<HTMLDivElement>(null);
  const pending = useRef(false);
  const [view, setView] = useState<ViewpointId>("overview");
  const [hovered, setHovered] = useState<string | null>(null);
  const [loop, setLoop] = useState<"always" | "never">("always");
  const [audioOn, setAudioOn] = useState(soundOn);

  useEffect(() => {
    if (soundOn) sound.enable();
    else sound.disable();
  }, [soundOn]);

  useEffect(() => {
    const shell = shellRef.current;
    if (!shell) return;
    const update = () => {
      const hidden = document.hidden;
      const rect = shell.getBoundingClientRect();
      const visible = rect.bottom > 0 && rect.top < window.innerHeight;
      setLoop(!hidden && visible ? "always" : "never");
    };
    update();
    document.addEventListener("visibilitychange", update);
    const observer = new IntersectionObserver(update, { threshold: 0.05 });
    observer.observe(shell);
    return () => {
      document.removeEventListener("visibilitychange", update);
      observer.disconnect();
      document.documentElement.removeAttribute("data-cursor-hot");
    };
  }, []);

  useEffect(() => {
    const order = sceneProjects.map((item) => item.viewpoint);
    const unique = [...new Set(order)];
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;
      event.preventDefault();
      const current = unique.indexOf(view);
      const next =
        event.key === "ArrowRight"
          ? unique[(current + 1) % unique.length]
          : unique[(current - 1 + unique.length) % unique.length];
      setView(next);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [view]);

  function hover(slug: string | null) {
    setHovered((current) => {
      if (slug && slug !== current) sound.hover();
      return slug;
    });
    document.documentElement.toggleAttribute("data-cursor-hot", Boolean(slug));
    const match = sceneProjects.find((item) => item.slug === slug);
    if (match) setView(match.viewpoint);
  }

  function select(slug: string) {
    if (pending.current) return;
    pending.current = true;
    const match = sceneProjects.find((item) => item.slug === slug);
    if (match) setView(match.viewpoint);
    sound.click();
    const delay = reduced ? 0 : 880;
    window.setTimeout(() => {
      router.push(`/projects/${slug}/`);
    }, delay);
  }

  return (
    <div className="pier-shell" ref={shellRef}>
      <p className="sr-only">
        A lantern-lit pier at night on still water. HealthShield is the brightest
        lantern house. The other projects are screens, posters, and lanterns.
        Use the project list to move the view and open a page. The picture itself
        is decorative.
      </p>
      <Canvas
        dpr={[1, 1.5]}
        frameloop={loop}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
        camera={{ position: [2.4, 4.4, 11], fov: 40, near: 0.1, far: 48 }}
        onCreated={({ gl }) => {
          gl.domElement.setAttribute("aria-hidden", "true");
          gl.toneMappingExposure = 1.06;
        }}
      >
        <PierScene
          view={view}
          hovered={hovered}
          reduced={reduced}
          onHover={hover}
          onSelect={select}
        />
      </Canvas>
      <LoadMeter />
      <div className="pier-chrome">
        <div className="pier-top">
          <p className="pier-brand">
            <span>Roshan Shikhare</span>
            <span className="pier-brand-role">Senior Fullstack Engineer</span>
          </p>
          <div className="pier-tools">
            <SiteLink className="projects-link" href="/work">
              Projects
            </SiteLink>
            <button
              type="button"
              className="sound-toggle"
              aria-pressed={audioOn}
              onClick={() => setAudioOn(sound.toggle())}
            >
              {audioOn ? "Sound on" : "Sound off"}
            </button>
          </div>
        </div>
        <p id="pier-help" className="pier-hint">
          Arrows move between views. Choose a project to fly in and open its page.
        </p>
        <ul className="pier-dock" aria-label="Projects on the pier" aria-describedby="pier-help">
          {sceneProjects.map((item) => (
            <li key={item.slug}>
              <button
                type="button"
                className={hovered === item.slug || view === item.viewpoint ? "is-active" : ""}
                onMouseEnter={() => hover(item.slug)}
                onMouseLeave={() => hover(null)}
                onFocus={() => hover(item.slug)}
                onBlur={() => hover(null)}
                onClick={() => select(item.slug)}
              >
                <span className="dock-kicker">{item.project.featured ? "Featured" : item.project.context}</span>
                {item.project.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function LoadMeter() {
  const { progress, active } = useProgress();
  if (!active && progress >= 100) return null;
  return (
    <p className="load-meter" role="status">
      {Math.round(progress)}%
    </p>
  );
}
