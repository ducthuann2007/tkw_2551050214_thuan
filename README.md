Link Figma: https://www.figma.com/design/75ddYYpn0x33POxewcXaVE/Landwind---Tailwind-CSS-Landing-Page--Community-?node-id=1-19856&p=f&t=qFOWOFFlkPROeGTu-0

## 🌐 URL Công khai (GitHub Pages):
- **Trang chủ (Redirect):** https://ducthuann2007.github.io/tkw_2551050214_thuan/
- **Landing Page Chính:** https://ducthuann2007.github.io/tkw_2551050214_thuan/landwind-project/src/index.html
- **Trang Bảng Giá (Pricing):** https://ducthuann2007.github.io/tkw_2551050214_thuan/landwind-project/src/pricing.html
- **Trang Liên Hệ (Contact):** https://ducthuann2007.github.io/tkw_2551050214_thuan/landwind-project/src/contact.html

---

## 📋 Thiết lập thiết kế:
- **Chủ đề:** Đồ chơi
- **Sản phẩm:** Spider-Man (Người Nhện)
- **Màu thương hiệu:** Đỏ `#ce181e`
- **Màu nhấn:** Xanh nước biển `#0476d0`
- **Màu chữ & nền:**
  - `--color-ink`: `#0f172a` (Chữ chính)
  - `--color-muted`: `#64748b` (Chữ phụ)
  - `--color-line`: `#e2e8f0` (Đường viền)
  - `--color-surface`: `#ffffff` (Nền sáng)
- **Token ngữ nghĩa Dark Mode:**
  - `--color-ink-invert`: `#f1f5f9`
  - `--color-muted-invert`: `#94a3b8`
  - `--color-line-invert`: `#334155`
  - `--color-surface-dark`: `#0b0f19`
  - `--color-surface-dark-alt`: `#131b2e`
- **Typography:**
  - `--font-display`: `"Bebas Neue", "Oswald", system-ui, sans-serif;` (Font chữ comic)
  - `--font-body`: `"Inter", system-ui, sans-serif;`
- **Bo góc & khoảng cách:**
  - `--radius-card`: `0.875rem`
  - `--radius-pill`: `9999px`
  - Padding dọc section: `80px` (`py-20 lg:py-28`)

---

## 5. YÊU CẦU HOÀN THÀNH (CHECKLIST)
- [x] Không có scroll ngang ở 360px trên cả ba trang (`index.html`, `pricing.html`, `contact.html`).
- [x] Mọi class responsive viết theo hướng mobile-first (`text-4xl sm:text-5xl lg:text-6xl`, `grid sm:grid-cols-2 lg:grid-cols-3`...).
- [x] Bật class `dark` cho kết quả dùng được: chữ đọc rõ, độ tương phản cao, không có mảng trắng lòi ra; có nút bấm bật/tắt Dark Mode ngay trên Header.
- [x] Dark mode khai báo qua token ngữ nghĩa (`--color-surface-dark`, `--color-ink-invert`...), không rải `dark:bg-gray-800` khắp HTML.
- [x] Có 8–10 component trong `@layer components` (`.section`, `.eyebrow`, `.btn`, `.btn-primary`, `.btn-secondary`, `.btn-ghost`, `.card`, `.badge`, `.field-label`, `.field-input`, `.field-error`), sử dụng trên cả 3 trang.
- [x] `pricing.html` và `contact.html` hoàn chỉnh, tái sử dụng toàn bộ component.
- [x] Form liên hệ đi được hết bằng Tab, mỗi ô focus thấy rõ viền ring, có nhãn thật (`<label for="...">`), có dòng hint và thông báo lỗi `role="alert"`.
- [x] Có URL công khai chạy được trên GitHub Pages, đã ghi đầy đủ vào README.

---

## Sẽ làm lại nếu có thêm thời gian:
- Hiện tại Header và Footer đang bị sao chép lặp lại ở cả 3 file HTML tĩnh (`index.html`, `pricing.html`, `contact.html`). Đây là giới hạn thực tế của HTML tĩnh (static HTML). 
- Khi chuyển sang các môn học về component và framework sau này (như React, Vue, Next.js, Astro), tôi sẽ tách Header và Footer thành các component độc lập để tái sử dụng toàn diện, giảm trùng lặp mã nguồn và nâng cao khả năng mở rộng.
