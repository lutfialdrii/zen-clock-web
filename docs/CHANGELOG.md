# Changelog: Zen Flip Clock

Dokumen ini mencatat seluruh pembaruan, penambahan fitur, perbaikan bug, dan keputusan arsitektur proyek **Zen Flip Clock** secara kronologis terbalik (*newest first*).

---

## [2026-09-26] - Transformasi Central Ecosystem Web Hub & Landing Page

- **Prompt Pengguna:**
  > *"saya akan membuat branding Zen Clock: Pomodoro & Muslim Prayer Times di berbagai app saya, dengan terpusat akan saya hosting sebuah websitenya sebagai landing page yaitu pada @zen-flip-clock. untuk saat ini yang sedang saya kembangkan extension code editor @extension-clock, extension browser @extension-browser-zen-clock dan cli program @cli-zen-clock, dan mungkin nantinya akan saya kembangkan di native app seperti di windows, macbook, linux ataupun mobile, bagaimana strategi pembuatan websitenya landing pagenya yang dalam hal ini akan kita kembangin pada project @zen-flip-clock"*
- **Commits Terkait:**
  - [`754a515`](file:///Users/sm/Documents/Lutfi/DEV/Learn/zen-flip-clock): `refactor: use history.replaceState for silent hash synchronization`
  - [`3e2438d`](file:///Users/sm/Documents/Lutfi/DEV/Learn/zen-flip-clock): `docs: add MIT license file`
  - [`9607c31`](file:///Users/sm/Documents/Lutfi/DEV/Learn/zen-flip-clock): `docs: document Zen Clock ecosystem hub and multi-platform routes`
  - [`32a42bc`](file:///Users/sm/Documents/Lutfi/DEV/Learn/zen-flip-clock): `chore(lint): configure ESLint rules and fix unused variable in PrayerTime`
  - [`aebf0ab`](file:///Users/sm/Documents/Lutfi/DEV/Learn/zen-flip-clock): `feat: integrate non-intrusive bottom dock and SPA routing for /apps`
  - [`850e6ba`](file:///Users/sm/Documents/Lutfi/DEV/Learn/zen-flip-clock): `feat(showcase): implement AppsShowcase layout and responsive segmented control`
  - [`f663bb9`](file:///Users/sm/Documents/Lutfi/DEV/Learn/zen-flip-clock): `feat(showcase): add dedicated tab components for VS Code, Browser, CLI, and Native Roadmap`
  - [`4c58c55`](file:///Users/sm/Documents/Lutfi/DEV/Learn/zen-flip-clock): `feat(i18n): implement bilingual translation engine with browser detection`
  - [`c753b35`](file:///Users/sm/Documents/Lutfi/DEV/Learn/zen-flip-clock): `style: define unified Zen Design System tokens and dock footer styles`
- **Komponen & File Terkait:**
  - `src/index.css`: Penambahan tokens sistem desain terpadu (obsidian canvas, amber spiritual accent, emerald focus accent, glassmorphism, dan utility classes).
  - `src/utils/i18n.js` & `src/utils/translations.js`: Engine bilingual mandiri (ID/EN) dengan auto-detect browser dan persistensi `localStorage`.
  - `src/components/showcase/AppsShowcase.jsx` & `.css`: Shell landing page showcase ekosistem dengan segmented tab control dan URL hash sync.
  - `src/components/showcase/VSCodeTab.jsx`: Panel showcase ekstensi VS Code dengan 1-click install command box, badge marketplace, dan link langsung.
  - `src/components/showcase/BrowserTab.jsx`: Panel showcase ekstensi browser multi-peramban dan panduan instalasi manual *developer mode*.
  - `src/components/showcase/CliTab.jsx`: Panel showcase terminal CLI Go dengan selector perintah multi-metode dan simulasi terminal ASCII/TUI.
  - `src/components/showcase/NativeTab.jsx`: Panel showcase roadmap desktop & mobile beserta tombol GitHub Star.
  - `src/App.jsx`: Integrasi routing zero-dependency (HTML5 History API) dan penyematan footer dock minimalis pada live clock.
  - `README.md` & `LICENSE`: Dokumentasi komprehensif ekosistem dan lisensi open source MIT.
- **Keputusan Desain & Rationale:**
  - **Preservasi Live Clock**: Halaman root (`/`) dijaga tetap bersih tanpa promosi agresif agar fungsi utama sebagai PWA jam meja layar penuh tetap sakral dan menenangkan.
  - **Zero-Dependency Routing**: Memanfaatkan native HTML5 History API daripada memasang library router eksternal, menjaga ukuran bundle tetap super ringan (~252 kB JS) dan loading instan.
  - **Silent Hash Sync**: Menggunakan `history.replaceState` untuk memperbarui hash URL antar tab tanpa memicu lonjakan scroll browser yang mengganggu.
- **Hasil Verifikasi:**
  - Linter: `0 errors, 0 warnings` (`npm run lint`).
  - Production Build: Lulus tanpa error dalam 304ms, precache service worker aktif (`npm run build`).

---

## [2026-09-25] - Halaman Landing VS Code Extension Bridge (/extension)

- **Prompt Pengguna:** Pembuatan halaman landing pertama untuk menghubungkan pengguna web clock dengan rilis ekstensi VS Code di Visual Studio Marketplace.
- **Commit:** [`7731b0e`](file:///Users/sm/Documents/Lutfi/DEV/Learn/zen-flip-clock): `feat(landing): add /extension landing page bridging to VS Code Marketplace`
- **Komponen Terkait:**
  - `src/components/ExtensionLanding.jsx`
  - `src/components/ExtensionLanding.css`
- **Keputusan Desain:** Menyediakan jembatan awal bagi pengguna web untuk mengetahui keberadaan ekstensi code editor.

---

## [2026-09-14] - Inisialisasi Standalone Web & PWA Zen Flip Clock

- **Tujuan:** Pemisahan repositori web mandiri dari repositori ekstensi VS Code (`extension-clock`).
- **Commit:** [`afdb85e`](file:///Users/sm/Documents/Lutfi/DEV/Learn/zen-flip-clock): `feat(web): initialize standalone Zen Flip Clock PWA repository with Pomodoro and Prayer Times`
- **Komponen Terkait:**
  - `src/components/FlipClock.jsx` & `FlipUnit.jsx`: Animasi kartu flip jam 3D berbasis CSS perspective.
  - `src/components/PrayerTime.jsx`: Komputasi jadwal sholat berbasis astronomis (Adhan.js) dengan parameter Kemenag RI (+2 menit waktu pengaman/ihtiyat).
  - `src/components/PomodoroTimer.jsx`: Timer produktivitas interval fokus dan istirahat.
  - `vite.config.js`: Konfigurasi PWA menggunakan `vite-plugin-pwa`.
