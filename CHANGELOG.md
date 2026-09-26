# Release Notes (Changelog)

All notable public releases and user-facing updates for **Zen Clock** (Web, PWA & Central Ecosystem Hub) are documented in this file.  
For internal engineering trajectory logs, task breakdowns, and prompt history, see [docs/DEV_LOG.md](docs/DEV_LOG.md). For system design and architecture, see [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [0.2.2] - 2026-09-26 — Zen Clock Apps Reordering & Human-Like Copy Refinement

### 🇮🇩 Bahasa Indonesia

#### ✨ Pembaruan Narasi & Hirarki Produk
- **Standarisasi Penamaan "Zen Clock Apps"**:
  - Menggantikan istilah formal *"Ekosistem"* menjadi **"Zen Clock Apps"** di seluruh halaman dan antarmuka.
- **Reordering Produk (Browser Extension #1)**:
  - Memposisikan **Browser Extension** sebagai produk unggulan utama (#1) yang langsung aktif dan terlihat pertama kali saat membuka `/apps`, disusul oleh VS Code Extension (#2), CLI Program (#3), dan Roadmap Aplikasi Native (#4).
- **Penyempurnaan Gaya Bahasa Luwes & Alami (Human-like Copy)**:
  - **Hero Tag**: *"Alat Fokus & Pengingat Waktu untuk Muslim"*.
  - **Hero Subtitle**: *"Fokus dan Tetap Ingat Waktu sebagai Muslim."*.
  - **Dock Button**: *"✦ Explore Zen Clock Apps (Browser Extension, VS Code Extension & CLI) →"*.
  - **Browser Tab**: Headline: *"Flip Clock, Jadwal Reminder Sholat serta Pomodoro di Browser Extension"* — Deskripsi: *"Zen Clock langsung dari toolbar. Praktis, ringan, dan tetap ingat waktu sebagai Muslim."*.
  - **VS Code Tab**: Headline: *"Zen Clock, Jadwal Sholat serta Pomodoro di VS Code"* — Deskripsi: *"Fokus dan Tetap Ingat Waktu sebagai Muslim walau keasikan ngoding."*.
  - **CLI Tab**: Headline: *"Zen Clock, Jadwal Sholat serta Pomodoro di Terminal Favoritmu"* — Deskripsi: *"Buat kamu yang sering kerja di terminal."*.
  - **Native Tab**: Headline: *"Rencana Aplikasi Desktop & Mobile"* — Deskripsi: *"Zen Clock rencananya bakal hadir langsung di Menu Bar macOS, Windows Tray, Linux, dan aplikasi mobile (Android & iOS)."*.

### 🇬🇧 English

#### ✨ Product Hierarchy & Copy Refinement
- **Standardized "Zen Clock Apps" Branding**:
  - Replaced the formal "Ecosystem" term with clean and friendly "Zen Clock Apps" across all landing views and modals.
- **Browser Extension as Primary Product (#1)**:
  - Set Browser Extension as the default landing tab and top product hierarchy in the `/apps` showcase and quick discovery links.
- **Friendly & Natural Tone-of-Voice**:
  - Polished taglines, headlines, and descriptions across Indonesian and English dictionaries.

---

## [0.2.1] - 2026-09-26 — Standalone Web Clock Customization & Feature Parity

### 🇬🇧 English

#### ✨ Features & Highlights
- **100% Customization & Behavior Parity with Browser Extension**:
  - The standalone Live Web Clock (`/`) now shares the exact same capabilities, customization modal suite, and design as the Zen Clock Browser Extension desk clock mode.
- **Interactive City Picker with 539+ Indonesian Cities & Global Search**:
  - Full catalog covering 539+ cities and regencies across all 38 Indonesian provinces plus international locations (Makkah, Madinah, KL, Singapore).
  - Built-in GPS auto-detection using browser Geolocation and OpenStreetMap reverse geocoding.
  - Direct global online search fallback for unlisted locations worldwide.
- **Prayer Minute Adjustments (Ihtiyat)**:
  - Custom offset modal allowing minute-by-minute adjustments (-10 to +10 mins) for Subuh, Terbit, Dzuhur, Ashar, Maghrib, and Isya.
  - Real-time preview comparing base astronomical calculation with applied corrections.
- **Dynamic Theme Accent Color Customizer**:
  - 6 curated presets (Warm Amber, Cyberpunk Cyan, Emerald Forest, Rose Velvet, Violet Eclipse, Coral Sunset) or any custom Hex code.
  - Instantly updates CSS variables (`--zen-accent`) across cards, badges, and controls.
- **Configurable Pomodoro Focus Durations**:
  - Choose custom work sessions (15m, 20m, 25m, 30m, 45m, 50m, 60m) and break intervals (3m, 5m, 10m, 15m).
  - Background ticker with local storage persistence and session state transitions.
- **Web Notification Support**:
  - Real-time prayer call notifications and Pomodoro session completion alerts via the standard Web Notification API.
- **Refined Desk Clock Top Controls Bar**:
  - Brand identity, tab switcher with active Pomodoro pulsing status dot, PWA install trigger, Settings modal launcher, and Fullscreen toggle.
- **Distraction-Free 100vh Desk Clock with Below-The-Fold Ecosystem Dock**:
  - The live clock viewport is isolated to a clean 100vh screen on desktop with zero clutter on initial load.
  - The ecosystem explore button is tucked below the fold, appearing gracefully only when the user scrolls down.
- **Ecosystem Call-To-Action in Settings Modal**:
  - Added a dedicated multi-platform explore widget inside SettingsModal, allowing users to discover and switch to the ecosystem showcase directly from settings.

---

### 🇮🇩 Bahasa Indonesia

#### ✨ Fitur Utama & Pembaruan
- **Paritas Penuh Fitur & Kustomisasi dengan Browser Extension**:
  - Jam Web Mandiri (`/`) kini memiliki fitur kustomisasi, kontrol modal, dan pengalaman pengguna yang 100% setara dengan mode Desk Clock pada ekstensi browser.
- **Pemilih Kota Interaktif (539+ Kota se-Indonesia & Pencarian Global)**:
  - Katalog lengkap 539+ kota dan kabupaten di 38 provinsi Indonesia serta kota internasional terpopuler (Makkah, Madinah, Kuala Lumpur, Singapura).
  - Deteksi lokasi otomatis berbasis GPS Geolocation dan *reverse geocoding* OpenStreetMap.
  - Pencarian lokasi global langsung untuk wilayah mana pun di dunia.
- **Koreksi Menit Waktu Sholat (Ihtiyat)**:
  - Modal koreksi waktu sholat (-10 hingga +10 menit) untuk Subuh, Terbit, Dzuhur, Ashar, Maghrib, dan Isya.
  - Pratinjau langsung perbandingan jadwal dasar astronomis dan hasil koreksi.
- **Pengatur Warna Aksen Tema Dinamis**:
  - 6 pilihan tema siap pakai (*Warm Amber, Cyberpunk Cyan, Emerald Forest, Rose Velvet, Violet Eclipse, Coral Sunset*) serta dukungan kode HEX kustom.
  - Sinkronisasi instan ke variabel CSS sistem desain (`--zen-accent`).
- **Durasi Timer Pomodoro yang Dapat Disesuaikan**:
  - Bebas menentukan durasi fokus kerja (15m, 20m, 25m, 30m, 45m, 50m, 60m) dan waktu istirahat (3m, 5m, 10m, 15m).
  - State persisten di penyimpanan browser dengan transisi otomatis antar sesi.
- **Dukungan Notifikasi Web Browser**:
  - Pengingat adzan waktu sholat dan notifikasi selesainya sesi Pomodoro menggunakan Web Notification API standar.
- **Bilah Kontrol Atas (Top Header Controls Bar)**:
  - Identitas Zen Clock, tab navigator dengan indikator titik hijau berdenyut saat Pomodoro aktif, tombol unduh PWA, pintasan modal pengaturan, dan tombol layar penuh (*Fullscreen*).
- **Jam Meja Murni 100vh dengan Dock Ekosistem Below-The-Fold**:
  - Layar jam meja diisolasi menjadi 100vh penuh tanpa gangguan visual pada tampilan pertama desktop.
  - Tombol jelajah ekosistem diletakkan di bawah lipatan (*below the fold*) dan baru muncul saat pengguna menggulir layar (*scroll down*).
- **Widget Call-To-Action (CTA) Ekosistem di Modal Pengaturan**:
  - Menyematkan kartu eksplorasi aplikasi Zen Clock multi-platform di dalam SettingsModal untuk memudahkan penemuan aplikasi lain langsung dari menu pengaturan.

---

## [0.2.0] - 2026-09-26 — Central Ecosystem Hub & Showcase

### 🇬🇧 English

#### ✨ Features & Highlights
- **Centralized Ecosystem Showcase (`/apps`)**:
  - Transformed the web application into the primary web hub for all Zen Clock products across platforms.
  - Interactive **Segmented Tab Control** allowing seamless switching between platform showcases:
    - **VS Code Extension** (`#vscode`): 1-click copy CLI command (`code --install-extension...`), Visual Studio Marketplace link, deep link (`vscode:extension/...`), and feature cards.
    - **Browser Extension** (`#browser`): Multi-browser compatibility badges (Chrome, Edge, Brave, Firefox), direct release downloads, and a collapsible 3-step manual installation guide for Developer Mode.
    - **CLI Program** (`#cli`): Terminal clock built in Go (<10MB RAM), multi-method install selector (Homebrew, Go install, Curl one-liner, and GitHub binary releases), plus an interactive ASCII/TUI terminal preview.
    - **Native & Mobile Roadmap** (`#native`): Upcoming plans for macOS Menu Bar, Windows System Tray, Linux Applet, and Mobile Companion apps (iOS & Android) with GitHub Star call-to-action.
- **Distraction-Free Live Web Clock (`/`)**:
  - The root view remains a 100% serene, distraction-free mechanical flip clock and standby desk screen.
  - Integrated a subtle, minimalist bottom dock (`✦ Explore Zen Clock Ecosystem (VS Code · Browser · CLI) →`) that invites visitors to explore ecosystem apps without disrupting ongoing focus sessions.
- **Zero-Dependency Lightweight Routing**:
  - Powered entirely by native HTML5 History API (`pushState` / `popstate`), avoiding heavy external router libraries and preserving fast PWA load times.
  - Backward-compatible redirect: legacy `/extension` links automatically open the VS Code tab on `/apps#vscode`.
  - Silent hash synchronization using `history.replaceState` to update the active tab in the URL without abrupt browser scroll jumps.
- **Bilingual Localization (i18n)**:
  - Full support for English (`EN`) and Indonesian (`ID`) with automatic browser language detection and `localStorage` persistence.
  - Reactive language switcher in the floating navigation header.
- **Unified Zen Design System**:
  - Consistent Obsidian base canvas (`#0c0d10`), Spiritual Warm Amber (`#fbbf24`), Focus Emerald (`#10b981`), and 12px blur glassmorphism tokens.
  - Crisp typography leveraging Inter for UI and JetBrains Mono for time, countdowns, and terminal snippets.

---

### 🇮🇩 Bahasa Indonesia

#### ✨ Fitur Utama & Pembaruan
- **Etalase Ekosistem Terpusat (`/apps`)**:
  - Mentransformasi aplikasi web menjadi hub terpusat untuk seluruh produk dalam keluarga Zen Clock di berbagai platform.
  - **Segmented Tab Control** interaktif untuk berpindah antar etalase platform secara instan:
    - **VS Code Extension** (`#vscode`): Kotak salin perintah CLI 1-klik (`code --install-extension...`), link ke Visual Studio Marketplace, deep link editor, dan grid fitur unggulan.
    - **Browser Extension** (`#browser`): Badge kompatibilitas multi-browser (Chrome, Edge, Brave, Firefox), unduhan rilis ZIP, dan akordeon panduan 3 langkah pemasangan manual di mode pengembang.
    - **CLI Program** (`#cli`): Jam terminal ultra-ringan berbasis bahasa Go (<10MB RAM), selector perintah multi-opsi (Homebrew, `go install`, Curl script, binary rilis), dan simulasi terminal ASCII/TUI.
    - **Native & Mobile Roadmap** (`#native`): Rencana masa depan aplikasi native macOS Menu Bar, Windows Tray, Linux Desktop, dan Mobile (iOS/Android) beserta tombol Star di GitHub.
- **Jam Meja Web yang Murni & Bebas Distraksi (`/`)**:
  - Halaman root (`/`) tetap dipertahankan hening dan bersih sebagai jam meja standby atau PWA harian.
  - Navigasi ekosistem disematkan secara halus di bagian paling bawah layar (*bottom dock footer* minimalis) tanpa mengganggu pengguna yang sedang fokus bekerja atau beribadah.
- **Routing SPA Ringan Tanpa Dependensi Berat**:
  - Menggunakan native HTML5 History API (`pushState` / `popstate`) murni tanpa memasang library router pihak ketiga yang membebani bundle PWA.
  - Kompatibel penuh ke belakang: tautan lama `/extension` otomatis diarahkan ke `/apps#vscode`.
  - Sinkronisasi hash URL senyap menggunakan `history.replaceState` untuk mencegah efek lonjakan scroll halaman saat berpindah tab.
- **Dukungan Dwibahasa (Bilingual i18n)**:
  - Mendukung penuh Bahasa Indonesia (`ID`) dan Bahasa Inggris (`EN`) dengan deteksi otomatis bahasa peramban dan penyimpanan preferensi di `localStorage`.
  - Tombol pengalih bahasa reaktif pada header mengambang (*floating navbar*).
- **Sistem Desain Zen Terpadu**:
  - Harmonisasi warna obsidian pekat (`#0c0d10`), aksen amber sholat (`#fbbf24`), aksen emerald fokus (`#10b981`), dan efek kaca *glassmorphism*.
  - Standarisasi font Inter untuk teks antarmuka dan JetBrains Mono untuk angka jam serta perintah terminal.

---

## [0.1.1] - 2026-09-25 — VS Code Extension Bridge

### 🇬🇧 English
- **Extension Landing Page**: Introduced dedicated `/extension` bridge page promoting the first release of Zen Clock on the Visual Studio Code Marketplace.
- **Copy Commands**: Added initial 1-click clipboard integration for VS Code CLI installation.

### 🇮🇩 Bahasa Indonesia
- **Halaman Jembatan Ekstensi**: Menghadirkan halaman `/extension` pertama untuk memperkenalkan ketersediaan ekstensi Zen Clock di Visual Studio Marketplace.
- **Salin Perintah**: Integrasi tombol salin clipboard perintah instalasi terminal VS Code.

---

## [0.1.0] - 2026-09-14 — Initial Standalone Web & PWA Release

### 🇬🇧 English
- **3D Mechanical Flip Clock**: Realistic split-flap card animation using 3D CSS perspective with real-time hour, minute, and second updates.
- **Astronomical Islamic Prayer Times**: Automated calculation powered by the `adhan` library with Indonesian Ministry of Religious Affairs (Kemenag RI) standards (+2 minutes ihtiyat safety correction).
- **Integrated Pomodoro Focus Timer**: Built-in 25-minute work intervals and 5-minute break timers.
- **Progressive Web App (PWA)**: Configured with `vite-plugin-pwa` for offline asset caching and native installability on desktop, tablet, and mobile browsers.

### 🇮🇩 Bahasa Indonesia
- **Jam Flip 3D Mekanik**: Animasi kartu flip realistis dengan perspektif CSS 3D menampilkan jam, menit, dan detik secara real-time.
- **Jadwal Sholat Astronomis**: Perhitungan waktu sholat otomatis berbasis pustaka `adhan` dengan formula standar Kemenag RI (+2 menit waktu ihtiyat/pengaman).
- **Timer Fokus Pomodoro**: Mode interval fokus kerja 25 menit dan waktu istirahat 5 menit terintegrasi.
- **Progressive Web App (PWA)**: Dukungan instalasi aplikasi web mandiri (*Add to Home Screen*) dan *offline caching* berbasis Workbox service worker.
