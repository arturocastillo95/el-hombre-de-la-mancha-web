import "./styles.css";
import { cast, credits } from "./data.js";

const castList = document.querySelector("#cast-list");

cast.forEach(({ role, performers }) => {
  const group = document.createElement("section");
  group.className = "role-group";
  group.setAttribute("aria-labelledby", `role-${role.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-")}`);

  const heading = document.createElement("h3");
  heading.id = group.getAttribute("aria-labelledby");
  heading.textContent = role;

  const grid = document.createElement("div");
  grid.className = "cast-grid";

  performers.forEach(({ name, image, position }) => {
    const figure = document.createElement("figure");
    figure.className = "cast-card";
    figure.innerHTML = `
      <div class="portrait-wrap">
        <img src="/assets/cast/${image}" alt="${name}" loading="lazy" decoding="async" width="720" height="900" style="object-position:${position}">
      </div>
      <figcaption>${name}</figcaption>
    `;
    grid.append(figure);
  });

  group.append(heading, grid);
  castList.append(group);
});

const creditsList = document.querySelector("#credits-list");

credits.forEach(({ role, name }) => {
  const credit = document.createElement("div");
  credit.className = "credit-row";
  credit.innerHTML = `<dt>${role}</dt><dd>${name}</dd>`;
  creditsList.append(credit);
});
