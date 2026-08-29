// js/slider.js - Slider cảm nhận viết tay, hỗ trợ accessibility và tự động dừng (Nhiệm vụ 5 - Tiết 5)

export function initSlider(rootSelector = "#testimonial-slider") {
  const root = typeof rootSelector === "string" ? document.querySelector(rootSelector) : rootSelector;
  if (!root) return;

  const track = root.querySelector("[data-slider-track]");
  const slides = root.querySelectorAll("[data-slider-slide]");
  const prevBtn = root.querySelector("[data-slider-prev]");
  const nextBtn = root.querySelector("[data-slider-next]");
  const dotsContainer = root.querySelector("[data-slider-dots]");

  if (!track || !slides.length) return;

  let index = 0;
  let timer = null;
  const intervalMs = 4500;

  // 3. Chấm chỉ dẫn phải sinh bằng JS từ số slide thật, không viết cứng trong HTML
  let dots = [];
  if (dotsContainer) {
    dotsContainer.innerHTML = "";
    slides.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.setAttribute("aria-label", `Chuyển đến cảm nhận ${i + 1}`);
      dot.className =
        "transition-all duration-300 cursor-pointer focus:outline-none " +
        (i === 0
          ? "bg-brand-600 scale-110 w-6 sm:w-8 h-2.5 sm:h-3 rounded-pill"
          : "w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-muted/40 dark:bg-muted-invert/40 hover:bg-brand-600/60");
      dot.addEventListener("click", () => {
        go(i);
      });
      dotsContainer.appendChild(dot);
      dots.push(dot);
    });
  }

  function go(next) {
    // 1. (next + slides.length) % slides.length — một dòng lo cả hai đầu. Vòng tròn cả hai chiều.
    index = (next + slides.length) % slides.length;
    track.style.transform = `translateX(-${index * 100}%)`;

    // 2. inert trên các slide đang ẩn. Tránh lỗi focus ngoài màn hình khi nhấn Tab.
    slides.forEach((s, i) => s.toggleAttribute("inert", i !== index));

    // Cập nhật trạng thái chấm chỉ dẫn
    if (dots.length) {
      dots.forEach((dot, i) => {
        const isActive = i === index;
        dot.className =
          "transition-all duration-300 cursor-pointer focus:outline-none " +
          (isActive
            ? "bg-brand-600 scale-110 w-6 sm:w-8 h-2.5 sm:h-3 rounded-pill"
            : "w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-muted/40 dark:bg-muted-invert/40 hover:bg-brand-600/60");
        dot.setAttribute("aria-current", String(isActive));
      });
    }
  }

  function start() {
    if (timer) clearInterval(timer);
    timer = setInterval(() => {
      go(index + 1);
    }, intervalMs);
  }

  function stop() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      go(index - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      go(index + 1);
    });
  }

  // Tự chạy nhưng biết dừng khi người dùng đang xem:
  root.addEventListener("mouseenter", stop);
  root.addEventListener("mouseleave", start);
  root.addEventListener("focusin", stop); // ai đó đang dùng bàn phím
  root.addEventListener("focusout", start);
  document.addEventListener("visibilitychange", () => (document.hidden ? stop() : start()));

  // Khởi tạo trạng thái ban đầu
  go(0);
  start();
}

if (typeof window !== "undefined") {
  window.initSlider = initSlider;
}
