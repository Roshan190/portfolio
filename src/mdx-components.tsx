import type { MDXComponents } from "mdx/types";
import type { ComponentProps } from "react";

function Anchor(props: ComponentProps<"a">) {
  const external = props.href?.startsWith("http");
  return (
    <a
      {...props}
      rel={external ? "noopener noreferrer" : props.rel}
      target={external ? "_blank" : props.target}
    />
  );
}

export function useMDXComponents(components: MDXComponents = {}): MDXComponents {
  return {
    a: Anchor,
    ...components,
  };
}
