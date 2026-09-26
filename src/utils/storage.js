/**
 * Storage Helper for Zen Clock Web App & PWA
 * Provides persistent configuration, city selection, prayer adjustments, and Pomodoro state
 */

export const DEFAULT_SETTINGS = {
  language: 'id',
  accentColor: '#fbbf24', // Warm Amber (Classic Zen Clock default)
  themeMode: 'dark',
  autoOpenReminderTab: true,
  notifyPrayer: true,
  notifyPomodoro: true,
  workDuration: 25, // minutes
  breakDuration: 5,  // minutes
  city: {
    name: 'Jakarta',
    region: 'DKI Jakarta',
    lat: -6.2088,
    lng: 106.8456,
    timezone: 'Asia/Jakarta',
  },
  adjustments: {
    fajr: 0,
    sunrise: 0,
    dhuhr: 0,
    asr: 0,
    maghrib: 0,
    isha: 0,
  },
};

export const DEFAULT_POMODORO = {
  isRunning: false,
  mode: 'work', // 'work' | 'break'
  timeLeft: 25 * 60,
  totalDuration: 25 * 60,
  targetEndTime: null,
};

export const STORAGE_KEYS = {
  SETTINGS: 'zen_settings',
  POMODORO: 'zen_pomodoro',
  LAST_REMINDED: 'zen_last_reminded_prayer',
};

/**
 * Pure Single Source of Truth (SSOT) helper to compute remaining seconds
 */
export function calculateRemainingPomodoroSeconds(state) {
  if (!state) return DEFAULT_POMODORO.timeLeft;
  if (state.isRunning && state.targetEndTime) {
    return Math.max(0, Math.round((state.targetEndTime - Date.now()) / 1000));
  }
  return typeof state.timeLeft === 'number' ? state.timeLeft : DEFAULT_POMODORO.timeLeft;
}

/**
 * Checks if a Pomodoro session is actively running and not expired
 */
export function isPomodoroActive(state) {
  if (!state || !state.isRunning) return false;
  if (state.targetEndTime && state.targetEndTime <= Date.now()) return false;
  return true;
}

/**
 * Gets settings merged with defaults
 */
export async function getSettings() {
  if (typeof window === 'undefined') return { ...DEFAULT_SETTINGS };
  try {
    const local = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (!local) return { ...DEFAULT_SETTINGS };
    const parsed = JSON.parse(local);
    return {
      ...DEFAULT_SETTINGS,
      ...parsed,
      city: { ...DEFAULT_SETTINGS.city, ...(parsed.city || {}) },
      adjustments: { ...DEFAULT_SETTINGS.adjustments, ...(parsed.adjustments || {}) },
    };
  } catch (err) {
    console.error('getSettings error:', err);
    return { ...DEFAULT_SETTINGS };
  }
}

/**
 * Saves settings partially and persists to localStorage
 */
export async function saveSettings(partial) {
  if (typeof window === 'undefined') return { ...DEFAULT_SETTINGS, ...partial };
  try {
    const current = await getSettings();
    const updated = {
      ...current,
      ...partial,
      city: partial.city ? { ...current.city, ...partial.city } : current.city,
      adjustments: partial.adjustments
        ? { ...current.adjustments, ...partial.adjustments }
        : current.adjustments,
    };
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(updated));

    // Also sync language to existing i18n key if changed
    if (partial.language) {
      localStorage.setItem('zen_clock_lang', partial.language);
    }

    // Trigger local storage event for same-tab reactive listeners
    window.dispatchEvent(
      new CustomEvent('zen_settings_changed', { detail: updated })
    );

    return updated;
  } catch (err) {
    console.error('saveSettings error:', err);
    return { ...DEFAULT_SETTINGS, ...partial };
  }
}

/**
 * Gets Pomodoro state merged with defaults
 */
export async function getPomodoroState() {
  if (typeof window === 'undefined') return { ...DEFAULT_POMODORO };
  try {
    const local = localStorage.getItem(STORAGE_KEYS.POMODORO);
    if (!local) return { ...DEFAULT_POMODORO };
    const parsed = JSON.parse(local);
    return { ...DEFAULT_POMODORO, ...parsed };
  } catch {
    return { ...DEFAULT_POMODORO };
  }
}

