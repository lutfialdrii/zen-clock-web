# Zen Clock Ecosystem Hub & Landing Page — Design Specification

- **Date:** 2026-09-26
- **Status:** Approved
- **Target Repository:** `zen-flip-clock`
- **Related Projects:** `extension-clock`, `extension-browser-zen-clock`, `cli-zen-clock`

---

## 1. Executive Summary & Vision

Zen Clock is an unified mindfulness and productivity ecosystem designed to harmonize modern developer and digital workflows with spiritual discipline: **"Pomodoro & Muslim Prayer Times"**.

This project establishes `zen-flip-clock` as the official **Central Web Hub & Ecosystem Landing Page**. It serves two fundamental purposes:
1. **At `/`**: A pure, distraction-free **Live Web Clock & Standalone PWA** (3D flip clock, prayer times countdown, and Pomodoro timer) suitable as an always-on desk clock on tablets, phones, or secondary monitors.
2. **At `/apps`**: A high-conversion, interactive **Ecosystem Showcase** featuring all Zen Clock implementations:
   - **VS Code Extension** (`extension-clock`)
   - **Browser Extension** (`extension-browser-zen-clock` for Chrome, Edge, Firefox, Brave)
   - **CLI Terminal Program** (`cli-zen-clock` written in Go)
   - **Native Desktop & Mobile Roadmap** (macOS menu bar, Windows tray, Linux applet, Android & iOS companion)

---

## 2. Unified Design System

To ensure 100% visual consistency and brand recognition across the web, extensions, and terminal outputs, all components strictly adhere to the unified Zen Design System tokens:

### 2.1 Color Palette
- **Canvas Base (`--zen-bg-base`)**: `#0c0d10` (Zen Deep Obsidian — distraction-free, battery efficient on OLED).
- **Surface Elevation (`--zen-surface-1`, `--zen-surface-2`)**: `#14151a` and `#1c1e24` (Subtle card surfaces).
- **Border & Dividers (`--zen-border`)**: `rgba(255, 255, 255, 0.08)` (Crisp 1px hair-line outline).
- **Glassmorphism (`--zen-glass-bg`, `--zen-glass-blur`)**: `rgba(18, 18, 22, 0.75)` with `backdrop-filter: blur(12px)`.
- **Primary Accent (`--zen-amber`, `--zen-amber-hover`)**: `#fbbf24` and `#f59e0b` (Spiritual warmth, adhan countdown highlight, active tab indicator, primary CTA).
- **Secondary Accent (`--zen-emerald`)**: `#10b981` (Focus state, active timer, successful copy feedback).
- **Indigo Accent (`--zen-indigo`)**: `#6366f1` (Productivity & PWA badge accent).
- **Typography Colors**:
  - Primary: `#f8fafc` (High contrast, crisp text).
  - Secondary/Muted: `#94a3b8` (Descriptive paragraphs, labels).
  - Subtle: `#64748b` (Dividers, timestamps, inactive icons).

### 2.2 Typography & Iconography
- **Body & Headings**: `Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`.
- **Monospace Stack (Time, Countdown, CLI Snippets)**: `'JetBrains Mono', 'SFMono-Regular', Consolas, monospace`.
- **Icons**: `lucide-react` (uniform stroke width of 1.75px for consistency).

### 2.3 Signature UI Elements
- **3D Perspective Flip Cards**: Characteristic horizontal split line with realistic top-to-bottom flip animation.
- **Pill Badges with Pulse Indicators**:
  - 🟢 *Live & Stable* (VS Code Extension, Browser Extension, CLI Program).
  - 🟡 *In Roadmap* (macOS Menu Bar, Windows Tray, Mobile Companion).
- **Dark Terminal Snippet Box**: 1-click copy box featuring instant visual confirmation (green checkmark + "Copied!"/"Tersalin!").

---

## 3. Architecture & Routing

