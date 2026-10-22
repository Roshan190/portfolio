const base = document.documentElement.dataset.base ?? "";

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(src));
    document.body.appendChild(script);
  });
}

await loadScript(`${base}/vendor/gsap.min.js`);
await loadScript(`${base}/vendor/ScrollTrigger.min.js`);
await loadScript(`${base}/vendor/lenis.min.js`);

const { gsap, ScrollTrigger, Lenis } = window;
gsap.registerPlugin(ScrollTrigger);

// Native scrolling stays in charge. Lenis only eases the wheel on this desktop.
document.documentElement.style.scrollBehavior = "auto";

const lenis = new Lenis({
  lerp: 0.12,
  anchors: true,
  autoRaf: false,
  syncTouch: false,
  smoothWheel: true,
});
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

gsap.utils.toArray(".stagger-line").forEach((line) => {
  gsap.from(line.querySelectorAll(".word"), {
    y: 18,
    autoAlpha: 0,
    duration: 0.7,
    stagger: 0.035,
    ease: "power3.out",
  });
});

ScrollTrigger.batch(".reveal", {
  start: "top 90%",
  once: true,
  onEnter: (batch) => {
    gsap.from(batch, {
      y: 28,
      autoAlpha: 0,
      duration: 0.75,
      stagger: 0.08,
      ease: "power3.out",
      overwrite: "auto",
    });
  },
});

gsap.utils.toArray("[data-parallax]").forEach((el) => {
  gsap.to(el, {
    y: 48,
    ease: "none",
    scrollTrigger: {
      trigger: el,
      start: "top bottom",
      end: "bottom top",
      scrub: 0.4,
    },
  });
});

document.querySelectorAll("[data-magnetic]").forEach((el) => {
  el.addEventListener("mousemove", (event) => {
    const rect = el.getBoundingClientRect();
    const x = event.clientX - (rect.left + rect.width / 2);
    const y = event.clientY - (rect.top + rect.height / 2);
    el.style.transform = `translate(${x * 0.18}px, ${y * 0.22}px)`;
  });
  el.addEventListener("mouseleave", () => {
    el.style.transform = "";
  });
});

document.querySelectorAll(".bento-tile").forEach((el) => {
  el.addEventListener("pointermove", (event) => {
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
    el.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
  });
});

document.querySelectorAll("[data-tilt]").forEach((el) => {
  el.addEventListener("mousemove", (event) => {
    const rect = el.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(900px) rotateX(${(-py * 3.5).toFixed(2)}deg) rotateY(${(px * 4.5).toFixed(2)}deg)`;
  });
  el.addEventListener("mouseleave", () => {
    el.style.transform = "";
  });
});

const dot = document.createElement("div");
dot.className = "cursor-follower is-on";
dot.setAttribute("aria-hidden", "true");
document.body.appendChild(dot);
document.documentElement.classList.add("has-cursor");
let x = window.innerWidth / 2;
let y = window.innerHeight / 2;
let cx = x;
let cy = y;
window.addEventListener("pointermove", (event) => {
  x = event.clientX;
  y = event.clientY;
});
document.querySelectorAll("a, button, summary").forEach((el) => {
  el.addEventListener("pointerenter", () => {
    document.documentElement.dataset.cursorHot = "1";
  });
  el.addEventListener("pointerleave", () => {
    delete document.documentElement.dataset.cursorHot;
  });
});
gsap.ticker.add(() => {
  cx += (x - cx) * 0.18;
  cy += (y - cy) * 0.18;
  dot.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
});
