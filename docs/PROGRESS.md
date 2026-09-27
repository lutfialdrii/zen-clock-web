# Zen Clock: Progress Tracker & Roadmap

Dokumen ini memantau milestone, status implementasi fitur, dan roadmap dari **Zen Flip Clock** sebagai **Central Web Hub & Standalone PWA**.

---

## 📊 Matriks Progres Milestone

| Milestone | Target | Status | Tanggal Selesai | Catatan Kritis |
| :--- | :--- | :---: | :---: | :--- |
| **Fase 1: Standalone Web & PWA** | Web Clock, Prayer Times, Pomodoro | ✅ **Selesai** | 2026-09-14 | Repositori mandiri terpisah dari ekstensi |
| **Fase 2: VS Code Extension Bridge** | Landing page `/extension` | ✅ **Selesai** | 2026-09-25 | Promosi rilis awal Visual Studio Marketplace |
| **Fase 3: Central Ecosystem Hub** | Hub landing page terpadu di `/apps` | ✅ **Selesai** | 2026-09-26 | Arsitektur SPA multi-tab, i18n, design tokens |
| **Fase 4: Web Clock Feature Parity** | Paritas Kustomisasi & Modals dengan Extension | ✅ **Selesai** | 2026-09-26 | SettingsModal, CityPicker (539+ kota), AdjustModal, Theme |
| **Fase 4.1: Product Reordering & Copy Refinement** | Browser #1, "Zen Clock Apps", Narasi Luwes | ✅ **Selesai** | 2026-09-26 | Browser Extension default, gaya bahasa ramah & natural |
| **Fase 4.2: Official Title & Release Statuses** | "Zen Clock: Pomodoro & Muslim Prayer Times", Status Badges | ✅ **Selesai** | 2026-09-26 | Hero "Muslim Utilities", pola judul tab, status rilis presisi |
| **Fase 4.3: Showcase Simplification & Visual Restoration** | Frame Preview macOS, Single Hero, README Alignment | ✅ **Selesai** | 2026-09-26 | Hapus double-hero, frame preview jendela, tautan resmi README |
| **Fase 4.4: Multi-Page Platform Architecture & Explore Hub** | Dedicated `/vscode` & `/browser`, bridging `/explore` | ✅ **Selesai** | 2026-09-26 | Routing SPA terfokus, restorasi kemewahan landing page awal |
| **Fase 4.5: Storage Persistence, Security Audit & Hook Stabilization** | Multi-Tab Storage Sync, Security Hardening, Zero-Lag Hooks | ✅ **Selesai** | 2026-09-27 | Perbaikan infinite re-render loop, `useCallback` i18n, `storage` listener |
| **Fase 4.6: Privacy Policy, Support Hub & Notification Polish** | Dedicated `/privacy-policy` & `/support`, In-App Banner & Reminders | ✅ **Selesai** | 2026-09-27 | Standarisasi footer, rute dukungan langsung, banner izin notifikasi, dan balancing tipografi |
| **Fase 5: Audio & Deployment** | Audio Adzan, Gentle Chime, CI/CD Hosting | ⏳ **Backlog** | Q4 2026 | Cloudflare Pages / Vercel rewrite & automated test |

---

## ✅ Rincian Milestone yang Telah Selesai

### Fase 4.6: Privacy Policy, Support Hub & Notification Polish (Selesai: 2026-09-27)
- [x] **Halaman Bantuan & Dukungan Pengguna Mandiri (`/support` & `/help`)**:
  - Saluran kontak langsung: Laporkan Bug via GitHub Issues, Usulan Fitur & Ide via GitHub Issues, dan Email Langsung ke pengembang.
  - Kartu dukungan komunitas (*Support Creator*) via Saweria dan Star GitHub.
  - Takedown konten FAQ untuk menjaga halaman tetap ringkas, bersih, dan berfokus pada saluran kontak langsung.
- [x] **Kebijakan Privasi Resmi (`/privacy-policy`)**:
  - Halaman dedikasi dwibahasa (ID / EN) yang memenuhi standar privasi Google Chrome Web Store, Visual Studio Marketplace, dan regulasi privasi global.
  - Penegasan 100% data tersimpan di perangkat lokal pengguna tanpa analitik pelacak.
