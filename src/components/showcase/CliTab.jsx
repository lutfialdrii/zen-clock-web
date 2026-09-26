import React, { useState } from 'react';
import {
  Cpu,
  Volume2,
  Compass,
  Copy,
  Check,
  Terminal,
  Download,
  ExternalLink
} from 'lucide-react';
import { useLanguage } from '../../utils/i18n';

const CLI_METHODS = [
  {
    id: 'brew',
    labelKey: 'tabBrew',
    defaultLabel: 'Homebrew',
    command: 'brew install lutfialdrii/tap/zen-clock'
  },
  {
    id: 'go',
    labelKey: 'tabGo',
    defaultLabel: 'Go Install',
    command: 'go install github.com/lutfialdrii/zen-clock@latest'
  },
  {
    id: 'curl',
    labelKey: 'tabCurl',
    defaultLabel: 'Curl Script',
    command: 'curl -fsSL https://raw.githubusercontent.com/lutfialdrii/zen-clock/main/scripts/install.sh | bash'
  },
  {
    id: 'binary',
    labelKey: 'tabBinary',
    defaultLabel: 'Direct Binary',
    command: 'curl -LO https://github.com/lutfialdrii/zen-clock/releases/latest/download/zen-clock_darwin_arm64.tar.gz'
  }
];

export default function CliTab({ t: propT }) {
  const { t: hookT } = useLanguage();
  const t = propT || hookT;
  const [activeMethod, setActiveMethod] = useState('brew');
  const [copied, setCopied] = useState(false);

  const currentMethod = CLI_METHODS.find((m) => m.id === activeMethod) || CLI_METHODS[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentMethod.command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="showcase-tab-content cli-tab">
      {/* Header & Status Badge */}
      <div className="tab-header">
        <div className="tab-status-badge">
          <span className="zen-pulse-dot live" />
          <span className="badge-text">{t.badges?.live || 'Live & Stable'}</span>
          <span className="badge-subtext">Go 1.23+ · Ultra-lightweight (&lt;10MB RAM)</span>
        </div>
        <h2 className="tab-headline">{t.cli?.headline}</h2>
        <p className="tab-description">{t.cli?.description}</p>
      </div>

      {/* Multi-Method Selector Tabs & Copy Box */}
      <div className="cli-install-section">
        <div className="cli-method-pills" role="tablist" aria-label="Installation methods">
          {CLI_METHODS.map((method) => {
            const label = t.cli?.[method.labelKey] || method.defaultLabel;
            const isActive = activeMethod === method.id;
            return (
              <button
                key={method.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`cli-method-pill ${isActive ? 'active' : ''}`}
                onClick={() => setActiveMethod(method.id)}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* 1-Click Copy Box */}
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
            <code>{currentMethod.command}</code>
          </div>
          <button
            type="button"
            className="snippet-copy-btn"
            onClick={(e) => {
              e.stopPropagation();
              handleCopy();
            }}
            aria-label="Copy CLI command"
          >
            {copied ? (
              <>
                <Check size={14} className="copied-icon" />
                <span className="copy-label">{t.cli?.copied || 'Copied!'}</span>
              </>
            ) : (
              <>
                <Copy size={14} />
                <span className="copy-label">{t.cli?.copyCommand || 'Copy'}</span>
              </>
            )}
          </button>
        </div>

        {activeMethod === 'binary' && (
          <div className="binary-downloads-help">
            <span className="binary-help-text">Direct binaries available for macOS (Apple Silicon / Intel), Linux, and Windows.</span>
            <a
              href="https://github.com/lutfialdrii/zen-clock/releases/latest"
              target="_blank"
              rel="noopener noreferrer"
              className="binary-release-link"
            >
              <span>GitHub Releases</span>
              <ExternalLink size={12} />
            </a>
          </div>
        )}
      </div>

      {/* Dark Stylized Terminal Mockup with ASCII/TUI Simulation */}
      <div className="terminal-mockup">
        <div className="terminal-header">
          <div className="terminal-window-dots">
            <span className="terminal-dot red" />
            <span className="terminal-dot yellow" />
            <span className="terminal-dot green" />
          </div>
          <div className="terminal-title">
            <Terminal size={13} className="terminal-title-icon" />
            <span>{t.cli?.terminalPreviewHeader || 'terminal - zen-clock'}</span>
          </div>
          <div className="terminal-header-spacer" />
        </div>
        <div className="terminal-body">
          <pre className="terminal-pre">
            <code>
{`┌────────────────────────────────────────────────────────┐
│  Zen Clock v1.0.0 (Go 1.23.1 · darwin/arm64)           │
├────────────────────────────────────────────────────────┤
│                                                        │
│    `}
<span className="tui-clock">[ 1 4 ]  :  [ 3 0 ]  :  [ 2 5 ]</span>
{`                     │
│                                                        │
│    `}
<span className="tui-amber">✦ Next Prayer: Ashar in 01h 42m 15s</span>
{`                 │
│    `}
<span className="tui-emerald">⏱ Pomodoro: 25:00 [Focus Session #3]</span>
{`                │
│                                                        │
│    Subuh 04:36  ·  Dzuhur 11:58  ·  Ashar 15:12        │
│    Maghrib 18:02  ·  Isya 19:11                        │
└────────────────────────────────────────────────────────┘`}
            </code>
          </pre>
          <div className="terminal-commands-cheatsheet">
            <span className="cheatsheet-title">Quick commands:</span>
            <span className="cheatsheet-cmd"><code>zen-clock run</code> (TUI)</span>
            <span className="cheatsheet-cmd"><code>zen-clock prayer</code> (Schedule)</span>
            <span className="cheatsheet-cmd"><code>zen-clock pomodoro -w 25 -b 5</code> (Timer)</span>
          </div>
        </div>
      </div>

      {/* Feature Cards Grid (Cpu, Volume2, Compass) */}
      <div className="feature-card-grid">
        <div className="feature-card">
          <div className="feature-icon-box amber">
            <Cpu size={20} />
          </div>
          <h3 className="feature-card-title">{t.cli?.feature1Title}</h3>
          <p className="feature-card-desc">{t.cli?.feature1Desc}</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon-box emerald">
            <Volume2 size={20} />
          </div>
          <h3 className="feature-card-title">{t.cli?.feature2Title}</h3>
          <p className="feature-card-desc">{t.cli?.feature2Desc}</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon-box indigo">
            <Compass size={20} />
          </div>
          <h3 className="feature-card-title">{t.cli?.feature3Title}</h3>
          <p className="feature-card-desc">{t.cli?.feature3Desc}</p>
        </div>
      </div>
    </div>
  );
}
