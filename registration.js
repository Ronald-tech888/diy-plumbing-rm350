(() => {
  'use strict';
  const lang = document.body.dataset.language, zh = lang === 'ZH';
  const form = document.querySelector('form'), sessionInput = document.getElementById('session');
  const ticketInput = document.getElementById('ticket'), buddy = document.getElementById('buddy-name');
  const tickets = window.OCTOBER_TICKETS[lang], params = new URLSearchParams(location.search);
  tickets.forEach(t => { const o = document.createElement('option'); o.value=t.key; o.textContent=zh?({standard:'单人票 RM350／人',early:'早鸟票 RM280／人（须核实）',buddy:'双人同行 RM520／2人'}[t.key]):t.label; ticketInput.append(o); });
  document.getElementById('price-policy').textContent=window.OCTOBER_PRICE_POLICY[lang];
  if(tickets.some(t=>t.key===params.get('ticket'))) ticketInput.value=params.get('ticket');
  const publicSessions = window.OCTOBER_SESSIONS.filter(s => window.PUBLIC_SESSION_IDS.includes(s.id));
  let selected = publicSessions.find(s=>s.id===params.get('session') && s.id.endsWith(lang));
  if(!selected && params.has('date')) { const legacy=params.get('date'); selected=publicSessions.find(s=>legacy===`${s.day}-${s.date.slice(5,7)==='09'?'Sep':'Oct'}` && s.id.endsWith(lang)); }
  if(selected) sessionInput.value=selected.id;
  let registrationId = 'REG-'+crypto.randomUUID();
  const current = () => ({s:publicSessions.find(s=>s.id===sessionInput.value && s.id.endsWith(lang)),t:tickets.find(t=>t.key===ticketInput.value)});
  function update(){
    const {s,t}=current();buddy.required=t.seats===2;document.getElementById('buddy-field').hidden=t.seats!==2;
    document.getElementById('class-summary').textContent=s?`${s.date} · ${s.language} · ${s.time} MYT`: (zh?'请选择日期':'Choose a date');
    document.getElementById('order-summary').textContent=`${t.label} · ${t.seats}${zh?'人':' participant(s)'} · RM${t.amount}`;
    const u=new URL(document.getElementById('switch-language').href);
    u.searchParams.delete('session');
    const other=s && publicSessions.find(x=>x.id===s.id.replace(/(EN|ZH)$/,zh?'EN':'ZH'));
    if(other)u.searchParams.set('session',other.id);
    document.getElementById('switch-language').href=u.href;
  }
  sessionInput.addEventListener('change',update);ticketInput.addEventListener('change',update);update();
  let submitting=false;
  form.addEventListener('submit',async event=>{
    event.preventDefault();if(submitting||!form.reportValidity())return;
    const {s,t}=current();if(!s||!t)return;
    submitting=true;
    const button=form.querySelector('button[type="submit"]'), original=button.textContent;
    button.disabled=true;button.textContent=zh?'正在提交…':'Submitting…';
    document.getElementById('form-error').textContent='';
    const data=new FormData(form);
    data.set('Photo and Video Consent',form.elements['Photo and Video Consent'].checked?'Yes':'No');
    data.set('Marketing Consent',form.elements['Marketing Consent'].checked?'Yes':'No');
    data.set('Privacy Notice Version','2026-09-07');
    data.set('Consent Recorded At',new Date().toISOString());
    const dateParts=s.date.split('-').map(Number);
    const workshopDate=new Intl.DateTimeFormat('en-GB',{day:'numeric',month:'long',year:'numeric',timeZone:'UTC'}).format(new Date(Date.UTC(dateParts[0],dateParts[1]-1,dateParts[2])));
    data.set('Ticket',t.label);data.set('Workshop Date',workshopDate);
    data.set('Class Language',s.language);data.set('Class Time MYT',s.time);data.set('Seats',String(t.seats));
    data.set('Amount Due RM',String(t.amount));data.set('Registration ID',registrationId);
    data.set('Lead Source',params.get('source')||`${lang.toLowerCase()}-direct`);
    data.set('Additional Notes',`Session: ${s.id}; Language: ${s.language}; Time: ${s.time} MYT; Seats: ${t.seats}; Registration: ${registrationId}`);
    data.set('_subject',`New DIY Plumbing Registration - ${s.id}`);
    if(t.seats!==2)data.delete('Buddy Participant');
    for(const key of ['utm_source','utm_medium','utm_campaign','utm_content','fbclid'])if(params.has(key))data.set(key,params.get(key));
    const paymentParams=new URLSearchParams({session:s.id,ticket:t.key,registration:registrationId});
    const destination=new URL('thanks.html',location.href);destination.search=paymentParams.toString();
    data.set('_next',destination.href);
    try{
      const response=await fetch(form.action,{method:'POST',body:data,headers:{Accept:'application/json'}});
      if(!response.ok)throw new Error('Submission failed');
      // Never emit Purchase: a successful registration is not verified payment.
      try{if(typeof fbq==='function')fbq('track','Lead',{content_name:s.id,content_category:'Workshop',value:t.amount,currency:'MYR'});}catch{}
      location.href=destination.href;
    }catch{
      document.getElementById('form-error').textContent=zh?'未能确认提交成功，请重试或WhatsApp联系Ronald：+60133083049。':'Could not confirm submission. Retry or WhatsApp Ronald: +60133083049.';
      submitting=false;button.disabled=false;button.textContent=original;
    }
  });
})();
