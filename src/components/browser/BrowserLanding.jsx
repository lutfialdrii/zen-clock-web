import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Clock, 
  Globe, 
  Download, 
  ExternalLink, 
  Star, 
  ChevronDown, 
  Layers, 
  Bell, 
  Sparkles,
  BookOpen
} from 'lucide-react';
import './BrowserLanding.css';
import { useLanguage } from '../../utils/i18n';

const CHROME_STORE_URL = 'https://github.com/lutfialdrii/zen-clock-extension-browser/releases';
const ZIP_RELEASE_URL = 'https://github.com/lutfialdrii/zen-clock-extension-browser/releases/latest';
const GITHUB_REPO_URL = 'https://github.com/lutfialdrii/zen-clock-extension-browser';

export default function BrowserLanding({ onBackToClock, onBackToExplore, onNavigate }) {
  const { lang, setLang } = useLanguage();
  const [isManualOpen, setIsManualOpen] = useState(false);

  const isEn = lang === 'en';

  return (
    <div className="browser-landing-root">
      {/* Top Banner Navigation Bar */}
      <header className="browser-nav">
        <div className="browser-nav-left">
          {onBackToExplore && (
            <button 
              type="button" 
              className="browser-back-btn" 
              onClick={onBackToExplore} 
              title={isEn ? "Back to Explore" : "Kembali ke Explore"}
            >
              <ArrowLeft size={16} />
              <span>{isEn ? "Explore Apps" : "Explore Apps"}</span>
            </button>
          )}
          {onBackToClock && (
            <button 
              type="button" 
              className="browser-back-btn subtle" 
              onClick={onBackToClock} 
              title={isEn ? "Open Web Clock" : "Buka Web Clock"}
            >
              <Clock size={15} />
              <span>{isEn ? "Web Clock" : "Web Clock"}</span>
            </button>
          )}
        </div>

        <div className="browser-nav-actions">
          <div className="browser-lang-toggle">
            <button 
              type="button"
              className={`lang-btn ${lang === 'id' ? 'active' : ''}`}
              onClick={() => setLang('id')}
            >
              ID
            </button>
            <span className="lang-divider">/</span>
            <button 
              type="button"
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
            className="browser-star-pill"
            title="Star on GitHub"
          >
            <Star size={14} className="star-icon" />
            <span>GitHub</span>
          </a>

          <a 
            href={CHROME_STORE_URL} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="browser-nav-cta"
          >
            <span>{isEn ? "Add to Chrome" : "Pasang di Chrome"}</span>
            <ExternalLink size={14} />
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="browser-hero">
        <div className="browser-badges">
          <span className="browser-badge badge-store">
            <Globe size={13} />
            <span>Chrome Web Store & Edge</span>
          </span>
          <span className="browser-badge badge-status">
            <span className="zen-pulse-dot in-dev" />
            <span>{isEn ? "In Development / Pre-release" : "Dalam Pengembangan / Rilis Awal"}</span>
          </span>
          <span className="browser-badge badge-free">
            <Sparkles size={13} />
            <span>100% Free & Open Source</span>
          </span>
        </div>

        <h1 className="browser-title">
          Zen Clock: <span className="highlight-text">{isEn ? "Browser Extension" : "Ekstensi Browser"}</span>
        </h1>

        <p className="browser-description">
          {isEn ? (
            "Zen Clock directly on your browser toolbar and new tab page. Mindful mechanical flip clock, accurate prayer times with automatic Friday prayer renaming, and Pomodoro focus timer."
          ) : (
            "Zen Clock langsung di toolbar dan tab baru browser Anda. Jam meja flip mekanik 3D yang tenang, jadwal sholat otomatis standar resmi Kemenag RI, serta timer fokus Pomodoro."
          )}
        </p>

        {/* Primary CTA Buttons */}
        <div className="browser-cta-group">
          <a 
            href={CHROME_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-btn cta-primary"
          >
            <Globe size={18} />
            <span>{isEn ? "Add to Chrome & Edge" : "Pasang di Chrome & Edge"}</span>
            <ExternalLink size={14} className="cta-icon-ext" />
          </a>

          <a 
            href={ZIP_RELEASE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-btn cta-secondary"
            title={isEn ? "Download latest ZIP release (.zip)" : "Unduh rilis ZIP terbaru (.zip)"}
          >
            <Download size={18} />
            <span>{isEn ? "Download ZIP Release" : "Unduh Rilis ZIP"}</span>
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

        {/* Hero Preview Frame */}
        <div className="browser-preview-frame">
          <div className="browser-window-dots">
            <span className="dot dot-red" />
            <span className="dot dot-yellow" />
            <span className="dot dot-green" />
            <span className="window-title">Zen Clock — Browser Toolbar Popup & New Tab View</span>
          </div>
          <img 
            src="/assets/preview-extension-browser.png" 
            alt="Zen Clock Browser Extension Preview" 
            className="browser-hero-img"
            loading="lazy"
          />
        </div>
      </section>

      {/* Feature Cards Grid */}
      <section className="browser-features-section">
        <div className="features-header">
          <h2 className="features-title">
            {isEn ? "Crafted for Daily Mindful Browsing" : "Didesain untuk Produktivitas Mindful di Browser"}
          </h2>
          <p className="features-subtitle">
            {isEn 
              ? "Everything you need to stay focused and never miss prayer times while working on the web." 
              : "Semua yang Anda butuhkan agar tetap fokus bekerja di web dan selalu ingat waktu ibadah."}
          </p>
        </div>

        <div className="browser-feature-grid">
          <div className="browser-feature-card">
            <div className="feature-icon amber">
              <Clock size={22} />
            </div>
            <h3 className="feature-card-title">{isEn ? "Quick Toolbar Popup" : "Quick Toolbar Popup"}</h3>
            <p className="feature-card-desc">
              {isEn 
                ? "One click on the extension icon in your browser toolbar to check real-time prayer schedule, countdown, and active Pomodoro."
                : "Cukup satu klik pada ikon toolbar browser Anda untuk melihat jadwal sholat terkini, countdown detik, dan timer Pomodoro."}
            </p>
          </div>

          <div className="browser-feature-card">
            <div className="feature-icon emerald">
              <Layers size={22} />
            </div>
            <h3 className="feature-card-title">{isEn ? "Full Page Desk Clock Tab" : "Full Page Desk Clock di Tab Baru"}</h3>
            <p className="feature-card-desc">
              {isEn 
                ? "Turn any tab into a stunning, distraction-free retro flip clock companion with customizable theme colors and Quranic quotes."
                : "Ubah tab browser menjadi layar jam meja flip mekanik 3D yang estetik dan bebas distraksi dengan pilihan warna tema."}
            </p>
          </div>

          <div className="browser-feature-card">
            <div className="feature-icon indigo">
              <Bell size={22} />
            </div>
            <h3 className="feature-card-title">{isEn ? "Background Native Alerts" : "Notifikasi Suara & Desktop"}</h3>
            <p className="feature-card-desc">
              {isEn 
                ? "Native desktop alerts and gentle adhan chimes sound right when prayer time arrives, even while browsing other websites."
                : "Notifikasi desktop native dan lantunan adzan lembut berbunyi tepat waktu meski Anda sedang berselancar di tab lain."}
            </p>
          </div>
        </div>
      </section>

      {/* Manual Installation Accordion */}
      <section className="browser-install-section">
        <div className="install-accordion-box">
          <button 
            type="button" 
            className={`install-accordion-trigger ${isManualOpen ? 'open' : ''}`}
            onClick={() => setIsManualOpen(!isManualOpen)}
            aria-expanded={isManualOpen}
          >
            <span className="accordion-title-text">
              {isEn ? "Manual Installation Guide (Developer Mode):" : "Panduan Pemasangan Manual (Developer Mode):"}
            </span>
            <ChevronDown 
              size={18} 
              className={`accordion-icon ${isManualOpen ? 'rotate' : ''}`} 
            />
          </button>

          {isManualOpen && (
            <div className="install-accordion-content">
              <ol className="manual-steps">
                <li>
                  {isEn 
                    ? "1. Download and extract the latest release ZIP from GitHub." 
                    : "1. Unduh dan ekstrak file ZIP rilis terbaru dari repositori GitHub."}
                </li>
                <li>
                  {isEn 
                    ? "2. Open your browser, navigate to chrome://extensions (or edge://extensions), and enable Developer Mode." 
                    : "2. Buka browser Anda, kunjungi chrome://extensions (atau edge://extensions), lalu aktifkan Developer Mode di pojok atas."}
                </li>
                <li>
                  {isEn 
                    ? "3. Click Load unpacked and select the extracted extension folder." 
                    : "3. Klik tombol 'Load unpacked' dan pilih folder hasil ekstrak rilis tadi."}
                </li>
              </ol>
            </div>
          )}
        </div>
      </section>

      {/* Readme Documentation Link */}
      <section className="browser-readme-section">
        <a 
          href={`${GITHUB_REPO_URL}#readme`}
          target="_blank" 
          rel="noopener noreferrer" 
          className="browser-readme-link"
        >
          <BookOpen size={16} />
          <span>
            {isEn 
              ? "Read Full Documentation & Build Guide on GitHub README →" 
              : "Baca Dokumentasi & Panduan Lengkap di GitHub README →"}
          </span>
          <ExternalLink size={14} />
        </a>
      </section>

      {/* Footer */}
      <footer className="browser-footer">
        <p>{isEn ? "Zen Clock © 2026. Crafted with care." : "Zen Clock © 2026. Dibuat dengan penuh dedikasi."}</p>
        <p className="footer-sub">
          {isEn ? "Open Source under MIT License." : "Open Source di bawah Lisensi MIT."} •{' '}
          <button 
            type="button" 
            onClick={() => onNavigate ? onNavigate('privacy') : (window.location.href = '/privacy')} 
            style={{ background: 'none', border: 'none', color: 'inherit', textDecoration: 'underline', cursor: 'pointer', font: 'inherit', padding: 0 }}
          >
            {isEn ? "Privacy Policy" : "Kebijakan Privasi"}
          </button>
        </p>
      </footer>
    </div>
  );
}
