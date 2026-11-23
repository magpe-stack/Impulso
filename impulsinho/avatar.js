/* Impulsinho v113 — Etapa 7: balões de fala e painel de perguntas independentes. */
(()=>{'use strict';
const KEY='impulsinho-avatar-v108',DEFAULT='impulsinho/facetas/emoji_u1f9d0_3d.webp';
let pref={visivel:true,silenciado:false,flutuar:true,x:null,y:null};
try{const saved=JSON.parse(localStorage.getItem(KEY)||'null');if(saved&&typeof saved==='object')pref={...pref,...saved}}catch{}
const root=document.createElement('div');root.id='impulsinho-root';root.setAttribute('aria-label','Assistente Impulsinho');
root.innerHTML=`<button type="button" class="impulsinho-avatar" id="impulsinho-avatar" aria-label="Conversar com o Impulsinho" aria-expanded="false" aria-controls="impulsinho-balao"><img src="${DEFAULT}" alt="" draggable="false"></button><section class="impulsinho-balao" id="impulsinho-balao" aria-label="Conversa com o Impulsinho" hidden><h2>Olá! Sou o Impulsinho! 🧐</h2><p id="impulsinho-mensagem">Estou conhecendo o Impulso. Você pode me arrastar pela tela e escolher como apareço. Minhas dicas inteligentes chegarão nas próximas etapas!</p><div class="impulsinho-acoes"><button type="button" data-acao="estatisticas">Meu projeto</button><button type="button" data-acao="ajustes">⚙ Ajustes</button><button type="button" data-acao="fechar">Fechar</button></div><div id="impulsinho-expressoes" hidden><label for="impulsinho-familia">Família emocional</label><select id="impulsinho-familia"><option value="todas">Todas as expressões</option><option value="alegria">Alegria</option><option value="curiosidade">Curiosidade</option><option value="surpresa">Surpresa</option><option value="desafio">Desafio</option><option value="preocupacao">Preocupação</option><option value="descanso">Descanso</option><option value="humor">Humor</option><option value="cuidado">Cuidado</option></select><p id="impulsinho-faceta-info" aria-live="polite">Carregando facetas...</p><div class="impulsinho-acoes"><button type="button" data-acao="anterior">◀ Anterior</button><button type="button" data-acao="proxima">Próxima ▶</button><button type="button" data-acao="aleatoria">Surpreenda-me</button></div><label for="impulsinho-auto"><input type="checkbox" id="impulsinho-auto"> Alternar expressões suavemente</label></div><div id="impulsinho-config" hidden><label for="impulsinho-movimento">Animação</label><select id="impulsinho-movimento"><option value="sim">Flutuação suave</option><option value="nao">Sem movimento</option></select><p>Áudio: o controle de silêncio já está disponível; os sons serão adicionados em uma etapa futura.</p></div></section><button type="button" class="impulsinho-reabrir" id="impulsinho-reabrir" hidden aria-label="Mostrar Impulsinho">🧐 Mostrar Impulsinho</button>`;
document.body.append(root);
const avatar=root.querySelector('#impulsinho-avatar'),balloon=root.querySelector('#impulsinho-balao'),reopen=root.querySelector('#impulsinho-reabrir'),config=root.querySelector('#impulsinho-config'),motion=root.querySelector('#impulsinho-movimento'),silence=root.querySelector('[data-acao="silenciar"]');
const facePanel=root.querySelector('#impulsinho-expressoes'),family=root.querySelector('#impulsinho-familia'),info=root.querySelector('#impulsinho-faceta-info'),auto=root.querySelector('#impulsinho-auto');
config.remove();
let faces=[],current=0,lastFace=-1,autoTimer=null;
const message=root.querySelector('#impulsinho-mensagem');
const settingsKey='impulsinho-config-v112';let behavior={modo:'ambos'};try{behavior={...behavior,...JSON.parse(localStorage.getItem(settingsKey)||'{}')}}catch{}
const persistBehavior=()=>{try{localStorage.setItem(settingsKey,JSON.stringify(behavior))}catch{}};
const configHost=document.createElement('section');configHost.className='impulsinho-configuracoes';configHost.innerHTML=`<h3>Controles do Impulsinho</h3><p class="help">Escolha quando o Impulsinho pode abrir conversas. No modo Ambos, avisos de alertas ativados e ações importantes são obrigatórios.</p><fieldset><legend>Abertura dos balões</legend><label><input type="radio" name="impulsinhoModo" value="espontaneo"> Espontaneamente</label><label><input type="radio" name="impulsinhoModo" value="clique"> Somente quando eu clicar</label><label><input type="radio" name="impulsinhoModo" value="ambos"> Ambos (avisos de alertas e ações obrigatórios)</label></fieldset><label><input type="checkbox" id="impulsinhoVisivel"> Exibir personagem</label><label><input type="checkbox" id="impulsinhoSilencio"> Silenciar efeitos do Impulsinho</label><label><input type="checkbox" id="impulsinhoFlutuar"> Flutuação suave</label><label><input type="checkbox" id="impulsinhoAlternar"> Alternar expressões automaticamente</label><button type="button" class="btn" id="impulsinhoExpressoesBtn">Explorar as 109 expressões</button><div id="impulsinhoFacetasConfig"></div><p class="help">A síntese de áudio será adicionada em uma etapa futura. Silenciar já guarda a preferência.</p>`;
const settingsTarget=configHost.querySelector('#impulsinhoFacetasConfig');settingsTarget.append(facePanel);facePanel.hidden=true;
function mountSettings(){const target=document.querySelector('[data-settings-section="impulsinho"] .settings-accordion-body');if(!target)return;target.replaceChildren(configHost);syncSettings()}
function syncSettings(){configHost.querySelectorAll('input[name="impulsinhoModo"]').forEach(x=>x.checked=x.value===behavior.modo);configHost.querySelector('#impulsinhoVisivel').checked=pref.visivel;configHost.querySelector('#impulsinhoSilencio').checked=pref.silenciado;configHost.querySelector('#impulsinhoFlutuar').checked=pref.flutuar;configHost.querySelector('#impulsinhoAlternar').checked=auto.checked}
configHost.addEventListener('change',e=>{const t=e.target;if(t.name==='impulsinhoModo'){behavior.modo=t.value;persistBehavior();if(t.value==='clique')eventQueue.length=0}if(t.id==='impulsinhoVisivel')visible(t.checked);if(t.id==='impulsinhoSilencio'){pref.silenciado=t.checked;save()}if(t.id==='impulsinhoFlutuar'){pref.flutuar=t.checked;avatar.querySelector('img').style.animationPlayState=t.checked?'running':'paused';save()}if(t.id==='impulsinhoAlternar'){auto.checked=t.checked;auto.dispatchEvent(new Event('change'))}});
configHost.querySelector('#impulsinhoExpressoesBtn').addEventListener('click',()=>{facePanel.hidden=!facePanel.hidden});
window.addEventListener('impulsinho:navegacao',()=>queueMicrotask(mountSettings));
// O balão principal contém exclusivamente o texto do Impulsinho.
// O segundo balão contém apenas os comandos/perguntas do usuário.
const questionButton=document.createElement('button');
questionButton.type='button';questionButton.id='impulsinho-perguntas-toggle';
questionButton.className='impulsinho-perguntas-toggle';questionButton.textContent='☰';
questionButton.title='Perguntar ao Impulsinho';questionButton.setAttribute('aria-label','Abrir perguntas para o Impulsinho');
questionButton.setAttribute('aria-expanded','false');questionButton.setAttribute('aria-controls','impulsinho-perguntas');
const questions=document.createElement('section');questions.id='impulsinho-perguntas';questions.className='impulsinho-perguntas';questions.hidden=true;
questions.setAttribute('aria-label','Perguntas e ações para o Impulsinho');
const qTitle=document.createElement('h2');qTitle.textContent='O que você quer perguntar?';questions.append(qTitle);
const actions=balloon.querySelector('.impulsinho-acoes');
questions.append(actions);
root.append(questionButton,questions);
// O seletor de expressões já pertence às Configurações.
function questionsOpen(value){questions.hidden=!value;questionButton.setAttribute('aria-expanded',String(value));if(value)requestAnimationFrame(position)}
const headline=balloon.querySelector('h2');
const achievementsButton=document.createElement('button');achievementsButton.type='button';achievementsButton.dataset.acao='conquistas';achievementsButton.textContent='Conquistas';actions.prepend(achievementsButton);
const achievementsPanel=document.createElement('section');achievementsPanel.id='impulsinho-conquistas';achievementsPanel.hidden=true;achievementsPanel.setAttribute('aria-label','Conquistas não consultadas');questions.append(achievementsPanel);
const backupAction=document.createElement('button');backupAction.type='button';backupAction.dataset.acao='backup';backupAction.textContent='Atualizar Backup Geral';backupAction.hidden=true;actions.prepend(backupAction);
const countIndicator=document.createElement('span');countIndicator.className='impulsinho-contador';countIndicator.hidden=true;avatar.append(countIndicator);
function listAchievements(){try{return window.ImpulsinhoNovidades?.listar?.()||[]}catch{return []}}
function updateAchievements(){const list=listAchievements();countIndicator.hidden=!list.length;countIndicator.textContent=list.length>99?'99+':String(list.length);avatar.setAttribute('aria-label',list.length?`Conversar com o Impulsinho; ${list.length} conquistas não consultadas`:'Conversar com o Impulsinho');if(!achievementsPanel.hidden)renderAchievements();return list}
function renderAchievements(){const list=listAchievements();achievementsPanel.replaceChildren();const heading=document.createElement('h3');heading.textContent='Novidades e conquistas';achievementsPanel.append(heading);if(!list.length){const p=document.createElement('p');p.textContent='Nenhuma conquista pendente.';achievementsPanel.append(p);return}const ul=document.createElement('ul');ul.className='impulsinho-lista';for(const item of list.slice(0,100)){const li=document.createElement('li'),b=document.createElement('button');b.type='button';b.textContent=`${item.icon||'🏅'} ${item.title}: ${item.detail} — ${item.projectName}`;b.addEventListener('click',()=>{if(window.ImpulsinhoNovidades?.abrir?.(item.projectId,item.id)){updateAchievements();opened(false)}});li.append(b);ul.append(li)}achievementsPanel.append(ul);if(list.length>100){const p=document.createElement('p');p.textContent='Exibindo as primeiras 100 novidades.';achievementsPanel.append(p)}}
function updateBackupAction(){backupAction.hidden=!snapshot()?.backupPendente}
window.addEventListener('impulsinho:novidades',updateAchievements);
window.addEventListener('impulsinho:arquivo',updateBackupAction);

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
function isBusy(){return behavior.modo==='clique'||document.hidden||!pref.visivel||!balloon.hidden||document.querySelector('dialog[open]')!==null||document.activeElement?.matches('input,textarea,select,[contenteditable="true"]')||['foco','ponto'].includes(snapshot()?.pagina)}
const FALAS={
 projeto:["Estou acompanhando o projeto {nome}.","Projeto {nome} aberto. Pronto para conferir seu progresso!","Vamos cuidar do progresso de {nome} com atenção."],
 backup:["Há alterações ainda não confirmadas no arquivo externo. Que tal atualizar o Backup Geral?","Seu Backup Geral precisa de atenção: existem mudanças pendentes.","Uma dica de segurança: confirme o Backup Geral antes de encerrar o trabalho."],
 elixir:["Os Elixires são liberados com hábitos concluídos. Que tal conferir a coleção?","Uma vitória na Arena pode render um Elixir. Confira os hábitos disponíveis.","Lembre-se dos hábitos: eles ajudam a abrir os cofres de Elixires."],
 conquista:["Mais um marco registrado! Vamos comemorar?","Uma conquista merece reconhecimento. Excelente progresso!","A Arena tem novidades para você. Vamos conferir?"],
 atalhos:["Uma dica: consulte os atalhos de teclado do Impulso para navegar mais rápido.","Você sabia que o Impulso tem atalhos de teclado? Veja a seção de atalhos no Manual.","Dica rápida: os atalhos de teclado estão documentados no Manual do Impulso."],
 geral:["Estou por aqui quando quiser consultar seu projeto.","Pode me perguntar sobre as estatísticas reais do projeto.","Os dados do seu projeto ficam no dispositivo. Cuide dos backups!"]
};
let lastPhrase={};
function phrase(group,values={}){const arr=FALAS[group]||FALAS.geral;const previous=lastPhrase[group]??-1;const offset=arr.length>1?1+Math.floor(Math.random()*(arr.length-1)):0;const i=(previous+offset)%arr.length;lastPhrase[group]=i;return arr[i].replace(/\{(\w+)\}/g,(_,k)=>String(values[k]??''))}
function speak(event){headline.textContent=event.title;message.textContent=event.text;express(event.emotion);opened(true);eventState.lastSpoken=Date.now();eventState.seen[event.key]=Date.now();persistEvents()}
function enqueue(event){if(behavior.modo==='clique')return;if(!event||eventState.seen[event.key]||eventQueue.some(x=>x.key===event.key))return;eventQueue.push(event);eventQueue.sort((a,b)=>b.priority-a.priority);if(eventQueue.length>12)eventQueue.length=12;dispatch()}
function dispatch(){if(isBusy()||!eventQueue.length)return;const now=Date.now();const next=eventQueue[0];if(next.priority<3&&now-eventState.lastSpoken<MIN_GAP)return;eventQueue.shift();speak(next)}
function notice(key,title,text,emotion='curiosidade',priority=1){enqueue({key,title,text,emotion,priority})}
function evaluate(kind){const s=snapshot();if(!s)return;const p=s.projeto,projectKey=p?.id||'sem-projeto',today=new Date().toLocaleDateString('en-CA');
 if(p&&eventState.lastProject!==p.id){eventState.lastProject=p.id;persistEvents();notice('projeto:'+p.id+':'+today,'Impulsinho de olho!',phrase('projeto',{nome:p.nome}),'curiosidade',1)}
 if(kind==='dados'&&p){
  const hours=Math.floor(p.tempoMs/3600000);for(const milestone of [1,5,10,25,50,100,250,500,1000])if(hours>=milestone)notice('horas:'+p.id+':'+milestone,'Marco de produtividade!','Este projeto já registrou pelo menos '+milestone+' hora'+(milestone===1?'':'s')+' de trabalho. Parabéns pela conquista!','alegria',2);
  if(p.chefoesDerrotados>0)notice('arena:'+p.id+':'+p.chefoesDerrotados,'Vitória na Arena!','O projeto registra '+p.chefoesDerrotados+' chefão'+(p.chefoesDerrotados===1?' derrotado':'s derrotados')+'.','desafio',2);
 }
 if(p&&kind==='periodico'&&Math.random()<0.07)notice('atalhos:'+projectKey+':'+today,'Dica de teclado',phrase('atalhos'),'curiosidade',1);
 const alerts=alertPrefs();
 if(alerts.backup&&s.backupPendente)notice('backup:'+projectKey+':'+today,'Backup Geral pendente',phrase('backup'),'preocupacao',3);
 if(alerts.habits&&p&&p.chefoesDerrotados>0)notice('elixir:'+projectKey+':'+today,'Hábitos e Elixires',phrase('elixir'),'cuidado',1);
}
window.addEventListener('impulsinho:dados-alterados',()=>evaluate('dados'));
window.addEventListener('impulsinho:navegacao',()=>evaluate('navegacao'));
document.addEventListener('visibilitychange',()=>{if(!document.hidden)dispatch()});
eventTimer=setInterval(()=>{dispatch();if(!document.hidden)evaluate('periodico')},30000);
// Consulta manual, sem iniciar automaticamente uma conversa.
const statusButton=document.createElement('button');statusButton.type='button';statusButton.textContent='Ver avisos';statusButton.dataset.acao='avisos';actions.prepend(statusButton);
function manualStatus(){const s=snapshot(),p=s?.projeto,alerts=alertPrefs();let lines=[];if(p)lines.push('Projeto: '+p.nome+'.');else lines.push('Nenhum projeto ativo.');if(s?.backupPendente)lines.push('Arquivo externo com alterações pendentes.');if(alerts.backup)lines.push('Alerta de backup ativado.');if(alerts.habits)lines.push('Alerta de hábitos e Elixires ativado.');lines.push(eventQueue.length+' aviso(s) na fila.');headline.textContent='Situação do Impulso';message.textContent=lines.join(' ');express('curiosidade');opened(true)}

function manualStats(){const s=snapshot(),p=s?.projeto;headline.textContent='Estatísticas reais do projeto';if(!p){message.textContent='Nenhum projeto ativo. Crie ou abra um projeto para consultar suas estatísticas.';express('curiosidade');opened(true);return}const hours=(p.tempoMs/3600000).toLocaleString('pt-BR',{maximumFractionDigits:2});const today=(p.hojeMs/3600000).toLocaleString('pt-BR',{maximumFractionDigits:2});const remain=(p.horasRestantesMs/3600000).toLocaleString('pt-BR',{maximumFractionDigits:2});message.textContent=`${p.nome}: ${hours} horas acumuladas; ${today} horas registradas hoje; ${remain} horas restantes para 10.000 horas. ${p.chefoesDerrotados} de ${p.chefoesTotais} chefões derrotados. ${p.habitosConcluidos} execuções de hábitos registradas no histórico.`;express('surpresa');opened(true)}
function scheduleAuto(){if(autoTimer)clearInterval(autoTimer);autoTimer=null;if(auto.checked&&pref.visivel){autoTimer=setInterval(()=>{if(!document.hidden&&balloon.hidden&&pref.visivel)randomFace()},20000)}}
fetch('impulsinho/catalogo.json?v=109').then(res=>{if(!res.ok)throw Error('Catálogo indisponível');return res.json()}).then(data=>{faces=(data.facetas||[]).filter(f=>f.arquivo&&f.emocao);if(faces.length!==109)throw Error('Catálogo incompleto');showFace(Math.max(0,faces.findIndex(f=>f.id==='1f9d0')));info.textContent='109 expressões prontas. Use os controles para explorá-las.'}).catch(()=>{info.textContent='Não foi possível carregar o catálogo de expressões. Verifique os arquivos e atualize a página.'});
family.addEventListener('change',()=>showFace(0));auto.addEventListener('change',()=>{try{localStorage.setItem('impulsinho-auto-v109',auto.checked?'1':'0')}catch{}scheduleAuto()});
try{auto.checked=localStorage.getItem('impulsinho-auto-v109')==='1'}catch{}
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(pref))}catch{}};
const clamp=(n,a,b)=>Math.max(a,Math.min(n,b));
function position(){const size=avatar.getBoundingClientRect().width||78;pref.x=clamp(Number.isFinite(pref.x)?pref.x:innerWidth-size-14,8,Math.max(8,innerWidth-size-8));pref.y=clamp(Number.isFinite(pref.y)?pref.y:innerHeight-size-90,8,Math.max(8,innerHeight-size-8));avatar.style.left=pref.x+'px';avatar.style.top=pref.y+'px';if(!balloon.hidden){const width=Math.min(310,innerWidth-24),height=balloon.getBoundingClientRect().height;let left=clamp(pref.x+size/2-width/2,12,Math.max(12,innerWidth-width-12));let top=pref.y-height-10;if(top<12)top=Math.min(innerHeight-height-12,pref.y+size+10);balloon.style.left=left+'px';balloon.style.top=clamp(top,12,Math.max(12,innerHeight-height-12))+'px'}
 const qsize=questionButton.getBoundingClientRect();const toggleW=qsize.width||30,toggleH=qsize.height||30;
 questionButton.style.left=clamp(pref.x-12,8,Math.max(8,innerWidth-toggleW-8))+'px';
 questionButton.style.top=clamp(pref.y+size-18,8,Math.max(8,innerHeight-toggleH-8))+'px';
 if(!questions.hidden){const width=Math.min(330,innerWidth-24),height=questions.getBoundingClientRect().height;
  let left=clamp(pref.x-width-12,12,Math.max(12,innerWidth-width-12));
  if(pref.x<width+20)left=clamp(pref.x+size+10,12,Math.max(12,innerWidth-width-12));
  let top=clamp(pref.y+size/2-height/2,12,Math.max(12,innerHeight-height-12));
  if(!balloon.hidden){const speech=balloon.getBoundingClientRect();if(left<speech.right&&left+width>speech.left&&top<speech.bottom&&top+height>speech.top){top=clamp(speech.bottom+10,12,Math.max(12,innerHeight-height-12));}}
  questions.style.left=left+'px';questions.style.top=top+'px';
 }}