- [x] **Standarisasi Footer Lintas Halaman**:
  - Format footer seragam di semua rute (`/vscode`, `/browser`, `/explore`, `/privacy-policy`, `/support`):
    `Zen Clock Apps`
    `Lisensi Open Source MIT • Privacy Policy • Help & Support`
- [x] **Penyempurnaan Arsitektur Notifikasi & In-App Reminder**:
  - Spanduk kontekstual izin notifikasi non-intrusif (`NotificationBanner.jsx`) dengan opsi "Izinkan Notifikasi" dan "Nanti Saja".
  - Layar pengingat serena in-app (`ReminderModal.jsx`) lengkap dengan Web Audio API sintetis (gentle chime) dan `notification.onclick = () => window.focus()`.
- [x] **Harmonisasi Tipografi & Proporsi Tampilan**:
  - Menyeimbangkan tipografi kartu creator support di `ExplorePage.css` (`.support-title` 14.5px semi-bold, `.support-desc` 12.5px) agar proporsional dan selaras dengan estetika Zen Clock.

### Fase 4.5: Storage Persistence, Security Audit & Hook Stabilization (Selesai: 2026-09-27)
- [x] **Eliminasi Infinite Render Loop & Stabilitas Navigasi**:
  - Mengisolasi dependensi bahasa pada hook `useLanguage` menggunakan `useCallback` dan `useMemo` sehingga referensi fungsi tidak berubah setiap render.
  - Memanfaatkan `useRef` di `App.jsx` untuk menjaga inisialisasi state hanya berjalan 1 kali saat mount, menghentikan loop re-render tak berujung yang sebelumnya membuat browser lag dan crash.
- [x] **Sinkronisasi Multi-Tab Real-time**:
  - Menambahkan listener event native `window.addEventListener('storage', ...)` untuk sinkronisasi seketika saat kota, warna aksen, atau jadwal sholat diubah di tab lain.
- [x] **Audit Keamanan & Ketahanan Error Storage**:
  - Membungkus akses storage `getLastRemindedPrayer` dan `setLastRemindedPrayer` dengan `try...catch` agar tahan pada mode penyamaran ketat (strict private browsing).
  - Sanitasi validasi format HEX warna aksen sebelum diset ke CSS variable `--zen-accent`.

### Fase 4.4: Multi-Page Platform Architecture & Explore Hub (Selesai: 2026-09-26)
- [x] **Bridging Hub Page (`/explore`)**:
  - Halaman perantara anggun yang memperkenalkan ekosistem Zen Clock dan mengarahkan pengguna ke platform tujuannya (Web Clock, VS Code, Browser, CLI, Mobile).
  - Dilengkapi banner apresiasi Saweria dan Star GitHub.
- [x] **Restorasi Dedicated Landing Page VS Code (`/vscode` & `/extension`)**:
  - Mengembalikan struktur landing page awal yang mewah dan terfokus: Hero luas, frame preview jendela macOS, 6 fitur lengkap dari README, galeri tangkapan layar antarmuka editor, dan tombol instalasi 1-klik / CLI.
- [x] **Dedicated Landing Page Browser Extension (`/browser`)**:
  - Halaman terpisah khusus untuk Chrome & Edge: Hero, frame preview jendela macOS (`preview-extension.png`), 3 pilar fitur browser, accordion instalasi manual (Developer Mode), dan tautan rilis ZIP.
- [x] **Sinkronisasi Routing SPA & History API**:
  - Dukungan navigasi mulus menggunakan HTML5 History API (`pushState`) dan fallback hash (`/#explore`, `/#vscode`, `/#browser`) untuk static hosting.
  - Dukungan navigasi dua arah (breadcrumb kembali ke `/explore` dan buka `Web Clock`).

### Fase 4.3: Showcase Simplification & Visual Restoration (Selesai: 2026-09-26)
- [x] **Eliminasi Double Hero & Redundansi Headline**:
  - Menghapus hero statis berulang dari `AppsShowcase.jsx` sehingga alur halaman langsung fokus pada tab platform yang aktif tanpa teks yang bertumpang tindih.
