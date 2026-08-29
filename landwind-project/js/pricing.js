// js/pricing.js - Quản lý công tắc chuyển đổi giá tháng / năm (Nhiệm vụ 4 - Tiết 4)

export function initPricing() {
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

  // Khởi tạo ban đầu
  updatePrices(toggle.getAttribute("aria-checked") === "true");

  toggle.addEventListener("click", () => {
    const isChecked = toggle.getAttribute("aria-checked") === "true";
    updatePrices(!isChecked);
  });
}
