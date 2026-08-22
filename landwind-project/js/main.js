// js/main.js – điểm khởi động duy nhất cho tất cả các trang
import { initNav, initHeaderOnScroll, initToTop } from "./nav.js";
import { initTheme } from "./theme.js";
import { initFaq } from "./faq.js";

// Khởi chạy các module an toàn
try {
  initTheme();
} catch (err) {
  console.error("Lỗi khởi tạo Theme:", err);
}

try {
  initNav();
} catch (err) {
  console.error("Lỗi khởi tạo Nav:", err);
}

try {
  initHeaderOnScroll();
} catch (err) {
  console.error("Lỗi khởi tạo HeaderOnScroll:", err);
}

try {
  initToTop();
} catch (err) {
  console.error("Lỗi khởi tạo ToTop:", err);
}

try {
  initFaq();
} catch (err) {
  console.error("Lỗi khởi tạo FAQ:", err);
}
