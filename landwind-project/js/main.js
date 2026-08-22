// js/main.js – điểm khởi động duy nhất cho tất cả các trang
import { initNav, initHeaderOnScroll, initToTop } from "./nav.js";
import { initTheme } from "./theme.js";
import { initFaq } from "./faq.js";

// Khởi chạy các module
initNav();
initTheme();
initHeaderOnScroll();
initToTop();
initFaq();
