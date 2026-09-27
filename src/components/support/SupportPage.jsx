import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Clock, 
  HelpCircle, 
  Bug, 
  MessageSquare, 
  Mail, 
  Heart, 
  Star, 
  ExternalLink 
} from 'lucide-react';
import { SUPPORT_LINKS } from '../../utils/supportLinks';
import './SupportPage.css';

export default function SupportPage({ onBackToClock, onBackToExplore, onNavigate }) {
  const [lang, setLang] = useState('id'); // 'id' | 'en'
  const isEn = lang === 'en';

  return (
    <div className="support-page-root">
      {/* Top Navigation */}
      <header className="support-nav">
        <div className="support-nav-left">
          {onBackToExplore && (
            <button 
              type="button" 
              className="support-back-btn" 
              onClick={onBackToExplore} 
              title={isEn ? "Explore Apps" : "Jelajahi Aplikasi"}
            >
              <ArrowLeft size={16} />
              <span>{isEn ? "Explore Apps" : "Explore Apps"}</span>
            </button>
          )}
          {onBackToClock && (
            <button 
              type="button" 
              className="support-back-btn subtle" 
              onClick={onBackToClock} 
              title={isEn ? "Open Web Clock" : "Buka Jam Meja"}
            >
              <Clock size={15} />
              <span>{isEn ? "Web Clock" : "Web Clock"}</span>
            </button>
          )}
        </div>

        <div className="support-nav-actions">
          <div className="support-lang-toggle">
            <button
              type="button"
              className={`lang-btn ${lang === 'id' ? 'active' : ''}`}
              onClick={() => setLang('id')}
              aria-label="Bahasa Indonesia"
            >
              ID
            </button>
            <span className="lang-divider">/</span>
            <button
              type="button"
              className={`lang-btn ${lang === 'en' ? 'active' : ''}`}
              onClick={() => setLang('en')}
              aria-label="English"
            >
              EN
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="support-container">
        {/* Header Hero */}
        <div className="support-header">
          <div className="support-hero-badge">
            <HelpCircle size={14} />
            <span>{isEn ? "Help & Support Center" : "Pusat Bantuan & Dukungan Pengguna"}</span>
          </div>
          <h1 className="support-hero-title">
            {isEn ? "How can we help you today?" : "Ada yang bisa kami bantu?"}
          </h1>
          <p className="support-subtitle">
            {isEn 
              ? "Have a question, feedback, or need help? Connect directly with the developer." 
              : "Punya pertanyaan, masukan ide, atau butuh bantuan? Hubungi kami langsung melalui saluran di bawah."}
          </p>
        </div>

        {/* Quick Contact & Feedback Channels */}
        <section className="support-channels-grid">
          <a 
            href="https://github.com/lutfialdrii/zen-clock-web/issues" 
            target="_blank" 
            rel="noopener noreferrer"
            className="channel-card"
          >
            <div className="channel-icon-wrap bug">
              <Bug size={22} />
            </div>
            <div className="channel-info">
              <h3>{isEn ? "Report a Bug" : "Laporkan Kendala / Bug"}</h3>
              <p>{isEn ? "Found an issue in Zen Clock? Open an issue on GitHub." : "Menemukan kendala pada Zen Clock? Laporkan via GitHub Issues."}</p>
            </div>
            <div className="channel-action">
              <span>{isEn ? "Open Issues" : "Buka Issues"}</span>
              <ExternalLink size={13} />
            </div>
          </a>

          <a 
            href="https://github.com/lutfialdrii/zen-clock-web/issues" 
            target="_blank" 
            rel="noopener noreferrer"
            className="channel-card"
          >
            <div className="channel-icon-wrap feature">
              <MessageSquare size={22} />
            </div>
            <div className="channel-info">
              <h3>{isEn ? "Feature Request & Ideas" : "Usulan Fitur & Ide"}</h3>
              <p>{isEn ? "Share your creative suggestions or request a new feature on GitHub." : "Bagikan ide atau ajukan permintaan fitur baru via GitHub Issues."}</p>
            </div>
            <div className="channel-action">
              <span>{isEn ? "Submit Request" : "Kirim Usulan"}</span>
              <ExternalLink size={13} />
            </div>
          </a>

          <a 
            href="mailto:lutfialdripermana@gmail.com?subject=Zen%20Clock%20Support%20Inquiry" 
            className="channel-card"
          >
            <div className="channel-icon-wrap email">
              <Mail size={22} />
            </div>
            <div className="channel-info">
              <h3>{isEn ? "Direct Email Support" : "Dukungan Email Langsung"}</h3>
              <p>{isEn ? "Don't have a GitHub account? Send your inquiry directly via email." : "Tidak memiliki akun GitHub? Kirimkan pertanyaan Anda via email."}</p>
            </div>
            <div className="channel-action">
              <span>{isEn ? "Send Email" : "Kirim Email"}</span>
              <ExternalLink size={13} />
            </div>
          </a>
        </section>

        {/* Community & Creator Support */}
        <section className="support-community-card">
          <div className="community-content">
            <div className="community-badge">
              <Heart size={14} className="heart-icon" />
              <span>Support Creator</span>
            </div>
            <h3>{isEn ? "Help Zen Clock keep develop" : "Bantu Zen Clock terus update"}</h3>
            <p>
              {isEn 
                ? "If you find it helpful for your productivity, consider buying a coffee or giving a GitHub star."
                : "Jika aplikasi ini membantu fokus Anda, traktiran kopi atau bintang di GitHub sangat berarti bagi kami."}
            </p>
          </div>

          <div className="community-actions">
            <a 
              href={SUPPORT_LINKS.saweria.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-saweria"
            >
              <Heart size={15} />
              <span>{isEn ? SUPPORT_LINKS.saweria.labelEn : SUPPORT_LINKS.saweria.labelId}</span>
              <ExternalLink size={13} />
            </a>
            <a 
              href={SUPPORT_LINKS.github.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-github-star"
            >
              <Star size={15} />
              <span>{isEn ? SUPPORT_LINKS.github.labelEn : SUPPORT_LINKS.github.labelId}</span>
              <ExternalLink size={13} />
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer className="support-footer">
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
      </main>
    </div>
  );
}
