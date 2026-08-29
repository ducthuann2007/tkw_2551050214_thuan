// js/counter.js - Hiệu ứng số chạy từ 0 đến số đích khi cuộn tới

export function initCounters() {
  const counters = document.querySelectorAll("[data-counter]");
  if (!counters.length) return;

  const isReduced =
    document.documentElement.classList.contains("reduce-motion") ||
    localStorage.getItem("motion-reduce") === "true" ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Nếu người dùng bật chế độ chống tiền đình / giảm chuyển động, hiển thị số đích ngay
  if (isReduced) return;

  function animateCounter(el) {
    const target = parseFloat(el.getAttribute("data-counter"));
    const suffix = el.getAttribute("data-suffix") || "";
    const prefix = el.getAttribute("data-prefix") || "";
    const decimals = parseInt(el.getAttribute("data-decimals") || "0", 10);
    const duration = 1800; // 1.8 giây
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing: easeOutExpo cho cảm giác số chạy nhanh lúc đầu rồi dừng lại êm ái
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = ease * target;

      if (decimals > 0) {
        el.textContent = `${prefix}${current.toFixed(decimals)}${suffix}`;
      } else {
        el.textContent = `${prefix}${Math.floor(current)}${suffix}`;
      }

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        // Đảm bảo số kết thúc chính xác 100%
        if (decimals > 0) {
          el.textContent = `${prefix}${target.toFixed(decimals)}${suffix}`;
        } else {
          el.textContent = `${prefix}${target}${suffix}`;
        }
      }
    }

    // Đặt giá trị ban đầu là 0 trước khi chạy
    if (decimals > 0) {
      el.textContent = `${prefix}${(0).toFixed(decimals)}${suffix}`;
    } else {
      el.textContent = `${prefix}0${suffix}`;
    }

    requestAnimationFrame(update);
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target); // Chỉ chạy 1 lần khi cuộn tới
        }
      });
    },
    {
      threshold: 0.2,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  counters.forEach((el) => observer.observe(el));
}

if (typeof window !== "undefined") {
  window.initCounters = initCounters;
}
