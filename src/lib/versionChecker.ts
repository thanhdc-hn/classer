import { toast } from 'react-toastify';

let lastCheck = 0;
const CHECK_INTERVAL = 30_000; // 30s throttle

async function checkVersion() {
  try {
    const res = await fetch('/version.json?cacheBust=' + Date.now());
    const { version } = await res.json();

    const currentVersion = localStorage.getItem('app-version');

    if (currentVersion && +currentVersion !== +version) {
      // Show toast with reload button
      toast.info('⚡ New version available – Click to refresh', {
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        onClick: () => {
          localStorage.setItem('app-version', version);
          window.location.reload();
        },
      });
    } else {
      localStorage.setItem('app-version', version);
    }
  } catch (err) {
    console.error('Version check failed:', err);
  }
}

export function initVersionChecker() {
  // Run once on app load
  checkVersion();

  // Run whenever tab becomes visible, with throttle
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      const now = Date.now();
      if (now - lastCheck > CHECK_INTERVAL) {
        lastCheck = now;
        checkVersion();
      }
    }
  });
}
