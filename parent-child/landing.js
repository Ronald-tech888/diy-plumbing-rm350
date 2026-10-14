(() => {
  const container=document.getElementById('project-dates');
  if(!container)return;
  if(!window.PARENT_CHILD_READY){container.textContent=window.PARENT_CHILD_ERROR;return;}
  const incoming=new URLSearchParams(location.search),soldOut=window.SOLD_OUT_SESSION_IDS||[];
  const sessions=window.OCTOBER_SESSIONS.filter(s=>window.PARENT_CHILD_SESSION_IDS.includes(s.id)).sort((a,b)=>a.date.localeCompare(b.date));
  const buddy=window.OCTOBER_TICKETS.EN.find(t=>t.key==='buddy');
  document.getElementById('project-buddy-price').textContent=`RM${buddy.amount} / parent–child pair`;
  document.getElementById('project-price-policy').textContent=window.OCTOBER_PRICE_POLICY.EN;
  sessions.forEach(s=>{
    const full=soldOut.includes(s.id),card=document.createElement(full?'div':'a');card.className='date-card';
    if(!full){const target=new URL('register.html',location.href);target.search=new URLSearchParams({session:s.id,ticket:'buddy',source:'parent-child-date-card'});for(const key of ['utm_source','utm_medium','utm_campaign','utm_content','fbclid'])if(incoming.has(key))target.searchParams.set(key,incoming.get(key));card.href=target.href;}
    const date=document.createElement('strong');date.textContent=new Intl.DateTimeFormat('en-GB',{day:'numeric',month:'long',year:'numeric',timeZone:'UTC'}).format(new Date(s.date+'T00:00:00Z'));
    const detail=document.createElement('span');detail.textContent=`${s.language} · ${s.time} MYT`;
    const cta=document.createElement('span');cta.className='cta';cta.textContent=full?'Registration closed':'Choose this session →';card.append(date,detail,cta);container.append(card);
  });
})();
