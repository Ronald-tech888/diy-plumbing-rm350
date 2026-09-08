// Keep only the last payment reference on this browser, never contact details or payment status.
window.bookingMemory = (() => {
  const key='diy-plumbing-last-payment';
  const valid=b=>b && /^REG-[0-9a-f-]{36}$/i.test(b.registration||'') && window.OCTOBER_SESSIONS.some(s=>s.id===b.session) && window.OCTOBER_TICKETS.EN.some(t=>t.key===b.ticket);
  function save(session,ticket,registration){
    try{localStorage.setItem(key,JSON.stringify({session,ticket,registration,savedAt:Date.now()}));}catch{}
  }
  function show(node,zh){
    if(!node)return;
    try{
      const b=JSON.parse(localStorage.getItem(key)||'null');
      if(!valid(b)||!Number.isFinite(b.savedAt)||Date.now()-b.savedAt>30*86400000)return;
      const requested=new URLSearchParams(location.search);
      if((requested.has('session')&&requested.get('session')!==b.session)||(requested.has('ticket')&&requested.get('ticket')!==b.ticket))return;
      const s=window.OCTOBER_SESSIONS.find(s=>s.id===b.session),t=window.OCTOBER_TICKETS.EN.find(t=>t.key===b.ticket);
      const title=document.createElement('strong');title.textContent=zh?'之前的报名付款资料':'Previous registration payment details';
      const summary=document.createElement('p');summary.textContent=`${s.date} · ${s.id.endsWith('ZH')?(zh?'中文班':'Mandarin'):(zh?'英文班':'English')} · ${s.time} MYT · RM${t.amount}`;
      const link=document.createElement('a'),url=new URL('thanks.html',location.href);
      url.search=new URLSearchParams({session:b.session,ticket:b.ticket,registration:b.registration}).toString();
      link.href=url.href;link.textContent=zh?'查看付款资料／发送凭证':'View payment details / send slip';
      node.replaceChildren(title,summary,link);node.hidden=false;
    }catch{}
  }
  return {save,show};
})();
