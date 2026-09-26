import React, { useState } from 'react';
import {
  Clock,
  Layers,
  Bell,
  Download,
  ExternalLink,
  ChevronDown,
  Globe
} from 'lucide-react';
import { useLanguage } from '../../utils/i18n';

const CHROME_STORE_URL = 'https://github.com/lutfialdrii/zen-clock/releases';
const ZIP_RELEASE_URL = 'https://github.com/lutfialdrii/zen-clock/releases/latest';

export default function BrowserTab({ t: propT }) {
  const { t: hookT } = useLanguage();
  const t = propT || hookT;
  const [isManualOpen, setIsManualOpen] = useState(false);

  return (
    <div className="showcase-tab-content browser-tab">
      {/* Header & Status Badge */}
      <div className="tab-header">
        <div className="tab-status-badge">
          <span className="zen-pulse-dot live" />
          <span className="badge-text">{t.badges?.live || 'Live & Stable'}</span>
          <span className="badge-subtext">Chrome · Edge · Brave · Firefox</span>
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
    </div>
  );
}
