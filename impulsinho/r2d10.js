(()=>{'use strict';
const key='impulso-r2d10-preferencias';let prefs={sound:true,volume:55,visible:true};try{prefs={...prefs,...JSON.parse(localStorage.getItem(key)||'{}')}}catch{}
const save=()=>{try{localStorage.setItem(key,JSON.stringify(prefs))}catch{}};
let ctx,output,until=0;function unlock(){try{const A=window.AudioContext||window.webkitAudioContext;if(!A)return;if(!ctx){ctx=new A();output=ctx.createGain();output.connect(ctx.destination)}if(ctx.state==='suspended')ctx.resume().catch(()=>{})}catch{}}
window.addEventListener('pointerdown',unlock,{passive:true});window.addEventListener('keydown',unlock);
function voice(text,urgent=false){
 if(!prefs.sound||!ctx||ctx.state!=='running')return;
 try{
  const start=Math.max(ctx.currentTime+.025,until);if(start-ctx.currentTime>2)return;
  output.gain.value=Math.max(0,Math.min(1,Number(prefs.volume)/100))*.30;
  const hash=[...text].reduce((a,c)=>(Math.imul(a,31)+c.charCodeAt(0))>>>0,17);
  const motifs=[[720,1420,1050],[1150,1900,1550],[1600,870,1120],[980,1750,2200],[2050,1350,750],[1250,1250,1850]];
  let t=start;const count=Math.min(9,Math.max(4,Math.ceil(text.length/19)));
  for(let i=0;i<count;i++){
   const h=(hash>>>((i%4)*8))&255;const m=motifs[(h+i+(urgent?2:0))%motifs.length];
   const d=.085+(h%6)*.025;const o=ctx.createOscillator(),g=ctx.createGain();
   o.type='sine';o.frequency.setValueAtTime(m[0],t);o.frequency.exponentialRampToValueAtTime(m[1],t+d*.48);o.frequency.exponentialRampToValueAtTime(m[2],t+d);
   g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(.85,t+.009);g.gain.setValueAtTime(.72,t+d*.68);g.gain.exponentialRampToValueAtTime(.0001,t+d);
   o.connect(g).connect(output);o.start(t);o.stop(t+d+.005);t+=d+(i%3===2?.095:.026);
  }until=t;
 }catch{}
}
const root=document.createElement('aside');root.id='r2d10';root.setAttribute('aria-label','R2D10');root.innerHTML='<section class="r2-panel" hidden><strong>R2D10 · Central operacional</strong><p class="r2-message" role="status" aria-live="polite" aria-atomic="true"></p><div class="r2-actions"></div><button type="button" class="r2-close">Entendi</button></section><button type="button" class="r2-avatar" aria-expanded="false" aria-label="Abrir avisos do R2D10"><img src="impulsinho/r2d10.webp" alt=""><span class="r2-status">R2D10</span></button>';document.body.append(root);
const panel=root.querySelector('section'),message=root.querySelector('p'),actions=root.querySelector('.r2-actions'),avatar=root.querySelector('.r2-avatar'),status=root.querySelector('.r2-status');let active=[],current=null,queue=[];
function open(v){panel.hidden=!v;avatar.setAttribute('aria-expanded',String(v));refresh()}
function refresh(){status.textContent=active.length?active.map(a=>(a.paused?'⏸ ':'● ')+a.label).join(' · '):'R2D10';root.hidden=!prefs.visible&&panel.hidden&&!active.length&&!queue.length;}
function show(item){current=item;message.textContent=item.text;actions.replaceChildren();for(const [label,fn] of item.actions||[]){const b=document.createElement('button');b.type='button';b.textContent=label;b.onclick=()=>{fn();dismiss()};actions.append(b)}open(true);voice(item.text,item.urgent)}
function notify(item){if(panel.hidden)show(item);else{if(!queue.some(x=>x.key===item.key)){queue.push(item);if(queue.length>12)queue.shift()}refresh()}}
function dismiss(){current=null;if(queue.length)show(queue.shift());else open(false)}
root.querySelector('.r2-close').onclick=dismiss;avatar.onclick=()=>{if(!panel.hidden){open(false);return}if(queue.length){show(queue.shift());return}show({text:active.length?'Monitoramento: '+active.map(a=>a.label+(a.paused?' em pausa':' em andamento')).join(', ')+'.':'Sistemas operacionais. Nenhuma atividade em andamento.',actions:active.map(a=>['Abrir '+a.label,()=>go(a.page)])})};
const go=pagina=>window.dispatchEvent(new CustomEvent('impulsinho:ir-para',{detail:{pagina}}));
let signature=null;function activity(list){list=Array.isArray(list)?list:list?[list]:[];const next=JSON.stringify(list);if(next===signature)return;const old=active;active=list;signature=next;refresh();if(list.length||old.length)notify({key:'activity:'+next,text:list.length?'Monitoramento atualizado: '+list.map(a=>a.label+(a.paused?' em pausa':' em andamento')).join(', ')+'.':'Monitoramento encerrado. Nenhuma atividade em andamento.',actions:list.map(a=>['Abrir '+a.label,()=>go(a.page)])})}
window.addEventListener('impulso:r2-atividade',e=>activity(e.detail));
window.addEventListener('impulsinho:lembrete',e=>{const b=e.detail.kind==='backup';notify({key:e.detail.kind,urgent:b,text:b?'Alerta de backup. Os dados do navegador podem ser apagados. Guarde uma cópia externa dos projetos e registros.':'Alerta de hábitos e Elixires. Conclua um hábito para liberar as recompensas disponíveis.',actions:[[b?'Salvar':'Ir para Hábitos',()=>b?window.dispatchEvent(new CustomEvent('impulsinho:guardar-backup')):go('habitos')]]})});
let pending=false;window.addEventListener('impulsinho:arquivo',e=>{const next=!!e.detail.pendente;if(next&&!pending)notify({key:'arquivo',text:'Há alterações pendentes no arquivo externo. Confira o Backup Geral.',actions:[['Salvar',()=>window.dispatchEvent(new CustomEvent('impulsinho:guardar-backup'))]]});pending=next});
function mount(){const el=document.querySelector('#r2-settings');if(!el||el.dataset.ready)return;el.dataset.ready='1';el.innerHTML='<fieldset><legend>Presença e voz robótica</legend><label><input type="checkbox" data-pref="visible"> Manter R2D10 visível mesmo sem atividades ou alertas</label><label><input type="checkbox" data-pref="sound"> Sons de fala robótica</label><label>Volume da voz <input type="range" min="0" max="100" step="5" data-pref="volume"></label><button type="button" class="btn">Testar voz robótica</button><p class="help">Desmarque para ocultar o robô quando não houver atividade nem aviso aberto ou na fila. O navegador pode exigir um toque antes de liberar o áudio.</p></fieldset>';for(const input of el.querySelectorAll('input')){const k=input.dataset.pref;if(k==='volume')input.value=prefs[k];else input.checked=prefs[k];input.oninput=()=>{prefs[k]=k==='volume'?Number(input.value):input.checked;save();refresh()}}el.querySelector('button').onclick=()=>{unlock();setTimeout(()=>voice('Protocolo de comunicação robótica operacional. R2D10 pronto.'),100)}}
window.addEventListener('impulsinho:navegacao',()=>queueMicrotask(mount));mount();activity(window.R2D10Atividades?.()||[]);refresh();
})();