- [x] **Restorasi Frame Preview Antarmuka macOS**:
  - Menghadirkan kembali bingkai jendela macOS (`.showcase-preview-frame` dengan titik merah, kuning, hijau) pada tab VS Code dan Browser Extension.
  - Memanfaatkan aset tangkapan layar antarmuka nyata (`preview-fullview.png` dan `preview-extension.png`).
- [x] **README sebagai Single Source of Truth**:
  - Menyederhanakan kartu fitur di web menjadi 3 pilar utama dan menyematkan tautan resmi langsung ke dokumentasi GitHub README masing-masing repo.
- [x] **Tombol Apresiasi "Star di GitHub"**:
  - Tombol aksi `.cta-btn.github-star` dengan ikon bintang interaktif beranimasi pendar emas pada tab VS Code dan Browser.

### Fase 4.2: Official Title, Tab Titles Pattern & Accurate Release Statuses (Selesai: 2026-09-26)
- [x] **Hero Section Resmi & Browser Metadata**:
  - Hero Tag: "Muslim Utilities".
  - Hero Title: "Zen Clock: Pomodoro & Muslim Prayer Times".
  - Hero Subtitle: "Tetap Fokus & Ingat Waktu sebagai Muslim.".
  - Browser `<title>` dan meta deskripsi di `index.html`.
- [x] **Pola Judul Tab Terpadu**:
  - Mengadopsi format `Zen Clock, Jadwal Sholat serta Pomodoro di {{app}}` pada semua tab platform.
- [x] **Status Rilis Produk yang Presisi**:
  - VS Code Extension: Live & Stable (indikator hijau emerald).
  - Browser Extension & CLI Program: Dalam Pengembangan / In Development (indikator titik amber).
  - Native App: Research & Plan.

### Fase 4.1: Product Reordering & Copy Refinement (Selesai: 2026-09-26)
- [x] **Standarisasi Penamaan "Zen Clock Apps"**:
  - Mengganti istilah "Ekosistem" menjadi "Zen Clock Apps" di seluruh navigasi, hero, settings modal widget, dan dock.
