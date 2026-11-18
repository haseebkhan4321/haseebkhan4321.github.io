(() => {
  "use strict";
  const D = window.PORTFOLIO;
  const page = document.body.dataset.page;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fine = window.matchMedia("(pointer: fine)").matches;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const host = (u) => { try { return new URL(u).host.replace(/^www\./, ""); } catch { return u; } };

  /* ---------------- Icons (Lucide-style, stroke) ---------------- */
  const P = {
    arrow: '<path d="M7 17 17 7"/><path d="M8 7h9v9"/>',
    right: '<path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>',
    chevron: '<path d="m9 18 6-6-6-6"/>',
    github: '<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/>',
    linkedin: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>',
    mail: '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
    pin: '<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>',
    clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
    briefcase: '<path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/><rect width="20" height="14" x="2" y="6" rx="2"/>',
    search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2m-7.07-14.07 1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>',
    moon: '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
    menu: '<path d="M4 8h16M4 16h16"/>',
    server: '<rect width="20" height="8" x="2" y="2" rx="2"/><rect width="20" height="8" x="2" y="14" rx="2"/><path d="M6 6h.01M6 18h.01"/>',
    database: '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14a9 3 0 0 0 18 0V5"/><path d="M3 12a9 3 0 0 0 18 0"/>',
    layers: '<path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/>',
    layout: '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18M9 21V9"/>',
    cloud: '<path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>',
    spark: '<path d="M9.94 15.5A2 2 0 0 0 8.5 14.06l-6.14-1.58a.5.5 0 0 1 0-.96L8.5 9.94A2 2 0 0 0 9.94 8.5l1.58-6.14a.5.5 0 0 1 .96 0L14.06 8.5A2 2 0 0 0 15.5 9.94l6.14 1.58a.5.5 0 0 1 0 .96L15.5 14.06a2 2 0 0 0-1.44 1.44l-1.58 6.14a.5.5 0 0 1-.96 0z"/>',
    grad: '<path d="M21.42 10.92a1 1 0 0 0-.02-1.84L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.83l8.57 3.91a2 2 0 0 0 1.66 0z"/><path d="M22 10v6M6 12.5V16a6 3 0 0 0 12 0v-3.5"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    circleCheck: '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
    hourglass: '<path d="M5 22h14M5 2h14M17 22v-4.17a2 2 0 0 0-.59-1.42L12 12l-4.41 4.41A2 2 0 0 0 7 17.83V22M7 2v4.17a2 2 0 0 0 .59 1.42L12 12l4.41-4.41A2 2 0 0 0 17 6.17V2"/>',
    info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>',
    copy: '<rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>',
    cart: '<circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>',
    car: '<path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/>',
    box: '<path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5M12 22V12"/>',
    terminal: '<path d="m4 17 6-6-6-6M12 19h8"/>',
    eye: '<path d="M2.06 12.35a1 1 0 0 1 0-.7 10.75 10.75 0 0 1 19.88 0 1 1 0 0 1 0 .7 10.75 10.75 0 0 1-19.88 0"/><circle cx="12" cy="12" r="3"/>',
    school: '<path d="M14 22v-4a2 2 0 1 0-4 0v4"/><path d="m18 10 3.45 1.97A1 1 0 0 1 22 12.84V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-7.16a1 1 0 0 1 .55-.87L6 10"/><path d="M18 5v17M4 6l7.11-3.56a2 2 0 0 1 1.78 0L20 6M6 5v17"/><circle cx="12" cy="9" r="2"/>',
  };
  const icon = (n, cls = "") => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[n] || ""}</svg>`;
  const projectIcon = { "rareos-woocentral": "server", wheelmela: "car", wisewheels: "car", wisemarket: "cart", ims: "box", "uv-schools": "school", "ai-image-analysis": "eye", oelogger: "terminal", buynoh: "cart" };

  /* ---------------- Theme ---------------- */
  const store = { get: (k) => { try { return localStorage.getItem(k); } catch { return null; } }, set: (k, v) => { try { localStorage.setItem(k, v); } catch {} } };
  const setTheme = (t) => { document.documentElement.dataset.theme = t; store.set("theme", t); };
  setTheme(store.get("theme") || (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark"));

  /* ---------------- Shared chrome ---------------- */
  const pr = D.profile;
  const onHome = page === "home";
  const navHref = (id) => (onHome ? `#${id}` : `index.html#${id}`);
  const header = `
    <header class="header" id="header">
      <div class="container">
        <div class="bar">
          <a class="brand" href="index.html" aria-label="${esc(pr.name)}, home">
            <span class="brand-mark">HK</span><span>${esc(pr.name)}</span>
          </a>
          <nav class="nav" id="nav" aria-label="Primary">
            <a href="${page === "projects" || page === "project" ? "projects.html" : navHref("work")}" data-nav="work" class="${page !== "home" ? "active" : ""}">Work</a>
            <a href="${navHref("experience")}" data-nav="experience">Experience</a>
            <a href="${navHref("skills")}" data-nav="skills">Skills</a>
            <a href="${navHref("about")}" data-nav="about">About</a>
            <a href="${navHref("contact")}" data-nav="contact">Contact</a>
          </nav>
          <div class="header-actions">
            <button class="icon-btn theme-toggle" id="themeToggle" aria-label="Toggle color theme">${icon("moon", "moon")}${icon("sun", "sun")}</button>
            <a class="btn btn-primary btn-sm" href="mailto:${esc(pr.email)}">Get in touch</a>
            <button class="icon-btn menu-toggle" id="menuToggle" aria-label="Open menu" aria-expanded="false">${icon("menu")}</button>
          </div>
        </div>
      </div>
    </header>`;
  const footer = `
    <footer class="footer">
      <div class="container">
        <div class="row">
          <span>© ${new Date().getFullYear()} ${esc(pr.name)}. Designed and built by hand.</span>
          <div class="socials">
            ${pr.github ? `<a class="icon-btn" href="${esc(pr.github)}" target="_blank" rel="noopener" aria-label="GitHub">${icon("github")}</a>` : ""}
            ${pr.linkedin ? `<a class="icon-btn" href="${esc(pr.linkedin)}" target="_blank" rel="noopener" aria-label="LinkedIn">${icon("linkedin")}</a>` : ""}
            ${pr.email ? `<a class="icon-btn" href="mailto:${esc(pr.email)}" aria-label="Email">${icon("mail")}</a>` : ""}
          </div>
        </div>
      </div>
    </footer>`;
  document.body.insertAdjacentHTML("afterbegin", `<div class="backdrop" aria-hidden="true"><div class="aurora a1"></div><div class="aurora a2"></div><div class="grid"></div><div class="noise"></div></div>${header}`);
  document.body.insertAdjacentHTML("beforeend", footer);

  /* ---------------- Building blocks ---------------- */
  const projects = [...D.projects].sort((a, b) => a.priority - b.priority);
  const statusClass = (s) => (s === "Live" ? "live" : s === "Case study pending" ? "pending" : "");
  const statusLabel = (s) => (s === "Case study pending" ? "Details coming soon" : s);

  const visual = (p) => `<div class="visual"><div class="mark">${icon(projectIcon[p.id] || "layers")}</div><span class="label">${esc(p.category)}</span></div>`;

  const diagram = () => `
    <svg class="diagram" viewBox="0 0 560 360" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Architecture overview: POS and store channels talk to Flask and FastAPI services, which use PostgreSQL and Redis, with Celery workers over RabbitMQ">
      <path class="wire" d="M120 70 C 200 70, 200 140, 270 140"/>
      <path class="wire" d="M120 210 C 200 210, 200 160, 270 160"/>
      <path class="wire" d="M390 150 C 430 150, 430 70, 460 70"/>
      <path class="wire" d="M390 150 L 460 150"/>
      <path class="wire" d="M390 150 C 430 150, 430 230, 460 230"/>
      <path class="wire" d="M330 180 L 330 270"/>
      <path class="flow" d="M120 70 C 200 70, 200 140, 270 140"/>
      <path class="flow f2" d="M120 210 C 200 210, 200 160, 270 160"/>
      <path class="flow f3" d="M390 150 C 430 150, 430 70, 460 70"/>
      <path class="flow f2" d="M390 150 C 430 150, 430 230, 460 230"/>
      <path class="flow" d="M330 180 L 330 270"/>
      <g class="node"><rect x="20" y="46" width="100" height="48" rx="12"/><text x="36" y="68">POS</text><text class="sub" x="36" y="83">sales, refunds</text></g>
      <g class="node"><rect x="20" y="186" width="100" height="48" rx="12"/><text x="36" y="208">Stores</text><text class="sub" x="36" y="223">channels</text></g>
      <g class="node accent"><rect x="270" y="120" width="120" height="60" rx="14"/><text x="286" y="146">Services</text><text class="sub" x="286" y="163">Flask · FastAPI</text></g>
      <g class="node"><rect x="460" y="46" width="90" height="48" rx="12"/><text x="474" y="68">Postgres</text><text class="sub" x="474" y="83">SQLAlchemy</text></g>
      <g class="node"><rect x="460" y="126" width="90" height="48" rx="12"/><text x="474" y="148">Redis</text><text class="sub" x="474" y="163">Valkey</text></g>
      <g class="node"><rect x="460" y="206" width="90" height="48" rx="12"/><text x="474" y="228">K8s</text><text class="sub" x="474" y="243">Docker</text></g>
      <g class="node"><rect x="262" y="270" width="136" height="60" rx="14"/><text x="278" y="296">Workers</text><text class="sub" x="278" y="313">Celery · RabbitMQ</text></g>
    </svg>`;

  const media = (p) => {
    if (p.flagship) return `<div class="media">${visualBg()}${diagram()}</div>`;
    if (p.image) return `<div class="media"><img src="${esc(p.image)}" alt="${esc(p.name)} screenshot" loading="lazy" decoding="async"></div>`;
    return `<div class="media">${visual(p)}</div>`;
  };
  const visualBg = () => `<div class="visual" style="opacity:.9"></div>`;

  const card = (p, opts = {}) => {
    const stack = (p.stack.length ? p.stack : p.filters).slice(0, opts.wide ? 8 : 5);
    if (p.flagship && opts.wide) {
      return `
      <a class="card glass spot flagship wide reveal" href="project.html?id=${p.id}">
        <div class="body">
          <span class="flag-label">${icon("spark")} Flagship case study</span>
          <div class="title-row"><h3>${esc(p.name)}</h3><span class="go">${icon("arrow")}</span></div>
          <p>${esc(p.summary)}</p>
          <div class="chips">${stack.map((t) => `<span class="chip">${esc(t)}</span>`).join("")}</div>
        </div>
        ${media(p)}
      </a>`;
    }
    return `
      <a class="card glass spot reveal${opts.wide ? " wide" : ""}" href="project.html?id=${p.id}" data-id="${p.id}">
        ${media(p)}
        <div class="body">
          <div class="top"><span class="cat">${esc(p.category)}</span><span class="status ${statusClass(p.status)}">${esc(statusLabel(p.status))}</span></div>
          <div class="title-row"><h3>${esc(p.name)}</h3><span class="go">${icon("arrow")}</span></div>
          <p>${esc(p.tagline)}</p>
          <div class="chips">${stack.map((t) => `<span class="chip">${esc(t)}</span>`).join("")}</div>
        </div>
      </a>`;
  };

  const splitWords = (el) => {
    const walk = (node) => {
      [...node.childNodes].forEach((n) => {
        if (n.nodeType === 3) {
          const frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach((part) => {
            if (!part) return;
            if (/^\s+$/.test(part)) frag.append(part);
            else { const s = document.createElement("span"); s.className = "w"; s.textContent = part; frag.append(s); }
          });
          n.replaceWith(frag);
        } else if (n.nodeType === 1) walk(n);
      });
    };
    walk(el);
    $$(".w", el).forEach((w, i) => (w.style.animationDelay = `${80 + i * 45}ms`));
    el.classList.add("split-words");
  };

  /* ---------------- Pages ---------------- */
  const renderHome = () => {
    const featured = projects.filter((p) => p.featured);
    const shots = projects.filter((p) => p.image).slice(0, 2).reverse();
    const yearsNum = parseInt(pr.yearsExperience, 10) || 5;
    $("#app").innerHTML = `
      <section class="hero">
        <div class="container hero-grid">
          <div>
            ${pr.openToWork ? `<span class="pill reveal"><span class="pulse"></span>${esc(pr.availability)}</span>` : ""}
            <h1 id="heroTitle">${esc(pr.headline)}</h1>
            <p class="lede reveal">${esc(pr.summary)}</p>
            <div class="hero-cta reveal">
              <a class="btn btn-primary" href="#work">View selected work ${icon("right")}</a>
              ${pr.resume ? `<a class="btn btn-ghost" href="${esc(pr.resume)}" download>Download résumé</a>` : `<a class="btn btn-ghost" href="${esc(pr.linkedin)}" target="_blank" rel="noopener">${icon("linkedin")} LinkedIn</a>`}
            </div>
            <ul class="hero-meta reveal">
              <li>${icon("briefcase")} ${esc(pr.role)}</li>
              <li>${icon("pin")} ${esc(pr.location)}</li>
              <li>${icon("clock")} ${esc(pr.yearsExperience)} years experience</li>
            </ul>
          </div>
          <div class="stage" id="stage" aria-hidden="true">
            ${shots.map((p) => `<div class="layer"><div class="chrome"><i></i><i></i><i></i><span class="url">${esc(host(p.url))}</span></div><img src="${esc(p.image)}" alt="" decoding="async"></div>`).join("")}
            <div class="badge glass"><span class="ico">${icon("server")}</span><div><strong>Backend first</strong><span>APIs, queues, data integrity</span></div></div>
          </div>
        </div>
      </section>

      <section class="container reveal" aria-label="At a glance">
        <div class="stats glass">
          <div><strong data-count="${yearsNum}" data-suffix="+">${yearsNum}+</strong><span>Years in production software</span></div>
          <div><strong data-count="${D.experience.length}">${D.experience.length}</strong><span>Companies</span></div>
          <div><strong data-count="${projects.length}">${projects.length}</strong><span>Products in this portfolio</span></div>
          <div><strong data-count="${projects.filter((p) => p.url).length}">${projects.filter((p) => p.url).length}</strong><span>Live sites you can visit</span></div>
        </div>
      </section>

      <section class="section" id="work">
        <div class="container">
          <div class="section-head">
            <div>
              <span class="eyebrow reveal"><span class="idx">01</span> Selected work</span>
              <h2 class="reveal">Systems and products running in production.</h2>
            </div>
            <a class="link-arrow reveal" href="projects.html">All ${projects.length} projects ${icon("arrow")}</a>
          </div>
          <div class="work-grid">
            ${featured.map((p, i) => card(p, { wide: i === 0 })).join("")}
          </div>
        </div>
      </section>

      <section class="section" id="experience">
        <div class="container">
          <div class="section-head">
            <div>
              <span class="eyebrow reveal"><span class="idx">02</span> Experience</span>
              <h2 class="reveal">${esc(pr.yearsExperience)} years, four teams, one through-line: backend systems.</h2>
            </div>
          </div>
          <div class="timeline" id="timeline">
            <span class="progress-line" id="tlProgress"></span>
            ${D.experience.map((e, i) => `
              <article class="role glass spot reveal${i === 0 ? " current" : ""}">
                <div class="when">${esc(e.start)} – ${esc(e.end)}${e.end === "Present" ? `<br><span class="now">Current role</span>` : ""}</div>
                <div>
                  <h3>${esc(e.title)} <span>· ${e.url ? `<a href="${esc(e.url)}" target="_blank" rel="noopener">${esc(e.company)}</a>` : esc(e.company)}</span></h3>
                  <p>${esc(e.summary)}</p>
                  <ul>${e.points.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>
                  <div class="chips">${e.tech.map((t) => `<span class="chip">${esc(t)}</span>`).join("")}</div>
                </div>
              </article>`).join("")}
          </div>
        </div>
      </section>

      <section class="section" id="skills">
        <div class="container">
          <div class="section-head">
            <div>
              <span class="eyebrow reveal"><span class="idx">03</span> Skills</span>
              <h2 class="reveal">The toolkit, grouped by the problems it solves.</h2>
            </div>
          </div>
          <div class="skills">
            ${D.skills.map((s) => `
              <div class="skill glass spot reveal">
                <div class="ico">${icon(s.icon)}</div>
                <h3>${esc(s.group)}</h3>
                <div class="chips">${s.items.map((t) => `<span class="chip">${esc(t)}</span>`).join("")}</div>
              </div>`).join("")}
          </div>
        </div>
      </section>

      <section class="section" id="about">
        <div class="container">
          <div class="section-head">
            <div>
              <span class="eyebrow reveal"><span class="idx">04</span> About</span>
              <h2 class="reveal">Engineer by trade, product builder by habit.</h2>
            </div>
          </div>
          <div class="about-grid">
            <div class="about-copy glass reveal">${D.about.map((t) => `<p>${esc(t)}</p>`).join("")}</div>
            <div class="about-side">
              ${D.principles.map((x) => `<div class="principle glass spot reveal"><h4>${esc(x.title)}</h4><p>${esc(x.text)}</p></div>`).join("")}
              <div class="edu glass reveal"><span class="ico">${icon("grad")}</span><div><strong>${esc(D.education.degree)}</strong><span>${esc(D.education.school)}</span><span>${esc(D.education.location)} · ${esc(D.education.detail)}</span></div></div>
            </div>
          </div>
        </div>
      </section>

      <section class="section" id="contact">
        <div class="container">
          <div class="contact glass reveal">
            <div class="halo"></div>
            <span class="eyebrow"><span class="idx">05</span> Contact</span>
            <h2>Have a system to build or a team to join?</h2>
            <p>I'm ${pr.openToWork ? "open to senior backend and full-stack roles, remote or international, as well as freelance projects" : "always happy to talk engineering"}. The fastest way to reach me is email.</p>
            <div class="actions">
              <a class="btn btn-primary" href="mailto:${esc(pr.email)}">${icon("mail")} Email me</a>
              <button class="btn btn-ghost copy-mail" id="copyMail" type="button">${icon("copy")}<span class="def">${esc(pr.email)}</span><span class="ok">Copied to clipboard</span></button>
              <a class="btn btn-ghost" href="${esc(pr.linkedin)}" target="_blank" rel="noopener">${icon("linkedin")} LinkedIn</a>
              <a class="btn btn-ghost" href="${esc(pr.github)}" target="_blank" rel="noopener">${icon("github")} GitHub</a>
            </div>
          </div>
        </div>
      </section>`;
    splitWords($("#heroTitle"));
  };

  const renderProjects = () => {
    const cats = ["All", ...new Set(projects.flatMap((p) => p.filters))];
    $("#app").innerHTML = `
      <section class="page-head container">
        <span class="eyebrow reveal"><span class="idx">Work</span> ${projects.length} projects</span>
        <h1 class="reveal">Projects</h1>
        <p class="reveal">Backend platforms, marketplaces, business systems and AI integrations. Projects with the deepest engineering come first.</p>
      </section>
      <section class="container">
        <div class="toolbar glass reveal">
          <label class="search"><span class="sr-only">Search projects</span>${icon("search")}<input id="q" type="search" placeholder="Search by name, technology or feature" autocomplete="off"></label>
          <div class="segmented" id="cats" role="group" aria-label="Filter by category">
            ${cats.map((c, i) => `<button type="button" data-cat="${esc(c)}" aria-pressed="${i === 0}">${esc(c)}</button>`).join("")}
          </div>
        </div>
        <p class="result-meta" id="meta" aria-live="polite"></p>
        <div class="grid-all" id="grid"></div>
      </section>`;
    const params = new URLSearchParams(location.search);
    let cat = params.get("cat") || "All";
    let q = params.get("q") || "";
    $("#q").value = q;
    const draw = (animate) => {
      const needle = q.trim().toLowerCase();
      const list = projects.filter((p) => (cat === "All" || p.filters.includes(cat)) &&
        (!needle || [p.name, p.tagline, p.category, p.summary, ...p.stack, ...p.features, ...p.filters].join(" ").toLowerCase().includes(needle)));
      $("#grid").innerHTML = list.length ? list.map((p) => card(p)).join("") : `<div class="empty glass">No projects match “${esc(q)}”. Try a technology such as FastAPI or a category.</div>`;
      $("#meta").textContent = `Showing ${list.length} of ${projects.length}`;
      $$("#cats button").forEach((b) => b.setAttribute("aria-pressed", b.dataset.cat === cat));
      const cards = $$("#grid .card");
      if (animate) cards.forEach((c, i) => { c.classList.add("in"); if (!reduce) c.animate([{ opacity: 0, transform: "translateY(12px)" }, { opacity: 1, transform: "none" }], { duration: 500, delay: i * 40, easing: "cubic-bezier(.16,1,.3,1)", fill: "backwards" }); });
      else cards.forEach(observe);
      bindSpot();
      const u = new URL(location.href);
      cat === "All" ? u.searchParams.delete("cat") : u.searchParams.set("cat", cat);
      q ? u.searchParams.set("q", q) : u.searchParams.delete("q");
      history.replaceState(null, "", u);
    };
    $("#cats").addEventListener("click", (e) => { const b = e.target.closest("button"); if (!b) return; cat = b.dataset.cat; draw(true); });
    $("#q").addEventListener("input", (e) => { q = e.target.value; draw(true); });
    draw(false);
  };

  const renderProject = () => {
    const id = new URLSearchParams(location.search).get("id");
    const p = projects.find((x) => x.id === id);
    if (!p) {
      $("#app").innerHTML = `<section class="page-head container"><h1>Project not found</h1><p>This project may have been renamed.</p><p style="margin-top:24px"><a class="btn btn-primary" href="projects.html">See all projects</a></p></section>`;
      return;
    }
    document.title = `${p.name} | ${pr.name}`;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", p.summary);

    const sections = [];
    const add = (sid, title, html) => html && sections.push({ sid, title, html });
    add("overview", "Overview", `<p>${esc(p.summary)}</p>`);
    if (p.problem || p.solution || p.purpose) {
      add("problem", "Problem & approach", `<div class="split">
        ${p.problem ? `<div class="cs-block glass"><h3>The problem</h3><p>${esc(p.problem)}</p></div>` : ""}
        ${p.purpose ? `<div class="cs-block glass"><h3>Purpose</h3><p>${esc(p.purpose)}</p></div>` : ""}
        ${p.solution ? `<div class="cs-block glass"><h3>The approach</h3><p>${esc(p.solution)}</p></div>` : ""}
      </div>`);
    }
    if (p.features.length) add("features", p.planned.length ? "Implemented features" : "Key features", `<ul class="feature-list">${p.features.map((f) => `<li class="glass">${icon("circleCheck")}<span>${esc(f)}</span></li>`).join("")}</ul>`);
    if (p.planned.length) add("planned", "Planned", `<ul class="feature-list planned">${p.planned.map((f) => `<li class="glass">${icon("hourglass")}<span>${esc(f)}</span></li>`).join("")}</ul>`);
    if (p.architecture.length) add("architecture", "Architecture", `<div class="arch">${p.architecture.map((a) => `<div class="item glass spot"><strong>${esc(a.title)}</strong><span>${esc(a.text)}</span></div>`).join("")}</div>`);
    if (p.challenges.length) add("challenges", "Engineering challenges", `<ul class="feature-list">${p.challenges.map((f) => `<li class="glass">${icon("spark")}<span>${esc(f)}</span></li>`).join("")}</ul>`);
    if (p.contribution) add("contribution", "My contribution", `<p>${esc(p.contribution)}</p>`);
    if (p.stack.length) add("stack", "Technology", `<div class="chips">${p.stack.map((t) => `<span class="chip">${esc(t)}</span>`).join("")}</div>`);
    if (p.deployments && p.deployments.length) add("deployments", "Deployments", `<div class="chips">${p.deployments.map((d) => d.url ? `<a class="chip" href="${esc(d.url)}" target="_blank" rel="noopener">${esc(d.name)} ↗</a>` : `<span class="chip">${esc(d.name)}</span>`).join("")}</div>`);
    if (p.status === "Case study pending") add("status", "Case study", `<div class="pending-note glass">${icon("info")}<p>A detailed write-up covering the problem, architecture and my contribution is being prepared. In the meantime, <a href="mailto:${esc(pr.email)}" style="text-decoration:underline">ask me about it</a>.</p></div>`);
    const extraShots = p.screenshots.filter((s) => s !== p.image);
    if (extraShots.length) add("screens", "Screens", `<div class="shots">${extraShots.map((s) => `<figure class="glass"><img src="${esc(s)}" alt="${esc(p.name)} screen" loading="lazy"></figure>`).join("")}</div>`);

    const related = projects.filter((x) => x.id !== p.id).map((x) => ({ x, score: x.filters.filter((f) => p.filters.includes(f)).length * 3 + x.stack.filter((s) => p.stack.includes(s)).length - x.priority * 0.1 })).sort((a, b) => b.score - a.score).slice(0, 3).map((r) => r.x);

    const heroMedia = p.flagship
      ? `<div class="frame"><div class="diagram-wrap"><div class="visual"></div>${diagram()}</div></div>`
      : p.image ? `<div class="frame"><div class="chrome"><i></i><i></i><i></i><span class="url">${esc(host(p.url))}</span></div><img src="${esc(p.image)}" alt="${esc(p.name)} home page"></div>`
      : `<div class="frame">${visual(p).replace('class="visual"', 'class="visual" style="position:relative;aspect-ratio:21/9"')}</div>`;

    $("#app").innerHTML = `
      <section class="cs-head container">
        <nav class="crumbs reveal" aria-label="Breadcrumb"><a href="projects.html">Projects</a>${icon("chevron")}<span>${esc(p.name)}</span></nav>
        <h1 id="csTitle">${esc(p.name)}</h1>
        <p class="tagline reveal">${esc(p.tagline)}</p>
        <div class="actions reveal">
          ${p.url ? `<a class="btn btn-primary" href="${esc(p.url)}" target="_blank" rel="noopener">Visit live site ${icon("arrow", "arrow")}</a>` : ""}
          ${p.repo ? `<a class="btn btn-ghost" href="${esc(p.repo)}" target="_blank" rel="noopener">${icon("github")} Source</a>` : ""}
          <a class="btn btn-ghost" href="mailto:${esc(pr.email)}?subject=${encodeURIComponent(p.name)}">Ask about this project</a>
        </div>
        <dl class="cs-facts glass reveal">
          <div><dt>Category</dt><dd>${esc(p.category)}</dd></div>
          <div><dt>Status</dt><dd><span class="status ${statusClass(p.status)}">${esc(statusLabel(p.status))}</span></dd></div>
          <div><dt>Focus</dt><dd>${esc(p.filters.join(", "))}</dd></div>
          <div><dt>Link</dt><dd>${p.url ? `<a href="${esc(p.url)}" target="_blank" rel="noopener" style="text-decoration:underline">${esc(host(p.url))}</a>` : "Private / internal"}</dd></div>
        </dl>
        <div class="cs-hero-media glass reveal">${heroMedia}</div>
      </section>
      <section class="container cs-body">
        <nav class="toc" id="toc" aria-label="On this page">${sections.map((s) => `<a href="#${s.sid}">${esc(s.title)}</a>`).join("")}</nav>
        <div>${sections.map((s) => `<section class="cs-section reveal" id="${s.sid}"><h2>${esc(s.title)}</h2>${s.html}</section>`).join("")}</div>
      </section>
      <section class="section container" style="padding-top:24px">
        <div class="section-head"><div><span class="eyebrow">Related</span><h2>More projects</h2></div><a class="link-arrow" href="projects.html">All projects ${icon("arrow")}</a></div>
        <div class="next-row">${related.map((x) => card(x)).join("")}</div>
      </section>`;
    splitWords($("#csTitle"));

    // TOC highlight
    const links = $$("#toc a");
    const tocIO = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) links.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === `#${e.target.id}`)); }), { rootMargin: "-30% 0px -60% 0px" });
    $$(".cs-section").forEach((s) => tocIO.observe(s));
  };

  ({ home: renderHome, projects: renderProjects, project: renderProject }[page] || (() => {}))();

  /* ---------------- Motion & interaction ---------------- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const sibs = [...el.parentElement.children].filter((c) => c.classList.contains("reveal"));
      el.style.transitionDelay = `${Math.min(sibs.indexOf(el), 6) * 70}ms`;
      el.classList.add("in");
      setTimeout(() => (el.style.transitionDelay = ""), 1400);
      io.unobserve(el);
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  function observe(el) { if (reduce) el.classList.add("in"); else io.observe(el); }
  $$(".reveal").forEach(observe);
  requestAnimationFrame(() => $$(".split-words").forEach((el) => el.classList.add("in")));

  // Counters
  const cio = new IntersectionObserver((es) => es.forEach((e) => {
    if (!e.isIntersecting) return;
    const el = e.target, to = +el.dataset.count, suf = el.dataset.suffix || "", t0 = performance.now(), dur = reduce ? 0 : 1400;
    const tick = (t) => { const k = dur ? Math.min((t - t0) / dur, 1) : 1; el.textContent = Math.round(to * (1 - Math.pow(1 - k, 4))) + suf; if (k < 1) requestAnimationFrame(tick); };
    el.textContent = "0" + suf; requestAnimationFrame(tick); cio.unobserve(el);
  }), { threshold: 0.6 });
  $$("[data-count]").forEach((el) => cio.observe(el));

  // Header: elevate on scroll, hide on scroll down
  const hdr = $("#header");
  let lastY = 0;
  const onScroll = () => {
    const y = window.scrollY;
    hdr.classList.toggle("scrolled", y > 12);
    hdr.classList.toggle("hide", y > 400 && y > lastY && !$("#nav").classList.contains("open"));
    lastY = y;
    if (onHome) {
      let cur = "";
      ["work", "experience", "skills", "about", "contact"].forEach((id) => { const s = document.getElementById(id); if (s && y >= s.offsetTop - 160) cur = id; });
      $$("#nav a").forEach((a) => a.classList.toggle("active", a.dataset.nav === cur));
      const tl = $("#timeline"), bar = $("#tlProgress");
      if (tl && bar) {
        const r = tl.getBoundingClientRect();
        const k = Math.min(Math.max((window.innerHeight * 0.6 - r.top) / r.height, 0), 1);
        bar.style.height = `${k * (r.height - 16)}px`;
      }
    }
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Theme + menu
  $("#themeToggle").addEventListener("click", () => setTheme(document.documentElement.dataset.theme === "light" ? "dark" : "light"));
  const nav = $("#nav"), mt = $("#menuToggle");
  mt.addEventListener("click", () => { const o = nav.classList.toggle("open"); mt.setAttribute("aria-expanded", o); });
  nav.addEventListener("click", (e) => { if (e.target.closest("a")) { nav.classList.remove("open"); mt.setAttribute("aria-expanded", "false"); } });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") { nav.classList.remove("open"); mt.setAttribute("aria-expanded", "false"); } });

  // Copy email
  const cm = $("#copyMail");
  if (cm) cm.addEventListener("click", async () => {
    try { await navigator.clipboard.writeText(pr.email); cm.classList.add("copied"); setTimeout(() => cm.classList.remove("copied"), 1800); }
    catch { location.href = `mailto:${pr.email}`; }
  });

  // Pointer spotlight on glass cards
  function bindSpot() {
    if (!fine) return;
    $$(".spot").forEach((el) => {
      if (el.dataset.spot) return;
      el.dataset.spot = "1";
      el.addEventListener("pointermove", (e) => {
        const r = el.getBoundingClientRect();
        el.style.setProperty("--x", `${e.clientX - r.left}px`);
        el.style.setProperty("--y", `${e.clientY - r.top}px`);
      });
    });
  }
  bindSpot();

  // Hero stage parallax
  const stage = $("#stage");
  if (stage && fine && !reduce) {
    const layers = $$(".layer", stage);
    const base = [[0, 0, -60, 0], [0, 0, 0, 0]];
    let raf = 0, tx = 0, ty = 0;
    window.addEventListener("pointermove", (e) => {
      tx = e.clientX / window.innerWidth - 0.5; ty = e.clientY / window.innerHeight - 0.5;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => layers.forEach((l, i) => {
        const d = (i + 1) * 10, b = base[i] || [0, 0, 0, 0];
        l.style.transform = `translate3d(${tx * d}px, ${ty * d}px, ${b[2]}px) rotate(${b[3]}deg) rotateY(${tx * 6}deg) rotateX(${-ty * 6}deg)`;
      }));
    }, { passive: true });
  }
})();
