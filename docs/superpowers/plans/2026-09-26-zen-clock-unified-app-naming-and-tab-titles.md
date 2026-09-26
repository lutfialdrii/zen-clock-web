# Rencana Implementasi: Standarisasi Hero "Zen Clock: Pomodoro & Muslim Prayer Times", Pola Judul Tab, & Penyesuaian Status Rilis (VS Code Live, Browser & CLI In Dev, Native Research & Plan)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 
1. Menyelaraskan seluruh narasi Hero Section dengan identitas resmi *"Zen Clock: Pomodoro & Muslim Prayer Times"* (Tag: *Muslim Utilities*, Title: *Zen Clock: Pomodoro & Muslim Prayer Times*, Subtitle: *Tetap Fokus & Ingat Waktu sebagai Muslim.*).
2. Menerapkan pola judul tab yang seragam: `Zen Clock, Jadwal Sholat serta Pomodoro di {{app}}`.
3. Memperbarui status rilis dan badge setiap produk:
   - **VS Code Extension**: Satu-satunya yang sudah rilis (**Live & Stable**).
   - **Browser Extension**: Sedang dalam pengembangan (**Dalam Pengembangan** / **In Development**).
   - **CLI Program**: Sedang dalam pengembangan (**Dalam Pengembangan** / **In Development**).
   - **Native App**: Label & badge rilis menjadi **"Research & Plan"**.
4. Memperbarui `<title>` di `index.html`.

**Architecture:** Menggunakan kamus i18n reaktif (`src/utils/translations.js`), sub-komponen tab (`BrowserTab.jsx`, `VSCodeTab.jsx`, `CliTab.jsx`, `NativeTab.jsx`), segmented tab bar (`AppsShowcase.jsx`), CSS pulse tokens (`src/index.css`), dan metadata browser (`index.html`). State bahasa Indonesia mengusung perpaduan dwibahasa (bilingual) yang alami dan modern.

**Tech Stack:** React 19, Vite, PWA, Tailwind/Vanilla CSS tokens, i18n localized dictionary.

---

## Global Constraints

- **Bilingual saat State Bahasa Indonesia**: State `id` memadukan istilah serapan/bilingual alami ("Muslim Utilities", "Zen Clock: Pomodoro & Muslim Prayer Times", "Tetap Fokus & Ingat Waktu sebagai Muslim.", "Live & Stable", "Research & Plan").
- **Pola Judul Tab Terpadu**:
  - `id`: `Zen Clock, Jadwal Sholat serta Pomodoro di {{app}}`
  - `en`: `Zen Clock, Prayer Schedule & Pomodoro on/in {{app}}`
- **Status Rilis Produk**:
  - **VS Code Extension**: `Live & Stable` (Badge hijau / `.zen-pulse-dot.live`)
  - **Browser Extension**: `Dalam Pengembangan` (ID) / `In Development` (EN) (Badge amber / `.zen-pulse-dot.in-dev`)
  - **CLI Program**: `Dalam Pengembangan` (ID) / `In Development` (EN) (Badge amber / `.zen-pulse-dot.in-dev`)
  - **Native App**: `Research & Plan` (Badge / label: `Research & Plan`, `.zen-pulse-dot.roadmap`)
- **Strict Quality**: `npm run lint` dan `npm run build` wajib lolos dengan 0 error.
- **Eksekusi Bertahap**: Menunggu persetujuan pengguna sebelum mengeksekusi kode.

---

## Matriks Narasi & Status Produk yang Direncanakan

### 1. Hero & Global Metadata

| Elemen UI | Nilai Saat Ini | Rencana Baru (ID) 🇮🇩 | Rencana Baru (EN) 🇬🇧 |
| :--- | :--- | :--- | :--- |
| **Hero Tag** | *Alat Fokus & Pengingat Waktu untuk Muslim* | **Muslim Utilities** | **Muslim Utilities** |
| **Hero Title** | *Zen Clock Apps* | **Zen Clock: Pomodoro & Muslim Prayer Times** | **Zen Clock: Pomodoro & Muslim Prayer Times** |
| **Hero Subtitle** | *Fokus dan Tetap Ingat Waktu sebagai Muslim.* | **Tetap Fokus & Ingat Waktu sebagai Muslim.** | **Stay Focused & Remember Time as a Muslim.** |
| **Browser `<title>`** | *zen-flip-clock* | **Zen Clock: Pomodoro & Muslim Prayer Times** | **Zen Clock: Pomodoro & Muslim Prayer Times** |

### 2. Status Badge & Judul Tab Aplikasi

| Produk | Status Rilis | Tab Button Label | Tab Headline (ID) 🇮🇩 | Tab Headline (EN) 🇬🇧 | Badge Status Label | Pulse Dot Style |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Browser Extension** | Dalam Pengembangan | Browser Extension | **Zen Clock, Jadwal Sholat serta Pomodoro di Browser Extension** | **Zen Clock, Prayer Schedule & Pomodoro on Browser Extension** | `Dalam Pengembangan` / `In Development` | `.zen-pulse-dot.in-dev` (amber) |
| **VS Code Extension** | **Rilis Resmi (Live)** | VS Code Extension | **Zen Clock, Jadwal Sholat serta Pomodoro di VS Code** | **Zen Clock, Prayer Schedule & Pomodoro in VS Code** | `Live & Stable` | `.zen-pulse-dot.live` (emerald) |
| **CLI Program** | Dalam Pengembangan | CLI Program (Go) | **Zen Clock, Jadwal Sholat serta Pomodoro di Terminal Favoritmu** | **Zen Clock, Prayer Schedule & Pomodoro on Terminal** | `Dalam Pengembangan` / `In Development` | `.zen-pulse-dot.in-dev` (amber) |
| **Native App** | Riset & Rencana | Native Apps (Research & Plan) | **Zen Clock, Jadwal Sholat serta Pomodoro di Desktop & Mobile (Research & Plan)** | **Zen Clock, Prayer Schedule & Pomodoro on Desktop & Mobile (Research & Plan)** | `Research & Plan` | `.zen-pulse-dot.roadmap` (amber/violet) |

