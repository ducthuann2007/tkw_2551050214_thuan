// js/reveal.js - Hiệu ứng lộ dần khi cuộn và Công tắc chống tiền đình / giảm chuyển động (Nhiệm vụ 4 - Tiết 4)

export function initMotionToggle() {
  const motionToggleBtn = document.getElementById("motion-toggle");
  const onIcon = document.getElementById("motion-toggle-on-icon");
  const offIcon = document.getElementById("motion-toggle-off-icon");

  function isMotionReduced() {
    const saved = localStorage.getItem("motion-reduce");
    if (saved !== null) return saved === "true";
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function syncUI(reduced) {
    document.documentElement.classList.toggle("reduce-motion", reduced);
    if (onIcon && offIcon) {
      onIcon.classList.toggle("hidden", reduced);
      offIcon.classList.toggle("hidden", !reduced);
    }
    if (motionToggleBtn) {
      motionToggleBtn.setAttribute(
        "title",
        reduced
          ? "Đang tắt hiệu ứng chuyển động (Chống chóng mặt/tiền đình) - Bấm để bật lại"
          : "Đang bật hiệu ứng chuyển động - Bấm để tắt (Chống chóng mặt/tiền đình)"
      );
      motionToggleBtn.setAttribute("aria-pressed", String(reduced));
    }
    if (reduced) {
      document.querySelectorAll(".reveal-on-scroll, [data-reveal]").forEach((el) => {
        el.classList.add("is-visible");
      });
    }
  }

  // Khởi tạo trạng thái ban đầu
  syncUI(isMotionReduced());

  if (motionToggleBtn) {
    motionToggleBtn.addEventListener("click", () => {
      const currentReduced = document.documentElement.classList.contains("reduce-motion");
      const nextReduced = !currentReduced;
      localStorage.setItem("motion-reduce", String(nextReduced));
      syncUI(nextReduced);
    });
  }
}

export function initScrollReveal() {
  const items = document.querySelectorAll(".reveal-on-scroll, [data-reveal]");
  if (!items.length) return;

  const savedMotion = localStorage.getItem("motion-reduce");
  const isReduced = savedMotion !== null
    ? savedMotion === "true"
    : window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Bắt buộc tôn trọng người dùng nếu đã bật chế độ giảm chuyển động
  if (isReduced) {
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
