// js/reveal.js - Hiệu ứng lộ dần khi cuộn, tôn trọng prefers-reduced-motion (Nhiệm vụ 4 - Tiết 4)

export function initScrollReveal() {
  const items = document.querySelectorAll(".reveal-on-scroll, [data-reveal]");
  if (!items.length) return;

  // Bắt buộc tôn trọng người dùng nếu đã bật prefers-reduced-motion
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    items.forEach((el) => el.classList.add("is-visible")); // hiện luôn, không animate
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target); // Ngắt theo dõi ngay sau khi phần tử đã hiện
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: "0px 0px -40px 0px"
  });

  items.forEach((el) => observer.observe(el));
}
