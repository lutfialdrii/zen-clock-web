import React, { useState, useEffect } from 'react';
import { Check, Clock, Compass, X } from 'lucide-react';
import { getTranslations } from '../../utils/i18n';
import './ReminderModal.css';

export default function ReminderModal({
  isOpen,
  prayerName = 'Dzuhur',
  cityName = 'Jakarta',
  language = 'id',
  onClose,
  onBackToClock
}) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    if (!isOpen) return;

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen]);

  if (!isOpen) return null;

  const t = getTranslations(language);
  const isEn = language === 'en';

  const timeFormatted = currentTime.toLocaleTimeString(isEn ? 'en-US' : 'id-ID', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  const titleText = (t.reminder?.title || (isEn ? 'Call to Prayer: {name}' : 'Panggilan Sholat {name}'))
    .replace('{name}', prayerName);

  return (
    <div className="reminder-overlay" role="dialog" aria-modal="true" aria-label={titleText}>
      <div className="reminder-card animate-reminder">
        <button 
          type="button" 
          className="reminder-close-btn" 
          onClick={onClose}
          aria-label={isEn ? "Close reminder" : "Tutup pengingat"}
        >
          <X size={18} />
        </button>

        <div className="reminder-icon-ring">
          <Compass size={38} className="reminder-compass" />
        </div>

        <div className="reminder-badge">
          <span>{cityName}</span>
          <span className="bullet">•</span>
          <span>{timeFormatted}</span>
        </div>

        <h1 className="reminder-title">{titleText}</h1>

        <div className="quran-quote-card">
          <div className="arabic-verse" dir="rtl" lang="ar">
            إِنَّ الصَّلَاةَ كَانَتْ عَلَى الْمُؤْمِنِينَ كِتَابًا مَوْقُوتًا
          </div>
          <p className="quran-translation">
            {t.reminder?.quranQuote || '“Maka dirikanlah shalat itu (sebagaimana biasa). Sungguh, shalat itu adalah kewajiban yang ditentukan waktunya atas orang-orang yang beriman.”'}
          </p>
          <div className="quran-reference">
            {t.reminder?.quranSurah || 'QS. An-Nisa\': 103'}
          </div>
        </div>

        <div className="reminder-actions">
          <button 
            type="button" 
            className="reminder-btn-primary" 
            onClick={onClose}
          >
            <Check size={18} />
            <span>{t.reminder?.readyToPray || (isEn ? '✓ I Am Ready to Pray' : '✓ Saya Siap Sholat')}</span>
          </button>
          {onBackToClock && (
            <button 
              type="button" 
              className="reminder-btn-secondary" 
              onClick={() => {
                onClose();
                onBackToClock();
              }}
            >
              <Clock size={16} />
              <span>{t.reminder?.openDeskClock || (isEn ? '⏱️ Open Desk Clock' : '⏱️ Buka Desk Clock')}</span>
            </button>
          )}
        </div>

        <p className="reminder-disclaimer">
          {isEn
            ? "This serene reminder screen appears automatically according to your location prayer times."
            : "Layar pengingat khusyuk ini otomatis muncul sesuai jadwal waktu sholat lokasi Anda."}
        </p>
      </div>
    </div>
  );
}
