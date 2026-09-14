# Zen Flip Clock (Web & PWA Edition) — Delegation Guide

Panduan ini ditujukan bagi pengembang web (web developer), freelancer, atau AI Agent yang didelegasikan untuk melanjutkan pengembangan versi **Web Standalone & Progressive Web App (PWA)** dari Zen Flip Clock.

---

## 🎯 Ringkasan Proyek

**Zen Flip Clock (Web)** adalah aplikasi web jam minimalis bertema Zen dengan animasi flip-clock realistis, pengingat waktu sholat (Islamic Prayer Times) menggunakan Adhan.js, dan Pomodoro Timer produktivitas yang dapat diinstal di desktop maupun mobile sebagai PWA.

> ℹ️ **Konteks Pemisahan Repositori:**
> Versi VS Code Extension dikembangkan secara terpisah di repositori `extension-clock` agar masing-masing platform dapat dioptimalkan secara native tanpa saling berkompromi.

---

## 🛠️ Tech Stack Web

- **Framework**: React 19 + Vite 8
- **PWA**: `vite-plugin-pwa` (Workbox Service Worker + Web Manifest)
- **Icons**: `lucide-react`
- **Prayer Calculations**: `adhan` (Perhitungan astronomis waktu sholat)
- **Styling**: CSS murni dengan CSS variables & 3D CSS perspective flip cards

---

## 🚀 Memulai Pengembangan

1. **Install Dependensi:**
   ```bash
   npm install
   ```

2. **Jalankan Development Server:**
   ```bash
   npm run dev
   ```
   Buka `http://localhost:5173` di browser Anda.

3. **Build untuk Produksi:**
   ```bash
   npm run build
   ```
   File hasil build akan berada di direktori `dist/` (siap dideploy ke Vercel, Netlify, Cloudflare Pages, atau GitHub Pages).

4. **Preview Hasil Build:**
   ```bash
   npm run preview
   ```

---

## 📋 Roadmap & Backlog Tugas Pengembangan Web

Berikut adalah daftar tugas yang siap dikerjakan untuk versi Web:

- [ ] **1. Background Timer yang Presisi di Web (Web Worker):**
  - Implementasikan Web Worker untuk Pomodoro Timer agar timer tidak melambat saat tab browser berada di latar belakang (*background tab throttling*).
  - Simpan `targetEndTime` di `localStorage` agar saat refresh/tutup tab, sisa waktu tetap akurat.

- [ ] **2. Audio Adzan / Notifikasi Suara Sholat di Web:**
  - Tambahkan opsi memutar audio suara Adzan atau nada pengingat lembut saat waktu sholat tiba di browser.
  - Sediakan tombol pemilih audio atau switch aktivasi suara di UI.

- [ ] **3. Formula Kemenag RI & Menu Penyesuaian Waktu Sholat:**
  - Komponen `src/utils/prayerHelper.js` sudah menyediakan parameter Kemenag (+2 menit pengaman/ihtiyat).
  - Tambahkan modal pengaturan di UI web untuk menyesuaikan offset menit sholat secara manual dan simpan di `localStorage`.

- [ ] **4. Deployment CI/CD:**
  - Setup auto-deploy ke Vercel / Netlify / GitHub Pages setiap kali branch `main` diperbarui.
  - Daftarkan domain kustom jika diperlukan (misal: `zenclock.app`).

- [ ] **5. Pengalaman PWA Penuh:**
  - Uji instalasi di Android & iOS (Add to Home Screen).
  - Tambahkan dukungan Web Share Target atau Fullscreen toggle yang lebih kaya.

---

## 📂 Struktur Direktori

```
zen-flip-clock/
├── public/                 # Favicon, SVG icon, PWA icons
├── src/
│   ├── components/
│   │   ├── FlipClock.jsx       # Tampilan jam utama (Flip Clock 3D)
│   │   ├── FlipUnit.jsx        # Komponen kartu flip per angka
│   │   ├── PomodoroTimer.jsx   # Timer Pomodoro & Istirahat
│   │   └── PrayerTime.jsx      # Jadwal & countdown waktu sholat
│   ├── utils/
│   │   ├── notification.js     # Web notification & audio chime
│   │   └── prayerHelper.js     # Parameter kalkulasi sholat Kemenag
│   ├── App.jsx                 # Navigasi tab (Clock, Pomodoro, PWA Install)
│   ├── index.css               # Styling 3D flip card, tema Zen, responsive
│   └── main.jsx                # Entry point React
├── vite.config.js          # Konfigurasi Vite & VitePWA
└── package.json            # Script & dependensi web murni
```

---

## 🤝 Hubungan dengan Versi VS Code Extension
Jika ada aset visual baru atau perbaikan styling pada komponen jam, aset tersebut dapat disinkronkan kembali dengan repositori `extension-clock`.
