// js/nav.js - Quản lý điều hướng, hiệu ứng header và nút cuộn lên đầu trang
export function initNav() {
  const navToggleBtn = document.querySelector('[aria-label="Mở menu điều hướng"]');
  const navMenu = document.querySelector('nav[aria-label="Điều hướng chính"]');

  // Thoát êm nếu không tìm thấy phần tử điều hướng
  if (!navToggleBtn || !navMenu) return;

  navToggleBtn.addEventListener("click", () => {
    // Chuyển đổi hiển thị menu trên mobile
    const isHidden = navMenu.classList.contains("hidden");
    if (isHidden) {
      navMenu.classList.remove("hidden");
      navMenu.classList.add(
        "flex", "flex-col", "absolute", "top-full", "left-0", "w-full",
        "bg-surface", "dark:bg-surface-dark", "p-5", "border-b", "border-line",
        "dark:border-line-invert", "shadow-lg", "z-50"
      );
    } else {
      navMenu.classList.add("hidden");
      navMenu.classList.remove(
        "flex", "flex-col", "absolute", "top-full", "left-0", "w-full",
        "bg-surface", "dark:bg-surface-dark", "p-5", "border-b", "border-line",
        "dark:border-line-invert", "shadow-lg", "z-50"
      );
    }
  });
}

export function initHeaderOnScroll() {
  const header = document.querySelector("header");
  if (!header) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 20) {
      header.classList.add("shadow-md", "backdrop-blur-md", "bg-surface/95", "dark:bg-surface-dark/95");
    } else {
      header.classList.remove("shadow-md", "backdrop-blur-md", "bg-surface/95", "dark:bg-surface-dark/95");
    }
  });
}

export function initToTop() {
  let toTopBtn = document.getElementById("back-to-top");

  // Nếu chưa có phần tử nút trong HTML, tự động tạo nút "Lên đầu trang"
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

  // Bài khởi động: nút "Lên đầu trang" hiện khi trang đã cuộn quá 400px
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
