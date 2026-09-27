import React, { useState, useEffect, useRef } from 'react';
import FlipClock from './components/FlipClock';
import PrayerTime from './components/PrayerTime';
import PomodoroTimer from './components/PomodoroTimer';
import CityPickerModal from './components/CityPickerModal';
import AdjustModal from './components/AdjustModal';
import SettingsModal from './components/SettingsModal';
import ExplorePage from './components/explore/ExplorePage';
import ExtensionLanding from './components/ExtensionLanding';
import BrowserLanding from './components/browser/BrowserLanding';
import PrivacyPage from './components/privacy/PrivacyPage';
import NotificationBanner from './components/notification/NotificationBanner';
import ReminderModal from './components/reminder/ReminderModal';
import { playAudioChime } from './utils/notification';
import { Timer, Clock, Download, Settings as SettingsIcon, Maximize, Minimize, Star } from 'lucide-react';
import { useLanguage, getTranslations } from './utils/i18n';
import {
  getSettings,
  saveSettings,
  getPomodoroState,
  isPomodoroActive,
  executePomodoroAction,
  completePomodoroSession,
  getLastRemindedPrayer,
  setLastRemindedPrayer,
  STORAGE_KEYS,
} from './utils/storage';
import { calculatePrayerTimes, shouldTriggerPrayerAlert } from './utils/prayerHelper';
import './index.css';

const resolveCurrentRoute = () => {
  if (typeof window === 'undefined') return { route: 'app' };
  const path = window.location.pathname.toLowerCase();
  const hash = window.location.hash.toLowerCase();

  // 1. VS Code Extension dedicated page
  if (
    path.startsWith('/vscode') || 
    hash.includes('vscode') || 
    path.startsWith('/extension') || 
    hash.includes('extension')
  ) {
    return { route: 'vscode' };
  }

  // 2. Browser Extension dedicated page
  if (path.startsWith('/browser') || hash.includes('browser')) {
    return { route: 'browser' };
  }

  // 3. Bridging / Ecosystem explore page
  if (
    path.startsWith('/explore') || 
    hash.includes('explore') || 
    path.startsWith('/apps') || 
    hash.includes('apps')
  ) {
    return { route: 'explore' };
  }

  // 4. Privacy Policy page (/privacy-policy, /privacy, or #privacy)
  if (
    path.startsWith('/privacy-policy') ||
    path.startsWith('/privacy') || 
    hash.includes('privacy')
  ) {
    return { route: 'privacy-policy' };
  }

  // 5. Prayer Reminder dedicated view (/reminder or #reminder)
  if (path.startsWith('/reminder') || hash.includes('reminder')) {
    return { route: 'reminder' };
  }

  return { route: 'app' };
};

