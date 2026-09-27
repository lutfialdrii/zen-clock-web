import React, { useState } from 'react';
import { 
  ExternalLink, 
  Download, 
  Copy, 
  Check, 
  Clock, 
  Timer, 
  Sparkles, 
  Code, 
  ShieldCheck, 
  Layers, 
  ArrowLeft,
  ChevronRight,
  Terminal,
  Globe,
  Star
} from 'lucide-react';
import './ExtensionLanding.css';
import { useLanguage } from '../utils/i18n';

const MARKETPLACE_URL = 'https://marketplace.visualstudio.com/items?itemName=lutfialdrii.extension-clock';
const VSCODE_DEEP_LINK = 'vscode:extension/lutfialdrii.extension-clock';
const GITHUB_REPO_URL = 'https://github.com/lutfialdrii/zen-clock';
const CLI_COMMAND = 'code --install-extension lutfialdrii.extension-clock';

export default function ExtensionLanding({ onBackToClock, onBackToExplore, onNavigate }) {
  const { lang, setLang } = useLanguage();
  const [copied, setCopied] = useState(false);

  const handleCopyCli = () => {
    navigator.clipboard.writeText(CLI_COMMAND);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isEn = lang === 'en';

  return (
    <div className="landing-root">
      {/* Top Banner Navigation Bar */}
      <header className="landing-nav">
        <div className="landing-nav-left">
          {onBackToExplore && (
            <button className="landing-back-btn" onClick={onBackToExplore} title={isEn ? "Back to Explore" : "Kembali ke Explore"}>
              <ArrowLeft size={16} />
              <span>{isEn ? "Explore Apps" : "Explore Apps"}</span>
            </button>
          )}
          {onBackToClock && (
            <button className="landing-back-btn subtle" onClick={onBackToClock} title={isEn ? "Open Web Clock" : "Buka Web Clock"}>
              <Clock size={15} />
              <span>{isEn ? "Web Clock" : "Web Clock"}</span>
            </button>
          )}
        </div>

        <div className="landing-nav-actions">
          <div className="landing-lang-toggle">
            <button 
              className={`lang-btn ${lang === 'id' ? 'active' : ''}`}
              onClick={() => setLang('id')}
            >
              ID
            </button>
            <span className="lang-divider">/</span>
            <button 
              className={`lang-btn ${lang === 'en' ? 'active' : ''}`}
              onClick={() => setLang('en')}
            >
              EN
            </button>
          </div>

          <a 
            href={GITHUB_REPO_URL} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="landing-star-pill"
            title="Star on GitHub"
          >
            <Star size={14} />
            <span>GitHub</span>
          </a>

          <a 
            href={MARKETPLACE_URL} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="landing-nav-cta"
          >
            <span>{isEn ? "Install Extension" : "Pasang Ekstensi"}</span>
            <ExternalLink size={14} />
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="landing-hero">
        <div className="landing-badges">
          <span className="hero-badge badge-marketplace">
            <Code size={13} />
            <span>VS Code Marketplace</span>
          </span>
          <span className="hero-badge badge-platform">
            <Sparkles size={13} />
            <span>VS Code & Antigravity IDE</span>
          </span>
          <span className="hero-badge badge-free">
            <ShieldCheck size={13} />
            <span>100% Free & Open Source</span>
          </span>
        </div>

        <h1 className="hero-title">
          Zen Clock: <span className="highlight-text">Pomodoro & Muslim Prayer Times</span>
        </h1>

        <p className="hero-description">
          {isEn ? (
            "A mindful 3D retro mechanical flip clock, true background Pomodoro timer, and automated Muslim prayer times with Kemenag RI standards. Stay mindful, focused, and on schedule directly inside your code editor."
          ) : (
            "Jam mekanik 3D retro flip, timer Pomodoro background yang tidak pernah freeze, dan jadwal sholat otomatis standar resmi Kemenag RI (dengan penyesuaian otomatis Sholat Jum'at). Bekerja fokus dan tetap ingat ibadah langsung dari VS Code Anda."
          )}
        </p>

        {/* Primary CTA Buttons */}
        <div className="hero-cta-group">
          <a 
            href={MARKETPLACE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-btn cta-primary"
          >
            <Download size={18} />
            <span>{isEn ? "Install from VS Code Marketplace" : "Pasang dari VS Code Marketplace"}</span>
            <ExternalLink size={14} className="cta-icon-ext" />
          </a>

          <a 
            href={VSCODE_DEEP_LINK}
            className="cta-btn cta-secondary"
            title={isEn ? "Directly open in your desktop VS Code" : "Langsung buka di aplikasi VS Code desktop"}
          >
            <Code size={18} />
            <span>{isEn ? "Open in VS Code (1-Click)" : "Buka di VS Code (1-Klik)"}</span>
          </a>

          <a 
            href={GITHUB_REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-btn cta-star"
            title={isEn ? "Star on GitHub" : "Star di GitHub"}
          >
            <Star size={17} className="star-icon" />
            <span>{isEn ? "Star on GitHub" : "Star di GitHub"}</span>
          </a>
        </div>

        {/* CLI Quick Install */}
        <div className="cli-box" onClick={handleCopyCli} title={isEn ? "Click to copy command" : "Klik untuk menyalin perintah"}>
          <div className="cli-code">
            <Terminal size={15} className="cli-terminal-icon" />
            <code>{CLI_COMMAND}</code>
          </div>
          <button className="cli-copy-btn" aria-label="Copy command">
            {copied ? (
              <>
                <Check size={14} className="copied-icon" />
                <span>{isEn ? "Copied!" : "Disalin!"}</span>
              </>
            ) : (
              <>
                <Copy size={14} />
                <span>{isEn ? "Copy" : "Salin"}</span>
              </>
            )}
          </button>
        </div>

        {/* Hero Preview Showcase */}
        <div className="hero-preview-frame">
          <div className="window-dots">
            <span className="dot dot-red"></span>
            <span className="dot dot-yellow"></span>
            <span className="dot dot-green"></span>
            <span className="window-title">Zen Clock — Editor Tab & Full View</span>
          </div>
          <img 
            src="/assets/preview-fullview.png" 
            alt="Zen Clock Full Editor View" 
            className="hero-img"
            loading="lazy"
          />
        </div>
      </section>

      {/* Key Feature Cards Grid */}
      <section className="landing-features">
        <div className="section-header">
          <h2 className="section-title">
            {isEn ? "Everything You Need for Mindful Productivity" : "Fitur Unggulan untuk Produktivitas Mindful"}
          </h2>
          <p className="section-subtitle">
            {isEn 
              ? "Designed meticulously to blend seamlessly with your development workflow."
              : "Didesain presisi agar menyatu alami dengan lingkungan coding sehari-hari."}
          </p>
        </div>

        <div className="feature-grid">
          <div className="feature-card">
            <div className="feature-icon icon-amber">
              <Clock size={22} />
            </div>
            <h3>{isEn ? "3D Mechanical Flip Clock" : "3D Mechanical Flip Clock"}</h3>
            <p>
              {isEn
                ? "Retro-modern flip cards with smooth folding animations. Use it as an unobtrusive companion in your Activity Bar (Sidebar) or dock it in your Bottom Panel alongside the Terminal."
                : "Animasi flip mekanik 3D retro yang halus dengan tampilan tanggal dinamis. Dapat disematkan di Sidebar Activity Bar atau di Panel Bawah bersama Terminal."}
            </p>
            <div className="feature-tag">{isEn ? "Sidebar • Panel • Editor Tab" : "Sidebar • Panel • Tab Editor"}</div>
          </div>

          <div className="feature-card">
            <div className="feature-icon icon-rose">
              <Timer size={22} />
            </div>
            <h3>{isEn ? "True Background Pomodoro Engine" : "Timer Pomodoro Background Anti-Freeze"}</h3>
            <p>
              {isEn
                ? "Powered directly by Node.js in the Extension Host. The timer loop never freezes or throttles when tabs are closed, minimized, or when you switch files, with real-time status bar seconds."
                : "Ditenagai langsung oleh Node.js di Extension Host. Timer tetap berdetak akurat di background walau tab ditutup atau diminimize, dilengkapi live countdown detik di Status Bar."}
            </p>
            <div className="feature-tag">{isEn ? "Extension Host Engine • Status Bar" : "Node.js Engine • Status Bar Sync"}</div>
          </div>

          <div className="feature-card">
            <div className="feature-icon icon-emerald">
              <Sparkles size={22} />
            </div>
            <h3>{isEn ? "Official Kemenag RI Prayer Times" : "Jadwal Sholat Standar Kemenag RI"}</h3>
            <p>
              {isEn
                ? "Astronomical calculation via adhan with Indonesian Ministry of Religious Affairs parameters (Fajr 20°, Isha 18°, +2m ihtiyat). Automatically renames Dhuhr to \"Jum'at\" on Fridays!"
                : "Kalkulasi astronomi resmi Kemenag RI (Subuh 20°, Isya 18°, +2m buffer ihtiyat). Otomatis mengganti nama Dzuhur menjadi \"Jum'at\" setiap hari Jumat!"}
            </p>
            <div className="feature-tag">{isEn ? "Kemenag RI Standard • Friday Jum'at" : "Standar Kemenag • Auto Jum'at"}</div>
          </div>

          <div className="feature-card">
            <div className="feature-icon icon-sky">
              <Layers size={22} />
            </div>
            <h3>{isEn ? "Precision Countdown on Hover" : "Hover Tooltip & Countdown Presisi"}</h3>
            <p>
              {isEn
                ? "Hovering over the status bar reveals a rich schedule popover with ticking seconds countdown and instant rollover when prayer arrives without needing an editor reload."
                : "Hover pada widget status bar membuka tabel jadwal sholat lengkap hari ini beserta countdown detik presisi dan rollover otomatis tanpa perlu reload editor."}
            </p>
            <div className="feature-tag">{isEn ? "Rich Markdown Popover" : "Tabel Popover Interaktif"}</div>
          </div>

          <div className="feature-card">
            <div className="feature-icon icon-purple">
              <ShieldCheck size={22} />
            </div>
            <h3>{isEn ? "Peaceful Prayer Reminder Tab" : "Tab Pengingat Sholat Khusus"}</h3>
            <p>
              {isEn
                ? "A peaceful editor tab that opens automatically when prayer time arrives, complete with calming aesthetics, local timing, and inspiring Quranic verses."
                : "Halaman editor estetik dan menenangkan yang otomatis terbuka saat waktu sholat tiba, dilengkapi ayat Al-Qur'an dan tombol aksi cepat."}
            </p>
            <div className="feature-tag">{isEn ? "Auto-open • Calm & Minimal" : "Auto-open Tab • Tenang & Minimalis"}</div>
          </div>

          <div className="feature-card">
            <div className="feature-icon icon-amber">
              <Code size={22} />
            </div>
            <h3>{isEn ? "6 Accent Themes & Custom HEX" : "6 Warna Tema & Kustom HEX"}</h3>
            <p>
              {isEn
                ? "6 curated theme presets (Warm Amber, Islamic Emerald, Modern Sky, Pomodoro Rose, Mystic Purple, Monochrome) plus custom HEX input with automatic contrast calculation."
                : "6 preset warna aksen pilihan serta input kode warna HEX bebas dengan perhitungan kontras otomatis agar teks selalu terbaca nyaman."}
            </p>
            <div className="feature-tag">{isEn ? "Theme Harmonization • Custom HEX" : "Preset Tema • Custom HEX"}</div>
          </div>
        </div>
      </section>

      {/* Interface Gallery Section */}
      <section className="landing-gallery">
        <div className="section-header">
          <h2 className="section-title">
            {isEn ? "Visual Interface Gallery" : "Galeri Tampilan Antarmuka"}
          </h2>
          <p className="section-subtitle">
            {isEn ? "Tailored to fit any IDE layout and multi-monitor setup." : "Fleksibel untuk berbagai layout editor dan ukuran layar."}
          </p>
        </div>

        <div className="gallery-grid">
          <div className="gallery-item">
            <div className="gallery-image-wrap">
              <img src="/assets/preview-sidebar.png" alt="Sidebar View" loading="lazy" />
            </div>
            <div className="gallery-caption">
              <h4>{isEn ? "Primary Sidebar View" : "Tampilan Sidebar Samping"}</h4>
              <p>{isEn ? "Compact vertical presence in your Activity Bar." : "Tampilan ringkas vertikal di sidebar samping VS Code."}</p>
            </div>
          </div>

          <div className="gallery-item">
            <div className="gallery-image-wrap">
              <img src="/assets/preview-bottom-panel.png" alt="Bottom Panel View" loading="lazy" />
            </div>
            <div className="gallery-caption">
              <h4>{isEn ? "Bottom Panel (Terminal Area)" : "Tampilan Panel Bawah (Terminal)"}</h4>
              <p>{isEn ? "Wide dock beside Terminal & Output." : "Menempati panel bawah bersebelahan dengan Terminal."}</p>
            </div>
          </div>

          <div className="gallery-item">
            <div className="gallery-image-wrap">
              <img src="/assets/preview-statusbar-hover.png" alt="Status Bar Hover Tooltip" loading="lazy" />
            </div>
            <div className="gallery-caption">
              <h4>{isEn ? "Status Bar Hover Tooltip" : "Tooltip Status Bar & Jadwal Lengkap"}</h4>
              <p>{isEn ? "Rich Markdown schedule popover with ticking countdown." : "Hover popover dengan jadwal sholat dan countdown detik."}</p>
            </div>
          </div>

          <div className="gallery-item">
            <div className="gallery-image-wrap">
              <img src="/assets/preview-prayer-reminder.png" alt="Prayer Reminder Tab" loading="lazy" />
            </div>
            <div className="gallery-caption">
              <h4>{isEn ? "Prayer Reminder Tab" : "Tab Halaman Pengingat Sholat"}</h4>
              <p>{isEn ? "Serene editor tab at prayer time." : "Tab editor khusus yang otomatis terbuka saat adzan tiba."}</p>
            </div>
          </div>

          <div className="gallery-item">
            <div className="gallery-image-wrap">
              <img src="/assets/preview-pomodoro.png" alt="Pomodoro Timer" loading="lazy" />
            </div>
            <div className="gallery-caption">
              <h4>{isEn ? "2-Card Pomodoro Timer" : "Timer Pomodoro 2 Kartu"}</h4>
              <p>{isEn ? "Bold flip timer synchronized across all views." : "Flip countdown proporsional sinkron di seluruh tampilan."}</p>
            </div>
          </div>

          <div className="gallery-item">
            <div className="gallery-image-wrap">
              <img src="/assets/preview-theme.png" alt="Theme Accent Color" loading="lazy" />
            </div>
            <div className="gallery-caption">
              <h4>{isEn ? "Accent Theme Customization" : "Kustomisasi Warna Tema"}</h4>
              <p>{isEn ? "Pick curated presets or input any hex color." : "Pilih warna aksen favorit atau masukkan kode hex sendiri."}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Conversion Banner */}
      <section className="landing-bottom-cta">
        <div className="bottom-cta-card">
          <div className="bottom-cta-content">
            <h2>{isEn ? "Ready to Elevate Your Coding Environment?" : "Siap Tingkatkan Fokus dan Produktivitas Anda?"}</h2>
            <p>
              {isEn 
                ? "Install Zen Clock directly from the official Visual Studio Marketplace in seconds."
                : "Pasang ekstensi Zen Clock langsung dari Visual Studio Marketplace resmi sekarang juga."}
            </p>
            <div className="bottom-cta-buttons">
              <a 
                href={MARKETPLACE_URL} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="cta-btn cta-primary"
              >
                <Download size={18} />
                <span>{isEn ? "Install from Marketplace" : "Pasang dari Marketplace"}</span>
                <ExternalLink size={14} className="cta-icon-ext" />
              </a>

              <a 
                href={VSCODE_DEEP_LINK} 
                className="cta-btn cta-secondary"
              >
                <Code size={18} />
                <span>{isEn ? "Open in VS Code" : "Buka di VS Code"}</span>
              </a>

              <button 
                onClick={onBackToClock} 
                className="cta-btn cta-tertiary"
              >
                <Clock size={18} />
                <span>{isEn ? "Use Web Version" : "Gunakan Versi Web"}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <p>Zen Clock Apps</p>
        <p className="footer-sub" style={{ margin: '6px 0 0 0', fontSize: '12px', color: 'rgba(255, 255, 255, 0.45)' }}>
          {isEn ? "MIT Open Source License" : "Lisensi Open Source MIT"} •{' '}
          <button 
            type="button" 
            onClick={() => onNavigate ? onNavigate('privacy-policy') : (window.location.href = '/privacy-policy')} 
            style={{ background: 'none', border: 'none', color: 'inherit', textDecoration: 'underline', cursor: 'pointer', font: 'inherit', padding: 0 }}
          >
            Privacy Policy
          </button>
          {' '}•{' '}
          <button 
            type="button" 
            onClick={() => onNavigate ? onNavigate('support') : (window.location.href = '/support')} 
            style={{ background: 'none', border: 'none', color: 'inherit', textDecoration: 'underline', cursor: 'pointer', font: 'inherit', padding: 0 }}
          >
            Help & Support
          </button>
        </p>
      </footer>
    </div>
  );
}
