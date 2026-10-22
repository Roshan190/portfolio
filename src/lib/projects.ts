import { site, type Project } from "@/content/site";

export type ProjectPage = {
  slug: string;
  project: Project;
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

export const projectPages: ProjectPage[] = site.projects.map((project) => ({
  slug: projectSlug(project.name),
  project,
}));

export function getProject(slug: string): ProjectPage | undefined {
  return projectPages.find((item) => item.slug === slug);
}
