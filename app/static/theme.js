(function () {
  const STORAGE_KEY = 'theme';
  const root = document.documentElement;

  // Avoid flash: apply saved theme ASAP (runs before DOMContentLoaded due to 'defer')
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === 'dark') root.setAttribute('data-theme', 'dark');
  if (saved === 'light') root.removeAttribute('data-theme');

  function isDark() { return root.getAttribute('data-theme') === 'dark'; }

  function syncAria(btn) {
    if (!btn) return;
    btn.setAttribute('aria-pressed', String(isDark()));
  }

  function toggle(btn) {
    if (isDark()) {
      root.removeAttribute('data-theme');
      localStorage.setItem(STORAGE_KEY, 'light');
    } else {
      root.setAttribute('data-theme', 'dark');
      localStorage.setItem(STORAGE_KEY, 'dark');
    }
    syncAria(btn);
  }

  function init() {
    const btn = document.getElementById('theme-toggle');
    if (btn) btn.addEventListener('click', () => toggle(btn));
    syncAria(btn);

    // Respect system changes unless user explicitly overrode
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    mql.addEventListener?.('change', e => {
      const manual = localStorage.getItem(STORAGE_KEY);
      if (manual) return;
      if (e.matches) root.setAttribute('data-theme', 'dark');
      else root.removeAttribute('data-theme');
      syncAria(btn);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
