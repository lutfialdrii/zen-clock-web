import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Clock, 
  ShieldCheck, 
  Lock, 
  Database, 
  Globe, 
  EyeOff, 
  FileText, 
  Mail,
  ExternalLink
} from 'lucide-react';
import './PrivacyPage.css';

export default function PrivacyPage({ onBackToClock, onBackToExplore }) {
  const [lang, setLang] = useState('id'); // 'id' | 'en'
  const isEn = lang === 'en';

  return (
    <div className="privacy-page-root">
      {/* Top Navigation */}
      <header className="privacy-nav">
        <div className="privacy-nav-left">
          {onBackToExplore && (
            <button 
              type="button" 
              className="privacy-back-btn" 
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
              className="privacy-back-btn subtle" 
              onClick={onBackToClock} 
              title={isEn ? "Open Web Clock" : "Buka Jam Meja"}
            >
              <Clock size={15} />
              <span>{isEn ? "Web Clock" : "Web Clock"}</span>
            </button>
          )}
        </div>

        <div className="privacy-nav-actions">
          <div className="privacy-lang-toggle">
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

      {/* Main Content Container */}
      <main className="privacy-container">
        <div className="privacy-header">
          <div className="privacy-badge">
            <ShieldCheck size={14} />
            <span>{isEn ? "Privacy & Data Protection" : "Kebijakan Privasi & Perlindungan Data"}</span>
          </div>
          <h1 className="privacy-title">
            {isEn ? "Privacy Policy for Zen Clock" : "Kebijakan Privasi Zen Clock"}
          </h1>
          <p className="privacy-meta">
            {isEn 
              ? "Last updated: September 27, 2026 • Applies to Zen Clock Web, PWA, and Browser Extensions" 
              : "Terakhir diperbarui: 27 September 2026 • Berlaku untuk Zen Clock Web, PWA, dan Ekstensi Browser"}
          </p>
        </div>

        {/* Highlight Card: Zero Data Collection */}
        <section className="privacy-summary-card">
          <div className="summary-icon-wrap">
            <EyeOff size={24} />
          </div>
          <div className="summary-text">
            <h3>{isEn ? "Zero Data Collection & 100% Offline-First" : "Bebas Pengumpulan Data & 100% Berjalan Lokal"}</h3>
            <p>
              {isEn
                ? "Zen Clock is built with privacy as a foundational principle. We do NOT collect, store, transmit, or monetize your personal data, browsing history, or keystrokes. All calculations are executed directly inside your local browser environment."
                : "Zen Clock dirancang dengan mengutamakan privasi pengguna. Kami TIDAK mengumpulkan, menyimpan, mengirimkan, ataupun menjual data pribadi, riwayat penjelajahan, maupun lokasi Anda. Seluruh perhitungan jadwal sholat dan timer Pomodoro berjalan 100% secara lokal di peramban Anda."}
            </p>
          </div>
        </section>

        {/* Content Sections */}
        <article className="privacy-article">
          {/* Section 1: Single Purpose */}
          <section className="privacy-section">
            <div className="section-title-wrap">
              <Clock size={18} className="section-icon" />
              <h2>{isEn ? "1. Single Purpose Statement" : "1. Pernyataan Tujuan Tunggal (Single Purpose)"}</h2>
            </div>
            <p>
              {isEn ? (
                <>
                  In strict compliance with the <strong>Chrome Web Store Single Purpose Policy</strong>, Zen Clock exists solely to provide a mindful 3D retro mechanical flip clock, a background Pomodoro productivity timer, and accurate Muslim prayer times based on official calculation standards.
                </>
              ) : (
                <>
                  Sesuai dengan ketentuan <strong>Chrome Web Store Single Purpose Policy</strong>, ekstensi dan aplikasi web Zen Clock memiliki tujuan tunggal: menyediakan jam meja 3D retro flip yang tenang, timer produktivitas fokus Pomodoro di background, dan jadwal sholat otomatis standar resmi Kemenag RI.
                </>
              )}
            </p>
          </section>

          {/* Section 2: Data Usage & Storage */}
          <section className="privacy-section">
            <div className="section-title-wrap">
              <Database size={18} className="section-icon" />
              <h2>{isEn ? "2. Data Storage & Permissions" : "2. Penyimpanan Data & Penggunaan Izin (Permissions)"}</h2>
            </div>
            <p>
              {isEn
                ? "Zen Clock requests only the minimal browser permissions required for core features to operate:"
                : "Zen Clock hanya meminta izin peramban minimal yang benar-benar esensial untuk beroperasinya fitur inti:"}
            </p>
            <ul className="privacy-list">
              <li>
                <strong>storage ({isEn ? "Local Preferences" : "Preferensi Lokal"}):</strong>{' '}
                {isEn
                  ? "Used solely to persist your local user preferences (selected city, custom theme accent color, Pomodoro interval durations, and audio reminder preferences) on your local device via chrome.storage.local or localStorage. This data never leaves your device."
                  : "Digunakan hanya untuk menyimpan preferensi Anda (pilihan kota, warna aksen tema, durasi interval Pomodoro, dan opsi notifikasi) di memori lokal peramban Anda via chrome.storage.local atau localStorage. Data ini tidak pernah dikirim ke pihak luar."}
              </li>
              <li>
                <strong>alarms ({isEn ? "Background Ticker" : "Penghitung Waktu Latar Belakang"}):</strong>{' '}
                {isEn
                  ? "Used to schedule non-blocking background Pomodoro intervals and prayer time checks without draining device battery or freezing when the popup is closed."
                  : "Digunakan untuk menjadwalkan timer Pomodoro dan pengecekan pergantian waktu sholat di latar belakang secara hemat daya tanpa perlu membuka jendela popup."}
              </li>
              <li>
                <strong>notifications ({isEn ? "Desktop Alerts" : "Notifikasi Suara & Desktop"}):</strong>{' '}
                {isEn
                  ? "Used exclusively to trigger system notifications when a Pomodoro focus/break cycle finishes or when adzan time arrives. Can be toggled on or off at any time in Settings."
                  : "Digunakan khusus untuk memunculkan notifikasi sistem saat waktu sholat tiba atau saat sesi Pomodoro selesai. Fitur ini dapat dimatikan kapan saja melalui menu Pengaturan."}
              </li>
            </ul>
          </section>

          {/* Section 3: Location Data */}
          <section className="privacy-section">
            <div className="section-title-wrap">
              <Globe size={18} className="section-icon" />
              <h2>{isEn ? "3. Geolocation & Location Data" : "3. Penggunaan Data Lokasi (Geolocation)"}</h2>
            </div>
            <p>
              {isEn ? (
                <>
                  Zen Clock includes an offline-first catalog of <strong>514+ cities across 38 Indonesian provinces</strong>. When you use the optional <em>"Use GPS"</em> feature, your browser requests one-time geographical coordinates (latitude and longitude) solely to identify your city or compute solar prayer angles mathematically. We do NOT track, record, or transmit your physical movements or location history.
                </>
              ) : (
                <>
                  Zen Clock telah dilengkapi katalog offline <strong>514+ kota dan kabupaten se-Indonesia</strong>. Jika Anda memilih menggunakan fitur deteksi otomatis <em>"Gunakan GPS"</em>, peramban Anda hanya membaca koordinat lintang dan bujur satu kali untuk mencocokkan kota terdekat atau menghitung sudut matahari. Kami TIDAK merekam, melacak, maupun menyimpan riwayat pergerakan Anda.
                </>
              )}
            </p>
          </section>

          {/* Section 4: Third Parties & Analytics */}
          <section className="privacy-section">
            <div className="section-title-wrap">
              <Lock size={18} className="section-icon" />
              <h2>{isEn ? "4. Third Parties & Trackers" : "4. Pihak Ketiga & Pelacak"}</h2>
            </div>
            <p>
              {isEn ? (
                <>
                  Zen Clock contains <strong>zero third-party analytics (no Google Analytics, no Facebook Pixels), zero advertising networks, and zero tracking cookies</strong>. Network calls are restricted solely to user-initiated search queries via OpenStreetMap Nominatim for international city geocoding.
                </>
              ) : (
                <>
                  Zen Clock <strong>sama sekali tidak menggunakan skrip analitik pihak ketiga (tanpa Google Analytics, tanpa pelacak iklan), dan tanpa cookie pelacak</strong>. Permintaan jaringan hanya terjadi saat pengguna secara sengaja mencari nama kota internasional melalui API publik OpenStreetMap Nominatim.
                </>
              )}
            </p>
          </section>

          {/* Section 5: Open Source & Contact */}
          <section className="privacy-section">
            <div className="section-title-wrap">
              <FileText size={18} className="section-icon" />
              <h2>{isEn ? "5. Transparency & Contact" : "5. Transparansi & Kontak Pengembang"}</h2>
            </div>
            <p>
              {isEn ? (
                <>
                  Zen Clock is transparent, free, and open-source under the <strong>MIT License</strong>. You can inspect the entire source code, audit data flows, or submit questions directly on our GitHub repository:
                </>
              ) : (
                <>
                  Zen Clock bersifat transparan, bebas biaya, dan bersumber terbuka di bawah <strong>Lisensi MIT</strong>. Anda dapat mengaudit seluruh kode sumber dan alur data secara langsung di repositori GitHub kami:
                </>
              )}
            </p>
            <div className="privacy-contact-box">
              <a 
                href="https://github.com/lutfialdrii/zen-clock-web" 
                target="_blank" 
                rel="noopener noreferrer"
                className="contact-pill"
              >
                <Globe size={14} />
                <span>GitHub: lutfialdrii/zen-clock-web</span>
                <ExternalLink size={12} />
              </a>
              <a 
                href="https://github.com/lutfialdrii/zen-clock-extension-browser" 
                target="_blank" 
                rel="noopener noreferrer"
                className="contact-pill"
              >
                <Globe size={14} />
                <span>GitHub: lutfialdrii/zen-clock-extension-browser</span>
                <ExternalLink size={12} />
              </a>
            </div>
          </section>
        </article>

        {/* Footer */}
        <footer className="privacy-footer">
          <p>© 2026 Zen Clock Apps</p>
        </footer>
      </main>
    </div>
  );
}
