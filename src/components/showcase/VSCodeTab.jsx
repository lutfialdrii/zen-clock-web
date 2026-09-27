import React, { useState } from 'react';
import {
  Clock,
  Timer,
  BookOpen,
  Download,
  ExternalLink,
  Code,
  Copy,
  Check,
  Star
} from 'lucide-react';
import { useLanguage } from '../../utils/i18n';

const MARKETPLACE_URL = 'https://marketplace.visualstudio.com/items?itemName=lutfialdrii.extension-clock';
const VSCODE_DEEP_LINK = 'vscode:extension/lutfialdrii.extension-clock';
const GITHUB_REPO_URL = 'https://github.com/lutfialdrii/zen-clock';
const CLI_INSTALL_COMMAND = 'code --install-extension lutfialdrii.extension-clock';

export default function VSCodeTab({ t: propT }) {
  const { t: hookT } = useLanguage();
  const t = propT || hookT;
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(CLI_INSTALL_COMMAND);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="showcase-tab-content vscode-tab">
      {/* Header & Status Badge */}
      <div className="tab-header">
        <div className="tab-status-badge">
          <span className="zen-pulse-dot live" />
          <span className="badge-text">{t.badges?.live || 'Live & Stable'}</span>
          <span className="badge-subtext">Visual Studio Marketplace</span>
        </div>
        <h2 className="tab-headline">{t.vscode?.headline}</h2>
        <p className="tab-description">{t.vscode?.description}</p>
      </div>

      {/* Quick Install Snippet Box */}
      <div className="install-snippet-section">
        <div className="install-snippet-label">
          {t.vscode?.quickInstallLabel || 'Install via Terminal / VS Code CLI:'}
        </div>
        <div 
          className="install-snippet-box" 
          onClick={handleCopy}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleCopy();
            }
          }}
          title="Click to copy command"
        >
          <div className="snippet-code-area">
            <span className="snippet-prompt">$</span>
            <code>{CLI_INSTALL_COMMAND}</code>
          </div>
          <button 
            type="button" 
            className="snippet-copy-btn" 
            onClick={(e) => {
              e.stopPropagation();
              handleCopy();
            }}
            aria-label="Copy install command"
          >
            {copied ? (
              <>
                <Check size={14} className="copied-icon" />
                <span className="copy-label">{t.cli?.copied || 'Copied!'}</span>
              </>
            ) : (
              <>
                <Copy size={14} />
                <span className="copy-label">Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Action CTA Buttons */}
      <div className="tab-cta-group">
        <a 
          href={MARKETPLACE_URL} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="cta-btn primary"
        >
          <Download size={16} />
          <span>{t.vscode?.installMarketplace}</span>
          <ExternalLink size={13} className="ext-icon" />
        </a>

        <a 
          href={VSCODE_DEEP_LINK} 
          className="cta-btn secondary"
          title="Open directly in your desktop VS Code"
        >
          <Code size={16} />
          <span>{t.vscode?.openInVscode}</span>
        </a>

        <a 
          href={GITHUB_REPO_URL} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="cta-btn github-star"
          title={t.vscode?.starGitHub || t.nav?.starGitHub || 'Star on GitHub'}
        >
          <Star size={16} className="star-icon" />
          <span>{t.vscode?.starGitHub || t.nav?.starGitHub || 'Star on GitHub'}</span>
        </a>
      </div>

      {/* Hero Preview Frame */}
      <div className="showcase-preview-frame">
        <div className="showcase-window-dots">
          <span className="showcase-dot red" />
          <span className="showcase-dot yellow" />
          <span className="showcase-dot green" />
          <span className="showcase-window-title">VS Code — Zen Clock Editor View</span>
        </div>
        <img 
          src="/assets/preview-fullview.png" 
          alt="Zen Clock VS Code Extension Preview" 
          className="showcase-preview-img"
          loading="lazy"
        />
      </div>

      {/* 3-Card Feature Grid */}
      <div className="feature-card-grid">
        <div className="feature-card">
          <div className="feature-icon-box amber">
            <Clock size={20} />
          </div>
          <h3 className="feature-card-title">{t.vscode?.feature1Title}</h3>
          <p className="feature-card-desc">{t.vscode?.feature1Desc}</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon-box rose">
            <Timer size={20} />
          </div>
          <h3 className="feature-card-title">{t.vscode?.feature2Title}</h3>
          <p className="feature-card-desc">{t.vscode?.feature2Desc}</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon-box indigo">
            <BookOpen size={20} />
          </div>
          <h3 className="feature-card-title">{t.vscode?.feature3Title}</h3>
          <p className="feature-card-desc">{t.vscode?.feature3Desc}</p>
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
          <span>{t.vscode?.readDocumentation || 'Baca Dokumentasi Lengkap di GitHub README →'}</span>
          <ExternalLink size={13} />
        </a>
      </div>
    </div>
  );
}
