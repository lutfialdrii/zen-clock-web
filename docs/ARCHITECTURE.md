# Arsitektur Teknis: Zen Flip Clock (Web, PWA & Ecosystem Hub)

Dokumen ini menjelaskan arsitektur teknis, pola desain (*design patterns*), struktur komponen, dan alur data dari **Zen Flip Clock** sebagai **Central Web Hub & Ecosystem Landing Page** untuk seluruh lini produk *Zen Clock: Pomodoro & Muslim Prayer Times*.

---

## 1. Visi & Peran Strategis Repositori

Repositori `zen-flip-clock` memiliki dua peran arsitektur fundamental yang saling berdampingan secara harmonis:

1. **Live Web Clock & Standalone PWA (di rute `/`)**:
   - Berfungsi sebagai aplikasi jam meja layar penuh (*standby desk clock*) yang hening, estetis, dan bebas dari segala bentuk distraksi iklan maupun promosi agresif.
   - Menggabungkan animasi 3D Flip Clock realistis, jadwal & hitung mundur waktu sholat otomatis berbasis astronomis (Adhan.js), serta pengatur waktu fokus (Pomodoro Timer).
   - Dapat diinstal sebagai Progressive Web App (PWA) di desktop, tablet, maupun smartphone untuk penggunaan harian di meja kerja.

2. **Central Ecosystem Landing Page & Showcase (di rute `/apps`)**:
   - Berfungsi sebagai etalase terpusat (*hub landing page*) untuk seluruh produk dalam keluarga Zen Clock:
     - **VS Code Extension** (`extension-clock`)
     - **Browser Extension** (`extension-browser-zen-clock` untuk Chrome, Edge, Brave, Firefox)
     - **CLI Program** (`cli-zen-clock` berbasis bahasa Go)
     - **Native Desktop & Mobile Roadmap** (macOS Menu Bar, Windows Tray, Linux Applet, Android & iOS Companion)
   - Menyediakan panduan instalasi 1-klik (*one-click copy commands*), deep links, tautan marketplace, dan dokumentasi ekosistem.

---

## 2. Diagram Arsitektur Tingkat Tinggi

```
                                  [ Pengunjung / Browser ]
                                             │
                                             ▼
                                     ┌───────────────┐
                                     │   App.jsx     │
                                     │ (History API) │
                                     └───┬───────┬───┘
                         Rute: /         │       │    Rute: /apps atau /extension
            ┌────────────────────────────┘       └─────────────────────────────┐
            ▼                                                                  ▼
┌───────────────────────────┐                                     ┌─────────────────────────────┐
│    Live Web Clock View    │                                     │     AppsShowcase Shell      │
│ (Distraction-Free PWA)    │                                     │  (Ecosystem Landing Page)   │
├───────────────────────────┤                                     ├─────────────────────────────┤
│ • Header (Clock, Pomodoro)│                                     │ • Floating Header & i18n    │
│ • FlipClock 3D Display    │                                     │ • Ecosystem Hero Section    │
│ • PrayerTime Countdown    │                                     │ • Segmented Tab Bar         │
│ • PomodoroTimer Control   │                                     └──────────────┬──────────────┘
│ • Minimalist Bottom Dock  │                                                    │
└───────────┬───────────────┘                                                    │
            │ (Klik "✦ Explore Ecosystem")                                       ▼
            └───────────────────────────────────────────────────► [ Segmented Tab Modules ]
                                                                  ├── VSCodeTab.jsx
                                                                  ├── BrowserTab.jsx
                                                                  ├── CliTab.jsx
                                                                  └── NativeTab.jsx
```

---

## 3. Prinsip Arsitektur Utama

