import React, { useState, useEffect } from 'react';
import { Bell, X, CheckCircle } from 'lucide-react';
import { playAudioChime } from '../../utils/notification';
import './NotificationBanner.css';

export default function NotificationBanner({ language = 'id', onPermissionChange }) {
  const [showBanner, setShowBanner] = useState(false);
  const [grantedFeedback, setGrantedFeedback] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !('Notification' in window)) {
      return;
    }

    if (Notification.permission === 'default') {
      const isDismissed = localStorage.getItem('zen_notif_banner_dismissed');
      if (isDismissed !== 'true') {
        setShowBanner(true);
      }
    }
  }, []);

  const handleRequestPermission = async () => {
    if (typeof window === 'undefined' || !('Notification' in window)) return;

    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        setGrantedFeedback(true);
        playAudioChime();
        if (onPermissionChange) onPermissionChange('granted');

        setTimeout(() => {
          setShowBanner(false);
        }, 1500);
      } else {
        localStorage.setItem('zen_notif_banner_dismissed', 'true');
        setShowBanner(false);
        if (onPermissionChange) onPermissionChange(permission);
      }
    } catch (err) {
      console.error('Error requesting notification permission:', err);
      setShowBanner(false);
    }
  };

  const handleDismiss = () => {
    localStorage.setItem('zen_notif_banner_dismissed', 'true');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  const isEn = language === 'en';

  return (
    <div className="notif-banner-wrapper" role="region" aria-label="Notification Permission Banner">
      <div className="notif-banner">
        <div className="notif-banner-icon">
          {grantedFeedback ? <CheckCircle size={18} className="success-icon" /> : <Bell size={18} />}
        </div>

        <div className="notif-banner-content">
          {grantedFeedback ? (
            <span className="notif-banner-title">
              {isEn ? "Notifications successfully enabled!" : "Notifikasi desktop berhasil diaktifkan!"}
            </span>
          ) : (
            <>
              <span className="notif-banner-title">
                {isEn ? "Enable desktop notifications" : "Aktifkan notifikasi desktop"}
              </span>
              <span className="notif-banner-desc">
                {isEn 
                  ? "Receive gentle reminders when prayer time arrives or focus sessions end." 
                  : "Dapatkan pengingat khusyuk saat waktu sholat tiba atau sesi Pomodoro selesai."}
              </span>
            </>
          )}
        </div>

        {!grantedFeedback && (
          <div className="notif-banner-actions">
            <button 
              type="button" 
              className="notif-btn-allow" 
              onClick={handleRequestPermission}
            >
              {isEn ? "Enable" : "Izinkan"}
            </button>
            <button 
              type="button" 
              className="notif-btn-dismiss" 
              onClick={handleDismiss}
              aria-label={isEn ? "Dismiss notification prompt" : "Tutup tawaran notifikasi"}
            >
              <X size={15} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
