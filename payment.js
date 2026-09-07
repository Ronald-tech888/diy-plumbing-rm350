(() => {
  'use strict';
  const lang=document.body.dataset.language,zh=lang==='ZH',p=new URLSearchParams(location.search);
  const s=window.OCTOBER_SESSIONS.find(s=>s.id===p.get('session')&&s.id.endsWith(lang));
  const t=window.OCTOBER_TICKETS[lang].find(t=>t.key===p.get('ticket'));
  const raw=p.get('registration')||'',reg=/^REG-[0-9a-f-]{36}$/i.test(raw)?raw:'';
  const summary=document.getElementById('booking-summary');
  if(!s||!t||!reg){summary.textContent=zh?'此链接缺少完整报名资料。请返回选择班期，或联系Ronald核对原报名。':'This link is missing complete registration details. Select your session or ask Ronald to check your existing registration.';return;}
  const details=`${s.date} · ${s.language} · ${s.time} MYT · ${t.seats}${zh?'人':' participant(s)'} · RM${t.amount}`;
  summary.textContent=details+' · '+reg;
  document.getElementById('payment-panel').hidden=false;document.getElementById('slip-actions').hidden=false;
  document.getElementById('payment-heading').textContent=zh?`付款资料：RM${t.amount}`:`Payment details: RM${t.amount}`;
  document.getElementById('payment-reference').textContent=(zh?'付款备注：':'Payment reference: ')+s.id+' / '+reg.slice(-8);
  const inquiry=(zh?'你好Ronald，请核实我的班次余位及票价：':'Hi Ronald, please confirm availability and price for: ')+details+'; '+reg;
  const slip=(zh?'你好Ronald，这是我的付款凭证，请核对到账及班次：':'Hi Ronald, here is my payment slip. Please verify receipt and session: ')+details+'; '+reg;
  document.getElementById('availability-link').href='https://wa.me/60133083049?text='+encodeURIComponent(inquiry);
  document.getElementById('slip-link').href='https://wa.me/60133083049?text='+encodeURIComponent(slip);
  document.getElementById('email-link').href='mailto:purchasingpoweruser@gmail.com?subject='+encodeURIComponent('Payment slip '+s.id+' '+reg)+'&body='+encodeURIComponent(slip);
})();
