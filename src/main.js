import "./styles.css";
import "./meta-pixel.js";
import { links } from "./data.js";
import gallery from "./gallery.json";

const icons = {
  ticket: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 5h18v5a2 2 0 0 0 0 4v5H3v-5a2 2 0 0 0 0-4V5Zm2 2v1.5a4 4 0 0 1 0 7V17h14v-1.5a4 4 0 0 1 0-7V7H5Zm9 1h2v3h-2V8Zm0 5h2v3h-2v-3Z"/></svg>',
  program: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 3h11a3 3 0 0 1 3 3v15H7a2 2 0 0 1-2-2V3Zm2 2v12.2c.3-.1.7-.2 1-.2h9V6a1 1 0 0 0-1-1H7Zm1 14h9v-1H8a1 1 0 1 0 0 2Z"/></svg>',
  whatsapp: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a9.8 9.8 0 0 0-8.5 14.7L2 22l5.5-1.4A10 10 0 1 0 12 2Zm0 2a8 8 0 0 1 0 16 7.9 7.9 0 0 1-4.1-1.1l-.4-.2-2.6.7.7-2.5-.3-.4A8 8 0 0 1 12 4Zm-3 3.5c-.2 0-.5.1-.7.4-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.1 5 4.2.7.3 1.2.5 1.7.6.7.2 1.3.2 1.8.1.6-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.2-.3-.3-.7-.5l-2-.9c-.3-.1-.6-.2-.8.2l-.8 1c-.2.3-.4.3-.7.1a6.5 6.5 0 0 1-2.4-1.5 9 9 0 0 1-1.7-2.1c-.2-.3 0-.5.1-.7l.5-.6.3-.6c.1-.2 0-.4 0-.6l-.9-2.1c-.2-.5-.5-.5-.8-.5H9Z"/></svg>',
  facebook: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.5 22v-9h3l.5-3.5h-3.5V7.3c0-1 .3-1.8 1.8-1.8h1.9V2.4c-.3 0-1.5-.1-2.8-.1-2.8 0-4.7 1.7-4.7 4.8v2.4H6.5V13h3.2v9h3.8Z"/></svg>',
  instagram: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm10.5 1.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"/></svg>',
};

const list = document.querySelector("#main-links");

links.filter(({ url }) => Boolean(url)).forEach(({ label, detail, url, icon, external }) => {
  const anchor = document.createElement("a");
  anchor.className = "link-button";
  if (icon === "ticket") anchor.classList.add("ticket-link");
  anchor.href = url;
  if (external) {
    anchor.target = "_blank";
    anchor.rel = "noopener noreferrer";
  }
  const arrowPath = external ? "M6 18 18 6M6 6h12v12" : "M4 12h16m-6-6 6 6-6 6";
  anchor.innerHTML = `<span class="link-icon">${icons[icon]}</span><span>${label}${detail ? `<span class="link-detail">${detail}</span>` : ""}</span><span class="link-arrow" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="${arrowPath}" /></svg></span>`;
  list.append(anchor);
});

const track = document.querySelector("#gallery-track");
const viewport = document.querySelector(".gallery-window");
const group = document.createElement("div");
group.className = "gallery-group";
gallery.forEach(({ src, width, height, alt }, index) => {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "gallery-photo";
  button.dataset.index = index;
  button.setAttribute("aria-label", `Ampliar: ${alt}`);
  const image = new Image(width, height);
  image.dataset.src = src;
  image.alt = "";
  image.loading = "lazy";
  image.fetchPriority = "low";
  image.decoding = "async";
  button.append(image);
  group.append(button);
});
track.append(group);
const duplicate = group.cloneNode(true);
duplicate.setAttribute("aria-hidden", "true");
duplicate.querySelectorAll("button").forEach(button => { button.tabIndex = -1; });
track.prepend(duplicate);
track.append(duplicate.cloneNode(true));

// Load only images approaching the visible strip, including during animation.
const observer = new IntersectionObserver(entries => {
  entries.forEach(({ target, isIntersecting }) => {
    if (!isIntersecting) return;
    target.src = target.dataset.src;
    observer.unobserve(target);
  });
}, { root: viewport, rootMargin: "0px 240px" });
track.querySelectorAll("img").forEach(image => observer.observe(image));

