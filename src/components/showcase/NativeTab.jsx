import React from 'react';
import {
  Apple,
  Monitor,
  Terminal,
  Smartphone,
  Star,
  MessageSquare,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { useLanguage } from '../../utils/i18n';

const GITHUB_REPO_URL = 'https://github.com/lutfialdrii/zen-clock';
const GITHUB_DISCUSSIONS_URL = 'https://github.com/lutfialdrii/zen-clock/discussions';

export default function NativeTab({ t: propT }) {
  const { t: hookT } = useLanguage();
  const t = propT || hookT;

  const ROADMAP_ITEMS = [
    {
      id: 'macos',
      icon: Apple,
      platform: 'macOS 13+ (Swift / Go)',
      title: t.native?.macTitle,
      description: t.native?.macDesc,
      status: 'Design & Prototyping',
      iconColor: 'amber'
    },
    {
      id: 'windows',
      icon: Monitor,
      platform: 'Windows 11 / 10',
      title: t.native?.winTitle,
      description: t.native?.winDesc,
      status: 'Planned',
      iconColor: 'indigo'
    },
    {
      id: 'linux',
      icon: Terminal,
      platform: 'GNOME / KDE / Waybar',
      title: t.native?.linuxTitle,
      description: t.native?.linuxDesc,
      status: 'Planned',
      iconColor: 'emerald'
    },
    {
      id: 'mobile',
      icon: Smartphone,
      platform: 'iOS 17+ & Android 14+',
      title: t.native?.mobileTitle,
      description: t.native?.mobileDesc,
      status: 'Research',
      iconColor: 'rose'
    }
  ];

  return (
    <div className="showcase-tab-content native-tab">
      {/* Header & Status Badge */}
      <div className="tab-header">
        <div className="tab-status-badge">
          <span className="zen-pulse-dot roadmap" />
          <span className="badge-text">{t.badges?.researchPlan || t.badges?.roadmap || 'Research & Plan'}</span>
          <span className="badge-subtext">Desktop & Mobile Standalone</span>
        </div>
        <h2 className="tab-headline">{t.native?.headline}</h2>
        <p className="tab-description">{t.native?.description}</p>
      </div>

      {/* Roadmap Cards Grid */}
      <div className="roadmap-grid">
        {ROADMAP_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.id} className="roadmap-card">
              <div className="roadmap-card-header">
                <div className={`feature-icon-box ${item.iconColor}`}>
                  <Icon size={20} />
                </div>
                <div className="roadmap-status-pill">{item.status}</div>
              </div>
              <div className="roadmap-platform-tag">{item.platform}</div>
              <h3 className="roadmap-card-title">{item.title}</h3>
              <p className="roadmap-card-desc">{item.description}</p>
            </div>
          );
        })}
      </div>

      {/* Community CTA Box */}
      <div className="community-cta-box">
        <div className="community-cta-content">
          <div className="community-icon-wrapper">
            <Sparkles size={24} className="community-sparkle-icon" />
          </div>
          <h3 className="community-cta-title">
            {t.native?.starPrompt || 'Help accelerate development by starring our GitHub repository:'}
          </h3>
          <div className="community-cta-actions">
            <a
              href={GITHUB_REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-btn primary"
            >
              <Star size={16} />
              <span>{t.native?.starBtn || 'Star on GitHub'}</span>
              <ExternalLink size={13} className="ext-icon" />
            </a>

            <a
              href={GITHUB_DISCUSSIONS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-btn secondary"
            >
              <MessageSquare size={16} />
              <span>{t.native?.feedbackBtn || 'Request Feature & Discussion'}</span>
              <ExternalLink size={13} className="ext-icon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
