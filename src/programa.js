import "./styles.css";
import { cast, creativeTeam, director } from "./data.js";

const directorProfile = document.querySelector("#director-profile");
directorProfile.innerHTML = `
  <div class="director-portrait">
    <img src="/assets/cast/${director.image}" alt="${director.name}" decoding="async" width="900" height="980" style="object-position:${director.position}">
  </div>
  <figcaption>${director.name}</figcaption>
`;

const creativeGrid = document.querySelector("#creative-grid");

creativeTeam.forEach(({ role, name, image, position }) => {
  const figure = document.createElement("figure");
  figure.className = "creative-card";
  figure.innerHTML = `
    <div class="portrait-wrap">
      <img src="/assets/cast/${image}" alt="${name}" loading="lazy" decoding="async" width="720" height="900" style="object-position:${position}">
    </div>
    <figcaption>
      <span>${role}</span>
      <strong>${name}</strong>
    </figcaption>
  `;
  creativeGrid.append(figure);
});

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
