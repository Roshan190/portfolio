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

gsap.utils.toArray(".reveal").forEach((el) => {
  gsap.from(el, {
    y: 22,
    autoAlpha: 0,
    duration: 0.75,
    ease: "power3.out",
    scrollTrigger: { trigger: el, start: "top 88%" },
  });
});

const lenis = new Lenis({ lerp: 0.1, anchors: true });
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

document.querySelectorAll("[data-magnetic]").forEach((el) => {
  el.addEventListener("mousemove", (event) => {
    const rect = el.getBoundingClientRect();
    const x = event.clientX - (rect.left + rect.width / 2);
    const y = event.clientY - (rect.top + rect.height / 2);
    el.style.transform = `translate(${x * 0.22}px, ${y * 0.28}px)`;
  });
  el.addEventListener("mouseleave", () => {
    el.style.transform = "";
  });
});

document.querySelectorAll("[data-tilt]").forEach((el) => {
  el.addEventListener("mousemove", (event) => {
    const rect = el.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(900px) rotateX(${(-py * 4).toFixed(2)}deg) rotateY(${(px * 5).toFixed(2)}deg)`;
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
gsap.ticker.add(() => {
  cx += (x - cx) * 0.18;
  cy += (y - cy) * 0.18;
  dot.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
});
