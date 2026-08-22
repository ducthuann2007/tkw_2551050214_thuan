// js/main.js – Điểm khởi động toàn diện và an toàn cho tất cả các trang

// 1. Quản lý Dark Mode với icon Venom / Người Nhện đỏ
export function initTheme() {
  const themeToggleBtn = document.getElementById("theme-toggle");
  if (!themeToggleBtn) return;

  function toggle() {
    const isDark = document.documentElement.classList.contains("dark");
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  }

  themeToggleBtn.addEventListener("click", (e) => {
    e.preventDefault();
    toggle();
  });
}

// 2. Quản lý Menu Mobile (Nhiệm vụ 2 - Tiết 2)
export function initNav() {
  const toggle = document.getElementById("nav-toggle") || document.querySelector('[aria-label*="menu"]');
  const menu = document.getElementById("main-nav") || document.querySelector('nav[aria-label="Điều hướng chính"]');
  const header = document.getElementById("main-header") || document.querySelector("header");

  if (!toggle || !menu) return;

  if (!toggle.hasAttribute("aria-expanded")) {
    toggle.setAttribute("aria-expanded", "false");
  }
  if (!toggle.hasAttribute("aria-label")) {
    toggle.setAttribute("aria-label", "Mở menu");
  }

  // Hàm đóng/mở chạm đủ 4 thứ: UI, ARIA expanded, ARIA label, và overflow-hidden body
  function setOpen(open) {
    menu.classList.toggle("hidden", !open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Đóng menu" : "Mở menu");
    document.body.classList.toggle("overflow-hidden", open);

    if (open) {
      menu.classList.remove("hidden");
      menu.classList.add(
        "flex", "flex-col", "absolute", "top-full", "left-0", "w-full",
        "bg-surface", "dark:bg-surface-dark", "p-5", "border-b", "border-line",
        "dark:border-line-invert", "shadow-lg", "z-50"
      );
    } else {
      menu.classList.add("hidden");
      menu.classList.remove(
        "flex", "flex-col", "absolute", "top-full", "left-0", "w-full",
        "bg-surface", "dark:bg-surface-dark", "p-5", "border-b", "border-line",
        "dark:border-line-invert", "shadow-lg", "z-50"
      );
    }
  }

  toggle.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    setOpen(!isOpen);
  });

  // Ba cách đóng:
  // 1. Phím ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
      setOpen(false);
      toggle.focus();
    }
  });

  // 2. Bấm ra ngoài header
  document.addEventListener("click", (e) => {
    if (toggle.getAttribute("aria-expanded") === "true") {
      if (header && !header.contains(e.target)) {
        setOpen(false);
      }
    }
  });

  // 3. Phóng to lên desktop
  const desktopMediaQuery = window.matchMedia("(min-width: 1024px)");
  const handleMediaChange = (e) => {
    if (e.matches && toggle.getAttribute("aria-expanded") === "true") {
      setOpen(false);
    }
  };
  if (desktopMediaQuery.addEventListener) {
    desktopMediaQuery.addEventListener("change", handleMediaChange);
  } else if (desktopMediaQuery.addListener) {
    desktopMediaQuery.addListener(handleMediaChange);
  }
}

// 3. Navbar khi cuộn — dùng IntersectionObserver
export function initHeaderOnScroll() {
  const header = document.getElementById("main-header") || document.querySelector("header");
  let sentinel = document.getElementById("nav-sentinel");
  if (!header) return;

  if (!sentinel) {
    sentinel = document.createElement("div");
    sentinel.id = "nav-sentinel";
    sentinel.className = "w-full h-px -mt-px pointer-events-none opacity-0";
    document.body.prepend(sentinel);
  }

  const observer = new IntersectionObserver(([entry]) => {
    const scrolled = !entry.isIntersecting;
    header.classList.toggle("shadow-md", scrolled);
    header.classList.toggle("backdrop-blur-md", scrolled);
    header.classList.toggle("bg-surface/95", scrolled);
    header.classList.toggle("dark:bg-surface-dark/95", scrolled);
  });

  observer.observe(sentinel);
}

// 4. Accordion FAQ dùng Event Delegation (Nhiệm vụ 3 - Tiết 3)
export function initFaq() {
  const root = document.getElementById("faq");
  if (!root) return;

  const triggers = root.querySelectorAll("[data-faq-trigger]");

  function setOpen(trigger, open) {
    const controlsId = trigger.getAttribute("aria-controls");
    const answer = document.getElementById(controlsId);
    if (!answer) return;

    trigger.setAttribute("aria-expanded", String(open));
    answer.classList.toggle("hidden", !open);

    const icon = trigger.querySelector("[data-faq-icon]");
    if (icon) {
      icon.classList.toggle("rotate-180", open);
    }
  }

  root.addEventListener("click", (e) => {
    const trigger = e.target.closest("[data-faq-trigger]");
    if (!trigger) return;

    const willOpen = trigger.getAttribute("aria-expanded") !== "true";
    triggers.forEach((t) => setOpen(t, false));
    if (willOpen) setOpen(trigger, true);
  });
}

// 5. Nút Lên đầu trang (Bài khởi động > 400px)
export function initToTop() {
  let toTopBtn = document.getElementById("back-to-top");

  if (!toTopBtn) {
    toTopBtn = document.createElement("button");
    toTopBtn.id = "back-to-top";
    toTopBtn.type = "button";
    toTopBtn.setAttribute("aria-label", "Lên đầu trang");
    toTopBtn.className =
      "fixed bottom-6 right-6 z-50 p-3 rounded-full bg-brand-600 text-white shadow-xl transition-all duration-300 opacity-0 pointer-events-none hover:bg-brand-700 hover:scale-110 focus:outline-none cursor-pointer";
    toTopBtn.innerHTML = `
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
      </svg>
    `;
    document.body.appendChild(toTopBtn);
  }

  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      toTopBtn.classList.remove("opacity-0", "pointer-events-none");
      toTopBtn.classList.add("opacity-100");
    } else {
      toTopBtn.classList.add("opacity-0", "pointer-events-none");
      toTopBtn.classList.remove("opacity-100");
    }
  });

  toTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// Tự động khởi chạy an toàn khi DOM sẵn sàng
function start() {
  try { initTheme(); } catch (e) { console.error("Theme init error:", e); }
  try { initNav(); } catch (e) { console.error("Nav init error:", e); }
  try { initHeaderOnScroll(); } catch (e) { console.error("Header scroll error:", e); }
  try { initFaq(); } catch (e) { console.error("FAQ init error:", e); }
  try { initToTop(); } catch (e) { console.error("ToTop init error:", e); }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", start);
} else {
  start();
}
