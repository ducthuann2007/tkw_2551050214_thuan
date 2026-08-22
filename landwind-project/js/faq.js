// js/faq.js - Quản lý Accordion câu hỏi thường gặp dùng Event Delegation (Nhiệm vụ 3 - Tiết 3)

export function initFaq() {
  const root = document.getElementById("faq");
  if (!root) return; // Trang này không có FAQ -> thoát êm

  const triggers = root.querySelectorAll("[data-faq-trigger]");

  function setOpen(trigger, open) {
    const controlsId = trigger.getAttribute("aria-controls");
    const answer = document.getElementById(controlsId);
    if (!answer) return;

    trigger.setAttribute("aria-expanded", String(open));
    answer.classList.toggle("hidden", !open);

    // Xoay icon mũi tên mở rộng
    const icon = trigger.querySelector("[data-faq-icon]");
    if (icon) {
      icon.classList.toggle("rotate-180", open);
    }
  }

  // Accordion dùng event delegation: một listener cho cả nhóm, không phải mỗi nút một listener
  root.addEventListener("click", (e) => {
    // e.target.closest(...) xử lý luôn trường hợp người dùng bấm trúng icon SVG bên trong nút
    const trigger = e.target.closest("[data-faq-trigger]");
    if (!trigger) return;

    const willOpen = trigger.getAttribute("aria-expanded") !== "true";
    triggers.forEach((t) => setOpen(t, false)); // Đóng hết
    if (willOpen) setOpen(trigger, true);       // Rồi mở đúng cái vừa bấm
  });
}
