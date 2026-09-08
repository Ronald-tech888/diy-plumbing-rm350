(() => {
  'use strict';
  const lang=document.body.dataset.language,zh=lang==='ZH',p=new URLSearchParams(location.search);
  const s=window.OCTOBER_SESSIONS.find(s=>s.id===p.get('session'));
  const t=window.OCTOBER_TICKETS[lang].find(t=>t.key===p.get('ticket'));
  const raw=p.get('registration')||'',reg=/^REG-[0-9a-f-]{36}$/i.test(raw)?raw:'';
  const languageLink=new URL(document.getElementById('switch-language').href);languageLink.search=p.toString();document.getElementById('switch-language').href=languageLink.href;
  const summary=document.getElementById('booking-summary');
  if(!s||!t||!reg){summary.textContent=zh?'此链接缺少完整报名资料。请联系Ronald核对原报名。':'This link is missing complete registration details. Ask Ronald to check your existing registration.';if(!location.search)window.bookingMemory.show(document.getElementById('payment-resume'),zh);return;}
  window.bookingMemory.save(s.id,t.key,reg);
  document.getElementById('payment-page-link').textContent=location.href;
  const details=`${s.date} · ${s.language} · ${s.time} MYT · ${t.seats}${zh?'人':' participant(s)'} · RM${t.amount}`;
  window.renderBookingSummary(summary,s,t,zh);
  document.getElementById('booking-id').textContent=(zh?'报名编号：':'Booking reference: ')+reg.slice(-8).toUpperCase();
  document.getElementById('payment-content').hidden=false;
  let submitted=false;try{submitted=sessionStorage.getItem('submitted-'+reg)==='yes';}catch{}
  document.getElementById('registration-status').textContent=submitted?(zh?'报名资料已收到，请完成付款并发送凭证。':'Registration received. Please make payment and send your slip.'):(zh?'请完成付款并发送凭证。':'Please make payment and send your slip.');
  document.getElementById('payment-heading').textContent=zh?`应付总额 RM${t.amount}`:`Total due RM${t.amount}`;
  document.getElementById('payment-reference').textContent=s.id+' / '+reg.slice(-8);
  const correction=(zh?'你好Ronald，我需要修改报名资料：':'Hi Ronald, I need to amend my registration details: ')+s.id+'; '+details+'; '+reg;
  document.getElementById('correction-link').href='https://wa.me/60133083049?text='+encodeURIComponent(correction);
  const slip=(zh?'你好Ronald，这是我的付款凭证，请核对到账及班次：':'Hi Ronald, here is my payment slip. Please verify receipt and session: ')+details+'; '+reg;
  document.getElementById('slip-link').href='https://wa.me/60133083049?text='+encodeURIComponent(slip);
  document.getElementById('email-link').href='mailto:purchasingpoweruser@gmail.com?subject='+encodeURIComponent('Payment slip '+s.id+' '+reg)+'&body='+encodeURIComponent(slip);
  document.querySelectorAll('[data-copy]').forEach(button=>button.addEventListener('click',async()=>{
    const value=document.getElementById(button.dataset.copy).textContent;
    const status=document.getElementById('copy-status'),fallback=document.getElementById('copy-fallback');
    let copied=false;
    try {if(navigator.clipboard?.writeText){await navigator.clipboard.writeText(value);copied=true;}}catch{}
    if(!copied){
      fallback.hidden=false;fallback.value=value;fallback.focus();fallback.select();
      try{copied=document.execCommand('copy');}catch{}
    }
    if(copied){fallback.hidden=true;button.focus();status.textContent=zh?'已复制。':'Copied.';}
    else{status.textContent=zh?'自动复制未成功，请长按下方文字复制。':'Automatic copy was unavailable. Select and copy the text below.';}
  }));
})();
