import React, { useState, useEffect } from 'react';
import { ArrowLeft, Code, Globe, Terminal, Smartphone, Star } from 'lucide-react';
import VSCodeTab from './VSCodeTab';
import BrowserTab from './BrowserTab';
import CliTab from './CliTab';
import NativeTab from './NativeTab';
import { useLanguage } from '../../utils/i18n';
import './AppsShowcase.css';

const GITHUB_REPO_URL = 'https://github.com/lutfialdrii/zen-clock';
const VALID_TABS = ['browser', 'vscode', 'cli', 'native'];

export default function AppsShowcase({ onBackToClock, initialTab = 'browser' }) {
  const { lang, changeLanguage, t } = useLanguage();

  const getHashTab = () => {
    if (typeof window === 'undefined') return null;
    const hash = window.location.hash.replace('#', '').toLowerCase();
    return VALID_TABS.includes(hash) ? hash : null;
  };

  const [activeTab, setActiveTab] = useState(() => getHashTab() || initialTab);

  // Sync with URL hash
  useEffect(() => {
    const handleHash = () => {
      const hashTab = getHashTab();
      if (hashTab) {
        setActiveTab(hashTab);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleTabChange = (tabKey) => {
    setActiveTab(tabKey);
    if (typeof window !== 'undefined' && window.history?.replaceState) {
      window.history.replaceState(null, '', '#' + tabKey);
    } else {
      window.location.hash = tabKey;
    }
  };

  return (
    <div className="showcase-root">
      {/* Top Floating Navbar */}
      <header className="showcase-nav">
        <button
          type="button"
          className="nav-back-button"
          onClick={onBackToClock}
          title={t.nav?.backToClock || 'Back to Web Clock'}
          aria-label={t.nav?.backToClock || 'Back to Web Clock'}
        >
          <ArrowLeft size={16} />
          <span>{t.nav?.backToClock || 'Back to Web Clock'}</span>
        </button>

        <div className="nav-brand-title">
          <span className="brand-dot">✦</span>
          <span>{t.nav?.appsTitle || 'Zen Clock Apps'}</span>
        </div>

        <div className="nav-right-actions">
          <div className="lang-switcher">
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
            className="github-star-pill"
            title={t.nav?.starGitHub || 'Star on GitHub'}
          >
            <Star size={14} />
            <span>GitHub</span>
          </a>
        </div>
      </header>

      {/* Hero Intro */}
      <section className="showcase-hero">
        <span className="hero-tag-pill">{t.hero?.tag}</span>
        <h1 className="hero-title">{t.hero?.title}</h1>
        <p className="hero-subtitle">{t.hero?.subtitle}</p>
      </section>

      {/* Segmented Tab Control */}
      <div className="segmented-tab-wrapper">
        <div className="segmented-tab-bar" role="tablist" aria-label="Ecosystem Apps">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'browser'}
            className={`tab-btn ${activeTab === 'browser' ? 'active' : ''}`}
            onClick={() => handleTabChange('browser')}
          >
            <Globe size={16} />
            <span>{t.tabs?.browser || 'Browser Extension'}</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'vscode'}
            className={`tab-btn ${activeTab === 'vscode' ? 'active' : ''}`}
            onClick={() => handleTabChange('vscode')}
          >
            <Code size={16} />
            <span>{t.tabs?.vscode || 'VS Code Extension'}</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'cli'}
            className={`tab-btn ${activeTab === 'cli' ? 'active' : ''}`}
            onClick={() => handleTabChange('cli')}
          >
            <Terminal size={16} />
            <span>{t.tabs?.cli || 'CLI Program (Go)'}</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'native'}
            className={`tab-btn ${activeTab === 'native' ? 'active' : ''}`}
            onClick={() => handleTabChange('native')}
          >
            <Smartphone size={16} />
            <span>{t.tabs?.native || 'Native & Mobile Roadmap'}</span>
          </button>
        </div>
      </div>

      {/* Active Tab Panel */}
      <main className="tab-render-container" role="tabpanel">
        {activeTab === 'browser' && <BrowserTab t={t} />}
        {activeTab === 'vscode' && <VSCodeTab t={t} />}
        {activeTab === 'cli' && <CliTab t={t} />}
        {activeTab === 'native' && <NativeTab t={t} />}
      </main>

      {/* Unified Footer */}
      <footer className="showcase-footer">
        <p>{t.footer?.copyright}</p>
        <p className="footer-sub">{t.footer?.mit}</p>
      </footer>
    </div>
  );
}