const dialog = document.querySelector(".photo-dialog");
const fullImage = document.querySelector(".photo-full");
const status = document.querySelector(".photo-status");
const motionPreference = matchMedia("(prefers-reduced-motion: reduce)");
let groupWidth = 0;
let pointerDown = false;
let dragStart = 0;
let dragScroll = 0;
let dragged = false;
let resumeAt = 0;
let lastFrame = 0;
let remainder = 0;
let currentPhoto = 0;
new ResizeObserver(() => {
  const newWidth = group.getBoundingClientRect().width;
  const progress = groupWidth ? (viewport.scrollLeft % groupWidth) / groupWidth : 0;
  groupWidth = newWidth;
  viewport.scrollLeft = groupWidth * (1 + progress);
}).observe(group);

// Native scrolling supports touch momentum; no sticky hover/focus animation state.
function animate(time) {
  const elapsed = lastFrame ? Math.min(time - lastFrame, 50) : 0;
  lastFrame = time;
  const keyboardFocus = viewport.querySelector(":focus-visible");
  if (!document.hidden && !dialog.open && !pointerDown && groupWidth) {
    if (viewport.scrollLeft < groupWidth / 2) viewport.scrollLeft += groupWidth;
    else if (viewport.scrollLeft > groupWidth * 1.5) viewport.scrollLeft -= groupWidth;
    if (!motionPreference.matches && !keyboardFocus && time >= resumeAt) {
      remainder += elapsed * 0.025;
      const pixels = Math.floor(remainder);
      if (pixels) { viewport.scrollLeft += pixels; remainder -= pixels; }
    }
  }
  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);
viewport.addEventListener("pointerdown", event => {
  pointerDown = true;
  dragged = false;
  dragStart = event.clientX;
  dragScroll = viewport.scrollLeft;
}, { passive: true });
viewport.addEventListener("pointermove", event => {
  if (pointerDown && Math.abs(event.clientX - dragStart) > 8) dragged = true;
}, { passive: true });
function finishGesture() {
  if (!pointerDown) return;
  dragged ||= Math.abs(viewport.scrollLeft - dragScroll) > 8;
  pointerDown = false;
  resumeAt = performance.now() + 2200;
}
window.addEventListener("pointerup", finishGesture, { passive: true });
window.addEventListener("pointercancel", finishGesture, { passive: true });
viewport.addEventListener("wheel", () => { resumeAt = performance.now() + 2200; }, { passive: true });
viewport.addEventListener("scroll", () => {
  if (performance.now() < resumeAt) resumeAt = performance.now() + 2200;
}, { passive: true });

function showPhoto(index) {
  currentPhoto = (index + gallery.length) % gallery.length;
  const photo = gallery[currentPhoto];
  status.hidden = false;
  status.textContent = "Cargando fotografía…";
  fullImage.hidden = true;
  fullImage.alt = photo.alt;
  fullImage.src = photo.full;
  document.querySelector(".photo-counter").textContent = `${currentPhoto + 1} / ${gallery.length}`;
}
track.addEventListener("click", event => {
  const button = event.target.closest(".gallery-photo");
  if (!button) return;
  if (dragged && event.detail !== 0) { dragged = false; return; }
  showPhoto(Number(button.dataset.index));
  dialog.showModal();
});
fullImage.addEventListener("load", () => {
  status.hidden = true;
  fullImage.hidden = false;
});
fullImage.addEventListener("error", () => {
  status.textContent = "No se pudo cargar la fotografía. Cierra e intenta de nuevo.";
});
document.querySelector(".photo-close").addEventListener("click", () => dialog.close());
document.querySelector(".photo-previous").addEventListener("click", () => showPhoto(currentPhoto - 1));
document.querySelector(".photo-next").addEventListener("click", () => showPhoto(currentPhoto + 1));
dialog.addEventListener("keydown", event => {
  if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
    event.preventDefault();
    showPhoto(currentPhoto + (event.key === "ArrowRight" ? 1 : -1));
  }
});
let photoTouchX = null;
fullImage.addEventListener("touchstart", event => { photoTouchX = event.touches.length === 1 ? event.touches[0].clientX : null; }, { passive: true });
fullImage.addEventListener("touchend", event => {
  if (photoTouchX !== null) {
    const distance = event.changedTouches[0].clientX - photoTouchX;
    if (Math.abs(distance) > 50) showPhoto(currentPhoto + (distance < 0 ? 1 : -1));
  }
  photoTouchX = null;
}, { passive: true });
dialog.addEventListener("click", event => { if (event.target === dialog) dialog.close(); });
dialog.addEventListener("close", () => {
  fullImage.removeAttribute("src");
  resumeAt = performance.now() + 600;
});
