import React, { useState, useEffect } from 'react';
import FlipClock from './components/FlipClock';
import PrayerTime from './components/PrayerTime';
import PomodoroTimer from './components/PomodoroTimer';
import ExtensionLanding from './components/ExtensionLanding';
import { Timer, Clock, Download, Code } from 'lucide-react';
import './index.css';

const checkIsExtensionRoute = () => {
  if (typeof window === 'undefined') return false;
  const path = window.location.pathname.toLowerCase();
  const hash = window.location.hash.toLowerCase();
  return path.startsWith('/extension') || hash.includes('extension');
};

function App() {
  const [activeTab, setActiveTab] = useState('clock'); // 'clock' | 'pomodoro'
  const [currentRoute, setCurrentRoute] = useState(checkIsExtensionRoute() ? 'extension' : 'app');
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentRoute(checkIsExtensionRoute() ? 'extension' : 'app');
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
    setCurrentRoute(route);
    if (route === 'extension') {
      window.history.pushState({}, '', '/extension');
    } else {
      window.history.pushState({}, '', '/');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (currentRoute === 'extension') {
    return <ExtensionLanding onBackToClock={() => navigateTo('app')} />;
  }

  return (
    <div className="app-container">
      <div className="app-header-nav">
        <button
          className={`nav-btn ${activeTab === 'clock' ? 'active' : ''}`}
          onClick={() => setActiveTab('clock')}
          title="Flip Clock & Prayer Times"
        >
          <Clock size={18} />
          <span>Clock</span>
        </button>
        <button
          className={`nav-btn ${activeTab === 'pomodoro' ? 'active' : ''}`}
          onClick={() => setActiveTab('pomodoro')}
          title="Pomodoro Timer"
        >
          <Timer size={18} />
          <span>Pomodoro</span>
        </button>
        <button
          className="nav-btn extension-nav-btn"
          onClick={() => navigateTo('extension')}
          title="VS Code Extension & Marketplace"
        >
          <Code size={18} />
          <span>VS Code Extension</span>
        </button>
        {deferredPrompt && (
          <button
            className="nav-btn install-btn"
            onClick={handleInstallClick}
            title="Install Zen Clock App"
          >
            <Download size={18} />
            <span>Install</span>
          </button>
        )}
      </div>

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
    </div>
  );
}

export default App;
