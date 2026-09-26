import React, { useState, useEffect } from 'react';
import FlipClock from './components/FlipClock';
import PrayerTime from './components/PrayerTime';
import PomodoroTimer from './components/PomodoroTimer';
import AppsShowcase from './components/showcase/AppsShowcase';
import { Timer, Clock, Download } from 'lucide-react';
import { useLanguage } from './utils/i18n';
import './index.css';

const resolveCurrentRoute = () => {
  if (typeof window === 'undefined') return { route: 'app', tab: 'vscode' };
  const path = window.location.pathname.toLowerCase();
  const hash = window.location.hash.toLowerCase();

  if (path.startsWith('/apps')) {
    const tab = hash.replace('#', '') || 'vscode';
    return { route: 'apps', tab };
  }
  if (path.startsWith('/extension') || hash.includes('extension')) {
    return { route: 'apps', tab: 'vscode' };
  }
  return { route: 'app', tab: 'vscode' };
};

function App() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('clock'); // 'clock' | 'pomodoro'
  const [{ currentRoute, initialShowcaseTab }, setNavState] = useState(() => {
    const { route, tab } = resolveCurrentRoute();
    return { currentRoute: route, initialShowcaseTab: tab };
  });
  const [deferredPrompt, setDeferredPrompt] = useState(null);

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

  const navigateTo = (route, tab = 'vscode') => {
    setNavState({ currentRoute: route, initialShowcaseTab: tab });
    if (route === 'apps') {
      window.history.pushState({}, '', `/apps#${tab}`);
    } else {
      window.history.pushState({}, '', '/');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
      {/* Distraction-Free Header: Only Clock & Pomodoro Tabs */}
      <div className="app-header-nav">
        <button
          type="button"
          className={`nav-btn ${activeTab === 'clock' ? 'active' : ''}`}
          onClick={() => setActiveTab('clock')}
          title="Flip Clock & Prayer Times"
        >
          <Clock size={18} />
          <span>Clock</span>
        </button>
        <button
          type="button"
          className={`nav-btn ${activeTab === 'pomodoro' ? 'active' : ''}`}
          onClick={() => setActiveTab('pomodoro')}
          title="Pomodoro Timer"
        >
          <Timer size={18} />
          <span>Pomodoro</span>
        </button>
        {deferredPrompt && (
          <button
            type="button"
            className="nav-btn install-btn"
            onClick={handleInstallClick}
            title={t.nav?.installPwa || 'Install'}
          >
            <Download size={18} />
            <span>{t.nav?.installPwa || 'Install'}</span>
          </button>
        )}
      </div>

      {/* Main Clock Content */}
      <div className="app-content">
        {activeTab === 'clock' ? (
          <>
            <FlipClock />
            <PrayerTime />
          </>
        ) : (
          <PomodoroTimer />
        )}
      </div>

      {/* Subtle, Non-Intrusive Bottom Dock to Explore Other Apps */}
      <footer className="zen-dock-footer">
        <button
          type="button"
          className="zen-dock-link"
          onClick={() => navigateTo('apps', 'vscode')}
          title="Explore Zen Clock Apps"
        >
          <span>{t.dock?.exploreEcosystem}</span>
        </button>
      </footer>
    </div>
  );
}

export default App;