function opened(v){if(v){updateAchievements();updateBackupAction()}balloon.hidden=!v;avatar.setAttribute('aria-expanded',String(v));if(v)requestAnimationFrame(position)}
function visible(v){if(!v)questionsOpen(false);pref.visivel=v;avatar.hidden=!v;avatar.style.display=v?'':'none';questionButton.hidden=!v;reopen.hidden=v;opened(false);save();scheduleAuto()}
function sync(){avatar.querySelector('img').style.animationPlayState=pref.flutuar?'running':'paused';visible(pref.visivel);position()}
let drag=null,lastDragEnd=0;
avatar.addEventListener('pointerdown',e=>{if(e.button!==0)return;drag={id:e.pointerId,startX:e.clientX,startY:e.clientY,x:pref.x,y:pref.y,moved:false};avatar.setPointerCapture(e.pointerId)});
avatar.addEventListener('pointermove',e=>{if(!drag||e.pointerId!==drag.id)return;const dx=e.clientX-drag.startX,dy=e.clientY-drag.startY;if(Math.hypot(dx,dy)>7)drag.moved=true;if(drag.moved){pref.x=drag.x+dx;pref.y=drag.y+dy;position()}});
avatar.addEventListener('pointerup',e=>{if(!drag||e.pointerId!==drag.id)return;const moved=drag.moved;drag=null;if(moved){save();lastDragEnd=performance.now()}});
avatar.addEventListener('pointercancel',()=>{drag=null;save()});
avatar.addEventListener('click',()=>{if(performance.now()-lastDragEnd<350)return;opened(balloon.hidden)});
questionButton.addEventListener('click',()=>questionsOpen(questions.hidden));
root.addEventListener('click',e=>{const action=e.target.closest('[data-acao]')?.dataset.acao;if(!action)return;if(action==='avisos')manualStatus();if(action==='estatisticas')manualStats();if(action==='ajustes'){questionsOpen(false);opened(false);window.dispatchEvent(new CustomEvent('impulsinho:abrir-configuracoes'))};if(action==='conquistas'){achievementsPanel.hidden=!achievementsPanel.hidden;if(!achievementsPanel.hidden)renderAchievements();requestAnimationFrame(position)}if(action==='backup')window.ImpulsinhoNovidades?.atualizarBackup?.();if(action==='fechar'){questionsOpen(false);opened(false);setTimeout(dispatch,250)}if(action==='ocultar')visible(false);if(action==='silenciar'){pref.silenciado=!pref.silenciado;save()}if(action==='configurar'){questionsOpen(false);opened(false);window.dispatchEvent(new CustomEvent('impulsinho:abrir-configuracoes'))}if(action==='expressoes'){questionsOpen(false);opened(false);window.dispatchEvent(new CustomEvent('impulsinho:abrir-configuracoes'))}if(action==='anterior')nextFace(-1);if(action==='proxima')nextFace(1);if(action==='aleatoria')randomFace()});
reopen.addEventListener('click',()=>{visible(true);opened(true);avatar.focus()});

window.addEventListener('resize',position);window.addEventListener('orientationchange',position);
window.addEventListener('keydown',e=>{if(e.key==='Escape'&&(!balloon.hidden||!questions.hidden)){questionsOpen(false);opened(false);avatar.focus()}});
window.addEventListener('impulsinho:navegacao',()=>{if(!balloon.hidden)requestAnimationFrame(position)});
sync();scheduleAuto();mountSettings();setTimeout(()=>{updateAchievements();updateBackupAction();evaluate('inicio')},1500);
})();