### 3.1 Zero-Dependency SPA Routing (HTML5 History API)
- **Problem**: Penggunaan library router eksternal besar (seperti `react-router-dom`) akan menambah ukuran bundle bundle secara signifikan, memperlambat *first contentful paint* (FCP), dan memperumit *offline caching* PWA pada static hosting.
- **Solution**: Menggunakan wrapper ringan berbasis native HTML5 History API:
  - `resolveCurrentRoute()` membaca `window.location.pathname` dan `window.location.hash`.
  - Sinkronisasi riwayat browser menggunakan event listener `popstate` sehingga tombol *Back* dan *Forward* browser bekerja mulus.
  - Navigasi instan antar-tampilan via `window.history.pushState` dan scroll ke atas otomatis tanpa *full page reload*.
  - *Backward Compatibility*: Rute lama `/extension` secara transparan mengarahkan pengguna ke `/apps#vscode`.

### 3.2 Unified Zen Design System
Seluruh komponen web dan antarmuka ekosistem diikat oleh sistem desain terpadu yang didefinisikan melalui CSS custom properties di `src/index.css`:
- **Palette Obsidian**: `--zen-bg-base: #0c0d10`, `--zen-surface-1: #14151a`, `--zen-surface-2: #1c1e24`.
- **Borders & Dividers**: `--zen-border: rgba(255, 255, 255, 0.08)` dan efek hover `--zen-border-hover: rgba(251, 191, 36, 0.35)`.
- **Spiritual Amber Accent**: `--zen-amber: #fbbf24` (digunakan untuk countdown sholat, tab aktif, dan CTA utama).
- **Focus Emerald Accent**: `--zen-emerald: #10b981` (digunakan untuk status pomodoro dan umpan balik salin perintah).
- **Glassmorphism**: `rgba(18, 18, 22, 0.75)` dengan `backdrop-filter: blur(12px)`.
- **Tipografi Terpadu**:
  - UI Sans: `Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`.
  - Monospace (Jam & Terminal): `'JetBrains Mono', 'SFMono-Regular', Consolas, monospace`.

### 3.3 Engine Internasionalisasi Mandiri (Bilingual i18n)
- Modul `src/utils/translations.js` menyediakan kamus lengkap Bahasa Indonesia (`id`) dan Bahasa Inggris (`en`) dengan paritas key 100%.
- Modul `src/utils/i18n.js` menyediakan hook `useLanguage()` yang:
  - Memeriksa `localStorage.getItem('zen_clock_lang')` untuk mengingat preferensi pengguna.
  - Mendeteksi bahasa browser secara otomatis (`navigator.language.startsWith('id') ? 'id' : 'en'`) saat kunjungan pertama.
  - Memasang listener event `storage` untuk sinkronisasi bahasa lintas tab secara *real-time*.
  - Aman digunakan pada konteks Server-Side Rendering / static build (`typeof window === 'undefined'` guard).

### 3.4 Modul Tab Showcase Terisolasi (Separation of Concerns)
Setiap varian platform dalam ekosistem ditempatkan dalam sub-komponen terpisah di `src/components/showcase/`:
- **`VSCodeTab.jsx`**: Menampilkan integrasi editor, 1-click copy CLI command `code --install-extension...`, marketplace rating badge, serta deep link protokol `vscode:extension/...`.
- **`BrowserTab.jsx`**: Menampilkan dukungan peramban Chrome, Edge, Brave, dan Firefox, tombol unduh rilis ZIP, dan akordeon panduan instalasi manual *Developer Mode*.
- **`CliTab.jsx`**: Menampilkan jam konsol berbasis Go (<10MB RAM), selector perintah multi-metode (Homebrew, `go install`, Curl script, binary rilis), dan simulasi terminal TUI bergaya dark ASCII.
- **`NativeTab.jsx`**: Menampilkan kartu roadmap untuk macOS Menu Bar, Windows Tray, Linux Applet, dan Mobile iOS/Android, beserta call-to-action komunitas (GitHub Star & Discussions).

---

## 4. Struktur Direktori Proyek

