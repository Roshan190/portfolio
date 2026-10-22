import { useSyncExternalStore } from "react";

export function prefersPlainView(): boolean {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const narrow = window.matchMedia("(max-width: 860px)").matches;
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  const cores = navigator.hardwareConcurrency ?? 8;
  const memory =
    (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8;
  let webgl = false;
  try {
    const canvas = document.createElement("canvas");
    webgl = Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    webgl = false;
  }
  return reduce || narrow || coarse || cores < 4 || memory < 4 || !webgl;
}

function subscribePlain(onStoreChange: () => void) {
  const queries = ["(prefers-reduced-motion: reduce)", "(max-width: 860px)", "(pointer: coarse)"].map(
    (query) => window.matchMedia(query),
  );
  queries.forEach((query) => query.addEventListener("change", onStoreChange));
  window.addEventListener("resize", onStoreChange);
  return () => {
    queries.forEach((query) => query.removeEventListener("change", onStoreChange));
    window.removeEventListener("resize", onStoreChange);
  };
}

export function usePlainDefault(): boolean {
  return useSyncExternalStore(subscribePlain, prefersPlainView, () => false);
}

export function useReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribePlain,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
}

export function useOpenPier(): boolean {
  return useSyncExternalStore(
    (onStoreChange) => {
      window.addEventListener("hashchange", onStoreChange);
      return () => window.removeEventListener("hashchange", onStoreChange);
    },
    () => window.location.hash === "#pier",
    () => false,
  );
}

export function useDesktopMotion(): boolean {
  return useSyncExternalStore(
    subscribePlain,
    () =>
      window.matchMedia(
        "(min-width: 900px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
      ).matches,
    () => false,
  );
}