- [x] **Reordering Tab Produk (Browser Extension #1)**:
  - Browser Extension diposisikan sebagai produk unggulan #1 dan default tab di `/apps`.
  - Urutan tab terpadu: Browser Extension ➔ VS Code Extension ➔ CLI Program ➔ Native & Mobile Roadmap.
- [x] **Penyempurnaan Gaya Bahasa Luwes & Ramah Pengguna (Human-like Copy)**:
  - Hero Tag: "Alat Fokus & Pengingat Waktu untuk Muslim".
  - Hero Subtitle: "Fokus dan Tetap Ingat Waktu sebagai Muslim.".
  - Tone-of-voice hangat, komunikatif, dan alami bagi target pengguna Indonesia di seluruh tab.

### Fase 4: Standalone Web Clock Customization & Feature Parity (Selesai: 2026-09-26)
- [x] **Paritas Bilah Kontrol Atas (`.deskclock-top-bar`)**:
  - Menyematkan brand identity Zen Clock, tab navigator dengan indikator titik hijau berdenyut (*pulsing dot*) saat Pomodoro aktif.
  - Tombol aksi terintegrasi: instalasi PWA, tombol modal pengaturan (`SettingsModal`), dan *toggle* layar penuh native (*Fullscreen*).
- [x] **Modal Pemilih Kota Lengkap (`CityPickerModal.jsx` & `citiesData.js`)**:
  - Katalog 539+ kota dan kabupaten di 38 provinsi Indonesia serta kota internasional terpopuler (Makkah, Madinah, Kuala Lumpur, Singapura).
  - Deteksi lokasi otomatis berbasis GPS Geolocation dan *reverse geocoding* OpenStreetMap Nominatim.
  - Pencarian lokasi global langsung untuk wilayah mana pun di dunia.
- [x] **Modal Koreksi Menit Waktu Sholat (`AdjustModal.jsx`)**:
  - Penyesuaian waktu sholat (-10 hingga +10 menit) untuk Subuh, Terbit, Dzuhur, Ashar, Maghrib, dan Isya.
  - Pratinjau langsung perbandingan jadwal dasar astronomis dan hasil koreksi secara instan.
- [x] **Modal Pengaturan Terpadu (`SettingsModal.jsx`)**:
  - Pemilihan 6 tema warna siap pakai (*Warm Amber, Cyberpunk Cyan, Emerald Forest, Rose Velvet, Violet Eclipse, Coral Sunset*) serta input kode HEX kustom.
  - Pengaturan durasi fokus kerja Pomodoro (15m, 20m, 25m, 30m, 45m, 50m, 60m) dan istirahat (3m, 5m, 10m, 15m).
  - Switch notifikasi waktu sholat dan notifikasi Pomodoro dengan tombol pengujian alert (*Test Prayer Alert*).
  - Pintasan cepat ke modal pemilih kota dan modal koreksi waktu sholat.
- [x] **Penyimpanan Reaktif & Background Ticker (`storage.js` & `App.jsx`)**:
  - State management berbasis `localStorage` dan CustomEvent `zen_settings_changed` & `zen_pomodoro_changed`.
  - Background ticker untuk transisi otomatis mode kerja/istirahat Pomodoro dan notifikasi adzan tepat waktu via Web Notification API.
- [x] **Perhitungan Astronomis Terkini (`prayerHelper.js`)**:
  - Formula perhitungan standar Kemenag RI (+2 menit ihtiyat).
  - Aturan otomatis penggantian nama Dzuhur menjadi "Jum'at" pada hari Jumat.
  - Format hitung mundur terjemahan dwibahasa ("X jam Y menit").

---

### Fase 3: Central Ecosystem Web Hub & Showcase Landing (Selesai: 2026-09-26)
- [x] **Unified Zen Design System Tokens (`src/index.css`)**:
  - Diterapkan palet obsidian pekat (`#0c0d10`), aksen amber (`#fbbf24`), dan emerald (`#10b981`).
  - Ditetapkan font monospace (`JetBrains Mono`) untuk jam & terminal.
  - Komponen glassmorphism terstandarisasi dengan `backdrop-filter: blur(12px)`.
- [x] **Bilingual Localization Engine (`src/utils/i18n.js` & `translations.js`)**:
  - Dukungan penuh Bahasa Indonesia (`ID`) dan Bahasa Inggris (`EN`).
  - Deteksi otomatis bahasa browser pengguna dengan fallback cerdas.
  - Penyimpanan preferensi pengguna di `localStorage` dan sinkronisasi lintas tab via event `storage`.
- [x] **Showcase Shell & Responsive Segmented Control (`AppsShowcase.jsx` & `AppsShowcase.css`)**:
  - Header mengambang (*sticky glassmorphic navbar*) dengan tombol kembali, branding, dan switcher bahasa.
  - Segmented tab control yang tersinkronisasi dua arah dengan hash URL (`#vscode`, `#browser`, `#cli`, `#native`).
  - Transisi tab mulus menggunakan `window.history.replaceState` untuk mencegah lonjakan scroll.
- [x] **Sub-Komponen Tab Showcase Platform**:
  - [x] **VS Code Extension Tab (`VSCodeTab.jsx`)**: 1-click copy CLI command `code --install-extension...`, marketplace badge, deep link `vscode:extension/...`, dan 4 grid fitur utama.
  - [x] **Browser Extension Tab (`BrowserTab.jsx`)**: Kompatibilitas Chrome/Edge/Brave/Firefox, link rilis, dan akordeon panduan 3 langkah *Developer Mode*.
  - [x] **CLI Program Tab (`CliTab.jsx`)**: Jam terminal berbasis bahasa Go (<10MB RAM), selector instalasi Homebrew/Go/Curl, dan simulasi terminal ASCII/TUI flip clock.
  - [x] **Native & Mobile Roadmap Tab (`NativeTab.jsx`)**: Kartu rencana macOS Menu Bar, Windows Tray, Linux Applet, Mobile Companion, serta tombol kontribusi GitHub Star.
- [x] **Live Web Clock Non-Intrusive Dock (`App.jsx`)**:
  - Halaman root (`/`) dipertahankan 100% *distraction-free* untuk penggunaan jam meja PWA harian.
  - Navigasi ekosistem disematkan secara minimalis dan elegan pada *bottom dock footer*.
  - Routing SPA instan tanpa reload menggunakan native HTML5 History API (`popstate` & `pushState`).
- [x] **Standarisasi Kualitas & Dokumentasi**:
  - Konfigurasi ESLint bersih (0 error, 0 warning).
  - Build Vite produksi berhasil dengan ukuran ~252 kB JS / 78 kB gzip dan precache service worker aktif.
  - Dokumentasi `README.md`, `LICENSE` (MIT), dokumen spesifikasi desain, dan rencana implementasi diarsipkan lengkap.

---

## ⏳ Roadmap & Backlog Pengembangan Mendatang (Fase 4)

Berikut adalah daftar tugas terencana untuk memperkaya pengalaman jam meja pada halaman root (`/`):

- [ ] **1. Settings Modal Terpadu (Sinkronisasi dengan Extension Browser)**:
  - Buat modal pengaturan di UI web yang perilakunya identik dengan ekstensi browser (`extension-browser-zen-clock`).
  - Opsi pemilihan metode perhitungan waktu sholat (Kemenag RI, Muslim World League, Egyptian, Umm Al-Qura, Karachi).
  - Opsi penyesuaian manual offset menit sholat (Subuh, Dzuhur, Ashar, Maghrib, Isya) dan simpan di `localStorage`.
  - Opsi durasi waktu fokus & istirahat Pomodoro kustom.

- [ ] **2. Web Worker Background Timer yang Presisi**:
  - Implementasikan Web Worker terpisah untuk timer Pomodoro agar tidak melambat saat tab browser berada di latar belakang (*background tab throttling*).
  - Simpan timestamp target (`targetEndTime`) di `localStorage` agar sisa waktu tetap akurat saat browser di-refresh.

- [ ] **3. Audio Adzan & Sound Notification**:
  - Tambahkan pemutar audio adzan otomatis atau nada lembut (*gentle chime*) saat waktu sholat tiba.
  - Sediakan switch aktivasi suara dan kontrol volume pada antarmuka jam.

- [ ] **4. Geolocation Otomatis (HTML5 Geolocation API)**:
  - Sediakan tombol deteksi koordinat GPS otomatis via peramban agar pengguna tidak perlu memasukkan lintang/bujur secara manual saat bepergian.

- [ ] **5. CI/CD & Production Deployment**:
  - Siapkan GitHub Actions workflow untuk *continuous deployment* ke platform hosting (Vercel, Cloudflare Pages, atau Netlify).
  - Konfigurasi routing rewrite `/* -> /index.html` pada platform hosting agar tautan langsung ke `/apps` tidak menghasilkan 404.

---

## 🔗 Referensi Dokumen Terkait
- [docs/ARCHITECTURE.md](file:///Users/sm/Documents/Lutfi/DEV/Learn/zen-flip-clock/docs/ARCHITECTURE.md) — Arsitektur teknis lengkap sistem.
- [docs/DEV_LOG.md](file:///Users/sm/Documents/Lutfi/DEV/Learn/zen-flip-clock/docs/DEV_LOG.md) — Catatan jejak rekayasa dan riwayat commit.
- [docs/BRANCHING_STRATEGY.md](file:///Users/sm/Documents/Lutfi/DEV/Learn/zen-flip-clock/docs/BRANCHING_STRATEGY.md) — Standar Operasional Prosedur (SOP) Git.
- [docs/superpowers/specs/2026-09-26-zen-clock-ecosystem-landing-design.md](file:///Users/sm/Documents/Lutfi/DEV/Learn/zen-flip-clock/docs/superpowers/specs/2026-09-26-zen-clock-ecosystem-landing-design.md) — Dokumen spesifikasi desain ekosistem.
- [docs/superpowers/plans/2026-09-26-zen-clock-ecosystem-landing.md](file:///Users/sm/Documents/Lutfi/DEV/Learn/zen-flip-clock/docs/superpowers/plans/2026-09-26-zen-clock-ecosystem-landing.md) — Rencana implementasi detail.
