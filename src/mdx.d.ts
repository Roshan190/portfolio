declare module "*.mdx" {
  import type { ComponentType } from "react";

  export const meta: {
    title: string;
    description: string;
    date: string;
    draft: boolean;
  };

  const MDXComponent: ComponentType;
  export default MDXComponent;
}
