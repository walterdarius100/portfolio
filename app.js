(() => {
  "use strict";
  const content = window.portfolioContent;
  const arrow = () => {
    const node = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    node.setAttribute("viewBox", "0 0 24 24");
    node.setAttribute("class", "arrow-icon");
    node.setAttribute("aria-hidden", "true");
    node.innerHTML = '<path d="M5 19 19 5M5 5h14v14"/>';
    return node;
  };
  document.querySelectorAll("span, .contact-decoration").forEach((node) => {
    if (node.textContent.trim() === "↗") node.replaceChildren(arrow());
  });
  const el = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  };
  const safeUrl = (value, local = false) => {
    if (!value || typeof value !== "string") return null;
    try {
      const url = new URL(value, location.href);
      if (!["http:", "https:"].includes(url.protocol)) return null;
      if (!local && !/^https?:\/\//i.test(value)) return null;
      return url.href;
    } catch {
      return null;
    }
  };
  const externalLink = (label, url) => {
    const node = el("a", "text-link", label + " ");
    node.append(arrow());
    node.href = url;
    node.target = "_blank";
    node.rel = "noopener noreferrer";
    node.setAttribute("aria-label", label + " (nouvel onglet)");
    return node;
  };
  const iconPaths = {
    mobile:
      '<rect x="7" y="2" width="14" height="24" rx="3"/><path d="M12 6h4M13 22h2"/>',
    web: '<rect x="2" y="4" width="24" height="19" rx="2"/><path d="M2 10h24M6 7h1M10 7h1M11 14l-3 3 3 3M17 14l3 3-3 3"/>',
    ai: '<path d="m14 2 3.5 8.5L26 14l-8.5 3.5L14 26l-3.5-8.5L2 14l8.5-3.5zM23 2v6M20 5h6"/>',
    data: '<path d="M3 3v22h22M8 20v-7M14 20V8M20 20V3"/>',
  };
  document.querySelectorAll("[data-content]").forEach((node) => {
    const key = node.dataset.content;
    if (key.endsWith("Count")) {
      const value = content[key];
      node.textContent =
        Number.isInteger(value) && value >= 0 ? String(value) : "—";
    } else if (key.endsWith("CountNote")) {
      const value = content[key.replace("Note", "")];
      node.textContent =
        Number.isInteger(value) && value >= 0
          ? "Chiffre renseigné"
          : "Chiffre à renseigner";
    } else if (typeof content[key] === "string")
      node.textContent = content[key];
  });
  document.title = "Portfolio — " + content.name;
  document.querySelector('meta[name="description"]').content =
    "Portfolio de " +
    content.name +
    " : présentation, projets, technologies, parcours et contact.";
  document.getElementById("year").textContent = new Date().getFullYear();
  const photoUrl = safeUrl(content.photo, true);
  if (photoUrl) {
    const image = el("img");
    image.src = photoUrl;
    image.alt = content.photoAlt || "Portrait de " + content.name;
    image.width = 460;
    image.height = 465;
    image.fetchPriority = "high";
    image.addEventListener("load", () => {
      const portrait = document.getElementById("portrait");
      portrait.replaceChildren(image);
      portrait.classList.add("has-photo");
      document.querySelector(".portrait-caption").textContent = content.name;
    });
  }
  content.services.forEach((service, index) => {
    const card = el("article", "service-card");
    const top = el("div", "service-top");
    const icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    icon.setAttribute("viewBox", "0 0 28 28");
    icon.setAttribute("class", "icon");
    icon.setAttribute("aria-hidden", "true");
    icon.innerHTML = iconPaths[service.icon] || iconPaths.web;
    top.append(icon, el("span", "", "0" + (index + 1)));
    card.append(
      top,
      el("h3", "", service.title),
      el("p", "", service.description),
    );
    if (!service.confirmed)
      card.append(el("span", "tag", "Compétence à confirmer"));
    document.getElementById("service-grid").append(card);
  });
  content.projects.forEach((project, index) => {
    const card = el("article", "project-card");
    const art = el("div", "project-art");
    const imageUrl = safeUrl(project.image, true);
    if (imageUrl) {
      const image = el("img");
      image.src = imageUrl;
      image.alt = project.imageAlt || "Aperçu de " + project.name;
      image.loading = "lazy";
      image.width = 600;
      image.height = 320;
      art.append(image);
    } else {
      const frame = el("div", "art-window");
      frame.setAttribute("aria-hidden", "true");
      const dots = el("div", "art-dots");
      dots.append(el("i"), el("i"), el("i"));
      frame.append(dots, el("div", "art-symbol", index % 2 ? "+" : "{ }"));
      art.append(frame, el("span", "project-image-label", "VISUEL À AJOUTER"));
    }
    const header = el("div", "project-header");
    const statuses = ["prototype", "en développement", "publié"];
    header.append(
      el("h3", "", project.name),
      el(
        "span",
        "tag",
        statuses.includes(project.status) ? project.status : "À compléter",
      ),
    );
    const details = el("dl");
    [
      ["Le besoin", project.problem],
      ["Mon rôle", project.role],
      ["La solution", project.solution],
    ].forEach(([label, value]) => {
      const row = el("div");
      row.append(el("dt", "", label), el("dd", "", value || "À renseigner"));
      details.append(row);
    });
    const technologies = el("div", "project-technologies");
    if (project.technologies.length)
      project.technologies.forEach((name) =>
        technologies.append(el("span", "tag", name)),
      );
    else technologies.append(el("span", "tag", "Technologies à renseigner"));
    const links = el("div", "project-links");
    const demo = safeUrl(project.demoUrl);
    const source = safeUrl(project.sourceUrl);
    if (demo) links.append(externalLink("Démonstration", demo));
    if (source) links.append(externalLink("Code source", source));
    card.append(art, header, details, technologies);
    if (links.childElementCount) card.append(links);
    document.getElementById("project-grid").append(card);
  });
  const techIcons = { php: "php", html: "</>", css: "{ }" };
  content.technologies.forEach((tech) => {
    const card = el("article", "technology-card");
    const text = el("div");
    text.append(
      el("h3", "", tech.name),
      el(
        "small",
        "",
        tech.confirmed ? "Utilisation confirmée" : "Utilisation à confirmer",
      ),
    );
    const icon = el("span", "technology-icon", techIcons[tech.icon] || "<>");
    icon.setAttribute("aria-hidden", "true");
    card.append(icon, text);
    document.getElementById("technology-grid").append(card);
  });
  content.experiences.forEach((experience) => {
    const item = el("li");
    item.append(
      el("p", "period", experience.period),
      el("h3", "", experience.role),
      el("p", "organization", experience.organization),
    );
    const missions = el("ul");
    experience.missions.forEach((mission) =>
      missions.append(el("li", "", mission)),
    );
    item.append(missions);
    if (experience.achievements.length) {
      item.append(el("p", "organization", "Réalisations"));
      const achievements = el("ul");
      experience.achievements.forEach((achievement) =>
        achievements.append(el("li", "", achievement)),
      );
      item.append(achievements);
    }
    document.getElementById("timeline").append(item);
  });
  const contactDetails = document.getElementById("contact-details");
  if (content.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(content.email)) {
    contactDetails.replaceChildren();
    const email = el("a", "text-link", content.email + " ");
    email.append(arrow());
    email.href = "mailto:" + content.email;
    contactDetails.append(email);
  }
  content.professionalLinks.forEach((link) => {
    const url = safeUrl(link.url);
    if (url) contactDetails.append(externalLink(link.label, url));
  });
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.getElementById("navigation");
  const closeMenu = () => {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  };
  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") !== "true";
    toggle.setAttribute("aria-expanded", String(open));
    nav.classList.toggle("is-open", open);
  });
  nav.querySelectorAll("a").forEach((link) =>
    link.addEventListener("click", () => {
      closeMenu();
      if (matchMedia("(max-width: 900px)").matches) {
        const target = document.querySelector(link.getAttribute("href"));
        target.tabIndex = -1;
        target.focus({ preventScroll: true });
      }
    }),
  );
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && nav.classList.contains("is-open")) {
      closeMenu();
      toggle.focus();
    }
  });
  document.addEventListener("click", (event) => {
    if (!event.target.closest(".site-header")) closeMenu();
  });
  matchMedia("(max-width: 900px)").addEventListener("change", closeMenu);
  const sections = [...document.querySelectorAll("main > section[id]")];
  let scheduled = false;
  const updateActive = () => {
    const offset = document.querySelector(".site-header").offsetHeight + 100;
    let active = sections[0].id;
    sections.forEach((section) => {
      if (section.getBoundingClientRect().top <= offset) active = section.id;
    });
    if (
      Math.ceil(window.scrollY + window.innerHeight) >=
      document.documentElement.scrollHeight - 4
    )
      active = "contact";
    nav.querySelectorAll("a").forEach((link) => {
      if (link.hash === "#" + active)
        link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
    scheduled = false;
  };
  window.addEventListener(
    "scroll",
    () => {
      if (!scheduled) {
        scheduled = true;
        requestAnimationFrame(updateActive);
      }
    },
    { passive: true },
  );
  window.addEventListener("resize", updateActive);
  updateActive();
  const form = document.getElementById("contact-form");
  const fields = [...form.querySelectorAll("input, textarea")];
  const messages = {
    name: "Indiquez votre nom.",
    email: "Indiquez une adresse e-mail valide.",
    subject: "Indiquez l’objet de votre message.",
    message: "Écrivez un message d’au moins 10 caractères.",
  };
  const validate = (field) => {
    const valid =
      field.checkValidity() &&
      field.value.trim().length >= (field.name === "message" ? 10 : 1);
    field.setAttribute("aria-invalid", String(!valid));
    document.getElementById(field.id + "-error").textContent = valid
      ? ""
      : messages[field.name];
    return valid;
  };
  fields.forEach((field) =>
    field.addEventListener("input", () => {
      if (field.hasAttribute("aria-invalid")) validate(field);
      document.getElementById("form-status").textContent = "";
    }),
  );
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    let firstInvalid;
    fields.forEach((field) => {
      if (!validate(field) && !firstInvalid) firstInvalid = field;
    });
    const status = document.getElementById("form-status");
    if (firstInvalid) {
      status.textContent = "Vérifiez les champs indiqués avant de continuer.";
      firstInvalid.focus();
      return;
    }
    status.textContent =
      "Message non envoyé : configurez un service d’envoi pour activer ce formulaire. Votre saisie reste disponible dans les champs.";
  });
  form.querySelector('button[type="submit"]').disabled = false;
})();
