import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Clock, 
  HelpCircle, 
  Bell, 
  Compass, 
  Timer, 
  Bug, 
  MessageSquare, 
  Mail, 
  Heart, 
  Star, 
  ExternalLink, 
  CheckCircle2,
  ChevronDown
} from 'lucide-react';
import { SUPPORT_LINKS } from '../../utils/supportLinks';
import './SupportPage.css';

export default function SupportPage({ onBackToClock, onBackToExplore }) {
  const [lang, setLang] = useState('id'); // 'id' | 'en'
  const [openFaq, setOpenFaq] = useState(null);
  const isEn = lang === 'en';

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = isEn ? [
    {
      icon: <Bell size={18} className="faq-icon" />,
      q: "Notifications don't appear when prayer time arrives or timer ends?",
      a: "Modern browsers require notification permission. If you accidentally clicked 'Block', click the tune/lock icon on the left of your browser address bar (URL bar), set Notifications to 'Allow', then refresh the page. On Windows or macOS, ensure 'Do Not Disturb' or 'Focus Assist' is turned off so banners can pop up."
    },
    {
      icon: <Compass size={18} className="faq-icon" />,
      q: "How does Zen Clock calculate prayer times and are they accurate?",
      a: "Zen Clock uses official Ministry of Religious Affairs (Kemenag RI) astronomical algorithms with a standard +2-minute safety buffer (ihtiyat). For global locations outside Indonesia, it uses the Muslim World League (MWL) calculation. You can also fine-tune each prayer time by -15 to +15 minutes via the 'Adjust Schedule' (Koreksi Menit) menu."
    },
    {
      icon: <Timer size={18} className="faq-icon" />,
      q: "Does the Pomodoro timer keep running when I switch tabs or close the popup?",
      a: "Yes! In the Browser Extension, a persistent Background Service Worker keeps ticking without draining memory. In the Web App & PWA, timers synchronize with timestamps so that when you return to the tab, your elapsed work/break time is accurate."
    },
    {
      icon: <HelpCircle size={18} className="faq-icon" />,
      q: "Is Zen Clock completely free and does it collect my personal data?",
      a: "Zen Clock is 100% free, ad-free, and open-source under the MIT License. All calculations and settings are stored locally on your device. We collect zero personal data, zero browsing history, and use zero analytics trackers."
    }
  ] : [
    {
      icon: <Bell size={18} className="faq-icon" />,
      q: "Notifikasi tidak muncul saat waktu sholat tiba atau Pomodoro selesai?",
      a: "Peramban memerlukan izin notifikasi desktop. Jika sebelumnya Anda tidak sengaja memblokir, klik ikon gembok/setelan di sebelah kiri bilah URL peramban, ubah izin 'Notifikasi' menjadi 'Izinkan', lalu muat ulang halaman. Di Windows atau macOS, pastikan fitur 'Jangan Ganggu' (Do Not Disturb/Focus Assist) dalam kondisi nonaktif agar spanduk notifikasi dapat tampil."
    },
    {
      icon: <Compass size={18} className="faq-icon" />,
      q: "Bagaimana metode hisab jadwal sholat Zen Clock dan apakah akurat?",
      a: "Zen Clock menggunakan standar hisab resmi Kementerian Agama RI (Kemenag RI) lengkap dengan pengaman waktu (+2 menit ihtiyat). Untuk wilayah di luar Indonesia, sistem menggunakan hisab Liga Muslim Dunia (MWL). Anda juga dapat melakukan kalibrasi manual -15 hingga +15 menit melalui menu 'Koreksi Menit Sholat'."
    },
    {
      icon: <Timer size={18} className="faq-icon" />,
      q: "Apakah timer Pomodoro tetap berjalan saat tab diminimalkan atau popup ditutup?",
      a: "Ya! Pada Ekstensi Browser (Chrome & Edge), timer dijalankan oleh Background Service Worker yang persisten dan hemat baterai. Pada Web App & PWA, perhitungan timer berbasis stempel waktu (timestamp) sehingga durasi kerja dan istirahat tetap akurat saat Anda kembali ke tab."
    },
    {
      icon: <HelpCircle size={18} className="faq-icon" />,
      q: "Apakah Zen Clock gratis dan apakah data pribadi saya dikumpulkan?",
      a: "Zen Clock 100% gratis, bebas iklan, dan bersumber terbuka di bawah Lisensi MIT. Seluruh hisab dan preferensi disimpan secara lokal di perangkat Anda. Kami tidak mengumpulkan data pribadi, tidak merekam riwayat penjelajahan, dan tidak menggunakan pelacak analitik apa pun."
    }
  ];

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
          <div className="support-badge">
            <HelpCircle size={14} />
            <span>{isEn ? "Help & Support Center" : "Pusat Bantuan & Dukungan Pengguna"}</span>
          </div>
          <h1 className="support-title">
            {isEn ? "How can we help you today?" : "Ada yang bisa kami bantu?"}
          </h1>
          <p className="support-subtitle">
            {isEn 
              ? "Find quick answers to common questions, troubleshoot issues, or connect directly with the developer team." 
              : "Temukan solusi cepat untuk kendala umum, panduan penggunaan, atau hubungi pengembang secara langsung."}
          </p>
        </div>

        {/* Quick Contact & Feedback Channels */}
        <section className="support-channels-grid">
          <a 
            href="https://github.com/lutfialdrii/zen-clock-extension-browser/issues" 
            target="_blank" 
            rel="noopener noreferrer"
            className="channel-card"
          >
            <div className="channel-icon-wrap bug">
              <Bug size={22} />
            </div>
            <div className="channel-info">
              <h3>{isEn ? "Report a Bug" : "Laporkan Kendala / Bug"}</h3>
              <p>{isEn ? "Found an issue in Chrome extension or Web? Open an issue on GitHub." : "Menemukan kendala pada ekstensi atau web? Laporkan via GitHub Issues."}</p>
            </div>
            <div className="channel-action">
              <span>{isEn ? "Open Issues" : "Buka Issues"}</span>
              <ExternalLink size={13} />
            </div>
          </a>

          <a 
            href="https://github.com/lutfialdrii/zen-clock-extension-browser/discussions" 
            target="_blank" 
            rel="noopener noreferrer"
            className="channel-card"
          >
            <div className="channel-icon-wrap feature">
              <MessageSquare size={22} />
            </div>
            <div className="channel-info">
              <h3>{isEn ? "Feature Request & Ideas" : "Usulan Fitur & Diskusi"}</h3>
              <p>{isEn ? "Share your creative suggestions to make Zen Clock even better." : "Bagikan ide atau masukan agar Zen Clock semakin bermanfaat."}</p>
            </div>
            <div className="channel-action">
              <span>{isEn ? "Join Discussion" : "Mulai Diskusi"}</span>
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
              <span>lutfialdripermana@gmail.com</span>
              <ExternalLink size={13} />
            </div>
          </a>
        </section>

        {/* FAQ & Troubleshooting Section */}
        <section className="support-faq-section">
          <div className="section-heading">
            <h2>{isEn ? "Frequently Asked Questions (FAQ)" : "Pertanyaan yang Sering Diajukan (FAQ)"}</h2>
            <p>{isEn ? "Quick troubleshooting for notifications, calculations, and settings." : "Panduan ringkas seputar notifikasi, hisab jadwal, dan konfigurasi."}</p>
          </div>

          <div className="faq-list">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className={`faq-item ${isOpen ? 'open' : ''}`}>
                  <button 
                    type="button" 
                    className="faq-question-btn" 
                    onClick={() => toggleFaq(idx)}
                    aria-expanded={isOpen}
                  >
                    <div className="faq-q-left">
                      {faq.icon}
                      <span className="faq-q-text">{faq.q}</span>
                    </div>
                    <ChevronDown size={18} className={`faq-chevron ${isOpen ? 'rotate' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="faq-answer-wrap">
                      <p className="faq-answer-text">{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Community & Creator Support */}
        <section className="support-community-card">
          <div className="community-content">
            <div className="community-badge">
              <Heart size={14} className="heart-icon" />
              <span>{isEn ? "Support the Developer" : "Dukung Pengembang"}</span>
            </div>
            <h3>{isEn ? "Help Zen Clock stay free and ad-free" : "Bantu Zen Clock tetap gratis & bebas iklan"}</h3>
            <p>
              {isEn 
                ? "Zen Clock is an independent, open-source project. If you find it helpful for your productivity and prayer routine, consider buying a coffee or giving a GitHub star."
                : "Zen Clock adalah proyek independen dan open-source. Jika aplikasi ini membantu fokus kerja dan ibadah Anda, traktiran kopi atau bintang di GitHub sangat berarti bagi kami."}
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
          <p>© 2026 Zen Clock Apps</p>
        </footer>
      </main>
    </div>
  );
}
