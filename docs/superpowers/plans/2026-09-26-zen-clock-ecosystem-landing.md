# Zen Clock Ecosystem Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform `zen-flip-clock` into the centralized brand hub and landing page for the entire Zen Clock ecosystem (VS Code Extension, Browser Extension, CLI program, and Native Roadmap), while maintaining the root `/` as a distraction-free Live Web Clock PWA.

**Architecture:** Implement a modular, zero-router SPA using the native HTML5 History API for lightweight routing (`/` and `/apps`, with `/extension` alias). Extract design system tokens into global CSS, introduce a persistent bilingual localization engine (ID/EN), create four dedicated showcase tab modules, and connect them to the root app with a subtle, non-intrusive footer dock.

**Tech Stack:** React 19, Vite 8, Lucide React, CSS Variables, Native HTML5 History & Clipboard APIs, PWA (VitePWA).

**Spec:** [docs/superpowers/specs/2026-09-26-zen-clock-ecosystem-landing-design.md](file:///Users/sm/Documents/Lutfi/DEV/Learn/zen-flip-clock/docs/superpowers/specs/2026-09-26-zen-clock-ecosystem-landing-design.md)

## Global Constraints

- Root `/` must remain 100% distraction-free for PWA desk clock users; ecosystem navigation is placed only in a subtle footer dock.
- Zero extra heavy dependencies (no React Router package); use HTML5 `pushState`, `popstate`, and URL hash sync.
- Strict design system consistency across all platforms: Obsidian canvas `#0c0d10`, amber accent `#fbbf24`, emerald accent `#10b981`, and crisp border `rgba(255, 255, 255, 0.08)`.
- Full bilingual localization (ID and EN) with automatic browser detection and `localStorage` persistence.
- Backward compatibility: `/extension` must smoothly open the VS Code tab on `/apps`.

---

### Task 1: Unified Design System Tokens & Base CSS

**Files:**
- Modify: `src/index.css:1-50`
- Test: Verification build via `npm run build`

**Interfaces:**
- Consumes: Existing CSS rules in `src/index.css`.
- Produces: CSS custom properties (`--zen-bg-base`, `--zen-surface-1`, `--zen-surface-2`, `--zen-border`, `--zen-amber`, `--zen-emerald`, `--zen-indigo`, `--zen-text-primary`, `--zen-text-muted`, `--zen-text-subtle`, `--zen-glass-bg`, `--zen-glass-blur`).

- [ ] **Step 1: Inspect and update design system variables in `src/index.css`**

Add root variables at the top of `src/index.css`:
```css
:root {
  /* Unified Zen Design System Tokens */
  --zen-bg-base: #0c0d10;
  --zen-surface-1: #14151a;
  --zen-surface-2: #1c1e24;
  --zen-border: rgba(255, 255, 255, 0.08);
  --zen-border-hover: rgba(251, 191, 36, 0.35);
  --zen-glass-bg: rgba(18, 18, 22, 0.75);
  --zen-glass-blur: blur(12px);

  /* Accents */
  --zen-amber: #fbbf24;
  --zen-amber-hover: #f59e0b;
  --zen-amber-glow: rgba(251, 191, 36, 0.15);
  --zen-emerald: #10b981;
  --zen-emerald-glow: rgba(16, 185, 129, 0.15);
  --zen-indigo: #6366f1;

  /* Typography */
  --zen-text-primary: #f8fafc;
  --zen-text-muted: #94a3b8;
  --zen-text-subtle: #64748b;
  --zen-font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --zen-font-mono: 'JetBrains Mono', 'SFMono-Regular', Consolas, monospace;

  /* Legacy Fallbacks for VS Code Context */
  --bg-color: var(--zen-bg-base);
  --card-bg: var(--zen-surface-2);
  --text-color: var(--zen-text-primary);
  --divider-color: var(--zen-border);
}
```

- [ ] **Step 2: Add dock footer and pulse dot utility classes in `src/index.css`**

```css
/* Minimalist Subtle Footer Dock on Live Clock */
.zen-dock-footer {
  margin-top: auto;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  z-index: 10;
}

.zen-dock-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(20, 21, 26, 0.6);
  border: 1px solid var(--zen-border);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  color: var(--zen-text-muted);
  font-size: 13px;
  font-weight: 500;
  padding: 8px 16px;
  border-radius: 9999px;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.zen-dock-link:hover {
  color: var(--zen-amber);
  border-color: var(--zen-border-hover);
  background: rgba(251, 191, 36, 0.08);
  transform: translateY(-1px);
}

/* Pulsing Status Dot */
.zen-pulse-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  display: inline-block;
}

.zen-pulse-dot.live {
  background-color: var(--zen-emerald);
  box-shadow: 0 0 8px rgba(16, 185, 129, 0.6);
}

.zen-pulse-dot.roadmap {
  background-color: var(--zen-amber);
  box-shadow: 0 0 8px rgba(251, 191, 36, 0.6);
}
```

- [ ] **Step 3: Run build to verify stylesheet validity**

Run: `npm run build`
Expected: Build succeeds with 0 errors.

- [ ] **Step 4: Commit changes**

```bash
git add src/index.css
git commit -m "style: define unified Zen Design System tokens and dock footer styles"
```

---

### Task 2: Bilingual Localization Engine (`i18n.js` & `translations.js`)

**Files:**
- Create: `src/utils/translations.js`
- Create: `src/utils/i18n.js`
- Test: `src/utils/i18n.test.js` (or node verification script)

**Interfaces:**
- Consumes: Native `localStorage` and `navigator.language`.
- Produces: `useTranslation()` hook or `{ lang, setLang, t }` utility functions.

- [ ] **Step 1: Create `src/utils/translations.js` with full ID and EN dictionaries**

```javascript
export const translations = {
  id: {
    nav: {
      backToClock: 'Kembali ke Web Clock',
      appsTitle: 'Ekosistem Zen Clock',
      installPwa: 'Pasang Web App',
      starGitHub: 'Star di GitHub',
      langToggle: 'ID'
    },
    hero: {
      tag: 'Ekosistem Produktivitas & Ibadah',
      title: 'Zen Clock Ecosystem',
      subtitle: 'Satu filosofi ketenangan, hadir di mana pun Anda berkarya. Dari editor kode, browser web, terminal konsol, hingga layar kerja Anda.',
      allAppsBadge: 'Tersedia di berbagai platform'
    },
    dock: {
      exploreEcosystem: '✦ Jelajahi Ekosistem Zen Clock (VS Code · Browser · CLI) →'
    },
    tabs: {
      vscode: 'VS Code Extension',
      browser: 'Browser Extension',
      cli: 'CLI Program (Go)',
      native: 'Native & Mobile Roadmap'
    },
    badges: {
      live: 'Tersedia',
      roadmap: 'Tahap Riset & Rencana',
      popular: 'Paling Populer',
      lightweight: 'Ultra Ringan'
    },
    vscode: {
      headline: 'Ketenangan & Pengingat Sholat di Editor Kode Anda',
      description: 'Tetap khusyuk berkarya tanpa melupakan waktu ibadah. Zen Clock hadir langsung di status bar dan panel VS Code dengan Pomodoro dan notifikasi adzan.',
      quickInstallLabel: 'Pasang via Terminal / VS Code CLI:',
      installMarketplace: 'Pasang dari VS Code Marketplace',
      openInVscode: 'Buka Langsung di VS Code',
      viewSource: 'Lihat Kode di GitHub',
      feature1Title: 'Status Bar Discrete Countdown',
      feature1Desc: 'Countdown waktu sholat berikutnya tepat di samping git branch Anda.',
      feature2Title: 'Pomodoro Timer Terintegrasi',
      feature2Desc: 'Interval fokus 25 menit dengan nada pengingat lembut.',
      feature3Title: 'Notifikasi Adzan',
      feature3Desc: 'Toast notifikasi dan audio adzan lembut saat waktu sholat masuk.',
      feature4Title: 'Theme Adaptive',
      feature4Desc: 'Menyesuaikan otomatis dengan tema gelap maupun terang VS Code Anda.'
    },
    browser: {
      headline: 'Waktu Sholat & Flip Clock di Setiap Tab Browser Anda',
      description: 'Ekstensi peramban modern untuk Google Chrome, Microsoft Edge, Brave, dan Firefox. Hadir sebagai popup cepat maupun tampilan new tab jam meja.',
      addChrome: 'Pasang di Chrome & Edge',
      downloadZip: 'Unduh Rilis ZIP (.zip)',
      manualInstallTitle: 'Cara Pasang Manual (Developer Mode):',
      step1: '1. Unduh dan ekstrak file ZIP rilis terbaru.',
      step2: '2. Buka chrome://extensions di browser Anda dan aktifkan "Developer Mode".',
      step3: '3. Klik "Load unpacked" dan pilih folder hasil ekstrak.',
      feature1Title: 'Popup Cepat',
      feature1Desc: 'Cukup 1-klik di toolbar untuk memeriksa sisa waktu menuju sholat berikutnya.',
      feature2Title: 'Zen New Tab Desk Clock',
      feature2Desc: 'Ubah tab baru menjadi layar jam flip meja yang elegan dan menenangkan.',
      feature3Title: 'Audio & Desktop Notification',
      feature3Desc: 'Notifikasi browser tetap berbunyi meski Anda sedang berselancar di tab lain.'
    },
    cli: {
      headline: 'Jam Terminal Berkecepatan Tinggi untuk Pengguna Konsol',
      description: 'Dibangun dengan bahasa Go tanpa dependensi runtime tambahan. Sangat ringan (<10MB RAM) untuk sysadmin, DevOps, dan pecinta terminal.',
      tabBrew: 'Homebrew (macOS/Linux)',
      tabGo: 'Go Install',
      tabCurl: 'Curl Script',
      tabBinary: 'Direct Binary',
      copied: 'Tersalin!',
      copyCommand: 'Salin Perintah',
      terminalPreviewHeader: 'terminal - zen-clock',
      feature1Title: 'ASCII / TUI Flip Clock',
      feature1Desc: 'Animasi jam flip berbasis terminal yang estetis dan hemat sumber daya.',
      feature2Title: 'Background Prayer Daemon',
      feature2Desc: 'Dapat dijalankan sebagai daemon latar belakang dengan bell/chime pengingat.',
      feature3Title: 'Kalkulasi Astronomis Akurat',
      feature3Desc: 'Menggunakan algoritma waktu sholat presisi tinggi standar Kemenag RI.'
    },
    native: {
      headline: 'Masa Depan Zen Clock di Desktop & Smartphone',
      description: 'Kami sedang merancang aplikasi native mandiri untuk pengalaman yang semakin terintegrasi dengan sistem operasi favorit Anda.',
      macTitle: 'macOS Menu Bar App',
      macDesc: 'Aplikasi status bar minimalis di pojok kanan atas dengan popover ringkas.',
      winTitle: 'Windows System Tray Widget',
      winDesc: 'Ikon baki sistem Windows 11 dengan integrasi notifikasi native.',
      linuxTitle: 'Linux Desktop Applet',
      linuxDesc: 'Applet status bar kompatibel dengan GNOME, KDE Plasma, dan Waybar.',
      mobileTitle: 'iOS & Android Companion',
      mobileDesc: 'Aplikasi mobile dengan widget lockscreen, dynamic island, dan alarm adzan.',
      starPrompt: 'Bantu percepat pengembangan dengan memberikan Star di GitHub:',
      starBtn: 'Beri Star di GitHub',
      feedbackBtn: 'Ajukan Ide & Diskusi'
    },
    footer: {
      copyright: 'Zen Clock Ecosystem — Diciptakan dengan cinta untuk produktivitas & ketenangan.',
      mit: 'Lisensi Open Source MIT'
    }
  },
  en: {
    nav: {
      backToClock: 'Back to Web Clock',
      appsTitle: 'Zen Clock Ecosystem',
      installPwa: 'Install Web App',
      starGitHub: 'Star on GitHub',
      langToggle: 'EN'
    },
    hero: {
      tag: 'Productivity & Spiritual Mindfulness',
      title: 'Zen Clock Ecosystem',
      subtitle: 'One philosophy of tranquility, everywhere you create. From code editor, browser, terminal console, to your workspace screen.',
      allAppsBadge: 'Available across all platforms'
    },
    dock: {
      exploreEcosystem: '✦ Explore Zen Clock Ecosystem (VS Code · Browser · CLI) →'
    },
    tabs: {
      vscode: 'VS Code Extension',
      browser: 'Browser Extension',
      cli: 'CLI Program (Go)',
      native: 'Native & Mobile Roadmap'
    },
    badges: {
      live: 'Live & Stable',
      roadmap: 'In Roadmap',
      popular: 'Most Popular',
      lightweight: 'Ultra Lightweight'
    },
    vscode: {
      headline: 'Peace & Prayer Reminders in Your Code Editor',
      description: 'Stay deeply focused on coding without missing prayer times. Zen Clock lives right in your status bar and sidebar with Pomodoro and gentle adhan alerts.',
      quickInstallLabel: 'Install via Terminal / VS Code CLI:',
      installMarketplace: 'Install from VS Code Marketplace',
      openInVscode: 'Open Directly in VS Code',
      viewSource: 'View Source on GitHub',
      feature1Title: 'Status Bar Discrete Countdown',
      feature1Desc: 'Real-time countdown to the next prayer right beside your git branch.',
      feature2Title: 'Integrated Pomodoro Timer',
      feature2Desc: '25-minute focus intervals paired with tranquil completion chimes.',
      feature3Title: 'Adhan Notification',
      feature3Desc: 'Discreet toast alerts and audio adhan when prayer time arrives.',
      feature4Title: 'Theme Adaptive',
      feature4Desc: 'Seamlessly matches your active light or dark VS Code themes.'
    },
    browser: {
      headline: 'Prayer Times & Flip Clock on Every Browser Tab',
      description: 'Modern browser extension for Chrome, Microsoft Edge, Brave, and Firefox. Available as a quick toolbar popup and a full new-tab desk clock.',
      addChrome: 'Add to Chrome & Edge',
      downloadZip: 'Download ZIP Release (.zip)',
      manualInstallTitle: 'Manual Installation (Developer Mode):',
      step1: '1. Download and extract the latest release ZIP.',
      step2: '2. Navigate to chrome://extensions and enable "Developer Mode".',
      step3: '3. Click "Load unpacked" and select the extracted folder.',
      feature1Title: 'Quick Popup',
      feature1Desc: 'One click in your toolbar to check exact prayer times and start Pomodoro.',
      feature2Title: 'Zen New Tab Desk Clock',
      feature2Desc: 'Turn every new tab into an aesthetic, distraction-free flip desk clock.',
      feature3Title: 'Audio & Desktop Alerts',
      feature3Desc: 'Native desktop notifications sound even while browsing other tabs.'
    },
    cli: {
      headline: 'Blazing-Fast Terminal Clock for Console Enthusiasts',
      description: 'Engineered in Go with zero runtime dependencies. Extremely low resource footprint (<10MB RAM) for sysadmins, DevOps, and Unix minimalists.',
      tabBrew: 'Homebrew (macOS/Linux)',
      tabGo: 'Go Install',
      tabCurl: 'Curl Script',
      tabBinary: 'Direct Binary',
      copied: 'Copied!',
      copyCommand: 'Copy Command',
      terminalPreviewHeader: 'terminal - zen-clock',
      feature1Title: 'ASCII / TUI Flip Clock',
      feature1Desc: 'Aesthetic, low-overhead ASCII terminal flip clock animation.',
      feature2Title: 'Background Prayer Daemon',
      feature2Desc: 'Runs quietly in the background with terminal audio bell alerts.',
      feature3Title: 'Precise Astronomical Calculation',
      feature3Desc: 'High-precision prayer computation using astronomical formulas.'
    },
    native: {
      headline: 'The Future of Zen Clock on Desktop & Mobile',
      description: 'We are engineering native standalone companion applications for an even deeper integration with your operating system.',
      macTitle: 'macOS Menu Bar App',
      macDesc: 'Minimalist status bar utility with countdown and sleek popover.',
      winTitle: 'Windows System Tray Widget',
      winDesc: 'Windows 11 system tray icon with native Windows action center alerts.',
      linuxTitle: 'Linux Desktop Applet',
      linuxDesc: 'Status bar applet compatible with GNOME, KDE Plasma, and Waybar.',
      mobileTitle: 'iOS & Android Companion',
      mobileDesc: 'Dedicated mobile app with lockscreen widgets and adhan alarm clock.',
      starPrompt: 'Help accelerate development by starring our GitHub repository:',
      starBtn: 'Star on GitHub',
      feedbackBtn: 'Request Feature & Discussion'
    },
    footer: {
      copyright: 'Zen Clock Ecosystem — Crafted with peace for productivity and spiritual mindfulness.',
      mit: 'MIT Open Source License'
    }
  }
};
```

- [ ] **Step 2: Create `src/utils/i18n.js` with language resolver and hook**

```javascript
import { useState, useEffect } from 'react';
import { translations } from './translations';

const STORAGE_KEY = 'zen_clock_lang';

export const getInitialLanguage = () => {
  if (typeof window === 'undefined') return 'id';
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'id' || saved === 'en') return saved;
    const browserLang = (navigator.language || '').toLowerCase();
    return browserLang.startsWith('id') ? 'id' : 'en';
  } catch (e) {
    return 'id';
  }
};

export const setStoredLanguage = (lang) => {
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch (e) {
    // ignore localstorage errors
  }
};

export function useLanguage() {
  const [lang, setLangState] = useState(getInitialLanguage);

  useEffect(() => {
    const handleStorage = () => {
      setLangState(getInitialLanguage());
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const changeLanguage = (newLang) => {
    setStoredLanguage(newLang);
    setLangState(newLang);
  };

  const t = translations[lang] || translations.id;

  return { lang, changeLanguage, t };
}
```

- [ ] **Step 3: Run quick node verification test**

Run: `node -e "import('./src/utils/translations.js').then(m => { console.log('Loaded keys:', Object.keys(m.translations.id)); process.exit(0); })"`
Expected: Prints `Loaded keys: [ 'nav', 'hero', 'dock', 'tabs', 'badges', 'vscode', 'browser', 'cli', 'native', 'footer' ]`.

- [ ] **Step 4: Commit translation engine**

```bash
git add src/utils/translations.js src/utils/i18n.js
git commit -m "feat(i18n): implement bilingual translation engine with browser detection"
```

---

### Task 3: Showcase Tab Sub-Components (VS Code, Browser, CLI, Native Roadmap)

**Files:**
- Create: `src/components/showcase/VSCodeTab.jsx`
- Create: `src/components/showcase/BrowserTab.jsx`
- Create: `src/components/showcase/CliTab.jsx`
- Create: `src/components/showcase/NativeTab.jsx`
- Test: Verification build via `npm run build`

**Interfaces:**
- Consumes: `t` translations dictionary, Lucide icons, native clipboard.
- Produces: React components for each tab panel.

- [ ] **Step 1: Create `src/components/showcase/VSCodeTab.jsx`**

```jsx
import React, { useState } from 'react';
import { Code, ExternalLink, Copy, Check, Sparkles, Clock, Timer, ShieldCheck } from 'lucide-react';

const MARKETPLACE_URL = 'https://marketplace.visualstudio.com/items?itemName=lutfialdrii.extension-clock';
const VSCODE_DEEP_LINK = 'vscode:extension/lutfialdrii.extension-clock';
const GITHUB_REPO_URL = 'https://github.com/lutfialdrii/zen-clock';
const CLI_COMMAND = 'code --install-extension lutfialdrii.extension-clock';

export default function VSCodeTab({ t }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(CLI_COMMAND);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="tab-pane-content">
      <div className="tab-hero-box">
        <div className="tab-badge-row">
          <span className="platform-badge live">
            <span className="zen-pulse-dot live"></span>
            {t.badges.live}
          </span>
          <span className="platform-tag">VS Code Marketplace</span>
        </div>

        <h2 className="tab-headline">{t.vscode.headline}</h2>
        <p className="tab-description">{t.vscode.description}</p>

        {/* Quick Install Snippet */}
        <div className="install-snippet-box">
          <span className="snippet-label">{t.vscode.quickInstallLabel}</span>
          <div className="snippet-code-row">
            <code>{CLI_COMMAND}</code>
            <button className="snippet-copy-btn" onClick={handleCopy} title="Copy CLI Command">
              {copied ? <Check size={16} color="#10b981" /> : <Copy size={16} />}
              <span>{copied ? (t.cli.copied || 'Copied!') : 'Copy'}</span>
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="tab-action-group">
          <a href={MARKETPLACE_URL} target="_blank" rel="noopener noreferrer" className="cta-btn primary">
            <Code size={18} />
            <span>{t.vscode.installMarketplace}</span>
            <ExternalLink size={15} />
          </a>
          <a href={VSCODE_DEEP_LINK} className="cta-btn secondary">
            <span>{t.vscode.openInVscode}</span>
          </a>
          <a href={GITHUB_REPO_URL} target="_blank" rel="noopener noreferrer" className="cta-btn ghost">
            <span>{t.vscode.viewSource}</span>
          </a>
        </div>
      </div>

      {/* Feature Grid */}
      <div className="feature-card-grid">
        <div className="feature-card">
          <div className="feature-icon-box"><Clock size={20} /></div>
          <h3>{t.vscode.feature1Title}</h3>
          <p>{t.vscode.feature1Desc}</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon-box"><Timer size={20} /></div>
          <h3>{t.vscode.feature2Title}</h3>
          <p>{t.vscode.feature2Desc}</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon-box"><Sparkles size={20} /></div>
          <h3>{t.vscode.feature3Title}</h3>
          <p>{t.vscode.feature3Desc}</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon-box"><ShieldCheck size={20} /></div>
          <h3>{t.vscode.feature4Title}</h3>
          <p>{t.vscode.feature4Desc}</p>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create `src/components/showcase/BrowserTab.jsx`**

```jsx
import React, { useState } from 'react';
import { Globe, Download, ExternalLink, ChevronDown, ChevronUp, Clock, Bell, Layers } from 'lucide-react';

const GITHUB_RELEASES_URL = 'https://github.com/lutfialdrii/zen-clock/releases';

export default function BrowserTab({ t }) {
  const [showManual, setShowManual] = useState(false);

  return (
    <div className="tab-pane-content">
      <div className="tab-hero-box">
        <div className="tab-badge-row">
          <span className="platform-badge live">
            <span className="zen-pulse-dot live"></span>
            {t.badges.live}
          </span>
          <span className="platform-tag">Chrome · Edge · Brave · Firefox</span>
        </div>

        <h2 className="tab-headline">{t.browser.headline}</h2>
        <p className="tab-description">{t.browser.description}</p>

        {/* Action Buttons */}
        <div className="tab-action-group">
          <a href={GITHUB_RELEASES_URL} target="_blank" rel="noopener noreferrer" className="cta-btn primary">
            <Globe size={18} />
            <span>{t.browser.addChrome}</span>
            <ExternalLink size={15} />
          </a>
          <a href={GITHUB_RELEASES_URL} target="_blank" rel="noopener noreferrer" className="cta-btn secondary">
            <Download size={18} />
            <span>{t.browser.downloadZip}</span>
          </a>
        </div>

        {/* Manual Install Accordion */}
        <div className="accordion-box">
          <button className="accordion-toggle" onClick={() => setShowManual(!showManual)}>
            <span>{t.browser.manualInstallTitle}</span>
            {showManual ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          {showManual && (
            <div className="accordion-content">
              <p>{t.browser.step1}</p>
              <p>{t.browser.step2}</p>
              <p>{t.browser.step3}</p>
            </div>
          )}
        </div>
      </div>

      {/* Feature Grid */}
      <div className="feature-card-grid">
        <div className="feature-card">
          <div className="feature-icon-box"><Clock size={20} /></div>
          <h3>{t.browser.feature1Title}</h3>
          <p>{t.browser.feature1Desc}</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon-box"><Layers size={20} /></div>
          <h3>{t.browser.feature2Title}</h3>
          <p>{t.browser.feature2Desc}</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon-box"><Bell size={20} /></div>
          <h3>{t.browser.feature3Title}</h3>
          <p>{t.browser.feature3Desc}</p>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Create `src/components/showcase/CliTab.jsx`**

```jsx
import React, { useState } from 'react';
import { Terminal, Copy, Check, ExternalLink, Cpu, Volume2, Compass } from 'lucide-react';

const CLI_COMMANDS = {
  brew: 'brew install lutfialdrii/tap/zen-clock',
  go: 'go install github.com/lutfialdrii/zen-clock@latest',
  curl: 'curl -fsSL https://raw.githubusercontent.com/lutfialdrii/zen-clock/main/scripts/install.sh | bash',
  binary: 'https://github.com/lutfialdrii/zen-clock/releases/latest'
};

export default function CliTab({ t }) {
  const [activeCliTab, setActiveCliTab] = useState('brew');
  const [copied, setCopied] = useState(false);

  const currentCommand = CLI_COMMANDS[activeCliTab];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="tab-pane-content">
      <div className="tab-hero-box">
        <div className="tab-badge-row">
          <span className="platform-badge live">
            <span className="zen-pulse-dot live"></span>
            {t.badges.live}
          </span>
          <span className="platform-tag">Go 1.23+ · Ultra-lightweight</span>
        </div>

        <h2 className="tab-headline">{t.cli.headline}</h2>
        <p className="tab-description">{t.cli.description}</p>

        {/* Multi-Method Selector */}
        <div className="cli-method-nav">
          <button className={`cli-pill ${activeCliTab === 'brew' ? 'active' : ''}`} onClick={() => setActiveCliTab('brew')}>
            {t.cli.tabBrew}
          </button>
          <button className={`cli-pill ${activeCliTab === 'go' ? 'active' : ''}`} onClick={() => setActiveCliTab('go')}>
            {t.cli.tabGo}
          </button>
          <button className={`cli-pill ${activeCliTab === 'curl' ? 'active' : ''}`} onClick={() => setActiveCliTab('curl')}>
            {t.cli.tabCurl}
          </button>
          <a href={CLI_COMMANDS.binary} target="_blank" rel="noopener noreferrer" className="cli-pill link">
            {t.cli.tabBinary} <ExternalLink size={12} />
          </a>
        </div>

        {/* Snippet box */}
        <div className="install-snippet-box">
          <div className="snippet-code-row">
            <code>{currentCommand}</code>
            <button className="snippet-copy-btn" onClick={handleCopy}>
              {copied ? <Check size={16} color="#10b981" /> : <Copy size={16} />}
              <span>{copied ? t.cli.copied : t.cli.copyCommand}</span>
            </button>
          </div>
        </div>

        {/* Terminal Simulation Preview */}
        <div className="terminal-mockup">
          <div className="terminal-header">
            <div className="terminal-dots">
              <span className="dot red"></span>
              <span className="dot yellow"></span>
              <span className="dot green"></span>
            </div>
            <span className="terminal-title">{t.cli.terminalPreviewHeader}</span>
          </div>
          <pre className="terminal-body">
{`$ zen-clock run
┌──────────────────────────────────────────────┐
│   ███████╗███████╗███╗   ██╗                 │
│   ╚══███╔╝██╔════╝████╗  ██║  CLOCK          │
│     ███╔╝ █████╗  ██╔██╗ ██║                 │
│    ███╔╝  ██╔══╝  ██║╚██╗██║  14 : 35 : 00   │
│   ███████╗███████╗██║ ╚████║                 │
│   ╚══════╝╚══════╝╚═╝  ╚═══╝                 │
├──────────────────────────────────────────────┤
│ Next Prayer: Ashar in 00:45:12               │
│ Mode: Pomodoro Focus [25:00]                 │
└──────────────────────────────────────────────┘`}
          </pre>
        </div>
      </div>

      {/* Feature Grid */}
      <div className="feature-card-grid">
        <div className="feature-card">
          <div className="feature-icon-box"><Cpu size={20} /></div>
          <h3>{t.cli.feature1Title}</h3>
          <p>{t.cli.feature1Desc}</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon-box"><Volume2 size={20} /></div>
          <h3>{t.cli.feature2Title}</h3>
          <p>{t.cli.feature2Desc}</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon-box"><Compass size={20} /></div>
          <h3>{t.cli.feature3Title}</h3>
          <p>{t.cli.feature3Desc}</p>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Create `src/components/showcase/NativeTab.jsx`**

```jsx
import React from 'react';
import { Star, MessageSquare, Laptop, Smartphone, Monitor, Terminal } from 'lucide-react';

const GITHUB_REPO_URL = 'https://github.com/lutfialdrii/zen-clock';
const GITHUB_DISCUSSIONS_URL = 'https://github.com/lutfialdrii/zen-clock/discussions';

export default function NativeTab({ t }) {
  return (
    <div className="tab-pane-content">
      <div className="tab-hero-box">
        <div className="tab-badge-row">
          <span className="platform-badge roadmap">
            <span className="zen-pulse-dot roadmap"></span>
            {t.badges.roadmap}
          </span>
          <span className="platform-tag">macOS · Windows · Linux · Mobile</span>
        </div>

        <h2 className="tab-headline">{t.native.headline}</h2>
        <p className="tab-description">{t.native.description}</p>

        {/* Roadmap Cards */}
        <div className="roadmap-grid">
          <div className="roadmap-card">
            <div className="roadmap-icon-box"><Laptop size={22} /></div>
            <h3>{t.native.macTitle}</h3>
            <p>{t.native.macDesc}</p>
            <span className="roadmap-tag">In Planning</span>
          </div>

          <div className="roadmap-card">
            <div className="roadmap-icon-box"><Monitor size={22} /></div>
            <h3>{t.native.winTitle}</h3>
            <p>{t.native.winDesc}</p>
            <span className="roadmap-tag">In Planning</span>
          </div>

          <div className="roadmap-card">
            <div className="roadmap-icon-box"><Terminal size={22} /></div>
            <h3>{t.native.linuxTitle}</h3>
            <p>{t.native.linuxDesc}</p>
            <span className="roadmap-tag">In Planning</span>
          </div>

          <div className="roadmap-card">
            <div className="roadmap-icon-box"><Smartphone size={22} /></div>
            <h3>{t.native.mobileTitle}</h3>
            <p>{t.native.mobileDesc}</p>
            <span className="roadmap-tag">Concept</span>
          </div>
        </div>

        {/* Community Call to Action */}
        <div className="community-cta-box">
          <p className="community-cta-prompt">{t.native.starPrompt}</p>
          <div className="tab-action-group centered">
            <a href={GITHUB_REPO_URL} target="_blank" rel="noopener noreferrer" className="cta-btn primary">
              <Star size={18} />
              <span>{t.native.starBtn}</span>
            </a>
            <a href={GITHUB_DISCUSSIONS_URL} target="_blank" rel="noopener noreferrer" className="cta-btn secondary">
              <MessageSquare size={18} />
              <span>{t.native.feedbackBtn}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 5: Run build to verify sub-components compile cleanly**

Run: `npm run build`
Expected: Build succeeds with 0 errors.

- [ ] **Step 6: Commit showcase sub-components**

```bash
git add src/components/showcase/
git commit -m "feat(showcase): add dedicated tab components for VS Code, Browser, CLI, and Native Roadmap"
```

---

### Task 4: Showcase Shell & Layout (`AppsShowcase.jsx` & `AppsShowcase.css`)

**Files:**
- Create: `src/components/showcase/AppsShowcase.jsx`
- Create: `src/components/showcase/AppsShowcase.css`
- Test: Verification build via `npm run build`

**Interfaces:**
- Consumes: `VSCodeTab`, `BrowserTab`, `CliTab`, `NativeTab`, `useLanguage()`.
- Produces: Complete showcase landing page with segmented control and hash-routing.

- [ ] **Step 1: Create `src/components/showcase/AppsShowcase.css`**

Implement the dark obsidian aesthetic with glassmorphism, responsive segmented control, and typography matching the design system.

- [ ] **Step 2: Create `src/components/showcase/AppsShowcase.jsx`**

```jsx
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Code, Globe, Terminal, Smartphone, Star, ExternalLink } from 'lucide-react';
import VSCodeTab from './VSCodeTab';
import BrowserTab from './BrowserTab';
import CliTab from './CliTab';
import NativeTab from './NativeTab';
import { useLanguage } from '../../utils/i18n';
import './AppsShowcase.css';

const GITHUB_REPO_URL = 'https://github.com/lutfialdrii/zen-clock';

export default function AppsShowcase({ onBackToClock, initialTab = 'vscode' }) {
  const { lang, changeLanguage, t } = useLanguage();
  const [activeTab, setActiveTab] = useState(initialTab);

  // Sync with URL hash
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (['vscode', 'browser', 'cli', 'native'].includes(hash)) {
        setActiveTab(hash);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleTabChange = (tabKey) => {
    setActiveTab(tabKey);
    window.location.hash = tabKey;
  };

  return (
    <div className="showcase-root">
      {/* Top Floating Navbar */}
      <header className="showcase-nav">
        <button className="nav-back-button" onClick={onBackToClock} title={t.nav.backToClock}>
          <ArrowLeft size={16} />
          <span>{t.nav.backToClock}</span>
        </button>

        <div className="nav-brand-title">
          <span className="brand-dot">✦</span>
          <span>{t.nav.appsTitle}</span>
        </div>

        <div className="nav-right-actions">
          <div className="lang-switcher">
            <button className={`lang-pill ${lang === 'id' ? 'active' : ''}`} onClick={() => changeLanguage('id')}>ID</button>
            <span className="lang-slash">/</span>
            <button className={`lang-pill ${lang === 'en' ? 'active' : ''}`} onClick={() => changeLanguage('en')}>EN</button>
          </div>

          <a href={GITHUB_REPO_URL} target="_blank" rel="noopener noreferrer" className="github-star-pill" title={t.nav.starGitHub}>
            <Star size={14} />
            <span>GitHub</span>
          </a>
        </div>
      </header>

      {/* Hero Intro */}
      <section className="showcase-hero">
        <span className="hero-tag-pill">{t.hero.tag}</span>
        <h1 className="hero-title">{t.hero.title}</h1>
        <p className="hero-subtitle">{t.hero.subtitle}</p>
      </section>

      {/* Segmented Tab Control */}
      <div className="segmented-tab-wrapper">
        <div className="segmented-tab-bar">
          <button className={`tab-btn ${activeTab === 'vscode' ? 'active' : ''}`} onClick={() => handleTabChange('vscode')}>
            <Code size={16} />
            <span>{t.tabs.vscode}</span>
          </button>
          <button className={`tab-btn ${activeTab === 'browser' ? 'active' : ''}`} onClick={() => handleTabChange('browser')}>
            <Globe size={16} />
            <span>{t.tabs.browser}</span>
          </button>
          <button className={`tab-btn ${activeTab === 'cli' ? 'active' : ''}`} onClick={() => handleTabChange('cli')}>
            <Terminal size={16} />
            <span>{t.tabs.cli}</span>
          </button>
          <button className={`tab-btn ${activeTab === 'native' ? 'active' : ''}`} onClick={() => handleTabChange('native')}>
            <Smartphone size={16} />
            <span>{t.tabs.native}</span>
          </button>
        </div>
      </div>

      {/* Active Tab Panel */}
      <main className="tab-render-container">
        {activeTab === 'vscode' && <VSCodeTab t={t} />}
        {activeTab === 'browser' && <BrowserTab t={t} />}
        {activeTab === 'cli' && <CliTab t={t} />}
        {activeTab === 'native' && <NativeTab t={t} />}
      </main>

      {/* Unified Footer */}
      <footer className="showcase-footer">
        <p>{t.footer.copyright}</p>
        <p className="footer-sub">{t.footer.mit}</p>
      </footer>
    </div>
  );
}
```

- [ ] **Step 3: Run build to verify compilation**

Run: `npm run build`
Expected: Build passes with 0 errors.

- [ ] **Step 4: Commit showcase shell**

```bash
git add src/components/showcase/AppsShowcase.jsx src/components/showcase/AppsShowcase.css
git commit -m "feat(showcase): implement AppsShowcase layout and responsive segmented control"
```

---

### Task 5: Routing & Minimalist Footer Dock on Web Clock (`App.jsx`)

**Files:**
- Modify: `src/App.jsx:1-126`
- Test: Verification build via `npm run build` and visual preview

**Interfaces:**
- Consumes: `AppsShowcase.jsx`, `useLanguage()`, native `popstate`.
- Produces: Integrated SPA router supporting `/`, `/apps`, and legacy `/extension`.

- [ ] **Step 1: Refactor `src/App.jsx` to integrate showcase routing and subtle footer dock**

```jsx
import React, { useState, useEffect } from 'react';
import FlipClock from './components/FlipClock';
import PrayerTime from './components/PrayerTime';
import PomodoroTimer from './components/PomodoroTimer';
import AppsShowcase from './components/showcase/AppsShowcase';
import { Timer, Clock, Download, Compass } from 'lucide-react';
import { useLanguage } from './utils/i18n';
import './index.css';

const resolveCurrentRoute = () => {
  if (typeof window === 'undefined') return { route: 'app', tab: 'vscode' };
  const path = window.location.pathname.toLowerCase();
  const hash = window.location.hash.toLowerCase();

  if (path.startsWith('/apps')) {
    const tab = hash.replace('#', '') || 'vscode';
    return { route: 'apps', tab };
  }
  if (path.startsWith('/extension') || hash.includes('extension')) {
    return { route: 'apps', tab: 'vscode' };
  }
  return { route: 'app', tab: 'vscode' };
};

function App() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('clock'); // 'clock' | 'pomodoro'
  const [{ currentRoute, initialShowcaseTab }, setNavState] = useState(() => {
    const { route, tab } = resolveCurrentRoute();
    return { currentRoute: route, initialShowcaseTab: tab };
  });
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    const handlePopState = () => {
      const { route, tab } = resolveCurrentRoute();
      setNavState({ currentRoute: route, initialShowcaseTab: tab });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    const handleAppInstalled = () => {
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
    }
  };

  const navigateTo = (route, tab = 'vscode') => {
    setNavState({ currentRoute: route, initialShowcaseTab: tab });
    if (route === 'apps') {
      window.history.pushState({}, '', `/apps#${tab}`);
    } else {
      window.history.pushState({}, '', '/');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (currentRoute === 'apps') {
    return (
      <AppsShowcase
        initialTab={initialShowcaseTab}
        onBackToClock={() => navigateTo('app')}
      />
    );
  }

  return (
    <div className="app-container">
      {/* Distraction-Free Header: Only Clock & Pomodoro Tabs */}
      <div className="app-header-nav">
        <button
          className={`nav-btn ${activeTab === 'clock' ? 'active' : ''}`}
          onClick={() => setActiveTab('clock')}
          title="Flip Clock & Prayer Times"
        >
          <Clock size={18} />
          <span>Clock</span>
        </button>
        <button
          className={`nav-btn ${activeTab === 'pomodoro' ? 'active' : ''}`}
          onClick={() => setActiveTab('pomodoro')}
          title="Pomodoro Timer"
        >
          <Timer size={18} />
          <span>Pomodoro</span>
        </button>
        {deferredPrompt && (
          <button
            className="nav-btn install-btn"
            onClick={handleInstallClick}
            title={t.nav.installPwa}
          >
            <Download size={18} />
            <span>{t.nav.installPwa}</span>
          </button>
        )}
      </div>

      {/* Main Clock Content */}
      <div className="app-content">
        {activeTab === 'clock' ? (
          <>
            <FlipClock />
            <PrayerTime />
          </>
        ) : (
          <PomodoroTimer />
        )}
      </div>

      {/* Subtle, Non-Intrusive Bottom Dock to Explore Other Apps */}
      <footer className="zen-dock-footer">
        <button
          className="zen-dock-link"
          onClick={() => navigateTo('apps', 'vscode')}
          title="Explore Zen Clock Apps"
        >
          <span>{t.dock.exploreEcosystem}</span>
        </button>
      </footer>
    </div>
  );
}

export default App;
```

- [ ] **Step 2: Run build to verify router integration**

Run: `npm run build`
Expected: Build passes with 0 errors.

- [ ] **Step 3: Commit App router integration**

```bash
git add src/App.jsx
git commit -m "feat: integrate non-intrusive bottom dock and SPA routing for /apps"
```

---

### Task 6: End-to-End Verification & Documentation Update

**Files:**
- Modify: `README.md`
- Test: Full build, lint check, and manual verification

**Interfaces:**
- Consumes: Built assets in `dist/`.
- Produces: Verified production bundle and updated documentation.

- [ ] **Step 1: Run production build and linting**

Run: `npm run build && npm run lint`
Expected: Zero compilation errors, bundle generated cleanly in `dist/`.

- [ ] **Step 2: Update `README.md` with ecosystem overview and routes documentation**

Add ecosystem section explaining the multi-platform vision and how `/` and `/apps` operate.

- [ ] **Step 3: Commit documentation**

```bash
git add README.md
git commit -m "docs: document Zen Clock ecosystem hub and multi-platform routes"
```
