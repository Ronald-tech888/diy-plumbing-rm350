// Loaded only by /parent-child/ pages. Never edits any shared source file or existing record.
(() => {
  const required=[
    {id:'L1-20261205-EN',date:'2026-12-05',day:5,language:'English',time:'09:00–13:00',capacity:12},
    {id:'L1-20261212-EN',date:'2026-12-12',day:12,language:'English',time:'09:00–13:00',capacity:12}
  ];
  const existing=window.OCTOBER_SESSIONS;
  const fields=['date','day','language','time','capacity'];
  window.PARENT_CHILD_SESSION_IDS=required.map(s=>s.id);
  window.PARENT_CHILD_READY=Array.isArray(existing) && required.every(expected=>{
    const matches=existing.filter(s=>s.id===expected.id);
    return matches.length===0 || (matches.length===1 && fields.every(key=>matches[0][key]===expected[key]));
  });
  if(!window.PARENT_CHILD_READY){window.PARENT_CHILD_ERROR='Parent–child registration is temporarily unavailable. Please contact Ronald to confirm the session details.';return;}
  // Copy-on-write: existing records, object references, visibility and November settings are preserved.
  window.OCTOBER_SESSIONS=existing.concat(required.filter(s=>!existing.some(old=>old.id===s.id)));
})();
