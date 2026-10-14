// Keep shared storage intact while avoiding a regular-project resume link in this entrypoint.
(() => {
  const shared=window.bookingMemory;
  if(!shared)return;
  window.bookingMemory={save:shared.save,show(node,zh){
    shared.show(node,zh);
    const link=node?.querySelector('a');
    if(link && !window.PARENT_CHILD_SESSION_IDS.includes(new URL(link.href,location.href).searchParams.get('session'))){node.replaceChildren();node.hidden=true;}
  }};
})();
