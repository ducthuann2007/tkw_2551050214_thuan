// js/theme.js - Quản lý chế độ giao diện Dark / Light Mode với icon Venom / Spider-Man đỏ

export function initTheme() {
  const themeToggleBtn = document.getElementById("theme-toggle");
  const venomIcon = document.getElementById("theme-toggle-venom-icon");
  const spiderIcon = document.getElementById("theme-toggle-spider-icon");

  function syncThemeIcons() {
    const isDark = document.documentElement.classList.contains("dark");
    if (isDark) {
      // Đang ở Dark Mode -> hiển thị đầu Người Nhện đỏ để bấm về giao diện Sáng
      if (spiderIcon) spiderIcon.classList.remove("hidden");
      if (venomIcon) venomIcon.classList.add("hidden");
      if (themeToggleBtn) themeToggleBtn.setAttribute("title", "Bấm đầu Người Nhện đỏ để chuyển sang giao diện Sáng");
    } else {
      // Đang ở Light Mode -> hiển thị đầu Venom đen để bấm sang giao diện Tối
      if (spiderIcon) spiderIcon.classList.add("hidden");
      if (venomIcon) venomIcon.classList.remove("hidden");
      if (themeToggleBtn) themeToggleBtn.setAttribute("title", "Bấm đầu Venom đen để chuyển sang giao diện Tối");
    }
  }

  function toggle() {
    const isDark = document.documentElement.classList.contains("dark");
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    syncThemeIcons();
  }

  window.toggleTheme = toggle;

  // Đồng bộ icon theo trạng thái theme hiện tại
  syncThemeIcons();

  // Bắt sự kiện click vào nút
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", (e) => {
      e.preventDefault();
      toggle();
    });
  }
}
