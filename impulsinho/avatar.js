/* Impulsinho v110 — Etapa 4: eventos, prioridades e mensagens contextuais. */
(()=>{'use strict';
const KEY='impulsinho-avatar-v108',DEFAULT='impulsinho/facetas/emoji_u1f9d0_3d.webp';
let pref={visivel:true,silenciado:false,flutuar:true,x:null,y:null};
try{const saved=JSON.parse(localStorage.getItem(KEY)||'null');if(saved&&typeof saved==='object')pref={...pref,...saved}}catch{}
const root=document.createElement('div');root.id='impulsinho-root';root.setAttribute('aria-label','Assistente Impulsinho');
root.innerHTML=`<button type="button" class="impulsinho-avatar" id="impulsinho-avatar" aria-label="Conversar com o Impulsinho" aria-expanded="false" aria-controls="impulsinho-balao"><img src="${DEFAULT}" alt="" draggable="false"></button><section class="impulsinho-balao" id="impulsinho-balao" aria-label="Conversa com o Impulsinho" hidden><h2>Olá! Sou o Impulsinho! 🧐</h2><p id="impulsinho-mensagem">Estou conhecendo o Impulso. Você pode me arrastar pela tela e escolher como apareço. Minhas dicas inteligentes chegarão nas próximas etapas!</p><div class="impulsinho-acoes"><button type="button" data-acao="silenciar">Silenciar</button><button type="button" data-acao="ocultar">Ocultar</button><button type="button" data-acao="configurar">Configurar</button><button type="button" data-acao="expressoes">Expressões</button><button type="button" data-acao="fechar">Fechar</button></div><div id="impulsinho-expressoes" hidden><label for="impulsinho-familia">Família emocional</label><select id="impulsinho-familia"><option value="todas">Todas as expressões</option><option value="alegria">Alegria</option><option value="curiosidade">Curiosidade</option><option value="surpresa">Surpresa</option><option value="desafio">Desafio</option><option value="preocupacao">Preocupação</option><option value="descanso">Descanso</option><option value="humor">Humor</option><option value="cuidado">Cuidado</option></select><p id="impulsinho-faceta-info" aria-live="polite">Carregando facetas...</p><div class="impulsinho-acoes"><button type="button" data-acao="anterior">◀ Anterior</button><button type="button" data-acao="proxima">Próxima ▶</button><button type="button" data-acao="aleatoria">Surpreenda-me</button></div><label for="impulsinho-auto"><input type="checkbox" id="impulsinho-auto"> Alternar expressões suavemente</label></div><div id="impulsinho-config" hidden><label for="impulsinho-movimento">Animação</label><select id="impulsinho-movimento"><option value="sim">Flutuação suave</option><option value="nao">Sem movimento</option></select><p>Áudio: o controle de silêncio já está disponível; os sons serão adicionados em uma etapa futura.</p></div></section><button type="button" class="impulsinho-reabrir" id="impulsinho-reabrir" hidden aria-label="Mostrar Impulsinho">🧐 Mostrar Impulsinho</button>`;
document.body.append(root);
const avatar=root.querySelector('#impulsinho-avatar'),balloon=root.querySelector('#impulsinho-balao'),reopen=root.querySelector('#impulsinho-reabrir'),config=root.querySelector('#impulsinho-config'),motion=root.querySelector('#impulsinho-movimento'),silence=root.querySelector('[data-acao="silenciar"]');
const facePanel=root.querySelector('#impulsinho-expressoes'),family=root.querySelector('#impulsinho-familia'),info=root.querySelector('#impulsinho-faceta-info'),auto=root.querySelector('#impulsinho-auto');
let faces=[],current=0,lastFace=-1,autoTimer=null;
const message=root.querySelector('#impulsinho-mensagem');
const headline=balloon.querySelector('h2');
const faceImage=avatar.querySelector('img');
function faceList(){return faces.filter(f=>family.value==='todas'||(f.contextos||[]).includes(family.value))}
function showFace(index){const list=faceList();if(!list.length)return;current=(index%list.length+list.length)%list.length;const f=list[current];faceImage.src=f.arquivo;faceImage.alt='';avatar.setAttribute('aria-label','Conversar com o Impulsinho — '+f.emocao);info.textContent=`${current+1} de ${list.length} · ${f.unicode} · ${f.emocao} · intensidade ${f.intensidade}/2`;lastFace=faces.indexOf(f)}
function nextFace(step=1){showFace(current+step)}
function randomFace(){const list=faceList();if(!list.length)return;const offset=list.length>1?1+Math.floor(Math.random()*(list.length-1)):0;showFace(current+offset)}
// Eventos reais, sem regravar os dados do Impulso e sem fabricar estatísticas.
const EVENTS_KEY='impulsinho-eventos-v110';
let eventState={seen:{},lastSpoken:0,lastProject:null,queue:[]};
try{const v=JSON.parse(localStorage.getItem(EVENTS_KEY)||'null');if(v&&typeof v==='object')eventState={...eventState,...v,queue:[]}}catch{}
const persistEvents=()=>{try{localStorage.setItem(EVENTS_KEY,JSON.stringify({seen:eventState.seen,lastSpoken:eventState.lastSpoken,lastProject:eventState.lastProject}))}catch{}};
const eventQueue=[];
let eventTimer=null;
const DAY=86400000, MIN_GAP=90000;
const emotionalFace={alegria:'1f973',surpresa:'1f62e',curiosidade:'1f9d0',preocupacao:'1f628',desafio:'1f620',cuidado:'1f642'};
function express(emotion){if(!faces.length)return;const id=emotionalFace[emotion]||emotionalFace.curiosidade;const match=faces.find(f=>f.id===id);if(!match)return;const list=faceList();const i=list.indexOf(match);if(i>=0)showFace(i);else{faceImage.src=match.arquivo;avatar.setAttribute('aria-label','Conversar com o Impulsinho — '+match.emocao)}}
function snapshot(){try{return window.Impulsinho?.consultar?.()||null}catch{return null}}
function alertPrefs(){try{const p=JSON.parse(localStorage.getItem('impulso-alertas-v1')||'null');return {backup:p?.backup===true,habits:p?.habits===true}}catch{return {backup:false,habits:false}}}
function isBusy(){return document.hidden||!pref.visivel||!balloon.hidden||document.querySelector('dialog[open]')!==null||document.activeElement?.matches('input,textarea,select,[contenteditable="true"]')||['foco','ponto'].includes(snapshot()?.pagina)}
function speak(event){headline.textContent=event.title;message.textContent=event.text;express(event.emotion);opened(true);eventState.lastSpoken=Date.now();eventState.seen[event.key]=Date.now();persistEvents()}
function enqueue(event){if(!event||eventState.seen[event.key]||eventQueue.some(x=>x.key===event.key))return;eventQueue.push(event);eventQueue.sort((a,b)=>b.priority-a.priority);if(eventQueue.length>12)eventQueue.length=12;dispatch()}
function dispatch(){if(isBusy()||!eventQueue.length)return;const now=Date.now();const next=eventQueue[0];if(next.priority<3&&now-eventState.lastSpoken<MIN_GAP)return;eventQueue.shift();speak(next)}
function notice(key,title,text,emotion='curiosidade',priority=1){enqueue({key,title,text,emotion,priority})}
function evaluate(kind){const s=snapshot();if(!s)return;const p=s.projeto,projectKey=p?.id||'sem-projeto',today=new Date().toLocaleDateString('en-CA');
 if(p&&eventState.lastProject!==p.id){eventState.lastProject=p.id;persistEvents();notice('projeto:'+p.id+':'+today,'Impulsinho de olho!','Projeto ativo: '+p.nome+'. Estou acompanhando os acontecimentos daqui, sem alterar seus registros.','curiosidade',1)}
 if(kind==='dados'&&p){
  const hours=Math.floor(p.tempoMs/3600000);for(const milestone of [1,5,10,25,50,100,250,500,1000])if(hours>=milestone)notice('horas:'+p.id+':'+milestone,'Marco de produtividade!','Este projeto já registrou pelo menos '+milestone+' hora'+(milestone===1?'':'s')+' de trabalho. Parabéns pela conquista!','alegria',2);
  if(p.chefoesDerrotados>0)notice('arena:'+p.id+':'+p.chefoesDerrotados,'Vitória na Arena!','O projeto registra '+p.chefoesDerrotados+' chefão'+(p.chefoesDerrotados===1?' derrotado':'s derrotados')+'.','desafio',2);
 }
 const alerts=alertPrefs();
 if(alerts.backup&&s.backupPendente)notice('backup:'+projectKey+':'+today,'Backup Geral pendente','Há alterações que ainda não foram confirmadas no arquivo externo. Atualize o Backup Geral quando for conveniente.','preocupacao',3);
 if(alerts.habits&&p&&p.chefoesDerrotados>0)notice('elixir:'+projectKey+':'+today,'Hábitos e Elixires','Lembre-se: concluir hábitos ajuda a liberar os Elixires associados às vitórias na Arena. Confira a seção de Elixires.','cuidado',1);
}
window.addEventListener('impulsinho:dados-alterados',()=>evaluate('dados'));
window.addEventListener('impulsinho:navegacao',()=>evaluate('navegacao'));
document.addEventListener('visibilitychange',()=>{if(!document.hidden)dispatch()});
eventTimer=setInterval(()=>{dispatch();if(!document.hidden)evaluate('periodico')},30000);
// Consulta manual, sem iniciar automaticamente uma conversa.
const statusButton=document.createElement('button');statusButton.type='button';statusButton.textContent='Ver avisos';statusButton.dataset.acao='avisos';balloon.querySelector('.impulsinho-acoes').prepend(statusButton);
function manualStatus(){const s=snapshot(),p=s?.projeto,alerts=alertPrefs();let lines=[];if(p)lines.push('Projeto: '+p.nome+'.');else lines.push('Nenhum projeto ativo.');if(s?.backupPendente)lines.push('Arquivo externo com alterações pendentes.');if(alerts.backup)lines.push('Alerta de backup ativado.');if(alerts.habits)lines.push('Alerta de hábitos e Elixires ativado.');lines.push(eventQueue.length+' aviso(s) na fila.');headline.textContent='Situação do Impulso';message.textContent=lines.join(' ');express('curiosidade');opened(true)}

function scheduleAuto(){if(autoTimer)clearInterval(autoTimer);autoTimer=null;if(auto.checked&&pref.visivel){autoTimer=setInterval(()=>{if(!document.hidden&&balloon.hidden&&pref.visivel)randomFace()},20000)}}
fetch('impulsinho/catalogo.json?v=109').then(res=>{if(!res.ok)throw Error('Catálogo indisponível');return res.json()}).then(data=>{faces=(data.facetas||[]).filter(f=>f.arquivo&&f.emocao);if(faces.length!==109)throw Error('Catálogo incompleto');showFace(Math.max(0,faces.findIndex(f=>f.id==='1f9d0')));info.textContent='109 expressões prontas. Use os controles para explorá-las.'}).catch(()=>{info.textContent='Não foi possível carregar o catálogo de expressões. Verifique os arquivos e atualize a página.'});
family.addEventListener('change',()=>showFace(0));auto.addEventListener('change',()=>{try{localStorage.setItem('impulsinho-auto-v109',auto.checked?'1':'0')}catch{}scheduleAuto()});
try{auto.checked=localStorage.getItem('impulsinho-auto-v109')==='1'}catch{}
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(pref))}catch{}};
const clamp=(n,a,b)=>Math.max(a,Math.min(n,b));
function position(){const size=avatar.getBoundingClientRect().width||78;pref.x=clamp(Number.isFinite(pref.x)?pref.x:innerWidth-size-14,8,Math.max(8,innerWidth-size-8));pref.y=clamp(Number.isFinite(pref.y)?pref.y:innerHeight-size-90,8,Math.max(8,innerHeight-size-8));avatar.style.left=pref.x+'px';avatar.style.top=pref.y+'px';if(!balloon.hidden){const width=Math.min(310,innerWidth-24),height=balloon.getBoundingClientRect().height;let left=clamp(pref.x+size/2-width/2,12,Math.max(12,innerWidth-width-12));let top=pref.y-height-10;if(top<12)top=Math.min(innerHeight-height-12,pref.y+size+10);balloon.style.left=left+'px';balloon.style.top=clamp(top,12,Math.max(12,innerHeight-height-12))+'px'}}
function opened(v){balloon.hidden=!v;avatar.setAttribute('aria-expanded',String(v));if(v)requestAnimationFrame(position)}
function visible(v){pref.visivel=v;avatar.hidden=!v;avatar.style.display=v?'':'none';reopen.hidden=v;opened(false);save();scheduleAuto()}
function sync(){silence.textContent=pref.silenciado?'Ativar áudio':'Silenciar';motion.value=pref.flutuar?'sim':'nao';avatar.querySelector('img').style.animationPlayState=pref.flutuar?'running':'paused';visible(pref.visivel);position()}
let drag=null,lastDragEnd=0;
avatar.addEventListener('pointerdown',e=>{if(e.button!==0)return;drag={id:e.pointerId,startX:e.clientX,startY:e.clientY,x:pref.x,y:pref.y,moved:false};avatar.setPointerCapture(e.pointerId)});
avatar.addEventListener('pointermove',e=>{if(!drag||e.pointerId!==drag.id)return;const dx=e.clientX-drag.startX,dy=e.clientY-drag.startY;if(Math.hypot(dx,dy)>7)drag.moved=true;if(drag.moved){pref.x=drag.x+dx;pref.y=drag.y+dy;position()}});
avatar.addEventListener('pointerup',e=>{if(!drag||e.pointerId!==drag.id)return;const moved=drag.moved;drag=null;if(moved){save();lastDragEnd=performance.now()}});
avatar.addEventListener('pointercancel',()=>{drag=null;save()});
avatar.addEventListener('click',()=>{if(performance.now()-lastDragEnd<350)return;opened(balloon.hidden)});
root.addEventListener('click',e=>{const action=e.target.closest('[data-acao]')?.dataset.acao;if(!action)return;if(action==='avisos')manualStatus();if(action==='fechar'){opened(false);setTimeout(dispatch,250)}if(action==='ocultar')visible(false);if(action==='silenciar'){pref.silenciado=!pref.silenciado;silence.textContent=pref.silenciado?'Ativar áudio':'Silenciar';save()}if(action==='configurar'){config.hidden=!config.hidden;requestAnimationFrame(position)}if(action==='expressoes'){facePanel.hidden=!facePanel.hidden;requestAnimationFrame(position)}if(action==='anterior')nextFace(-1);if(action==='proxima')nextFace(1);if(action==='aleatoria')randomFace()});
reopen.addEventListener('click',()=>{visible(true);opened(true);avatar.focus()});
motion.addEventListener('change',()=>{pref.flutuar=motion.value==='sim';avatar.querySelector('img').style.animationPlayState=pref.flutuar?'running':'paused';save()});
window.addEventListener('resize',position);window.addEventListener('orientationchange',position);
window.addEventListener('keydown',e=>{if(e.key==='Escape'&&!balloon.hidden){opened(false);avatar.focus()}});
window.addEventListener('impulsinho:navegacao',()=>{if(!balloon.hidden)requestAnimationFrame(position)});
sync();scheduleAuto();setTimeout(()=>evaluate('inicio'),1500);
})();
