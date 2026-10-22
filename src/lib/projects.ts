import { site, type Project } from "@/content/site";

export type ViewpointId =
  | "overview"
  | "healthshield"
  | "form-ninja"
  | "clients"
  | "palfinger"
  | "mumbaifilter";

export type MarkerKind = "house" | "screen" | "poster" | "lantern";

export type SceneProject = {
  slug: string;
  project: Project;
  viewpoint: ViewpointId;
  position: [number, number, number];
  kind: MarkerKind;
};

export function projectSlug(name: string): string {
  return name
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .toLowerCase()
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-");
}

const sceneMeta: Record<
  string,
  { viewpoint: ViewpointId; position: [number, number, number]; kind: MarkerKind }
> = {
  HealthShield: {
    viewpoint: "healthshield",
    position: [0, 0.28, -0.25],
    kind: "house",
  },
  "Form Ninja": {
    viewpoint: "form-ninja",
    position: [-1.38, 0.28, 0.42],
    kind: "screen",
  },
  "IFB — E-Commerce & Spice Secret": {
    viewpoint: "clients",
    position: [1.22, 0.28, 0.48],
    kind: "poster",
  },
  "India First Life": {
    viewpoint: "clients",
    position: [1.9, 0.28, -0.45],
    kind: "lantern",
  },
  Palfinger: {
    viewpoint: "palfinger",
    position: [0.95, 0.28, -1.65],
    kind: "lantern",
  },
  MumbaiFilter: {
    viewpoint: "mumbaifilter",
    position: [-1.22, 0.28, -1.5],
    kind: "poster",
  },
};

export const sceneProjects: SceneProject[] = site.projects.map((project) => {
  const meta = sceneMeta[project.name];
  if (!meta) {
    throw new Error(`Missing pier placement for ${project.name}`);
  }
  return {
    slug: projectSlug(project.name),
    project,
    ...meta,
  };
});

export function getSceneProject(slug: string): SceneProject | undefined {
  return sceneProjects.find((item) => item.slug === slug);
}

export const cameraViews: Record<
  ViewpointId | "arrive",
  { position: [number, number, number]; lookAt: [number, number, number] }
> = {
  arrive: { position: [2.4, 4.4, 11], lookAt: [0, 1.05, -0.4] },
  overview: { position: [0.55, 2.55, 6.6], lookAt: [0, 0.85, -0.25] },
  healthshield: { position: [0.05, 1.2, 1.7], lookAt: [0, 1.05, -0.2] },
  "form-ninja": { position: [-2.35, 1.35, 1.9], lookAt: [-1.38, 1.05, 0.42] },
  clients: { position: [2.65, 1.48, 2.05], lookAt: [1.55, 0.9, 0.0] },
  palfinger: { position: [1.7, 1.5, 0.15], lookAt: [0.95, 0.9, -1.65] },
  mumbaifilter: { position: [-2.2, 1.4, 0.05], lookAt: [-1.22, 0.9, -1.5] },
};