### 3.1 Routing Strategy (Zero Extra Dependencies)
To keep the bundle lightweight and optimize offline PWA performance, routing is powered by lightweight client-side History API (`window.history.pushState` and `window.addEventListener('popstate', ...)`):

- **`/` (Root)**:
  - Renders the Live Web Clock, Prayer Times, and Pomodoro Timer.
  - Header: Distraction-free navigation (Clock | Pomodoro | PWA Install button when installable).
  - Footer Dock: Minimalist, semi-transparent subtle bar positioned at the bottom:
    `✦ Explore Zen Clock Ecosystem (VS Code · Browser · CLI) →`
    Clicking smoothly routes to `/apps` without page reload.
- **`/apps` (Ecosystem Showcase)**:
  - Renders `AppsShowcase.jsx`.
  - Floating top navigation with `← Back to Live Clock`, language toggle (`ID` / `EN`), and GitHub repository link.
  - Segmented tab control with URL hash sync (`/apps#vscode`, `/apps#browser`, `/apps#cli`, `/apps#native`).
- **`/extension` (Legacy Route Compatibility)**:
  - Automatically redirects or mounts `/apps` with the `vscode` tab preselected to preserve existing shared links.

---

## 4. Component Hierarchy & Module Breakdown

```
src/
├── components/
│   ├── FlipClock.jsx                # Existing: 3D Flip Clock
│   ├── FlipUnit.jsx                 # Existing: Single Flip digit unit
│   ├── PomodoroTimer.jsx            # Existing: Pomodoro & Break cycle
│   ├── PrayerTime.jsx               # Existing: Adhan.js calculation & countdown
│   └── showcase/
│       ├── AppsShowcase.jsx         # Main shell: Hero, Segmented Tabs, Footer
│       ├── AppsShowcase.css         # Styling for showcase shell & design tokens
│       ├── VSCodeTab.jsx            # VS Code extension landing & CLI install box
│       ├── BrowserTab.jsx           # Browser extension landing (Chrome/Edge/Firefox)
│       ├── CliTab.jsx               # Terminal CLI landing (Go/Brew/Curl & TUI preview)
│       └── NativeTab.jsx            # Desktop & Mobile roadmap + community feedback
├── utils/
│   ├── i18n.js                      # Bilingual dictionary (ID & EN) & persistence
│   ├── notification.js              # Existing: Web notification & audio chime
│   └── prayerHelper.js              # Existing: Calculation parameters & Kemenag logic
├── App.jsx                          # Root controller with lightweight routing
└── index.css                        # Global design system variables & core styling
```

---

## 5. Tab Content Specifications

### 5.1 Tab 1: VS Code Extension (`VSCodeTab.jsx`)
- **Headline**: "Bring Peace & Prayer Reminders into Your Code Editor"
- **Primary Actions**:
  - One-click copy CLI command: `code --install-extension lutfialdrii.extension-clock`
  - Button 1: "Install from VS Code Marketplace" (Direct link)
  - Button 2: "Open in VS Code" (`vscode:extension/lutfialdrii.extension-clock`)
- **Key Features Showcased**:
  1. *Status Bar Clock & Countdown*: Real-time discrete prayer countdown next to your git branch.
  2. *Integrated Pomodoro Timer*: Customizable work/break intervals with gentle chimes.
  3. *Adhan Audio & Notification*: Discrete editor toast when prayer time arrives.
  4. *Zero Distraction*: Matches your active VS Code color theme automatically.

### 5.2 Tab 2: Browser Extension (`BrowserTab.jsx`)
- **Headline**: "Mindful Timekeeping on Every Tab"
- **Compatibility**: Google Chrome, Microsoft Edge, Brave, Mozilla Firefox.
- **Primary Actions**:
  - Button 1: "Add to Chrome & Edge" (Chrome Web Store link / releases link)
  - Button 2: "Download ZIP Package" (GitHub Releases)
  - Accordion: "Developer Mode Quick Install (3 Easy Steps)" for early adopters.
