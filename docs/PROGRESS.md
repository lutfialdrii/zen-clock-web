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
| **Fase 5: Audio & Deployment** | Audio Adzan, Gentle Chime, CI/CD Hosting | ⏳ **Backlog** | Q4 2026 | Cloudflare Pages / Vercel rewrite & automated test |

---

## ✅ Rincian Milestone yang Telah Selesai

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
