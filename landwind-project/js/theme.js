// js/theme.js - Quản lý chế độ giao diện Dark / Light Mode
export function initTheme() {
  const themeToggleBtn = document.getElementById("theme-toggle");
  const darkIcon = document.getElementById("theme-toggle-dark-icon");
  const lightIcon = document.getElementById("theme-toggle-light-icon");

  // Thoát êm nếu trang hiện tại không có nút chuyển đổi theme
  if (!themeToggleBtn) return;

  function syncThemeIcons() {
    if (document.documentElement.classList.contains("dark")) {
      if (lightIcon) lightIcon.classList.remove("hidden");
      if (darkIcon) darkIcon.classList.add("hidden");
    } else {
      if (lightIcon) lightIcon.classList.add("hidden");
      if (darkIcon) darkIcon.classList.remove("hidden");
    }
  }

  // Đồng bộ icon theo trạng thái theme hiện tại
  syncThemeIcons();

  // Bắt sự kiện click để chuyển đổi chế độ
  themeToggleBtn.addEventListener("click", () => {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    syncThemeIcons();
  });
}