---

## Rincian Tugas (Tasks)

### Task 1: Update Kamus Terjemahan `src/utils/translations.js`

**Files:**
- Modify: `src/utils/translations.js`

**Interfaces & Data Changes:**
- **`badges` dictionary**:
  - `id`:
    - `live`: `'Live & Stable'` (atau `'Tersedia'`)
    - `inDev`: `'Dalam Pengembangan'`
    - `researchPlan`: `'Research & Plan'`
    - `roadmap`: `'Research & Plan'`
  - `en`:
    - `live`: `'Live & Stable'`
    - `inDev`: `'In Development'`
    - `researchPlan`: `'Research & Plan'`
    - `roadmap`: `'Research & Plan'`
- **`tabs` dictionary**:
  - `id.tabs.native`: `'Native Apps (Research & Plan)'`
  - `en.tabs.native`: `'Native Apps (Research & Plan)'`
- **`hero` dictionary**:
  - `tag`: `'Muslim Utilities'`
  - `title`: `'Zen Clock: Pomodoro & Muslim Prayer Times'`
  - `subtitle`: `'Tetap Fokus & Ingat Waktu sebagai Muslim.'` (ID) / `'Stay Focused & Remember Time as a Muslim.'` (EN)
- **`headlines` dictionary**:
  - `browser.headline`: `'Zen Clock, Jadwal Sholat serta Pomodoro di Browser Extension'`
  - `vscode.headline`: `'Zen Clock, Jadwal Sholat serta Pomodoro di VS Code'`
  - `cli.headline`: `'Zen Clock, Jadwal Sholat serta Pomodoro di Terminal Favoritmu'`
  - `native.headline`: `'Zen Clock, Jadwal Sholat serta Pomodoro di Desktop & Mobile (Research & Plan)'`

**Langkah-langkah Eksekusi:**
- [ ] **Step 1:** Perbarui bagian kamus `id` di `src/utils/translations.js`.
- [ ] **Step 2:** Perbarui bagian kamus `en` di `src/utils/translations.js`.
- [ ] **Step 3:** Jalankan node check untuk memverifikasi seluruh key dan value terbaca tanpa error.

---

### Task 2: Update Status Badges pada Sub-Komponen Tab & CSS Pulse

**Files:**
- Modify: `src/index.css` (tambahkan style `.zen-pulse-dot.in-dev`)
- Modify: `src/components/showcase/BrowserTab.jsx` (gunakan badge `t.badges?.inDev || 'Dalam Pengembangan'`, dot class `.in-dev`)
- Modify: `src/components/showcase/VSCodeTab.jsx` (tetap badge `t.badges?.live || 'Live & Stable'`, dot class `.live`)
- Modify: `src/components/showcase/CliTab.jsx` (gunakan badge `t.badges?.inDev || 'Dalam Pengembangan'`, dot class `.in-dev`)
- Modify: `src/components/showcase/NativeTab.jsx` (gunakan badge `t.badges?.researchPlan || 'Research & Plan'`, dot class `.roadmap`)

**Langkah-langkah Eksekusi:**
- [ ] **Step 1:** Tambahkan rule `.zen-pulse-dot.in-dev` di `src/index.css`.
- [ ] **Step 2:** Sesuaikan `BrowserTab.jsx` agar menampilkan badge status "Dalam Pengembangan" / "In Development".
- [ ] **Step 3:** Pastikan `VSCodeTab.jsx` menampilkan badge status "Live & Stable".
- [ ] **Step 4:** Sesuaikan `CliTab.jsx` agar menampilkan badge status "Dalam Pengembangan" / "In Development".
- [ ] **Step 5:** Sesuaikan `NativeTab.jsx` agar menampilkan badge status "Research & Plan".

---

### Task 3: Update HTML Document Title & Metadata di `index.html`

**Files:**
- Modify: `index.html`

**Langkah-langkah Eksekusi:**
- [ ] **Step 1:** Ubah tag `<title>` dari `zen-flip-clock` menjadi `Zen Clock: Pomodoro & Muslim Prayer Times`.
- [ ] **Step 2:** Tambahkan tag `<meta name="description" content="Zen Clock: Pomodoro & Muslim Prayer Times. Jam flip minimalis, timer Pomodoro, dan pengingat jadwal waktu sholat otomatis untuk Muslim." />`.

---

### Task 4: Verifikasi Lint, Build & Runtime

**Langkah-langkah Eksekusi:**
- [ ] **Step 1:** Jalankan `npm run lint` dan pastikan 0 error/warning.
- [ ] **Step 2:** Jalankan `npm run build` dan pastikan produksi bundle Vite & PWA sukses terbuat.

---

### Task 5: Catat ke `CHANGELOG.md` & `docs/PROGRESS.md`

**Files:**
- Modify: `CHANGELOG.md`
- Modify: `docs/PROGRESS.md`

**Langkah-langkah Eksekusi:**
- [ ] **Step 1:** Perbarui catatan rilis di `CHANGELOG.md` mencakup Hero "Muslim Utilities", pola judul tab, dan badge status produk yang presisi (VS Code Live, Browser & CLI In Dev, Native Research & Plan).
- [ ] **Step 2:** Perbarui milestone pada `docs/PROGRESS.md`.
