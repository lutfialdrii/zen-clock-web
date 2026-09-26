import React, { useState, useEffect } from 'react';
import FlipClock from './components/FlipClock';
import PrayerTime from './components/PrayerTime';
import PomodoroTimer from './components/PomodoroTimer';
import CityPickerModal from './components/CityPickerModal';
import AdjustModal from './components/AdjustModal';
import SettingsModal from './components/SettingsModal';
import AppsShowcase from './components/showcase/AppsShowcase';
import { Timer, Clock, Download, Settings as SettingsIcon, Maximize, Minimize } from 'lucide-react';
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
} from './utils/storage';
import { calculatePrayerTimes, shouldTriggerPrayerAlert } from './utils/prayerHelper';
import './index.css';

const resolveCurrentRoute = () => {
  if (typeof window === 'undefined') return { route: 'app', tab: 'browser' };
  const path = window.location.pathname.toLowerCase();
  const hash = window.location.hash.toLowerCase();

  if (path.startsWith('/apps')) {
    const tab = hash.replace('#', '') || 'browser';
    return { route: 'apps', tab };
  }
  if (path.startsWith('/extension') || hash.includes('extension')) {
    return { route: 'apps', tab: 'browser' };
  }
  return { route: 'app', tab: 'browser' };
};

function App() {
  const { lang, setLang } = useLanguage();
  const [activeTab, setActiveTab] = useState('clock'); // 'clock' | 'pomodoro'
  const [{ currentRoute, initialShowcaseTab }, setNavState] = useState(() => {
    const { route, tab } = resolveCurrentRoute();
    return { currentRoute: route, initialShowcaseTab: tab };
  });
  const [settings, setSettings] = useState(null);
  const [pomodoroState, setPomodoroState] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  // Modals state
  const [isCityPickerOpen, setIsCityPickerOpen] = useState(false);
  const [isAdjustOpen, setIsAdjustOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    getSettings().then((s) => {
      setSettings(s);
      if (s?.accentColor) {
        document.documentElement.style.setProperty('--zen-accent', s.accentColor);
      }
      if (s?.language && s.language !== lang) {
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
        document.documentElement.style.setProperty('--zen-accent', newSettings.accentColor);
      }
      if (newSettings?.language && newSettings.language !== lang) {
        setLang(newSettings.language);
      }
    };

    const handlePomodoroChanged = (e) => {
      setPomodoroState(e.detail);
    };

    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    window.addEventListener('zen_settings_changed', handleSettingsChanged);
    window.addEventListener('zen_pomodoro_changed', handlePomodoroChanged);
    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      window.removeEventListener('zen_settings_changed', handleSettingsChanged);
      window.removeEventListener('zen_pomodoro_changed', handlePomodoroChanged);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [lang, setLang]);

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

      // Check Prayer notification
      if (settings.notifyPrayer !== false && settings.city) {
        const prayerCalc = calculatePrayerTimes(settings.city, now, settings.adjustments, settings.language || 'id');
        if (prayerCalc && Array.isArray(prayerCalc.allPrayers)) {
          const lastReminded = await getLastRemindedPrayer();
          const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

          for (const prayer of prayerCalc.allPrayers) {
            if (prayer.key === 'sunrise') continue;
            const reminderId = `${prayer.key}-${todayStr}`;
            if (shouldTriggerPrayerAlert(now, prayer.date, lastReminded, reminderId)) {
              await setLastRemindedPrayer(reminderId);

              if (typeof Notification !== 'undefined' && Notification.permission === 'granted') {
                const isEn = settings.language === 'en';
                const title = isEn
                  ? `🕌 Prayer Time for ${prayer.name} has arrived!`
                  : `🕌 Waktu Sholat ${prayer.name} telah tiba!`;
                const body = isEn
                  ? `Prayer time for ${settings.city.name} and surrounding areas.`
                  : `Waktu sholat ${prayer.name} untuk wilayah ${settings.city.name} dan sekitarnya telah tiba.`;
                new Notification(title, { body, icon: '/favicon.svg' });
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
      const { route, tab } = resolveCurrentRoute();
      setNavState({ currentRoute: route, initialShowcaseTab: tab });
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

  const navigateTo = (route, tab = 'browser') => {
    setNavState({ currentRoute: route, initialShowcaseTab: tab });
    if (route === 'apps') {
      window.history.pushState({}, '', `/apps#${tab}`);
    } else {
      window.history.pushState({}, '', '/');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateSettings = async (partial) => {
    const updated = await saveSettings(partial);
    setSettings(updated);
    if (updated.accentColor) {
      document.documentElement.style.setProperty('--zen-accent', updated.accentColor);
    }
    if (updated.language) {
      setLang(updated.language);
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

  if (currentRoute === 'apps') {
    return (
      <AppsShowcase
        initialTab={initialShowcaseTab}
        onBackToClock={() => navigateTo('app')}
      />
    );
  }

  return (
    <div className="app-container">
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
          onClick={() => navigateTo('apps', 'browser')}
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
        onOpenEcosystem={(tab) => {
          setIsSettingsOpen(false);
          navigateTo('apps', tab || 'browser');
        }}
      />
    </div>
  );
}

export default App;
