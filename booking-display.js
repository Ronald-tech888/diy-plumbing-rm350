window.renderBookingSummary = function(node,s,t,zh){
  node.replaceChildren();
  const date=s?new Intl.DateTimeFormat(zh?'zh-CN':'en-GB',{day:'numeric',month:zh?'numeric':'short',year:'numeric',timeZone:'UTC'}).format(new Date(s.date+'T00:00:00Z')):(zh?'请选择日期':'Choose a date');
  const ticket=t?(zh?{standard:'单人票',early:'早鸟票',buddy:'双人同行'}[t.key]:{standard:'Standard',early:'Early Bird',buddy:'Buddy Pass'}[t.key]):(zh?'请选择票种':'Choose a ticket');
  const dl=document.createElement('dl');
  for(const [label,value] of [[zh?'日期':'Date',date],[zh?'授课语言':'Class language',s?(s.id.endsWith('ZH')?(zh?'中文班':'Mandarin'):(zh?'英文班':'English')):(zh?'—':'—')],[zh?'时间（马来西亚）':'Time (Malaysia)',s?s.time:'—'],[zh?'票种与人数':'Ticket & participants',ticket+(t?` · ${t.seats}${zh?'人':' pax'}`:'')]]){
    const wrapper=document.createElement('div'),dt=document.createElement('dt'),dd=document.createElement('dd');dt.textContent=label;dd.textContent=value;wrapper.append(dt,dd);dl.append(wrapper);
  }
  const total=document.createElement('div');total.className='order-total';const label=document.createElement('span');label.textContent=zh?'应付总额':'Total due';const amount=document.createElement('strong');amount.textContent=t?'RM'+t.amount:'—';total.append(label,amount);node.append(dl,total);
};
