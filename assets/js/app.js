(function () {
  "use strict";

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const currentPage = document.body.dataset.page || "home";

  /* ——— Analytics stubs (без выдуманных ID) ——— */
  function track(eventName, payload) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: eventName, ...payload });
    if (typeof window.ym === "function" && window.NM_METRIKA_ID) {
      window.ym(window.NM_METRIKA_ID, "reachGoal", eventName, payload || {});
    }
  }

  function contactsUrl(direction, requestType) {
    const params = new URLSearchParams();
    if (direction) params.set("direction", direction);
    if (requestType) params.set("type", requestType);
    const q = params.toString();
    return "contacts.html" + (q ? "?" + q : "");
  }

  /* ——— SVG illustrations (нейтральная инженерная графика) ——— */
  const arts = {
    marine: `<svg width="220" height="110" viewBox="0 0 220 110" fill="none" aria-hidden="true">
      <rect x="28" y="30" width="100" height="50" stroke="#1E1E1E" stroke-width="1.4"/>
      <polygon points="128,40 168,30 168,80 128,70" stroke="#1E1E1E" stroke-width="1.4"/>
      <circle cx="186" cy="55" r="14" stroke="#FF2600" stroke-width="1.6" stroke-dasharray="4 3"/>
      <line x1="16" y1="55" x2="204" y2="55" stroke="#1E1E1E" stroke-opacity="0.2" stroke-dasharray="3 3"/>
    </svg>`,
    aero: `<svg width="220" height="110" viewBox="0 0 220 110" fill="none" aria-hidden="true">
      <circle cx="110" cy="55" r="34" stroke="#1E1E1E" stroke-width="1.4"/>
      <circle cx="110" cy="55" r="10" stroke="#FF2600" stroke-width="1.8"/>
      <line x1="50" y1="55" x2="170" y2="55" stroke="#1E1E1E" stroke-width="1"/>
      <line x1="110" y1="12" x2="110" y2="98" stroke="#1E1E1E" stroke-width="1"/>
    </svg>`,
    performance: `<svg width="220" height="110" viewBox="0 0 220 110" fill="none" aria-hidden="true">
      <polygon points="55,35 90,20 110,50 75,70" stroke="#1E1E1E" stroke-width="1.4"/>
      <polygon points="165,35 130,20 110,50 145,70" stroke="#1E1E1E" stroke-width="1.4"/>
      <circle cx="110" cy="78" r="16" stroke="#FF2600" stroke-width="1.8"/>
    </svg>`,
    industrial: `<svg width="220" height="110" viewBox="0 0 220 110" fill="none" aria-hidden="true">
      <rect x="30" y="30" width="70" height="50" stroke="#1E1E1E" stroke-width="1.4"/>
      <rect x="120" y="38" width="70" height="34" stroke="#1E1E1E" stroke-width="1.4"/>
      <line x1="100" y1="55" x2="120" y2="55" stroke="#FF2600" stroke-width="3"/>
    </svg>`,
    upgrade: `<svg width="220" height="110" viewBox="0 0 220 110" fill="none" aria-hidden="true">
      <rect x="40" y="28" width="60" height="54" stroke="#1E1E1E" stroke-width="1.4"/>
      <rect x="120" y="28" width="60" height="54" stroke="#1E1E1E" stroke-width="1.4" stroke-dasharray="4 3"/>
      <path d="M100 55 H120" stroke="#FF2600" stroke-width="2"/>
      <polygon points="112,48 124,55 112,62" fill="#FF2600"/>
    </svg>`,
    gm: `<svg width="200" height="100" viewBox="0 0 200 100" fill="none" aria-hidden="true">
      <polygon points="40,40 70,20 100,45 70,70" stroke="#1E1E1E" stroke-width="1.3"/>
      <polygon points="160,40 130,20 100,45 130,70" stroke="#1E1E1E" stroke-width="1.3"/>
      <circle cx="100" cy="70" r="12" stroke="#FF2600" stroke-width="1.6"/>
    </svg>`,
    experimental: `<svg width="200" height="100" viewBox="0 0 200 100" fill="none" aria-hidden="true">
      <rect x="35" y="25" width="80" height="50" stroke="#1E1E1E" stroke-width="1.3"/>
      <circle cx="150" cy="50" r="22" stroke="#FF2600" stroke-width="1.6" stroke-dasharray="4 3"/>
      <line x1="115" y1="50" x2="128" y2="50" stroke="#1E1E1E" stroke-width="2"/>
    </svg>`,
    gearbox: `<svg width="200" height="100" viewBox="0 0 200 100" fill="none" aria-hidden="true">
      <circle cx="70" cy="50" r="22" stroke="#1E1E1E" stroke-width="1.3"/>
      <circle cx="130" cy="50" r="16" stroke="#1E1E1E" stroke-width="1.3"/>
      <circle cx="70" cy="50" r="6" fill="#FF2600"/>
      <line x1="92" y1="50" x2="114" y2="50" stroke="#1E1E1E" stroke-width="2"/>
    </svg>`,
    mechanics: `<svg width="200" height="120" viewBox="0 0 200 120" fill="none" aria-hidden="true">
      <circle cx="100" cy="58" r="36" stroke="#1E1E1E" stroke-width="1.4"/>
      <circle cx="100" cy="58" r="22" stroke="#1E1E1E" stroke-width="1" stroke-dasharray="3 3"/>
      <line x1="100" y1="58" x2="128" y2="36" stroke="#FF2600" stroke-width="2"/>
      <circle cx="100" cy="58" r="3.5" fill="#1E1E1E"/>
    </svg>`,
    assembly: `<svg width="200" height="120" viewBox="0 0 200 120" fill="none" aria-hidden="true">
      <rect x="45" y="30" width="50" height="60" stroke="#1E1E1E" stroke-width="1.4"/>
      <rect x="105" y="40" width="50" height="40" stroke="#1E1E1E" stroke-width="1.4"/>
      <line x1="95" y1="60" x2="105" y2="60" stroke="#FF2600" stroke-width="3"/>
      <g stroke="#1E1E1E" stroke-opacity="0.35">
        <line x1="55" y1="45" x2="85" y2="45"/><line x1="55" y1="55" x2="85" y2="55"/><line x1="55" y1="65" x2="85" y2="65"/>
      </g>
    </svg>`,
    tests: `<svg width="200" height="120" viewBox="0 0 200 120" fill="none" aria-hidden="true">
      <line x1="30" y1="25" x2="30" y2="90" stroke="#1E1E1E" stroke-width="1"/>
      <line x1="30" y1="90" x2="170" y2="90" stroke="#1E1E1E" stroke-width="1"/>
      <polyline points="30,78 60,55 95,48 130,35 160,42" stroke="#FF2600" stroke-width="2" fill="none"/>
    </svg>`,
    dyno: `<svg width="160" height="80" viewBox="0 0 160 80" fill="none" aria-hidden="true">
      <polyline points="20,60 50,35 90,28 130,32" stroke="#FF2600" stroke-width="2" fill="none"/>
      <line x1="20" y1="60" x2="140" y2="60" stroke="#1E1E1E" stroke-width="1"/>
    </svg>`,
    v8: `<svg width="160" height="80" viewBox="0 0 160 80" fill="none" aria-hidden="true">
      <polygon points="35,30 60,15 80,40 55,55" stroke="#1E1E1E" stroke-width="1.2"/>
      <polygon points="125,30 100,15 80,40 105,55" stroke="#1E1E1E" stroke-width="1.2"/>
      <circle cx="80" cy="55" r="10" stroke="#FF2600" stroke-width="1.5"/>
    </svg>`,
    transmission: `<svg width="160" height="80" viewBox="0 0 160 80" fill="none" aria-hidden="true">
      <rect x="40" y="18" width="80" height="44" stroke="#1E1E1E" stroke-width="1.2"/>
      <circle cx="80" cy="40" r="12" stroke="#FF2600" stroke-width="1.5"/>
    </svg>`,
  };

  function art(name) {
    return arts[name] || "";
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  /* ——— Render ——— */
  function renderNav() {
    const desktop = $("#nav-desktop");
    const mobile = $("#nav-mobile");
    if (!desktop || !NM.nav) return;

    const linkClass = (item) =>
      "nav-item" + (item.id === currentPage ? " is-active" : "");

    desktop.innerHTML = NM.nav
      .map(
        (item) =>
          `<a href="${item.href}" class="${linkClass(item)}"${
            item.id === currentPage ? ' aria-current="page"' : ""
          }>${item.label}</a>`
      )
      .join("");

    if (mobile) {
      mobile.innerHTML =
        NM.nav
          .map(
            (item) =>
              `<a href="${item.href}" class="${
                item.id === currentPage ? "is-active" : ""
              }"${item.id === currentPage ? ' aria-current="page"' : ""}>${
                item.label
              }</a>`
          )
          .join("") +
        `<a href="contacts.html" class="header-cta-mobile" data-track="cta_form">Обсудить задачу ↗</a>`;
    }

    const footerNav = $("#footer-nav");
    if (footerNav) {
      footerNav.innerHTML = NM.nav
        .map((item) => `<a href="${item.href}">${item.label}</a>`)
        .join("");
    }

    $$(".header-cta[href='#contacts'], a.header-cta").forEach((el) => {
      if (el.getAttribute("href") === "#contacts") {
        el.setAttribute("href", "contacts.html");
      }
    });
  }

  function renderHomeOverview() {
    const grid = $("#overview-grid");
    if (!grid || !NM.homeOverview) return;

    grid.innerHTML = NM.homeOverview
      .map(
        (item) => `
      <a class="overview-card" href="${item.href}">
        <div>
          <span class="mono accent">${escapeHtml(item.label)}</span>
          <h3>${escapeHtml(item.title)}</h3>
          <p>${escapeHtml(item.text)}</p>
        </div>
        <span class="mono">Открыть раздел ↗</span>
      </a>`
      )
      .join("");
  }

  function renderProducts() {
    const grid = $("#products-grid");
    if (!grid || !NM.products) return;

    grid.innerHTML = NM.products
      .map(
        (p, i) => `
      <article class="product-card" data-direction="${p.id}">
        <div>
          <span class="mono accent">0${i + 1} // ${escapeHtml(p.category)}</span>
          <h3 style="margin-top:12px;">${escapeHtml(p.title)}</h3>
          <div class="product-art">
            <div class="reticle" aria-hidden="true"></div>
            ${art(p.art)}
          </div>
          <p>${escapeHtml(p.description)}</p>
          <div class="product-tags">
            ${p.tags.map((t) => `<span class="tag">${escapeHtml(t)}</span>`).join("")}
          </div>
        </div>
        <button type="button" class="btn-link product-cta"
          data-direction="${p.id}"
          data-request-type="${p.requestType}"
          data-track="product_direction">
          ${escapeHtml(p.cta)}
        </button>
      </article>`
      )
      .join("");
  }

  function renderProcess() {
    const track = $("#process-track");
    if (!track || !NM.processSteps) return;

    track.innerHTML = NM.processSteps
      .map(
        (s, i) => `
      <div class="process-step">
        <div class="process-index" aria-hidden="true">${String(i + 1).padStart(2, "0")}</div>
        <h3>${escapeHtml(s.title)}</h3>
        <p>${escapeHtml(s.text)}</p>
      </div>`
      )
      .join("");
  }

  function renderRnd() {
    const grid = $("#rnd-grid");
    if (grid && NM.rndItems) {
      grid.innerHTML = NM.rndItems
        .map(
          (item, i) => `
        <div class="rnd-item">
          <span class="mono accent">0${i + 1} //</span>
          <h3>${escapeHtml(item.title)}</h3>
          <p>${escapeHtml(item.text)}</p>
        </div>`
        )
        .join("");
    }

    const tabs = $("#rnd-view-tabs");
    const panels = $("#rnd-view-panels");
    if (tabs && panels && NM.rndViews) {
      tabs.innerHTML = NM.rndViews
        .map(
          (v, i) =>
            `<button type="button" class="rnd-view-tab${
              i === 0 ? " active" : ""
            }" data-view="${v.id}" role="tab" aria-selected="${
              i === 0
            }">${escapeHtml(v.label)}</button>`
        )
        .join("");

      panels.innerHTML = NM.rndViews
        .map(
          (v, i) => `
        <div class="rnd-view-panel${i === 0 ? " active" : ""}" data-view-panel="${v.id}" role="tabpanel">
          <span class="mono accent">ВИД // ${escapeHtml(v.label)}</span>
          <h3 style="margin-top:12px;">${escapeHtml(v.title)}</h3>
          <p>${escapeHtml(v.text)}</p>
        </div>`
        )
        .join("");
    }
  }

  function renderProjects() {
    const grid = $("#projects-grid");
    if (!grid || !NM.projects) return;

    grid.innerHTML = NM.projects
      .map(
        (p, i) => `
      <article class="project-card">
        <div>
          <span class="mono">ПРОЕКТ // 0${i + 1}</span>
          <div class="project-art">
            <div class="reticle" aria-hidden="true"></div>
            ${art(p.art)}
          </div>
          <h3>${escapeHtml(p.title)}</h3>
          <div class="project-sub">${escapeHtml(p.subtitle)}</div>
          <p>${escapeHtml(p.description)}</p>
        </div>
        <a class="btn-link" href="contacts.html?direction=projects&type=other">Обсудить похожий проект ↗</a>
      </article>`
      )
      .join("");
  }

  function renderTesting() {
    const grid = $("#testing-grid");
    if (!grid || !NM.testing) return;

    grid.innerHTML = NM.testing
      .map(
        (item, i) => `
      <div class="plate-card">
        <div>
          <div style="display:flex;justify-content:space-between;gap:12px;">
            <span class="mono">0${i + 1} //</span>
          </div>
          <div class="plate-illustration">
            <div class="reticle" aria-hidden="true"></div>
            ${art(item.art)}
          </div>
          <h3>${escapeHtml(item.title)}</h3>
          <p>${escapeHtml(item.text)}</p>
        </div>
      </div>`
      )
      .join("");
  }

  function renderPrinciples() {
    const box = $("#principles");
    if (!box || !NM.principles) return;

    box.innerHTML = NM.principles
      .map(
        (p, i) => `
      <div class="principle">
        <span class="mono accent">0${i + 1} //</span>
        <h3>${escapeHtml(p.title)}</h3>
        <p>${escapeHtml(p.text)}</p>
      </div>`
      )
      .join("");
  }

  function renderJournal() {
    const grid = $("#journal-grid");
    if (!grid || !NM.journalTopics) return;

    grid.innerHTML = NM.journalTopics
      .map(
        (t, i) => `
      <article class="blog-card">
        <div>
          <div class="blog-thumb">
            <div class="reticle" aria-hidden="true"></div>
            ${art(t.art)}
          </div>
          <span class="mono accent">НАПРАВЛЕНИЕ // 0${i + 1}</span>
          <h3>${escapeHtml(t.title)}</h3>
          <p>${escapeHtml(t.text)}</p>
        </div>
        <span class="mono">Редакционное направление</span>
      </article>`
      )
      .join("");
  }

  function renderRequestTypes() {
    const select = $("#request-type");
    if (!select || !NM.requestTypes) return;

    select.innerHTML =
      `<option value="">Выберите тип запроса</option>` +
      NM.requestTypes
        .map((t) => `<option value="${t.value}">${escapeHtml(t.label)}</option>`)
        .join("");
  }

  /* ——— Interactions ——— */
  function initHeader() {
    const header = $(".site-header");
    const toggle = $("#menu-toggle");
    if (!header || !toggle) return;

    toggle.addEventListener("click", () => {
      const open = header.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    header.addEventListener("click", (e) => {
      const link = e.target.closest("a[href]");
      if (link && header.classList.contains("is-open")) {
        header.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  function initCadLayers() {
    $$(".pill[data-layer]").forEach((btn) => {
      btn.addEventListener("click", () => {
        $$(".pill[data-layer]").forEach((p) => p.classList.remove("active"));
        btn.classList.add("active");

        const mode = btn.dataset.layer;
        const oil = $("#layer-oil");
        const geo = $("#layer-geo");
        if (!oil || !geo) return;

        if (mode === "all") {
          oil.style.opacity = "1";
          geo.style.opacity = "1";
        } else if (mode === "structure") {
          oil.style.opacity = "0.15";
          geo.style.opacity = "1";
        } else if (mode === "flow") {
          oil.style.opacity = "1";
          geo.style.opacity = "0.15";
        }
      });
    });
  }

  function initRndViews() {
    const tabs = $$(".rnd-view-tab");
    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const id = tab.dataset.view;
        tabs.forEach((t) => {
          t.classList.toggle("active", t === tab);
          t.setAttribute("aria-selected", t === tab ? "true" : "false");
        });
        $$("[data-view-panel]").forEach((panel) => {
          panel.classList.toggle("active", panel.dataset.viewPanel === id);
        });
      });
    });
  }

  function fillFormFromDirection(direction, requestType) {
    const directionInput = $("#request-direction");
    const typeSelect = $("#request-type");
    const message = $("#request-message");

    if (directionInput) directionInput.value = direction || "";
    if (typeSelect && requestType) {
      typeSelect.value = requestType;
      typeSelect.classList.remove("is-invalid");
    }

    if (message && direction) {
      const product = (NM.products || []).find((p) => p.id === direction);
      let prefix = "";
      if (product) {
        prefix = `Направление: ${product.category}. `;
      } else if (direction === "rnd") {
        prefix = "Направление: индивидуальная разработка / НИОКР. ";
      } else if (direction === "projects") {
        prefix = "Тема: обсуждение проекта. ";
      }
      if (prefix && !message.value.trim()) {
        message.value = prefix;
        message.focus();
        const len = message.value.length;
        message.setSelectionRange(len, len);
      }
    }
  }

  function goToContacts(direction, requestType, trackName) {
    if (trackName) track(trackName, { direction, requestType });
    track("cta_form", { direction, requestType });

    if ($("#tech-form")) {
      fillFormFromDirection(direction, requestType);
      const target = $("#contacts") || $("#tech-form");
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      return;
    }

    window.location.href = contactsUrl(direction, requestType);
  }

  function initCtas() {
    document.addEventListener("click", (e) => {
      const productCta = e.target.closest(".product-cta");
      if (productCta) {
        e.preventDefault();
        goToContacts(
          productCta.dataset.direction,
          productCta.dataset.requestType,
          "product_direction"
        );
        return;
      }

      const rndCta = e.target.closest("[data-cta='rnd']");
      if (rndCta) {
        e.preventDefault();
        goToContacts("rnd", "rnd", "cta_rnd");
        return;
      }

      const heroProducts = e.target.closest("[data-track='hero_to_catalog']");
      if (heroProducts) track("hero_to_catalog");

      const formLink = e.target.closest("[data-track='cta_form']");
      if (formLink && !productCta && !rndCta) track("cta_form");
    });
  }

  function initForm() {
    const form = $("#tech-form");
    if (!form) return;

    const status = $("#form-status");
    const submitBtn = $("#form-submit");
    let submitting = false;
    let started = false;

    form.addEventListener(
      "input",
      () => {
        if (!started) {
          started = true;
          track("form_start");
        }
      },
      { once: true }
    );

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (submitting) return;

      clearErrors(form);

      const name = $("#field-name");
      const contact = $("#field-contact");
      const type = $("#request-type");
      const message = $("#request-message");
      const consent = $("#field-consent");
      const direction = $("#request-direction");

      let valid = true;
      if (!name.value.trim()) {
        showError(name, "Укажите имя или компанию");
        valid = false;
      }
      if (!contact.value.trim()) {
        showError(contact, "Укажите контакт для связи");
        valid = false;
      }
      if (!type.value) {
        showError(type, "Выберите тип запроса");
        valid = false;
      }
      if (!message.value.trim() || message.value.trim().length < 10) {
        showError(message, "Опишите задачу подробнее");
        valid = false;
      }
      if (!consent.checked) {
        showError(consent, "Необходимо согласие на обработку данных");
        valid = false;
      }

      if (!valid) {
        setStatus(status, "error", "Проверьте обязательные поля формы.");
        return;
      }

      const payload = {
        name: name.value.trim(),
        contact: contact.value.trim(),
        requestType: type.value,
        direction: direction ? direction.value : "",
        message: message.value.trim(),
        source: "website_" + currentPage,
        page: location.pathname + location.search,
      };

      const endpoint = NM.formConfig && NM.formConfig.endpoint;

      if (!endpoint) {
        setStatus(
          status,
          "error",
          "Отправка временно недоступна: сервер приёма запросов не настроен. Свяжитесь с командой NM Engineering другим согласованным способом или повторите попытку после подключения endpoint (см. NM.formConfig в assets/js/content.js)."
        );
        return;
      }

      submitting = true;
      submitBtn.disabled = true;
      setStatus(status, "loading", "Отправка технического запроса…");

      try {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!res.ok) throw new Error("HTTP " + res.status);

        setStatus(
          status,
          "success",
          "Запрос отправлен. Спасибо. Ваше обращение передано команде NM Engineering для рассмотрения."
        );
        track("form_success", {
          requestType: payload.requestType,
          direction: payload.direction,
        });
        form.reset();
        if (direction) direction.value = "";
        started = false;
      } catch (err) {
        setStatus(
          status,
          "error",
          "Не удалось отправить запрос. Попробуйте ещё раз позже или используйте другой согласованный канал связи."
        );
      } finally {
        submitting = false;
        submitBtn.disabled = false;
      }
    });
  }

  function showError(el, text) {
    el.classList.add("is-invalid");
    const wrap =
      el.closest(".field") || el.closest(".consent") || el.parentElement;
    if (!wrap) return;
    let err = wrap.querySelector(".field-error");
    if (!err) {
      err = document.createElement("div");
      err.className = "field-error";
      err.setAttribute("role", "alert");
      wrap.appendChild(err);
    }
    err.textContent = text;
    err.classList.add("is-visible");
  }

  function clearErrors(form) {
    $$(".is-invalid", form).forEach((el) => el.classList.remove("is-invalid"));
    $$(".field-error", form).forEach((el) => {
      el.classList.remove("is-visible");
      el.textContent = "";
    });
  }

  function setStatus(el, type, text) {
    if (!el) return;
    el.className = "form-status is-visible is-" + type;
    el.textContent = text;
    el.setAttribute("role", type === "error" ? "alert" : "status");
  }

  function initReveal() {
    const nodes = $$(".reveal");
    if (!nodes.length) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      nodes.forEach((el) => el.classList.add("visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );

    nodes.forEach((el) => observer.observe(el));
  }

  function initContactsPrefill() {
    if (!$("#tech-form")) return;
    const params = new URLSearchParams(location.search);
    const direction = params.get("direction");
    const type = params.get("type");
    if (direction || type) {
      // Дождаться заполнения select опциями
      fillFormFromDirection(direction, type);
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    renderNav();
    renderHomeOverview();
    renderProducts();
    renderProcess();
    renderRnd();
    renderProjects();
    renderTesting();
    renderPrinciples();
    renderJournal();
    renderRequestTypes();

    initHeader();
    initCadLayers();
    initRndViews();
    initCtas();
    initForm();
    initReveal();
    initContactsPrefill();
  });
})();
