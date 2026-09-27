# ⏰ Zen Clock: Pomodoro & Muslim Prayer Times

<p align="center">
  <img src="./public/assets/preview-extension-browser.png" alt="Zen Clock Preview" width="100%" />
</p>

<p align="center">
  <b>A serene, distraction-free retro mechanical flip desk clock combining Pomodoro focus cycles with precise astronomical Muslim prayer times. Central web hub & standalone PWA for the Zen Clock multi-platform ecosystem.</b>
</p>

<p align="center">
  <b>English</b> | <a href="./README.id.md">Bahasa Indonesia</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19.2-61dafb?logo=react&logoColor=black" alt="React 19" />
  <img src="https://img.shields.io/badge/Vite-8-646cff?logo=vite&logoColor=white" alt="Vite 8" />
  <img src="https://img.shields.io/badge/PWA-Ready-10b981.svg?logo=pwa&logoColor=white" alt="PWA Ready" />
  <img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License: MIT" />
  <a href="https://marketplace.visualstudio.com/items?itemName=lutfialdrii.extension-clock">
    <img src="https://img.shields.io/visual-studio-marketplace/v/lutfialdrii.extension-clock?label=VS%20Code%20Marketplace&color=blueviolet&logo=visualstudiocode" alt="VS Code Marketplace" />
  </a>
</p>

---

## 🌟 Overview

**Zen Clock** is engineered for developers, knowledge workers, and mindful individuals who want to stay deeply focused on their work while remaining punctual with their spiritual obligations. 

Built with an obsidian-dark glassmorphism aesthetic, Zen Clock pairs a nostalgic mechanical 3D card-flip animation with an integrated Pomodoro timer and astronomical prayer calculations based on official Indonesian Ministry of Religious Affairs (Kemenag RI) standards.

It functions as both a **standalone Progressive Web App (PWA)** that can be installed on your desktop/mobile screen and the **Central Ecosystem Hub** connecting our VS Code extension, Browser extension, and upcoming CLI/Native tools.

---

## ✨ Key Features

### 🕰️ 1. 3D Retro Mechanical Flip Clock
- **Smooth 3D Card-Folding Animation:** Realistic mechanical flip transitions with split-flap sound design aesthetics.
- **Hero Viewport (100vh):** Zero clutter, zero distractions. Focus entirely on the passage of time.
- **Dynamic Localized Date:** Displays full weekday, day, month, and year in your preferred language.
- **Fullscreen Mode:** 1-click toggle to turn any second monitor, iPad, or tablet into an ambient retro desk clock.

### 🍅 2. Integrated Pomodoro Focus Engine
- **Classic 25/5 Cycles:** 25 minutes of uninterrupted deep work paired with 5 minutes of restorative break.
- **Persistent State:** Timer state persists across tab switches and browser refreshes via `localStorage`.
- **Visual Progress Ring & Active Indicator:** Ambient pulsing indicator showing active work or break modes.

