import React, { useState } from 'react';
import {
  Clock,
  Layers,
  Bell,
  Download,
  ExternalLink,
  ChevronDown,
  Globe,
  Star,
  BookOpen
} from 'lucide-react';
import { useLanguage } from '../../utils/i18n';

const CHROME_STORE_URL = 'https://github.com/lutfialdrii/zen-clock-extension-browser/releases';
const ZIP_RELEASE_URL = 'https://github.com/lutfialdrii/zen-clock-extension-browser/releases/latest';
const GITHUB_REPO_URL = 'https://github.com/lutfialdrii/zen-clock-extension-browser';

export default function BrowserTab({ t: propT }) {
  const { t: hookT } = useLanguage();
  const t = propT || hookT;
  const [isManualOpen, setIsManualOpen] = useState(false);

  return (
    <div className="showcase-tab-content browser-tab">
      {/* Header & Status Badge */}
      <div className="tab-header">
        <div className="tab-status-badge">
          <span className="zen-pulse-dot in-dev" />
          <span className="badge-text">{t.badges?.inDev || 'Dalam Pengembangan'}</span>
          <span className="badge-subtext">Chrome Web Store</span>
        </div>
        <h2 className="tab-headline">{t.browser?.headline}</h2>
        <p className="tab-description">{t.browser?.description}</p>
      </div>

      {/* Action CTA Buttons */}
      <div className="tab-cta-group">
        <a 
          href={CHROME_STORE_URL} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="cta-btn primary"
        >
          <Globe size={16} />
          <span>{t.browser?.addChrome}</span>
          <ExternalLink size={13} className="ext-icon" />
        </a>

        <a 
          href={ZIP_RELEASE_URL} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="cta-btn secondary"
        >
          <Download size={16} />
          <span>{t.browser?.downloadZip}</span>
        </a>

        <a 
          href={GITHUB_REPO_URL} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="cta-btn github-star"
          title={t.browser?.starGitHub || t.nav?.starGitHub || 'Star on GitHub'}
        >
          <Star size={16} className="star-icon" />
          <span>{t.browser?.starGitHub || t.nav?.starGitHub || 'Star on GitHub'}</span>
        </a>
      </div>

      {/* Hero Preview Frame */}
      <div className="showcase-preview-frame">
        <div className="showcase-window-dots">
          <span className="showcase-dot red" />
          <span className="showcase-dot yellow" />
          <span className="showcase-dot green" />
          <span className="showcase-window-title">Browser Extension — Popup & Desk Clock</span>
        </div>
        <img 
          src="/assets/preview-extension.png" 
          alt="Zen Clock Browser Extension Preview" 
          className="showcase-preview-img"
          loading="lazy"
        />
      </div>

      {/* Manual Install Accordion Toggle */}
      <div className="accordion-wrapper">
        <button 
          type="button" 
          className={`accordion-trigger ${isManualOpen ? 'open' : ''}`}
          onClick={() => setIsManualOpen(!isManualOpen)}
          aria-expanded={isManualOpen}
        >
          <span className="accordion-title">
            {t.browser?.manualInstallTitle || 'Manual Installation (Developer Mode):'}
          </span>
          <ChevronDown 
            size={18} 
            className={`accordion-chevron ${isManualOpen ? 'rotate' : ''}`} 
          />
        </button>

        {isManualOpen && (
          <div className="accordion-content">
            <ol className="manual-steps-list">
              <li>{t.browser?.step1}</li>
              <li>{t.browser?.step2}</li>
              <li>{t.browser?.step3}</li>
            </ol>
          </div>
        )}
      </div>

      {/* Feature Cards Grid (Clock, Layers, Bell) */}
      <div className="feature-card-grid">
        <div className="feature-card">
          <div className="feature-icon-box amber">
            <Clock size={20} />
          </div>
          <h3 className="feature-card-title">{t.browser?.feature1Title}</h3>
          <p className="feature-card-desc">{t.browser?.feature1Desc}</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon-box emerald">
            <Layers size={20} />
          </div>
          <h3 className="feature-card-title">{t.browser?.feature2Title}</h3>
          <p className="feature-card-desc">{t.browser?.feature2Desc}</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon-box indigo">
            <Bell size={20} />
          </div>
          <h3 className="feature-card-title">{t.browser?.feature3Title}</h3>
          <p className="feature-card-desc">{t.browser?.feature3Desc}</p>
        </div>
      </div>

      {/* Full Documentation Readme Link */}
      <div className="showcase-readme-section">
        <a 
          href={`${GITHUB_REPO_URL}#readme`}
          target="_blank" 
          rel="noopener noreferrer" 
          className="showcase-readme-link"
        >
          <BookOpen size={15} />
          <span>{t.browser?.readDocumentation || 'Baca Dokumentasi & Panduan di GitHub README →'}</span>
          <ExternalLink size={13} />
        </a>
      </div>
    </div>
  );
}
