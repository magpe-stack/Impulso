/* Impulsinho v108 — Etapa 2: interface visual. Não altera dados dos projetos. */
(()=>{'use strict';
const KEY='impulsinho-avatar-v108',DEFAULT='impulsinho/facetas/emoji_u1f9d0_3d.webp';
let pref={visivel:true,silenciado:false,flutuar:true,x:null,y:null};
try{const saved=JSON.parse(localStorage.getItem(KEY)||'null');if(saved&&typeof saved==='object')pref={...pref,...saved}}catch{}
const root=document.createElement('div');root.id='impulsinho-root';root.setAttribute('aria-label','Assistente Impulsinho');
root.innerHTML=`<button type="button" class="impulsinho-avatar" id="impulsinho-avatar" aria-label="Conversar com o Impulsinho" aria-expanded="false" aria-controls="impulsinho-balao"><img src="${DEFAULT}" alt="" draggable="false"></button><section class="impulsinho-balao" id="impulsinho-balao" aria-label="Conversa com o Impulsinho" hidden><h2>Olá! Sou o Impulsinho! 🧐</h2><p id="impulsinho-mensagem">Estou conhecendo o Impulso. Você pode me arrastar pela tela e escolher como apareço. Minhas dicas inteligentes chegarão nas próximas etapas!</p><div class="impulsinho-acoes"><button type="button" data-acao="silenciar">Silenciar</button><button type="button" data-acao="ocultar">Ocultar</button><button type="button" data-acao="configurar">Configurar</button><button type="button" data-acao="fechar">Fechar</button></div><div id="impulsinho-config" hidden><label for="impulsinho-movimento">Animação</label><select id="impulsinho-movimento"><option value="sim">Flutuação suave</option><option value="nao">Sem movimento</option></select><p>Áudio: o controle de silêncio já está disponível; os sons serão adicionados em uma etapa futura.</p></div></section><button type="button" class="impulsinho-reabrir" id="impulsinho-reabrir" hidden aria-label="Mostrar Impulsinho">🧐 Mostrar Impulsinho</button>`;
document.body.append(root);
const avatar=root.querySelector('#impulsinho-avatar'),balloon=root.querySelector('#impulsinho-balao'),reopen=root.querySelector('#impulsinho-reabrir'),config=root.querySelector('#impulsinho-config'),motion=root.querySelector('#impulsinho-movimento'),silence=root.querySelector('[data-acao="silenciar"]');
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(pref))}catch{}};
const clamp=(n,a,b)=>Math.max(a,Math.min(n,b));
function position(){const size=avatar.getBoundingClientRect().width||78;pref.x=clamp(Number.isFinite(pref.x)?pref.x:innerWidth-size-14,8,Math.max(8,innerWidth-size-8));pref.y=clamp(Number.isFinite(pref.y)?pref.y:innerHeight-size-90,8,Math.max(8,innerHeight-size-8));avatar.style.left=pref.x+'px';avatar.style.top=pref.y+'px';if(!balloon.hidden){const width=Math.min(310,innerWidth-24),height=balloon.getBoundingClientRect().height;let left=clamp(pref.x+size/2-width/2,12,Math.max(12,innerWidth-width-12));let top=pref.y-height-10;if(top<12)top=Math.min(innerHeight-height-12,pref.y+size+10);balloon.style.left=left+'px';balloon.style.top=clamp(top,12,Math.max(12,innerHeight-height-12))+'px'}}
function opened(v){balloon.hidden=!v;avatar.setAttribute('aria-expanded',String(v));if(v)requestAnimationFrame(position)}
function visible(v){pref.visivel=v;avatar.hidden=!v;avatar.style.display=v?'':'none';reopen.hidden=v;opened(false);save()}
function sync(){silence.textContent=pref.silenciado?'Ativar áudio':'Silenciar';motion.value=pref.flutuar?'sim':'nao';avatar.querySelector('img').style.animationPlayState=pref.flutuar?'running':'paused';visible(pref.visivel);position()}
let drag=null,lastDragEnd=0;
avatar.addEventListener('pointerdown',e=>{if(e.button!==0)return;drag={id:e.pointerId,startX:e.clientX,startY:e.clientY,x:pref.x,y:pref.y,moved:false};avatar.setPointerCapture(e.pointerId)});
avatar.addEventListener('pointermove',e=>{if(!drag||e.pointerId!==drag.id)return;const dx=e.clientX-drag.startX,dy=e.clientY-drag.startY;if(Math.hypot(dx,dy)>7)drag.moved=true;if(drag.moved){pref.x=drag.x+dx;pref.y=drag.y+dy;position()}});
avatar.addEventListener('pointerup',e=>{if(!drag||e.pointerId!==drag.id)return;const moved=drag.moved;drag=null;if(moved){save();lastDragEnd=performance.now()}});
avatar.addEventListener('pointercancel',()=>{drag=null;save()});
avatar.addEventListener('click',()=>{if(performance.now()-lastDragEnd<350)return;opened(balloon.hidden)});
root.addEventListener('click',e=>{const action=e.target.closest('[data-acao]')?.dataset.acao;if(!action)return;if(action==='fechar')opened(false);if(action==='ocultar')visible(false);if(action==='silenciar'){pref.silenciado=!pref.silenciado;silence.textContent=pref.silenciado?'Ativar áudio':'Silenciar';save()}if(action==='configurar'){config.hidden=!config.hidden;requestAnimationFrame(position)}});
reopen.addEventListener('click',()=>{visible(true);opened(true);avatar.focus()});
motion.addEventListener('change',()=>{pref.flutuar=motion.value==='sim';avatar.querySelector('img').style.animationPlayState=pref.flutuar?'running':'paused';save()});
window.addEventListener('resize',position);window.addEventListener('orientationchange',position);
window.addEventListener('keydown',e=>{if(e.key==='Escape'&&!balloon.hidden){opened(false);avatar.focus()}});
window.addEventListener('impulsinho:navegacao',()=>{if(!balloon.hidden)requestAnimationFrame(position)});
sync();
})();
