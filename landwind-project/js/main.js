// js/main.js – Điểm khởi động duy nhất, hoạt động hoàn hảo trên mọi môi trường và giao thức file://

// 1. Quản lý Dark Mode với icon Venom / Người Nhện đỏ (Nhiệm vụ 3 - Tiết 3)
function initTheme() {
  const themeToggleBtn = document.getElementById("theme-toggle");
  if (!themeToggleBtn) return;

  function toggle() {
    const isDark = document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }

  themeToggleBtn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggle();
  });
}

// 2. Quản lý Menu Mobile và 3 cách đóng (Nhiệm vụ 2 - Tiết 2)
function initNav() {
  const toggle = document.getElementById("nav-toggle") || document.querySelector('[aria-label*="menu"]');
  const menu = document.getElementById("main-nav") || document.querySelector('nav[aria-label="Điều hướng chính"]');
  const header = document.getElementById("main-header") || document.querySelector("header");

  if (!toggle || !menu) return;

  // Khởi tạo thuộc tính ARIA
  if (!toggle.hasAttribute("aria-expanded")) {
    toggle.setAttribute("aria-expanded", "false");
  }
  if (!toggle.hasAttribute("aria-label")) {
    toggle.setAttribute("aria-label", "Mở menu");
  }

  // Hàm đóng/mở chạm đủ 4 thứ: UI, ARIA expanded, ARIA label, overflow-hidden body
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

  // Bấm vào nút hamburger để chuyển đổi trạng thái
  toggle.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    setOpen(!isOpen);
  });

  // Ba cách đóng menu:
  // 1. Phím ESC (kèm toggle.focus() để trả tiêu điểm về)
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

  // 3. Khi màn hình phóng lên desktop (>= 1024px)
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

// 3. Navbar khi cuộn — dùng IntersectionObserver, không dùng sự kiện scroll
function initHeaderOnScroll() {
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
function initFaq() {
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
function initToTop() {
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

// 6. Công tắc giá tháng / năm dùng Intl.NumberFormat và role="switch" (Nhiệm vụ 4 - Tiết 4)
function initPricing() {
  const toggle = document.querySelector('[role="switch"]#pricing-toggle') || document.querySelector('[role="switch"]');
  const priceElements = document.querySelectorAll("[data-price]");
  const cycleElements = document.querySelectorAll("[data-billing-cycle]");

  if (!toggle || !priceElements.length) return;

  const dong = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  });

  function updatePrices(isYearly) {
    toggle.setAttribute("aria-checked", String(isYearly));

    const thumb = toggle.querySelector("[data-switch-thumb]");
    if (thumb) {
      thumb.classList.toggle("translate-x-5", isYearly);
      thumb.classList.toggle("translate-x-0", !isYearly);
    }

    priceElements.forEach((el) => {
      const rawValue = isYearly ? el.dataset.yearly : el.dataset.monthly;
      if (rawValue) {
        el.textContent = dong.format(Number(rawValue));
      }
    });

    cycleElements.forEach((el) => {
      el.textContent = isYearly ? "/năm" : "/tháng";
    });
  }

  // Khởi tạo trạng thái giá ban đầu
  updatePrices(toggle.getAttribute("aria-checked") === "true");

  toggle.addEventListener("click", () => {
    const isChecked = toggle.getAttribute("aria-checked") === "true";
    updatePrices(!isChecked);
  });
}

// 7. Công tắc Bật/Tắt hiệu ứng chuyển động (Chống chóng mặt/tiền đình)
function initMotionToggle() {
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

// 8. Hiệu ứng lộ dần khi cuộn chạy từ dưới lên trên toàn bộ trang web (Nhiệm vụ 4 - Tiết 4)
function initScrollReveal() {
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

// 9. Slider cảm nhận viết tay, hỗ trợ accessibility và tự động dừng (Nhiệm vụ 5 - Tiết 5)
function initSlider(rootSelector = "#testimonial-slider") {
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

// 10. Hiệu ứng số chạy từ 0 đến số đích khi cuộn tới
function initCounters() {
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

// Gán vào window để hỗ trợ gọi từ bất kỳ đâu nếu cần
window.initTheme = initTheme;
window.initNav = initNav;
window.initHeaderOnScroll = initHeaderOnScroll;
window.initFaq = initFaq;
window.initToTop = initToTop;
window.initPricing = initPricing;
window.initMotionToggle = initMotionToggle;
window.initScrollReveal = initScrollReveal;
window.initSlider = initSlider;
window.initCounters = initCounters;

// Khởi chạy an toàn khi DOM sẵn sàng
function start() {
  try { initTheme(); } catch (e) { console.error(e); }
  try { initNav(); } catch (e) { console.error(e); }
  try { initHeaderOnScroll(); } catch (e) { console.error(e); }
  try { initFaq(); } catch (e) { console.error(e); }
  try { initToTop(); } catch (e) { console.error(e); }
  try { initPricing(); } catch (e) { console.error(e); }
  try { initMotionToggle(); } catch (e) { console.error(e); }
  try { initScrollReveal(); } catch (e) { console.error(e); }
  try { initSlider(); } catch (e) { console.error(e); }
  try { initCounters(); } catch (e) { console.error(e); }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", start);
} else {
  start();
}