function App() {
  const { lang, setLang } = useLanguage();
  const langRef = useRef(lang);
  useEffect(() => {
    langRef.current = lang;
  }, [lang]);

  const [activeTab, setActiveTab] = useState('clock'); // 'clock' | 'pomodoro'
  const [{ currentRoute }, setNavState] = useState(() => {
    const { route } = resolveCurrentRoute();
    return { currentRoute: route };
  });
  const [settings, setSettings] = useState(null);
  const [pomodoroState, setPomodoroState] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  // Modals state
  const [isCityPickerOpen, setIsCityPickerOpen] = useState(false);
  const [isAdjustOpen, setIsAdjustOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [activePrayerReminder, setActivePrayerReminder] = useState(null);

  useEffect(() => {
    const applyAccentColor = (color) => {
      if (typeof color === 'string' && /^#([0-9A-F]{3}){1,2}$/i.test(color)) {
        document.documentElement.style.setProperty('--zen-accent', color);
      }
    };

    getSettings().then((s) => {
      setSettings(s);
      if (s?.accentColor) {
        applyAccentColor(s.accentColor);
      }
      if (s?.language && s.language !== langRef.current) {
        setLang(s.language);
      }
    });

    getPomodoroState().then((p) => {
      setPomodoroState(p);
      if (isPomodoroActive(p)) {
        setActiveTab('pomodoro');
      }
    });

    const handleSettingsChanged = (e) => {
      const newSettings = e.detail;
      setSettings(newSettings);
      if (newSettings?.accentColor) {
        applyAccentColor(newSettings.accentColor);
      }
      if (newSettings?.language && newSettings.language !== langRef.current) {
        setLang(newSettings.language);
      }
    };

    const handlePomodoroChanged = (e) => {
      setPomodoroState(e.detail);
    };

    // Cross-tab synchronization via browser native storage event
    const handleNativeStorage = (e) => {
      if (e.key === STORAGE_KEYS.SETTINGS) {
        getSettings().then((s) => {
          setSettings(s);
          if (s?.accentColor) {
            applyAccentColor(s.accentColor);
          }
          if (s?.language && s.language !== langRef.current) {
            setLang(s.language);
          }
        });
      } else if (e.key === STORAGE_KEYS.POMODORO) {
        getPomodoroState().then((p) => {
          setPomodoroState(p);
        });
      }
    };

    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    window.addEventListener('zen_settings_changed', handleSettingsChanged);
    window.addEventListener('zen_pomodoro_changed', handlePomodoroChanged);
    window.addEventListener('storage', handleNativeStorage);
    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      window.removeEventListener('zen_settings_changed', handleSettingsChanged);
      window.removeEventListener('zen_pomodoro_changed', handlePomodoroChanged);
      window.removeEventListener('storage', handleNativeStorage);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [setLang]);

  // Background ticker for Pomodoro completion and Prayer notification
  useEffect(() => {
    if (!settings) return;

    const checkInterval = setInterval(async () => {
      const now = new Date();

      // Check Pomodoro completion
      const pState = await getPomodoroState();
      if (pState.isRunning && pState.targetEndTime && pState.targetEndTime <= now.getTime()) {
        const completed = await completePomodoroSession();
        setPomodoroState(completed);
      }

      // Check Prayer notification and serene reminder screen
      if (settings.city && (settings.notifyPrayer !== false || settings.autoOpenReminderTab !== false)) {
        const prayerCalc = calculatePrayerTimes(settings.city, now, settings.adjustments, settings.language || 'id');
        if (prayerCalc && Array.isArray(prayerCalc.allPrayers)) {
          const lastReminded = await getLastRemindedPrayer();
          const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

          for (const prayer of prayerCalc.allPrayers) {
            if (prayer.key === 'sunrise') continue;
            const reminderId = `${prayer.key}-${todayStr}`;
            if (shouldTriggerPrayerAlert(now, prayer.date, lastReminded, reminderId)) {
              await setLastRemindedPrayer(reminderId);

              // 1. Play gentle audio chime
              playAudioChime();

              // 2. Open serene in-app prayer reminder screen (if enabled)
              if (settings.autoOpenReminderTab !== false) {
                setActivePrayerReminder(prayer);
              }

              // 3. Trigger native desktop notification (if enabled & permission granted)
              if (settings.notifyPrayer !== false && typeof Notification !== 'undefined' && Notification.permission === 'granted') {
                const isEn = settings.language === 'en';
                const title = isEn
                  ? `🕌 Prayer Time for ${prayer.name} has arrived!`
                  : `🕌 Waktu Sholat ${prayer.name} telah tiba!`;
                const body = isEn
                  ? `Prayer time for ${settings.city.name} and surrounding areas.`
                  : `Waktu sholat ${prayer.name} untuk wilayah ${settings.city.name} dan sekitarnya telah tiba.`;
                try {
                  const notif = new Notification(title, { body, icon: '/favicon.svg', tag: reminderId });
                  notif.onclick = () => {
                    window.focus();
                    setActivePrayerReminder(prayer);
                  };
                } catch (e) {
                  console.error('Notification error:', e);
                }
              }
              break;
            }
          }
        }
      }
    }, 5000);

    return () => clearInterval(checkInterval);
  }, [settings]);

  useEffect(() => {
    const handlePopState = () => {
      const { route } = resolveCurrentRoute();
      setNavState({ currentRoute: route });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    const handleAppInstalled = () => {
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
    }
  };

  const navigateTo = (route) => {
    const targetRoute = route === 'privacy' ? 'privacy-policy' : route;
    setNavState({ currentRoute: targetRoute });
    if (typeof window !== 'undefined' && window.history?.pushState) {
      const url = targetRoute === 'app' ? '/' : `/${targetRoute}`;
      window.history.pushState({ route: targetRoute }, '', url);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateSettings = async (partial) => {
    const updated = await saveSettings(partial);
    setSettings(updated);
    if (updated.accentColor && /^#([0-9A-F]{3}){1,2}$/i.test(updated.accentColor)) {
      document.documentElement.style.setProperty('--zen-accent', updated.accentColor);
    }
    if (updated.language) {
      setLang(updated.language);
    }
    if (partial.workDuration !== undefined || partial.breakDuration !== undefined) {
      const p = await getPomodoroState();
      if (!p.isRunning) {
        const syncedPomo = await executePomodoroAction('RESET_POMODORO', { mode: p.mode });
        setPomodoroState(syncedPomo);
      }
    }
  };

  const handlePomodoroAction = async (type, payload = {}) => {
    const updated = await executePomodoroAction(type, payload);
    setPomodoroState(updated);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const currentLang = settings?.language || lang || 'id';
  const t = getTranslations(currentLang);

  if (currentRoute === 'explore') {
    return (
      <ExplorePage
        onBackToClock={() => navigateTo('app')}
        onNavigate={(dest) => navigateTo(dest)}
      />
    );
  }

  if (currentRoute === 'vscode') {
    return (
      <ExtensionLanding
        onBackToClock={() => navigateTo('app')}
        onBackToExplore={() => navigateTo('explore')}
      />
    );
  }

  if (currentRoute === 'browser') {
    return (
      <BrowserLanding
        onBackToClock={() => navigateTo('app')}
        onBackToExplore={() => navigateTo('explore')}
        onNavigate={(dest) => navigateTo(dest)}
      />
    );
  }

  if (currentRoute === 'privacy-policy' || currentRoute === 'privacy') {
    return (
      <PrivacyPage
        onBackToClock={() => navigateTo('app')}
        onBackToExplore={() => navigateTo('explore')}
      />
    );
  }

  if (currentRoute === 'reminder') {
    return (
      <ReminderModal
        isOpen={true}
        prayerName={currentLang === 'en' ? 'Dhuhr' : 'Dzuhur'}
        cityName={settings?.city?.name || 'Jakarta'}
        language={currentLang}
        onClose={() => navigateTo('app')}
        onBackToClock={() => navigateTo('app')}
      />
    );
  }

  return (
    <div className="app-container">
      {/* Contextual Opt-In Desktop Notification Banner */}
      <NotificationBanner language={currentLang} />

      {/* Viewport Hero Section (Full 100vh on Desktop - Zero Distractions) */}
      <div className="deskclock-hero-screen">
        {/* Top Header Controls Bar (Parity with DeskClockPage) */}
        <header className="deskclock-top-bar">
          <div className="deskclock-left">
            <div className="deskclock-brand">
              <Clock size={16} className="brand-icon" />
              <span className="brand-name">Zen Clock</span>
            </div>
          </div>

          <nav className="deskclock-tab-nav">
            <button
              type="button"
              className={`deskclock-tab-btn ${activeTab === 'clock' ? 'active' : ''}`}
              onClick={() => setActiveTab('clock')}
              title="Clock & Prayer Times"
            >
              <Clock size={15} />
              <span>{t.ui?.navClock || 'Clock'}</span>
            </button>
            <button
              type="button"
              className={`deskclock-tab-btn ${activeTab === 'pomodoro' ? 'active' : ''}`}
              onClick={() => setActiveTab('pomodoro')}
              title="Pomodoro Timer"
            >
              <Timer size={15} />
              <span>{t.ui?.navPomodoro || 'Pomodoro'}</span>
              {isPomodoroActive(pomodoroState) && <span className="pomodoro-active-dot" />}
            </button>
          </nav>

          <div className="deskclock-actions">
            {deferredPrompt && (
              <button
                type="button"
                className="deskclock-icon-btn install-btn"
                onClick={handleInstallClick}
                title={t.nav?.installPwa || 'Install App'}
                aria-label="Install App"
              >
                <Download size={16} />
                <span>{t.nav?.installPwa || 'Install'}</span>
              </button>
            )}
            <a
              href="https://github.com/lutfialdrii/zen-clock-web"
              target="_blank"
              rel="noopener noreferrer"
              className="deskclock-icon-btn"
              title={t.nav?.starGitHub || 'Star di GitHub'}
              aria-label={t.nav?.starGitHub || 'Star di GitHub'}
            >
              <Star size={18} />
            </a>
            <button
              type="button"
              className="deskclock-icon-btn"
              onClick={() => setIsSettingsOpen(true)}
              title={t.ui?.settings || 'Settings'}
              aria-label="Settings"
            >
              <SettingsIcon size={18} />
            </button>
            <button
              type="button"
              className="deskclock-icon-btn"
              onClick={toggleFullscreen}
              title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
              aria-label={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            >
              {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
            </button>
          </div>
        </header>

        {/* Main Display: Ambient Clock or Pomodoro */}
        <main className="app-content">
          {activeTab === 'clock' ? (
            <>
              <FlipClock language={currentLang} variant="full" />
              <PrayerTime
                settings={settings}
                onOpenCityPicker={() => setIsCityPickerOpen(true)}
                onOpenAdjustModal={() => setIsAdjustOpen(true)}
                onOpenThemeModal={() => setIsSettingsOpen(true)}
                onToggleNotify={() =>
                  handleUpdateSettings({ notifyPrayer: settings?.notifyPrayer === false })
                }
                hideDeskClockButton={true}
              />
            </>
          ) : (
            <div className="deskclock-pomodoro-wrapper">
              <PomodoroTimer
                language={currentLang}
                settings={settings}
                pomodoroState={pomodoroState}
                onPomodoroAction={handlePomodoroAction}
                variant="full"
              />
            </div>
          )}
        </main>

        {/* Bottom Spacer to balance hero viewport centering */}
        <div className="deskclock-hero-spacer" />
      </div>

      {/* Below-the-fold Ecosystem Discovery Section (Revealed on Scroll) */}
      <section className="deskclock-below-fold-section">
        <span className="deskclock-below-fold-caption">
          Zen Clock Apps
        </span>
        <button
          type="button"
          className="zen-dock-link"
          onClick={() => navigateTo('explore')}
          title="Explore Zen Clock Apps"
        >
          <span>{t.dock?.exploreEcosystem}</span>
        </button>
      </section>

      {/* Modals for Customization Parity */}
      <CityPickerModal
        isOpen={isCityPickerOpen}
        onClose={() => setIsCityPickerOpen(false)}
        currentCity={settings?.city}
        onSelectCity={(city) => handleUpdateSettings({ city })}
        language={currentLang}
      />

      <AdjustModal
        isOpen={isAdjustOpen}
        onClose={() => setIsAdjustOpen(false)}
        city={settings?.city}
        adjustments={settings?.adjustments}
        onSaveAdjustments={(adjustments) => handleUpdateSettings({ adjustments })}
        language={currentLang}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onSaveSettings={handleUpdateSettings}
        onOpenCityPicker={() => {
          setIsSettingsOpen(false);
          setIsCityPickerOpen(true);
        }}
        onOpenAdjustModal={() => {
          setIsSettingsOpen(false);
          setIsAdjustOpen(true);
        }}
        onOpenEcosystem={() => {
          setIsSettingsOpen(false);
          navigateTo('explore');
        }}
        onTriggerTestReminder={(testPrayer) => setActivePrayerReminder(testPrayer)}
      />

      <ReminderModal
        isOpen={!!activePrayerReminder}
        prayerName={activePrayerReminder?.name || (currentLang === 'en' ? 'Dhuhr' : 'Dzuhur')}
        cityName={settings?.city?.name || 'Jakarta'}
        language={currentLang}
        onClose={() => setActivePrayerReminder(null)}
        onBackToClock={() => {
          setActivePrayerReminder(null);
          navigateTo('app');
        }}
      />
    </div>
  );
}

export default App;
