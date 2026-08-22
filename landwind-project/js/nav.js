// js/nav.js - Quản lý menu mobile và navbar khi cuộn (Nhiệm vụ 2 - Tiết 2)

export function initNav() {
  const toggle = document.getElementById("nav-toggle") || document.querySelector('[aria-label*="menu"]');
  const menu = document.getElementById("main-nav") || document.querySelector('nav[aria-label="Điều hướng chính"]');
  const header = document.getElementById("main-header") || document.querySelector("header");

  // Thoát êm nếu trang hiện tại không có phần tử menu hoặc nút toggle
  if (!toggle || !menu) return;

  // Đảm bảo các thuộc tính ARIA khởi tạo
  if (!toggle.hasAttribute("aria-expanded")) {
    toggle.setAttribute("aria-expanded", "false");
  }
  if (!toggle.hasAttribute("aria-label")) {
    toggle.setAttribute("aria-label", "Mở menu");
  }

  // Hàm đóng/mở chạm đủ 4 thứ: UI, ARIA expanded, ARIA label, và chặn cuộn nền body
  function setOpen(open) {
    menu.classList.toggle("hidden", !open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Đóng menu" : "Mở menu");
    document.body.classList.toggle("overflow-hidden", open);

    // Bổ sung kiểu hiển thị cho menu mobile khi mở mà không làm thay đổi bố cục desktop
    if (open) {
      menu.classList.add(
        "flex", "flex-col", "absolute", "top-full", "left-0", "w-full",
        "bg-surface", "dark:bg-surface-dark", "p-5", "border-b", "border-line",
        "dark:border-line-invert", "shadow-lg", "z-50"
      );
    } else {
      menu.classList.remove(
        "flex", "flex-col", "absolute", "top-full", "left-0", "w-full",
        "bg-surface", "dark:bg-surface-dark", "p-5", "border-b", "border-line",
        "dark:border-line-invert", "shadow-lg", "z-50"
      );
    }
  }

  // Bật/tắt khi click vào nút hamburger
  toggle.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    setOpen(!isOpen);
  });

  // Ba cách đóng menu:
  // 1. Bấm phím ESC -> đóng menu và trả tiêu điểm về nút toggle
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
      setOpen(false);
      toggle.focus();
    }
  });

  // 2. Bấm ra ngoài vùng header
  document.addEventListener("click", (e) => {
    if (toggle.getAttribute("aria-expanded") === "true") {
      if (header && !header.contains(e.target)) {
        setOpen(false);
      }
    }
  });

  // 3. Khi màn hình phóng to lên kích thước desktop (>= 1024px)
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

// Navbar khi cuộn — dùng IntersectionObserver, không dùng sự kiện scroll
export function initHeaderOnScroll() {
  const header = document.getElementById("main-header") || document.querySelector("header");
  let sentinel = document.getElementById("nav-sentinel");

  if (!header) return;

  // Nếu trong DOM chưa có #nav-sentinel, tự động chèn 1 div rỗng ở đầu body
  if (!sentinel) {
    sentinel = document.createElement("div");
    sentinel.id = "nav-sentinel";
    sentinel.className = "w-full h-px -mt-px pointer-events-none opacity-0";
    document.body.prepend(sentinel);
  }

  // IntersectionObserver chỉ báo đúng 2 lần: lúc vào và lúc ra
  const observer = new IntersectionObserver(([entry]) => {
    const scrolled = !entry.isIntersecting;
    header.classList.toggle("shadow-md", scrolled);
    header.classList.toggle("backdrop-blur-md", scrolled);
    header.classList.toggle("bg-surface/95", scrolled);
    header.classList.toggle("dark:bg-surface-dark/95", scrolled);
  });

  observer.observe(sentinel);
}

// Nút "Lên đầu trang" (Bài khởi động)
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

  // Hiện khi trang đã cuộn quá 400px
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