- **Key Features Showcased**:
  1. *Toolbar Popup Clock*: One click to check prayer times and toggle Pomodoro.
  2. *New Tab Zen Screen*: Turn every new tab into an aesthetic, distraction-free desk clock.
  3. *Desktop Browser Alerts*: Native notifications for prayer times even when tabs are inactive.

### 5.3 Tab 3: CLI Terminal Program (`CliTab.jsx`)
- **Headline**: "Blazing-Fast Go Terminal Clock for Sysadmins & Developers"
- **Tech Stack**: Built with Go, zero runtime dependencies, <10MB RAM footprint.
- **Quick Install Tabs**:
  - Option A (Homebrew): `brew install lutfialdrii/tap/zen-clock`
  - Option B (Go Install): `go install github.com/lutfialdrii/zen-clock@latest`
  - Option C (Curl One-Liner): `curl -fsSL https://raw.githubusercontent.com/lutfialdrii/zen-clock/main/scripts/install.sh | bash`
  - Option D (Binary Downloads): Direct GitHub release links for macOS (Apple Silicon / Intel), Linux (x86_64 / arm64), and Windows (x64).
- **Interactive Terminal Preview**:
  - Stylized dark terminal box with ASCII/TUI flip clock simulation and prayer table.
- **Command Cheat Sheet**:
  - `zen-clock run` (Launch interactive TUI)
  - `zen-clock prayer` (Output today's prayer schedule)
  - `zen-clock pomodoro -w 25 -b 5` (Terminal focus timer)

### 5.4 Tab 4: Native & Mobile Roadmap (`NativeTab.jsx`)
- **Headline**: "The Future of Zen Clock on Desktop & Mobile"
- **Planned Platforms**:
  1. *macOS Menu Bar App*: Native Swift/Go menu bar icon with countdown and sleek popover.
  2. *Windows System Tray*: Minimalist tray utility with native Windows 11 notifications.
  3. *Linux Applet*: Lightweight system tray daemon compatible with GNOME & KDE.
  4. *Mobile (iOS & Android)*: Standalone app with Lock Screen widgets and background Adhan alarms.
- **Engagement CTAs**:
  - "Star on GitHub" (to accelerate development priority).
  - "Vote on Features & Join Discussion" (Link to GitHub Issues / Discussions).

---

## 6. Bilingual Localization (ID / EN)

### 6.1 Localization Engine (`src/utils/i18n.js`)
- **Storage Key**: `localStorage.getItem('zen_clock_lang')`.
- **Default Resolution**:
  ```javascript
  const getInitialLanguage = () => {
    const saved = localStorage.getItem('zen_clock_lang');
    if (saved === 'id' || saved === 'en') return saved;
    return (navigator.language && navigator.language.startsWith('id')) ? 'id' : 'en';
  };
  ```
- **Language Switcher UI**: Sleek toggle button in the floating header (`ID / EN`) with active pill indicator.

---

## 7. Verification & Quality Assurance Strategy

1. **Routing & Transition Verification**:
   - Verify `/` loads full clock without any visual regression.
   - Verify subtle footer link smoothly navigates to `/apps` without page refresh.
   - Verify `/extension` loads `/apps#vscode` seamlessly.
   - Verify "← Back to Live Clock" navigates cleanly back to `/`.
2. **Deep-linking & Tab State**:
   - Verify hash change (`#vscode`, `#browser`, `#cli`, `#native`) activates the corresponding tab directly on reload.
3. **Interactivity & Clipboard**:
   - Verify all copy buttons trigger clipboard writes and 2-second visual feedback.
   - Verify language switcher dynamically translates all UI texts immediately.
4. **PWA & Production Build Integrity**:
   - Run `npm run build` to confirm zero Vite/Rollup errors.
   - Verify Service Worker registers and caches assets correctly.
   - Test responsive layout from mobile (375px) to ultra-wide displays (1440px+).
