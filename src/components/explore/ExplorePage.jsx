import React from 'react';
import { 
  ArrowLeft, 
  Star, 
  Code, 
  Globe, 
  Clock, 
  Terminal, 
  Smartphone, 
  ExternalLink,
  Sparkles,
  Heart
} from 'lucide-react';
import { useLanguage } from '../../utils/i18n';
import './ExplorePage.css';

const GITHUB_REPO_URL = 'https://github.com/lutfialdrii/zen-clock-web';
const SAWERIA_URL = 'https://saweria.co/lutfialdrii';

export default function ExplorePage({ onBackToClock, onNavigate }) {
  const { lang, changeLanguage, t } = useLanguage();

  return (
    <div className="explore-page-root">
      {/* Top Header Navigation */}
      <header className="explore-nav">
        <button 
          type="button" 
          className="explore-back-btn" 
          onClick={onBackToClock}
          title={t.nav?.backToClock || 'Kembali ke Web Clock'}
        >
          <ArrowLeft size={16} />
          <span>{t.nav?.backToClock || 'Buka Web Clock'}</span>
        </button>

        <div className="explore-brand-title">
          <span className="brand-dot">✦</span>
          <span>{t.nav?.appsTitle || 'Zen Clock Apps'}</span>
        </div>

        <div className="explore-nav-actions">
          <div className="explore-lang-switcher">
            <button
              type="button"
              className={`lang-pill ${lang === 'id' ? 'active' : ''}`}
              onClick={() => changeLanguage('id')}
              aria-label="Bahasa Indonesia"
            >
              ID
            </button>
            <span className="lang-slash">/</span>
            <button
              type="button"
              className={`lang-pill ${lang === 'en' ? 'active' : ''}`}
              onClick={() => changeLanguage('en')}
              aria-label="English"
            >
              EN
            </button>
          </div>

          <a
            href={GITHUB_REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="explore-star-pill"
            title={t.nav?.starGitHub || 'Star on GitHub'}
          >
            <Star size={14} className="star-icon" />
            <span>GitHub</span>
          </a>
        </div>
      </header>

      {/* Hero Intro */}
      <section className="explore-hero">
        <span className="explore-hero-tag">{t.explore?.tag || 'Ecosystem Overview'}</span>
        <h1 className="explore-hero-title">{t.explore?.title || 'Pilih Cara Anda Menikmati Zen Clock'}</h1>
        <p className="explore-hero-subtitle">{t.explore?.subtitle || 'Dari web browser, editor koding, hingga terminal. Tetap fokus dan selalu ingat waktu ibadah di mana pun Anda bekerja.'}</p>
      </section>

      {/* Platform Cards Grid */}
      <section className="explore-grid-container">
        <div className="explore-grid">
          
          {/* Card 1: Web Clock (Live) */}
          <div className="explore-card active-card">
            <div className="card-top-header">
              <div className="card-badge live">
                <span className="zen-pulse-dot live" />
                <span>{t.explore?.webBadge || 'PWA & Standalone Web'}</span>
              </div>
              <div className="card-icon-box amber">
                <Clock size={22} />
              </div>
            </div>
            <h2 className="card-title">{t.explore?.webTitle || 'Zen Clock di Web Browser'}</h2>
            <p className="card-description">{t.explore?.webDesc || 'Jam meja flip estetik dengan audio adzan, jadwal sholat akurat, dan Pomodoro tanpa perlu instalasi apa pun.'}</p>
            <button 
              type="button" 
              className="card-action-btn primary"
              onClick={onBackToClock}
            >
              <span>{t.explore?.webCta || 'Buka Web Clock Sekarang →'}</span>
            </button>
          </div>

          {/* Card 2: VS Code Extension (Live & Stable) */}
          <div className="explore-card active-card featured">
            <div className="card-top-header">
              <div className="card-badge live">
                <span className="zen-pulse-dot live" />
                <span>{t.explore?.vscodeBadge || 'VS Code & Antigravity IDE'}</span>
              </div>
              <div className="card-icon-box rose">
                <Code size={22} />
              </div>
            </div>
            <h2 className="card-title">{t.explore?.vscodeTitle || 'Zen Clock untuk VS Code'}</h2>
            <p className="card-description">{t.explore?.vscodeDesc || 'Jam 3D di sidebar/panel, background Pomodoro anti-freeze berbasis Node.js, dan countdown sholat di status bar.'}</p>
            <button 
              type="button" 
              className="card-action-btn accent"
              onClick={() => onNavigate('vscode')}
            >
              <span>{t.explore?.vscodeCta || 'Buka Halaman VS Code →'}</span>
            </button>
          </div>

          {/* Card 3: Browser Extension (In Dev / Pre-release) */}
          <div className="explore-card active-card">
            <div className="card-top-header">
              <div className="card-badge in-dev">
                <span className="zen-pulse-dot in-dev" />
                <span>{t.explore?.browserBadge || 'Chrome Web Store & Edge'}</span>
              </div>
              <div className="card-icon-box emerald">
                <Globe size={22} />
              </div>
            </div>
            <h2 className="card-title">{t.explore?.browserTitle || 'Zen Clock Browser Extension'}</h2>
            <p className="card-description">{t.explore?.browserDesc || 'Quick popup di toolbar, full page desk clock di tab baru, serta notifikasi sholat desktop native.'}</p>
            <button 
              type="button" 
              className="card-action-btn accent"
              onClick={() => onNavigate('browser')}
            >
              <span>{t.explore?.browserCta || 'Buka Halaman Browser →'}</span>
            </button>
          </div>

          {/* Card 4: CLI Program (On Progress) */}
          <div className="explore-card disabled-card">
            <div className="card-top-header">
              <div className="card-badge roadmap">
                <span className="zen-pulse-dot roadmap" />
                <span>{t.explore?.cliBadge || 'Go 1.23+ · Ultra-lightweight'}</span>
              </div>
              <div className="card-icon-box subtle">
                <Terminal size={22} />
              </div>
            </div>
            <h2 className="card-title">{t.explore?.cliTitle || 'CLI Program (Terminal)'}</h2>
            <p className="card-description">{t.explore?.cliDesc || 'Jam flip ASCII TUI dan daemon jadwal sholat ultra-ringan (<10MB RAM) untuk pengguna terminal.'}</p>
            <div className="card-action-placeholder">
              <span>{t.explore?.cliCta || 'Dalam Pengembangan (Segera Hadir)'}</span>
            </div>
          </div>

          {/* Card 5: Native Apps (Roadmap) */}
          <div className="explore-card disabled-card">
            <div className="card-top-header">
              <div className="card-badge roadmap">
                <span className="zen-pulse-dot roadmap" />
                <span>{t.explore?.nativeBadge || 'Desktop & Mobile'}</span>
              </div>
              <div className="card-icon-box subtle">
                <Smartphone size={22} />
              </div>
            </div>
            <h2 className="card-title">{t.explore?.nativeTitle || 'Native Apps (Desktop & Mobile)'}</h2>
            <p className="card-description">{t.explore?.nativeDesc || 'Aplikasi desktop & mobile native terpadu untuk macOS, Windows, Linux, iOS, dan Android.'}</p>
            <div className="card-action-placeholder">
              <span>{t.explore?.nativeCta || 'Riset & Perencanaan'}</span>
            </div>
          </div>

        </div>
      </section>

      {/* Support & Community Section */}
      <section className="explore-support-section">
        <div className="support-box">
          <div className="support-info">
            <h3 className="support-title">
              <Sparkles size={13} />
              <span>{t.ui?.supportCreator || 'Support the Creator'}</span>
            </h3>
            <p className="support-desc">{t.ui?.supportCreatorDesc || 'Buy me a coffee on Saweria or Give a Star on GitHub'}</p>
          </div>
          <div className="support-actions">
            <a 
              href={SAWERIA_URL} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="support-btn saweria"
              title={t.ui?.supportSaweria || 'Saweria'}
            >
              <Heart size={15} />
              <span>Saweria</span>
              <ExternalLink size={12} className="ext" />
            </a>
            <a 
              href={GITHUB_REPO_URL} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="support-btn github"
              title={t.ui?.supportGitHub || t.nav?.starGitHub || 'Star on GitHub'}
            >
              <Star size={15} />
              <span>{t.nav?.starGitHub || 'Star GitHub'}</span>
              <ExternalLink size={12} className="ext" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="explore-footer">
        <p>{t.footer?.copyright || 'Zen Clock © 2026. Dibuat dengan penuh dedikasi.'}</p>
        <p className="footer-sub">{t.footer?.mit || 'Open Source di bawah Lisensi MIT.'}</p>
      </footer>
    </div>
  );
}
