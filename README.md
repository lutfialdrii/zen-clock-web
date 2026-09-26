# Zen Clock: Pomodoro & Muslim Prayer Times

> **A minimal, aesthetic desk clock combining Pomodoro focus cycles with precise Islamic prayer times across Web, VS Code, Browser, CLI, and Native platforms.**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![VS Code Marketplace](https://img.shields.io/visual-studio-marketplace/v/lutfialdrii.extension-clock?label=VS%20Code%20Marketplace&color=blueviolet)](https://marketplace.visualstudio.com/items?itemName=lutfialdrii.extension-clock)
[![PWA Ready](https://img.shields.io/badge/PWA-Ready-10b981.svg)](https://zen-flip-clock.vercel.app)

---

## 🌟 Overview

**Zen Clock** is an ecosystem of mindfulness and productivity tools engineered to maintain peace and focus throughout your day. It pairs a distraction-free flip desk clock with customizable Pomodoro intervals and accurate Muslim prayer times computed via astronomical algorithms (`adhan`).

Built with an obsidian-dark glassmorphism aesthetic, Zen Clock serves as a centralized hub connecting multiple platforms into a single unified experience.

---

## 🧭 Centralized Hub & Routes

Zen Clock runs as a high-performance Progressive Web App (PWA) with client-side SPA routing:

| Route | View | Description |
|---|---|---|
| **`/`** | **Live Web Clock & PWA** | Distraction-free flip clock, customizable Pomodoro timer (25/5), and geolocation-based prayer calculation with audio chimes and native push notifications. |
| **`/apps`** | **Ecosystem Showcase** | Interactive hub showcasing all Zen Clock platforms with deep-links, install commands, manual installation guides, and interactive terminal previews. |
| **`/apps#vscode`** | **VS Code Tab** | Marketplace badge, CLI installation snippet, direct extension launch, and feature highlights. |
| **`/apps#browser`** | **Browser Extension Tab** | Chrome, Edge, Brave, and Firefox installation instructions and ZIP release downloads. |
| **`/apps#cli`** | **CLI Terminal Tab** | Go-based terminal flip clock installation via Homebrew, `go install`, or curl script. |
| **`/apps#native`** | **Native Roadmap Tab** | Future roadmap for macOS menu bar, Windows tray, Linux Waybar, and iOS/Android companions. |
| **`/extension`** | *(Legacy Route)* | Automatically bridges and redirects to `/apps#vscode` for backward compatibility. |

---

## 🚀 Multi-Platform Ecosystem

```
                            ┌────────────────────────┐
                            │ Zen Clock Ecosystem Hub│
                            └───────────┬────────────┘
         ┌───────────────────┬──────────┴───────────┬──────────────────┐
         ▼                   ▼                      ▼                  ▼
┌─────────────────┐ ┌─────────────────┐  ┌────────────────────┐ ┌───────────────────┐
│   Web & PWA     │ │ VS Code Ext     │  │ Browser Extension  │ │ CLI Program (Go)  │
│ (Desktop Clock) │ │(extension-clock)│  │(extension-browser) │ │  (cli-zen-clock)  │
└─────────────────┘ └─────────────────┘  └────────────────────┘ └───────────────────┘
                                       │
                                       ▼
                        ┌───────────────────────────────┐
                        │    Native & Mobile Roadmap    │
                        │ macOS · Windows · Linux · App │
                        └───────────────────────────────┘
```

### 1. Web & PWA Edition (`/`)
- **Aesthetic Flip Clock:** Realistic 3D card-flip animations with zero CPU overhead.
- **Pomodoro Focus Timer:** 25-minute focus intervals alternating with 5-minute restorative breaks.
- **Prayer Calculations:** Automated GPS geolocation or reverse IP lookup with Adhan calculation methods (Kemenag, MWL, ISNA, Egypt, Makkah, Karachi, Tehran).
- **PWA Ready:** Installable as a standalone desktop/mobile app with offline support via Service Worker.

### 2. VS Code Extension (`extension-clock`)
- Integrated status bar clock showing real-time countdown to the next prayer.
- Webview panel desk clock embedded directly in your code editor.
- **Install via CLI:**
  ```bash
  code --install-extension lutfialdrii.extension-clock
  ```
- **Install from Marketplace:** [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=lutfialdrii.extension-clock)

### 3. Browser Extension (`extension-browser-zen-clock`)
- Supported on Google Chrome, Microsoft Edge, Brave, and Mozilla Firefox.
- **Quick Popup Mode:** Instant toolbar popup for checking upcoming prayer times without interrupting work.
- **New Tab Desk Clock:** Replaces your browser's new tab page with a soothing, full-screen desk clock.

### 4. CLI Program (`cli-zen-clock`)
- Engineered in Go with zero runtime dependencies and ultra-low footprint (<10 MB RAM).
- ASCII / TUI flip animation and lightweight background prayer alert daemon.
- **Quick Install:**
  ```bash
  # Homebrew (macOS / Linux)
  brew install lutfialdrii/tap/zen-clock

  # Go Install
  go install github.com/lutfialdrii/zen-clock@latest

  # Shell installer
  curl -fsSL https://raw.githubusercontent.com/lutfialdrii/zen-clock/main/scripts/install.sh | bash
  ```

### 5. Native & Mobile Roadmap
- **macOS:** Lightweight Menu Bar status utility with native notification center integration.
- **Windows 11:** System tray resident widget with Windows Action Center toasts.
- **Linux:** Native desktop applet compatible with GNOME, KDE Plasma, and Waybar.
- **iOS & Android:** Standalone mobile app with lockscreen widgets and audible adhan alarms.

---

## 🌐 Bilingual Support (i18n)

The ecosystem showcase and web application support full bilingual localization:
- **Bahasa Indonesia (`id`)**
- **English (`en`)**

The interface automatically detects the client browser's primary language and persists user language toggles in `localStorage`.

---

## 🛠️ Tech Stack & Design System

- **Core Framework:** React 19, Vite 8
- **PWA Engine:** `vite-plugin-pwa` with Workbox Service Worker caching
- **Icons:** `lucide-react`
- **Prayer Calculation:** `adhan` library with astronomical positioning
- **Design Tokens:** Obsidian dark theme (`#08090b`), glassmorphism cards (`rgba(255, 255, 255, 0.03)`), glowing emerald/amber status badges, and responsive segmented tab controls.

---

## 💻 Local Development

Ensure you have [Node.js](https://nodejs.org/) (v18+ recommended) installed.

### 1. Clone the repository
```bash
git clone https://github.com/lutfialdrii/zen-clock.git
cd zen-clock/zen-flip-clock
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start development server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Run linter
```bash
npm run lint
```

### 5. Build for production
```bash
npm run build
```
Production assets will be generated into the `dist/` directory.

### 6. Preview production build
```bash
npm run preview
```

---

## 📄 License

This project is licensed under the [MIT License](LICENSE) — free and open source for the community.