```
zen-flip-clock/
├── docs/                               # Dokumentasi teknis & sejarah pengembangan
│   ├── ARCHITECTURE.md                 # Dokumen arsitektur ini
│   ├── CHANGELOG.md                    # Catatan perubahan formal & historical trajectory
│   ├── DEV_LOG.md                      # Log trajectory teknis & keputusan rekayasa
│   ├── PROGRESS.md                     # Pelacak progres & roadmap fitur
│   ├── BRANCHING_STRATEGY.md           # SOP Git branching & isolasi kerja
│   ├── NOTES.md                        # Catatan backlog & ide fitur mendatang
│   └── superpowers/                    # Dokumen spesifikasi & rencana eksekusi
│       ├── specs/                      # Dokumen spesifikasi desain (brainstorming output)
│       └── plans/                      # Rencana implementasi detail (writing-plans output)
├── public/                             # Asset statis, favicon, dan ikon PWA
├── src/
│   ├── assets/                         # Asset gambar dan audio
│   ├── components/
│   │   ├── FlipClock.jsx               # Jam flip 3D utama (Jam, Menit, Detik)
│   │   ├── FlipUnit.jsx                # Komponen kartu flip satuan angka
│   │   ├── PomodoroTimer.jsx           # Kontroler timer fokus & istirahat
│   │   ├── PrayerTime.jsx              # Komputasi jadwal sholat & countdown Adhan.js
│   │   └── showcase/                   # Modul showcase ekosistem Zen Clock
│   │       ├── AppsShowcase.jsx        # Shell utama showcase (hero, tabs, footer)
│   │       ├── AppsShowcase.css        # Styling tema obsidian & glassmorphism
│   │       ├── VSCodeTab.jsx           # Panel detail ekstensi VS Code
│   │       ├── BrowserTab.jsx          # Panel detail ekstensi browser
│   │       ├── CliTab.jsx              # Panel detail aplikasi terminal CLI (Go)
│   │       └── NativeTab.jsx           # Panel detail roadmap desktop & mobile
│   ├── utils/
│   │   ├── i18n.js                     # Hook & helper bahasa (ID / EN)
│   │   ├── translations.js             # Kamus terjemahan bilingual
│   │   ├── notification.js             # API web notification & audio chime
│   │   └── prayerHelper.js             # Logika kalkulasi astronomis & ihtiyat Kemenag
│   ├── App.jsx                         # Router root controller & dock footer
│   ├── index.css                       # Design tokens, tipografi, & animasi dasar
│   └── main.jsx                        # Entry point React 19
├── eslint.config.js                    # Konfigurasi linter ESLint
├── vite.config.js                      # Konfigurasi bundler Vite 8 & VitePWA
├── package.json                        # Definisi dependensi & skrip proyek
└── README.md                           # Dokumentasi publik proyek
```

---

## 5. Alur Data & State Management

1. **Language State (`useLanguage`)**:
   - Bersifat global-like via hook reaktif yang tersinkronisasi dengan `localStorage`.
   - Perubahan bahasa di header langsung memicu *re-render* pada seluruh teks dinamis di `AppsShowcase` dan sub-tabnya.

2. **Showcase Tab State (`activeTab`)**:
   - Diinisialisasi dari hash URL (misal `#cli`) atau fallback ke `initialTab`.
   - Pemilihan tab memperbarui state internal dan melakukan sinkronisasi URL tanpa reload menggunakan `window.history.replaceState(null, '', '#' + tabKey)`.

3. **Prayer Times & Time Engine**:
   - Menggunakan `setInterval` 1000ms untuk pembaruan detik pada jam flip.
   - Komputasi waktu sholat dijalankan ulang secara efisien saat tanggal berganti atau koordinat lintang/bujur diperbarui.
   - Perhitungan menerapkan standar Kementerian Agama Republik Indonesia (Kemenag) dengan pengaman waktu (+2 menit ihtiyat).

---

## 6. Strategi Progressive Web App (PWA)

- Dikonfigurasi menggunakan `vite-plugin-pwa` dengan strategi `generateSW`.
- Service worker menyimpan *cache* untuk seluruh asset statis (HTML, JS chunk, CSS, font, web manifest, dan favicon) dengan total ukuran di bawah 300 KiB.
- Mendukung mode layar penuh *standalone* dan event `beforeinstallprompt` untuk pemasangan aplikasi web langsung dari peramban pengguna.