(() => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(pointer: fine)").matches;

  document.getElementById("year").textContent = new Date().getFullYear();

  // Mobile menu
  const menuBtn = document.getElementById("menuBtn");
  const navLinks = document.getElementById("navLinks");
  menuBtn.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", open);
  });
  navLinks.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuBtn.setAttribute("aria-expanded", "false");
    })
  );

  // Nav shrink, scroll progress, active link
  const nav = document.querySelector(".nav");
  const progress = document.querySelector(".progress");
  const sections = [...document.querySelectorAll("main section[id]")];
  const linkFor = (id) => navLinks.querySelector(`a[href="#${id}"]`);
  const onScroll = () => {
    const y = window.scrollY;
    nav.classList.toggle("scrolled", y > 40);
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = `${max > 0 ? (y / max) * 100 : 0}%`;
    let current = "";
    sections.forEach((s) => { if (y >= s.offsetTop - 200) current = s.id; });
    navLinks.querySelectorAll("a").forEach((a) => a.classList.remove("active"));
    const active = current && linkFor(current);
    if (active) active.classList.add("active");
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Reveal on scroll, with stagger inside each parent
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const siblings = [...el.parentElement.children].filter((c) => c.classList.contains("reveal"));
        el.style.transitionDelay = `${Math.max(0, siblings.indexOf(el)) * 90}ms`;
        el.classList.add("in");
        // Drop the stagger delay afterwards so hover motion stays instant
        setTimeout(() => { el.style.transitionDelay = ""; }, 1200);
        io.unobserve(el);
      });
    },
    { threshold: 0.15 }
  );
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

  // Animated counters
  const counterIO = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = +el.dataset.count;
        const suffix = el.dataset.suffix || "";
        const start = performance.now();
        const dur = reduceMotion ? 0 : 1600;
        const tick = (now) => {
          const p = dur ? Math.min((now - start) / dur, 1) : 1;
          el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))) + suffix;
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        counterIO.unobserve(el);
      });
    },
    { threshold: 0.6 }
  );
  document.querySelectorAll("[data-count]").forEach((el) => counterIO.observe(el));

  // Typing effect
  const words = [
    "scalable web platforms",
    "multi-vendor marketplaces",
    "AI-powered pipelines",
    "clean, fast APIs",
    "glassy, modern UIs",
  ];
  const typed = document.getElementById("typed");
  if (!reduceMotion) {
    let w = 0, i = words[0].length, deleting = true;
    const loop = () => {
      const word = words[w];
      typed.textContent = word.slice(0, i);
      let delay = deleting ? 40 : 80;
      if (deleting && i === 0) { deleting = false; w = (w + 1) % words.length; delay = 300; }
      else if (!deleting && i === words[w].length) { deleting = true; delay = 1800; }
      i += deleting ? -1 : 1;
      setTimeout(loop, delay);
    };
    setTimeout(loop, 2200);
  }

  // Project filters
  const filters = document.querySelectorAll(".filter");
  const projects = document.querySelectorAll(".project");
  filters.forEach((btn) =>
    btn.addEventListener("click", () => {
      filters.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const f = btn.dataset.filter;
      projects.forEach((p) => {
        const show = f === "all" || p.dataset.cat.split(" ").includes(f);
        p.classList.toggle("hide", !show);
        if (show && !reduceMotion) {
          p.animate(
            [{ opacity: 0, transform: "scale(0.94)" }, { opacity: 1, transform: "scale(1)" }],
            { duration: 450, easing: "cubic-bezier(0.22, 1, 0.36, 1)" }
          );
        }
      });
    })
  );

  if (reduceMotion || !finePointer) return;

  // Cursor glow
  const glow = document.querySelector(".cursor-glow");
  window.addEventListener("pointermove", (e) => {
    glow.style.left = `${e.clientX}px`;
    glow.style.top = `${e.clientY}px`;
  }, { passive: true });

  // 3D tilt + sheen on cards
  document.querySelectorAll("[data-tilt]").forEach((card) => {
    const max = card.classList.contains("hero-card") ? 6 : 10;
    card.addEventListener("pointermove", (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      card.style.transform = `perspective(900px) rotateX(${(0.5 - y) * max}deg) rotateY(${(x - 0.5) * max}deg) translateY(-4px)`;
      card.style.setProperty("--mx", `${x * 100}%`);
      card.style.setProperty("--my", `${y * 100}%`);
    });
    card.addEventListener("pointerleave", () => { card.style.transform = ""; });
  });

  // Magnetic buttons
  document.querySelectorAll(".magnetic").forEach((btn) => {
    btn.addEventListener("pointermove", (e) => {
      const r = btn.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      btn.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
    });
    btn.addEventListener("pointerleave", () => { btn.style.transform = ""; });
  });
})();
