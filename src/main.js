import "./styles.css";
import { links } from "./data.js";
import gallery from "./gallery.json";

const icons = {
  program: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 3h11a3 3 0 0 1 3 3v15H7a2 2 0 0 1-2-2V3Zm2 2v12.2c.3-.1.7-.2 1-.2h9V6a1 1 0 0 0-1-1H7Zm1 14h9v-1H8a1 1 0 1 0 0 2Z"/></svg>',
  whatsapp: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a9.8 9.8 0 0 0-8.5 14.7L2 22l5.5-1.4A10 10 0 1 0 12 2Zm0 2a8 8 0 0 1 0 16 7.9 7.9 0 0 1-4.1-1.1l-.4-.2-2.6.7.7-2.5-.3-.4A8 8 0 0 1 12 4Zm-3 3.5c-.2 0-.5.1-.7.4-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.1 5 4.2.7.3 1.2.5 1.7.6.7.2 1.3.2 1.8.1.6-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.2-.3-.3-.7-.5l-2-.9c-.3-.1-.6-.2-.8.2l-.8 1c-.2.3-.4.3-.7.1a6.5 6.5 0 0 1-2.4-1.5 9 9 0 0 1-1.7-2.1c-.2-.3 0-.5.1-.7l.5-.6.3-.6c.1-.2 0-.4 0-.6l-.9-2.1c-.2-.5-.5-.5-.8-.5H9Z"/></svg>',
  facebook: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.5 22v-9h3l.5-3.5h-3.5V7.3c0-1 .3-1.8 1.8-1.8h1.9V2.4c-.3 0-1.5-.1-2.8-.1-2.8 0-4.7 1.7-4.7 4.8v2.4H6.5V13h3.2v9h3.8Z"/></svg>',
  instagram: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm10.5 1.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"/></svg>',
};

const list = document.querySelector("#main-links");

links.filter(({ url }) => Boolean(url)).forEach(({ label, url, icon, external }) => {
  const anchor = document.createElement("a");
  anchor.className = "link-button";
  anchor.href = url;
  if (external) {
    anchor.target = "_blank";
    anchor.rel = "noopener noreferrer";
  }
  anchor.innerHTML = `<span class="link-icon">${icons[icon]}</span><span>${label}</span><span class="link-arrow" aria-hidden="true">↗</span>`;
  if (!external) anchor.querySelector(".link-arrow").textContent = "→";
  list.append(anchor);
});

const track = document.querySelector("#gallery-track");
const group = document.createElement("div");
group.className = "gallery-group";
gallery.forEach(({ src, width, height, alt }) => {
  const image = new Image(width, height);
  image.src = src;
  image.alt = alt;
  image.decoding = "async";
  group.append(image);
});
track.append(group);
const duplicate = group.cloneNode(true);
duplicate.setAttribute("aria-hidden", "true");
duplicate.querySelectorAll("img").forEach(image => { image.alt = ""; });
track.append(duplicate);

const toggle = document.querySelector(".gallery-toggle");
const motionPreference = matchMedia("(prefers-reduced-motion: reduce)");
function setPaused(paused) {
  track.classList.toggle("is-paused", paused);
  toggle.setAttribute("aria-pressed", String(paused));
  toggle.textContent = paused ? "Reanudar galería" : "Pausar galería";
}
setPaused(motionPreference.matches);
motionPreference.addEventListener("change", event => setPaused(event.matches));
toggle.addEventListener("click", () => setPaused(!track.classList.contains("is-paused")));