/**
 * Saves Pomodoro state
 */
export async function savePomodoroState(partial) {
  if (typeof window === 'undefined') return { ...DEFAULT_POMODORO, ...partial };
  try {
    const current = await getPomodoroState();
    const updated = { ...current, ...partial };
    localStorage.setItem(STORAGE_KEYS.POMODORO, JSON.stringify(updated));
    window.dispatchEvent(
      new CustomEvent('zen_pomodoro_changed', { detail: updated })
    );
    return updated;
  } catch {
    return { ...DEFAULT_POMODORO, ...partial };
  }
}

export async function getLastRemindedPrayer() {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(STORAGE_KEYS.LAST_REMINDED);
}

export async function setLastRemindedPrayer(reminderId) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.LAST_REMINDED, reminderId);
}

/**
 * Handles Pomodoro actions for standalone web environment
 */
export async function executePomodoroAction(type, payload = {}) {
  const current = await getPomodoroState();
  const settings = await getSettings();

  switch (type) {
    case 'START_POMODORO': {
      if (current.isRunning && current.targetEndTime && current.targetEndTime > Date.now()) {
        return current;
      }
      const timeLeft = payload.timeLeft || current.timeLeft;
      const targetEndTime = Date.now() + timeLeft * 1000;
      return await savePomodoroState({
        isRunning: true,
        timeLeft,
        targetEndTime,
        mode: payload.mode || current.mode,
      });
    }

    case 'PAUSE_POMODORO': {
      let timeLeft = current.timeLeft;
      if (current.targetEndTime) {
        timeLeft = Math.max(0, Math.round((current.targetEndTime - Date.now()) / 1000));
      }
      return await savePomodoroState({
        isRunning: false,
        timeLeft,
        targetEndTime: null,
      });
    }

    case 'RESET_POMODORO': {
      const mode = payload.mode || current.mode || 'work';
      const duration = (mode === 'work' ? (settings.workDuration || 25) : (settings.breakDuration || 5)) * 60;
      return await savePomodoroState({
        isRunning: false,
        mode,
        timeLeft: duration,
        totalDuration: duration,
        targetEndTime: null,
      });
    }

    case 'SWITCH_POMODORO_MODE': {
      const mode = payload.mode === 'break' ? 'break' : 'work';
      const duration = (mode === 'work' ? (settings.workDuration || 25) : (settings.breakDuration || 5)) * 60;
      return await savePomodoroState({
        isRunning: false,
        mode,
        timeLeft: duration,
        totalDuration: duration,
        targetEndTime: null,
      });
    }

    default:
      return current;
  }
}

/**
 * Completes Pomodoro session and advances to next mode
 */
export async function completePomodoroSession() {
  const state = await getPomodoroState();
  const settings = await getSettings();
  const wasWork = state.mode === 'work';
  const nextMode = wasWork ? 'break' : 'work';
  const nextDuration = (nextMode === 'work' ? (settings.workDuration || 25) : (settings.breakDuration || 5)) * 60;

  const updated = await savePomodoroState({
    isRunning: false,
    mode: nextMode,
    timeLeft: nextDuration,
    totalDuration: nextDuration,
    targetEndTime: null,
  });

  if (typeof Notification !== 'undefined' && Notification.permission === 'granted' && settings.notifyPomodoro !== false) {
    const isEn = settings.language === 'en';
    const title = wasWork 
      ? (isEn ? '🎉 Pomodoro Session Completed!' : '🎉 Sesi Pomodoro Selesai!')
      : (isEn ? '☕ Break is Over!' : '☕ Waktu Istirahat Selesai!');
    const body = wasWork
      ? (isEn ? 'Take a short break and relax your eyes.' : 'Ambil istirahat sejenak untuk meregangkan badan dan mata.')
      : (isEn ? 'Ready to focus on your next task?' : 'Siap untuk kembali fokus bekerja?');
    new Notification(title, { body, icon: '/favicon.svg' });
  }

  return updated;
}

