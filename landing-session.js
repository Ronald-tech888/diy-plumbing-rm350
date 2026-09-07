(() => {
  const zh = document.documentElement.lang.startsWith('zh');
  const lang = zh ? 'ZH' : 'EN';
  const incoming = new URLSearchParams(location.search);
  document.querySelectorAll('a.js-register').forEach(a => {
    const url = new URL(a.href);
    const oldDate = url.searchParams.get('date');
    if (oldDate) {
      const day = Number(oldDate.split('-')[0]);
      const s = window.OCTOBER_SESSIONS.find(s => s.day === day && s.id.endsWith(lang));
      if (s) url.searchParams.set('session', s.id);
      url.searchParams.delete('date');
    }
    for (const key of ['utm_source','utm_medium','utm_campaign','utm_content','fbclid']) {
      if (incoming.has(key)) url.searchParams.set(key,incoming.get(key));
    }
    a.href = url.href;
  });
})();