### 🕌 3. Official Kemenag RI Prayer Times
- **Accurate Astronomical Calculation:** Powered by the astronomical [`adhan`](https://github.com/batoulapps/adhan-js) library.
- **Official Indonesian Standards:**
  - Fajr Angle: **20.0°**, Isha Angle: **18.0°**
  - Madhab: **Shafi'i**
  - Rounding: **Rounding Up**
  - Buffer Ihtiyat: **+2 minutes** safety margin on all prayer times (Sunrise: -2m).
- **Auto Friday "Jum'at" Label:** Automatically transforms "Dzuhur" into **"Jum'at"** every Friday.
- **Fine-Tune Adjustments (-15m to +15m):** Built-in modal to calibrate times to your local mosque's adzan timing.
- **Desktop Push Notifications:** Optional desktop notifications when adzan arrives.

### 📍 4. Location Database & Geolocation
- **514 Indonesian Cities & Regencies:** Complete built-in offline coverage across all 38 Indonesian provinces.
- **40+ International Hubs:** Pre-configured coordinates and timezones for major global cities.
- **1-Click GPS Detection:** Auto-detect your exact coordinates and timezone via browser geolocation.
- **Global Search:** Search unlisted worldwide cities via OpenStreetMap Nominatim.

### 🎨 5. Obsidian Themes & Custom HEX
- **6 Handpicked Aesthetic Presets:** *Warm Amber* (Default), *Islamic Emerald*, *Modern Sky Cyan*, *Pomodoro Rose*, *Mystic Purple*, and *Monochrome Silver*.
- **Custom HEX Color Input:** Enter any HEX code (e.g., `#fbbf24`) with automated contrast calculation for crystal-clear readability.

### 📱 6. Progressive Web App (PWA)
- **Install to Home Screen / Desktop:** Works as a native desktop application on macOS, Windows, Linux, iOS, and Android.
- **Offline Capable:** Service worker caching powered by Workbox ensures your clock runs even with no internet connection.

---

## 🧭 Multi-Page Platform Architecture

Zen Clock features a modern multi-page client-side architecture with zero-page-reload routing and static hosting fallback:

| Route | View Component | Purpose |
| :--- | :--- | :--- |
| **`/`** | `DeskClockPage` | Main live web application (Flip Clock, Pomodoro, Prayer Schedule, Fullscreen, Customization Modals). |
| **`/explore`** | `ExplorePage` | Bridging hub introducing the Zen Clock multi-platform ecosystem with quick navigation cards. |
| **`/vscode`** | `ExtensionLanding` | Dedicated landing page for the Visual Studio Code extension (features, macOS frame preview, 1-click CLI command, editor galleries). |
| **`/browser`** | `BrowserLanding` | Dedicated landing page for Chrome & Edge extensions (popup preview, ZIP download, developer mode setup). |

> **Static Hosting Compatibility:** Full support for HTML5 History API (`pushState`/`popstate`) with hash fallbacks (`/#explore`, `/#vscode`, `/#browser`) and pre-bundled SPA rewrite files (`_redirects` and `vercel.json`) to prevent 404 errors on refresh.

---

## 🚀 Multi-Platform Ecosystem

Zen Clock is actively expanding across diverse platforms to meet you wherever you work:

```
                            ┌────────────────────────┐
                            │ Zen Clock Ecosystem Hub│
                            └───────────┬────────────┘
         ┌───────────────────┬──────────┴───────────┬──────────────────┐
         ▼                   ▼                      ▼                  ▼
┌─────────────────┐ ┌─────────────────┐  ┌────────────────────┐ ┌───────────────────┐
│   Web & PWA     │ │ VS Code Ext     │  │ Browser Extension  │ │ CLI Program (Go)  │
│ (zen-flip-clock)│ │(extension-clock)│  │(extension-browser) │ │  (cli-zen-clock)  │
└─────────────────┘ └─────────────────┘  └────────────────────┘ └───────────────────┘
                                       │
                                       ▼
                        ┌───────────────────────────────┐
                        │    Native & Mobile Roadmap    │
                        │ macOS · Windows · Linux · App │
                        └───────────────────────────────┘
```

1. **[Zen Clock Web (This Repository)](https://github.com/lutfialdrii/zen-flip-clock-web)**: Live web app and ecosystem gateway.
2. **[VS Code Extension (`lutfialdrii.extension-clock`)](https://marketplace.visualstudio.com/items?itemName=lutfialdrii.extension-clock)**: Embed clock in Sidebar, Bottom Panel, or Status Bar.
3. **[Browser Extension (`extension-browser-zen-clock`)](https://github.com/lutfialdrii/zen-clock-extension-browser)**: Instant toolbar popup and new tab desk clock for Chrome & Edge.
4. **CLI Program (`cli-zen-clock`)**: Lightweight Go-based TUI flip clock and prayer daemon for the terminal.
5. **Native Apps (Roadmap)**: Flutter/Native desktop applet for macOS menu bar, Windows tray, and Linux.

---

## 🌐 Internationalization (i18n)

Full bilingual support with instantaneous switching:
- **Bahasa Indonesia (`id`)**
- **English (`en`)**

Preferences are automatically detected on first visit and stored in `localStorage`.

---

## 🚢 Deployment to Hosting

This project is pre-configured for 1-click, zero-config deployment to all popular static hosting providers.

### 1. Cloudflare Pages (Recommended)
1. Link your GitHub repository to **Cloudflare Pages**.
2. Set **Framework Preset**: `Vite`.
3. Set **Build command**: `npm run build`.
4. Set **Build output directory**: `dist`.
5. *Note: SPA routing is handled automatically by the bundled [`public/_redirects`](./public/_redirects).*

### 2. Vercel
1. Import your GitHub repository into **Vercel**.
2. Framework preset will automatically detect `Vite`.
3. Deploy!
4. *Note: SPA rewrites are handled automatically by [`vercel.json`](./vercel.json).*

### 3. Netlify
1. Connect your repository to **Netlify**.
2. Build command: `npm run build`
3. Publish directory: `dist`
4. *Note: Redirects are handled automatically by `public/_redirects`.*

### 4. GitHub Pages
If deploying to GitHub Pages under a repository subpath (e.g. `username.github.io/repo-name`):
1. In `vite.config.js`, set `base: '/repo-name/'`.
2. Configure GitHub Actions with `peaceiris/actions-gh-pages`.

---

## 💻 Local Development

### Prerequisites
- [Node.js](https://nodejs.org/) v18.0 or higher
- `npm` v9.0 or higher

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/lutfialdrii/zen-flip-clock-web.git
cd zen-flip-clock-web

# 2. Install dependencies
npm install

# 3. Start development server (with HMR)
npm run dev

# 4. Open in browser
# Local: http://localhost:5173
```

### Useful Scripts

```bash
npm run dev        # Starts Vite development server
npm run build      # Compiles production-ready bundle into dist/
npm run preview    # Locally serves the compiled production build
npm run lint       # Runs ESLint code style checks
```

---

## 📁 Project Directory Structure

```text
zen-flip-clock/
├── public/
│   ├── _redirects              # Netlify & Cloudflare Pages SPA rewrite rule
│   ├── assets/                 # High-resolution screenshots and preview imagery
│   ├── favicon.svg             # Vector app icon
│   └── manifest.webmanifest    # PWA web manifest specification
├── src/
│   ├── components/
│   │   ├── browser/            # Dedicated Browser Extension landing page
│   │   ├── explore/            # Bridging ecosystem exploration hub
│   │   ├── AdjustModal.jsx     # Prayer offset calibration modal
│   │   ├── CityPickerModal.jsx # Offline city selector & GPS detection
│   │   ├── ExtensionLanding.jsx# Dedicated VS Code extension landing page
│   │   ├── FlipClock.jsx       # 3D mechanical flip clock engine
│   │   ├── PomodoroTimer.jsx   # Focus / Break timer interface
│   │   ├── PrayerTime.jsx      # Daily prayer schedule and countdown
│   │   └── SettingsModal.jsx   # Theme, audio, and language settings
│   ├── utils/
│   │   ├── citiesData.js       # 514 Indonesian cities + 40 international hubs
│   │   ├── i18n.jsx            # React LanguageContext provider
│   │   ├── prayerHelper.js     # Kemenag RI astronomical formula wrapper
│   │   ├── storage.js          # Persistent local storage layer
│   │   └── translations.js     # Bilingual dictionary (ID & EN)
│   ├── App.jsx                 # App root with SPA router & state synchronization
│   └── main.jsx                # React DOM entrypoint with PWA registration
├── vercel.json                 # Vercel SPA rewrite specification
├── vite.config.js              # Vite bundler & PWA plugin configuration
└── package.json                # Project dependencies and lifecycle scripts
```

---

## 💖 Support the Creator

Zen Clock is 100% free, open-source, and ad-free. If this project helps you maintain mindfulness, punctuality, and focus in your daily workflow, consider supporting its development:

- ☕ **Saweria:** [saweria.co/lutfialdrii](https://saweria.co/lutfialdrii) (GoPay, OVO, Dana, QRIS)
- ⭐ **Star on GitHub:** Give this repository a star to help more developers discover Zen Clock!

---

## 📄 License

This project is licensed under the [MIT License](./LICENSE) — free for personal and commercial use.

---

Crafted with care by [lutfialdrii](https://github.com/lutfialdrii).
