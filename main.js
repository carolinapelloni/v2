
/* =========================================
   ATELIER INGEGNERA — INTERAZIONI
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {
  // ANNO AUTOMATICO NEL FOOTER
  document.querySelectorAll("[data-year]").forEach((element) => {
    element.textContent = new Date().getFullYear();
  });

  // MENU RESPONSIVE
  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".main-nav");

  function closeMenu() {
    if (!menuButton || !navigation) return;

    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Apri il menu");
    navigation.classList.remove("is-open");
    document.body.classList.remove("menu-open");
  }

  if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
      const isOpen = menuButton.getAttribute("aria-expanded") === "true";

      menuButton.setAttribute("aria-expanded", String(!isOpen));
      menuButton.setAttribute(
        "aria-label",
        isOpen ? "Apri il menu" : "Chiudi il menu"
      );

      navigation.classList.toggle("is-open", !isOpen);
      document.body.classList.toggle("menu-open", !isOpen);
    });

    navigation.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 680) closeMenu();
    });
  }

  // MODULO CONTATTI: CREA UN MESSAGGIO EMAIL
  const form = document.querySelector("#contact-form");

  if (form) {
    const subjectSelect = form.querySelector("#subject");
    const params = new URLSearchParams(window.location.search);

    if (params.get("tipo") === "consulenza" && subjectSelect) {
      subjectSelect.value = "Prenotazione consulenza";
    }

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!form.reportValidity()) return;

      const data = new FormData(form);
      const recipient = form.dataset.mailto || "ciao@tuodominio.it";

      const subject = String(data.get("argomento") || "Richiesta informazioni");
      const name = String(data.get("nome") || "");
      const email = String(data.get("email") || "");
      const message = String(data.get("messaggio") || "");

      const body = [
        "Nuova richiesta dal sito Atelier Ingegnera",
        "",
        "Nome: " + name,
        "Email: " + email,
        "",
        "Messaggio:",
        message
      ].join("\n");

      const mailto =
        "mailto:" + recipient +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);

      window.location.href = mailto;
    });
  }

  // OGGETTI TECNICI VOLANTI
  createFloatingObjects();
});


function createFloatingObjects() {
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  if (reduceMotion.matches) return;

  const layer = document.createElement("div");
  layer.className = "floating-layer";
  layer.setAttribute("aria-hidden", "true");

  document.body.appendChild(layer);

  /*
   * Tutti gli oggetti sono disegnati con SVG inline.
   * Non vengono scaricate immagini da Internet.
   */

  const tools = [
    {
      name: "Compasso",
      size: 65,
      opacity: 0.72,
      speed: 0.00022,
      svg: `
        <svg viewBox="0 0 100 110">
          <g class="tool-line">
            <path d="M50 13 L19 96 L47 45 L81 96 L50 13"/>
            <path d="M50 13 L47 45"/>
            <path d="M50 13 L65 6"/>
            <path d="M43 43 L54 39"/>
          </g>
          <circle cx="50" cy="13" r="7" class="tool-fill"
            stroke="currentColor" stroke-width="1.8"/>
          <circle cx="50" cy="13" r="2" fill="currentColor"/>
          <path d="M17 96 L21 96 M79 96 L83 96"
            class="tool-line"/>
        </svg>`
    },
    {
      name: "Squadretta",
      size: 75,
      opacity: 0.62,
      speed: 0.00016,
      svg: `
        <svg viewBox="0 0 110 110">
          <path d="M15 15 L15 94 L95 94 Z"
            class="tool-fill" stroke="currentColor"
            stroke-width="1.8" stroke-linejoin="round"/>
          <path d="M28 37 L28 80 L72 80 Z"
            class="tool-paper" stroke="currentColor"
            stroke-width="1.5"/>
          <path d="M15 83 L26 83 M15 72 L23 72
            M15 61 L26 61 M15 50 L23 50
            M15 39 L26 39"
            class="tool-detail"/>
        </svg>`
    },
    {
      name: "Matita tecnica",
      size: 82,
      opacity: 0.76,
      speed: 0.00019,
      svg: `
        <svg viewBox="0 0 110 110">
          <g transform="rotate(42 55 55)">
            <path d="M45 15 L65 15 L65 85 L55 102
              L45 85 Z"
              class="tool-fill" stroke="currentColor"
              stroke-width="1.8" stroke-linejoin="round"/>
            <path d="M45 25 H65 M45 31 H65
              M45 78 H65"
              class="tool-detail"/>
            <path d="M45 85 L55 102 L65 85 Z"
              class="tool-blue" stroke="currentColor"
              stroke-width="1.5"/>
            <path d="M52 97 L55 102 L58 97 Z"
              fill="currentColor"/>
          </g>
        </svg>`
    },
    {
      name: "Righello graduato",
      size: 100,
      opacity: 0.55,
      speed: 0.00014,
      svg: `
        <svg viewBox="0 0 130 60">
          <rect x="5" y="12" width="120" height="36" rx="2"
            class="tool-fill" stroke="currentColor"
            stroke-width="1.8"/>
          <path d="M15 12 V28 M25 12 V22
            M35 12 V28 M45 12 V22
            M55 12 V28 M65 12 V22
            M75 12 V28 M85 12 V22
            M95 12 V28 M105 12 V22
            M115 12 V28"
            class="tool-detail"/>
        </svg>`
    },
    {
      name: "Goniometro",
      size: 78,
      opacity: 0.58,
      speed: 0.00018,
      svg: `
        <svg viewBox="0 0 110 100">
          <path d="M10 85 A45 45 0 0 1 100 85 Z"
            class="tool-blue" stroke="currentColor"
            stroke-width="1.8"/>
          <path d="M10 85 H100 M55 85 V40
            M32 85 L24 69 M43 85 L39 63
            M67 85 L71 63 M78 85 L86 69"
            class="tool-detail"/>
          <circle cx="55" cy="85" r="3"
            fill="currentColor"/>
        </svg>`
    },
    {
      name: "Divisore",
      size: 68,
      opacity: 0.68,
      speed: 0.00017,
      svg: `
        <svg viewBox="0 0 100 110">
          <path d="M48 18 L22 98 L55 46
            L79 98 L48 18"
            class="tool-blue" stroke="currentColor"
            stroke-width="1.8" stroke-linejoin="round"/>
          <circle cx="48" cy="18" r="8"
            class="tool-fill" stroke="currentColor"
            stroke-width="1.8"/>
          <path d="M42 46 L60 40"
            class="tool-line"/>
        </svg>`
    },
    {
      name: "Calibro",
      size: 86,
      opacity: 0.60,
      speed: 0.00012,
      svg: `
        <svg viewBox="0 0 110 110">
          <g class="tool-line">
            <path d="M15 25 H95 M25 25 V45
              M35 25 V36 M45 25 V36
              M55 25 V36 M65 25 V36
              M75 25 V36 M85 25 V45"/>
            <path d="M25 45 V70 H85 V45"/>
            <path d="M25 70 L18 90 M85 70 L92 90"/>
            <path d="M25 58 H85"/>
          </g>
          <rect x="43" y="17" width="24" height="16"
            class="tool-fill" stroke="currentColor"
            stroke-width="1.8"/>
        </svg>`
    },
    {
      name: "Matita colorata",
      size: 58,
      opacity: 0.64,
      speed: 0.00021,
      svg: `
        <svg viewBox="0 0 100 100">
          <g transform="rotate(-35 50 50)">
            <path d="M42 12 H58 V77 L50 94 L42 77 Z"
              class="tool-blue" stroke="currentColor"
              stroke-width="1.8"/>
            <path d="M42 12 H58 V25 H42 Z"
              class="tool-fill" stroke="currentColor"
              stroke-width="1.5"/>
            <path d="M42 77 H58"
              class="tool-line"/>
          </g>
        </svg>`
    }
  ];

  const objects = [];
  const objectCount = tools.length;

  tools.forEach((tool, index) => {
    const element = document.createElement("div");

    element.className = "floating-object";
    element.innerHTML = tool.svg;
    element.setAttribute("role", "presentation");
    element.style.setProperty("--object-size", tool.size + "px");
    element.style.setProperty("--object-opacity", tool.opacity);

    /*
     * Posizioni distribuite su tutta la finestra.
     * Gli oggetti restano dentro il viewport e non
     * interferiscono con click, link o moduli.
     */

    const angle = (Math.PI * 2 * index) / objectCount;
    const initialX = 0.5 + Math.cos(angle) * 0.37;
    const initialY = 0.5 + Math.sin(angle) * 0.37;

    const item = {
      element,
      tool,
      x: initialX,
      y: initialY,
      startX: initialX,
      startY: initialY,
      phase: Math.random() * Math.PI * 2,
      rotation: Math.random() * 50 - 25,
      index
    };

    objects.push(item);
    layer.appendChild(element);
  });

  let pointerX = 0.5;
  let pointerY = 0.5;
  let targetX = 0.5;
  let targetY = 0.5;
  let width = window.innerWidth;
  let height = window.innerHeight;
  let frame = 0;
  let lastTime = 0;

  const isTouchDevice = window.matchMedia(
    "(hover: none), (pointer: coarse)"
  ).matches;

  // Il mouse influenza la traiettoria di tutti gli oggetti.
  window.addEventListener("pointermove", (event) => {
    if (event.pointerType === "touch") return;

    targetX = event.clientX / Math.max(width, 1);
    targetY = event.clientY / Math.max(height, 1);
  }, { passive: true });

  // Su dispositivi touch non c'è mouse: si usano
  // traiettorie automatiche per mantenere il movimento.
  window.addEventListener("resize", () => {
    width = window.innerWidth;
    height = window.innerHeight;
  }, { passive: true });

  function animate(time) {
    frame = requestAnimationFrame(animate);

    // Limita il lavoro quando la scheda non è visibile.
    if (document.hidden) return;

    const elapsed = lastTime ? Math.min(time - lastTime, 32) : 16;
    lastTime = time;

    const seconds = time * 0.001;

    pointerX += (targetX - pointerX) * 0.035;
    pointerY += (targetY - pointerY) * 0.035;

    objects.forEach((item) => {
      const { element, tool, index, phase } = item;

      // Oscillazione continua e indipendente per ogni oggetto.
      const driftX = Math.sin(seconds * 0.48 + phase) * 0.055;
      const driftY = Math.cos(seconds * 0.38 + phase) * 0.065;

      const baseX = item.startX + driftX;
      const baseY = item.startY + driftY;

      // Effetto di attrazione morbida verso il puntatore.
      const dx = pointerX - baseX;
      const dy = pointerY - baseY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      const influence = Math.max(0, 1 - distance / 0.9);
      const mouseStrength = isTouchDevice ? 0.02 : 0.105;

      const wantedX = baseX + dx * influence * mouseStrength;
      const wantedY = baseY + dy * influence * mouseStrength;

      item.x += (wantedX - item.x) * Math.min(1, elapsed * 0.002);
      item.y += (wantedY - item.y) * Math.min(1, elapsed * 0.002);

      // Margini per evitare che gli strumenti escano dallo schermo.
      const marginX = Math.min(tool.size / Math.max(width, 1), 0.12) / 2;
      const marginY = Math.min(tool.size / Math.max(height, 1), 0.12) / 2;

      const safeX = Math.min(1 - marginX, Math.max(marginX, item.x));
      const safeY = Math.min(1 - marginY, Math.max(marginY, item.y));

      // Piccola rotazione reattiva al mouse.
      const rotation =
        item.rotation +
        Math.sin(seconds * 0.35 + phase) * 9 +
        (isTouchDevice ? 0 : dx * 35);

      const translateX = safeX * width - tool.size / 2;
      const translateY = safeY * height - tool.size / 2;

      element.style.transform =
        `translate3d(${translateX}px, ${translateY}px, 0) rotate(${rotation}deg)`;
    });
  }

  frame = requestAnimationFrame(animate);

  // Se la pagina viene nascosta, sospende il ciclo.
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden && !frame) {
      lastTime = 0;
      frame = requestAnimationFrame(animate);
    }
  });
}
