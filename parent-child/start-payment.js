// Reuse the unchanged shared payment implementation, only for this project's verified IDs.
(() => {
  const id=new URLSearchParams(location.search).get('session');
  const summary=document.getElementById('booking-summary');
  if(!window.PARENT_CHILD_READY){summary.textContent=window.PARENT_CHILD_ERROR;return;}
  if(id && !window.PARENT_CHILD_SESSION_IDS.includes(id)){
    summary.textContent='This payment page is for the December parent–child sessions. Please use the payment link for your original registration.';return;
  }
  const script=document.createElement('script');script.src='../payment.js';
  script.onerror=()=>{summary.textContent='Payment details could not load. Please contact Ronald to check your original registration.';};
  document.body.append(script);
})();
