/* Impulsinho v117 — tutorial sob demanda, diagnóstico de áudio e respostas a controles. */
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
const settingsKey='impulsinho-config-v112';let behavior={modo:'ambos',volume:35,audio:true,tutorial:true};try{behavior={...behavior,...JSON.parse(localStorage.getItem(settingsKey)||'{}')}}catch{}
const persistBehavior=()=>{try{localStorage.setItem(settingsKey,JSON.stringify(behavior))}catch{}};
const configHost=document.createElement('section');configHost.className='impulsinho-configuracoes';configHost.innerHTML=`<h3>Controles do Impulsinho</h3><p class="help">Escolha quando o Impulsinho pode abrir conversas. No modo Ambos, avisos de alertas ativados e ações importantes são obrigatórios.</p><fieldset><legend>Abertura dos balões</legend><label><input type="radio" name="impulsinhoModo" value="espontaneo"> Espontaneamente</label><label><input type="radio" name="impulsinhoModo" value="clique"> Somente quando eu clicar</label><label><input type="radio" name="impulsinhoModo" value="ambos"> Ambos (avisos de alertas e ações obrigatórios)</label></fieldset><label><input type="checkbox" id="impulsinhoVisivel"> Exibir personagem</label><label><input type="checkbox" id="impulsinhoSilencio"> Silenciar efeitos do Impulsinho</label><label><input type="checkbox" id="impulsinhoFlutuar"> Flutuação suave</label><label><input type="checkbox" id="impulsinhoAlternar"> Alternar expressões automaticamente</label><label><input type="checkbox" id="impulsinhoAudio"> Sons emocionais sintetizados</label><label for="impulsinhoVolume">Volume dos sons (<output id="impulsinhoVolumeValue">35%</output>)</label><input id="impulsinhoVolume" type="range" min="0" max="100" step="5" value="35"><label><input type="checkbox" id="impulsinhoTutorial"> Tutorial guiado quando não há projeto</label><button type="button" class="btn" id="impulsinhoExpressoesBtn">Explorar as 109 expressões</button><div id="impulsinhoFacetasConfig"></div><button type="button" class="btn" id="impulsinhoTesteSom">▶ Testar som do Impulsinho</button><p id="impulsinhoEstadoSom" role="status" aria-live="polite" class="help">Os sons são gerados no dispositivo. Clique em Testar som para autorizar o áudio.</p>`;
const settingsTarget=configHost.querySelector('#impulsinhoFacetasConfig');settingsTarget.append(facePanel);facePanel.hidden=true;
function mountSettings(){const target=document.querySelector('[data-settings-section="impulsinho"] .settings-accordion-body');if(!target)return;target.replaceChildren(configHost);syncSettings()}
function syncSettings(){configHost.querySelectorAll('input[name="impulsinhoModo"]').forEach(x=>x.checked=x.value===behavior.modo);configHost.querySelector('#impulsinhoVisivel').checked=pref.visivel;configHost.querySelector('#impulsinhoSilencio').checked=pref.silenciado;configHost.querySelector('#impulsinhoFlutuar').checked=pref.flutuar;configHost.querySelector('#impulsinhoAlternar').checked=auto.checked;configHost.querySelector('#impulsinhoAudio').checked=behavior.audio!==false;configHost.querySelector('#impulsinhoVolume').value=Number(behavior.volume??35);configHost.querySelector('#impulsinhoVolumeValue').textContent=String(behavior.volume??35)+'%';configHost.querySelector('#impulsinhoTutorial').checked=behavior.tutorial!==false}
configHost.addEventListener('change',e=>{const t=e.target;if(t.name==='impulsinhoModo'){behavior.modo=t.value;persistBehavior();if(t.value==='clique')eventQueue.length=0}if(t.id==='impulsinhoVisivel')visible(t.checked);if(t.id==='impulsinhoSilencio'){pref.silenciado=t.checked;save()}if(t.id==='impulsinhoFlutuar'){pref.flutuar=t.checked;avatar.querySelector('img').style.animationPlayState=t.checked?'running':'paused';save()}if(t.id==='impulsinhoAlternar'){auto.checked=t.checked;auto.dispatchEvent(new Event('change'))}if(t.id==='impulsinhoAudio'){behavior.audio=t.checked;persistBehavior()}if(t.id==='impulsinhoTutorial'){behavior.tutorial=t.checked;persistBehavior();if(!t.checked)stopTour()}});
configHost.querySelector('#impulsinhoVolume').addEventListener('input',e=>{behavior.volume=Number(e.target.value);configHost.querySelector('#impulsinhoVolumeValue').textContent=behavior.volume+'%';persistBehavior()});
configHost.querySelector('#impulsinhoExpressoesBtn').addEventListener('click',()=>{facePanel.hidden=!facePanel.hidden});
window.addEventListener('impulsinho:navegacao',()=>queueMicrotask(mountSettings));
// O balão principal contém exclusivamente o texto do Impulsinho.
// O segundo balão contém apenas os comandos/perguntas do usuário.
const questionButton=document.createElement('button');
questionButton.type='button';questionButton.id='impulsinho-perguntas-toggle';
questionButton.className='impulsinho-perguntas-toggle';questionButton.textContent='☰';
questionButton.title='Perguntas e comandos do Impulsinho';questionButton.setAttribute('aria-label','Abrir perguntas para o Impulsinho');
questionButton.setAttribute('aria-expanded','false');questionButton.setAttribute('aria-controls','impulsinho-perguntas');
const questions=document.createElement('section');questions.id='impulsinho-perguntas';questions.className='impulsinho-perguntas';questions.hidden=true;
questions.setAttribute('aria-label','Perguntas e ações para o Impulsinho');
const qTitle=document.createElement('h2');qTitle.textContent='O que você quer perguntar?';questions.append(qTitle);const menu=document.createElement('button');menu.type='button';menu.textContent='Perguntas rápidas ▾';menu.setAttribute('aria-expanded','true');menu.setAttribute('aria-controls','impulsinho-perguntas-acoes');questions.append(menu);
const actions=balloon.querySelector('.impulsinho-acoes');
actions.id='impulsinho-perguntas-acoes';questions.append(actions);menu.addEventListener('click',()=>{actions.hidden=!actions.hidden;menu.setAttribute('aria-expanded',String(!actions.hidden))});
const tutorialButton=document.createElement('button');tutorialButton.type='button';tutorialButton.textContent='▶ Tutorial';tutorialButton.dataset.acao='tutorial';actions.prepend(tutorialButton);
const questionForm=document.createElement('form');questionForm.className='impulsinho-formulario';questionForm.setAttribute('aria-label','Escrever pergunta ao Impulsinho');
questionForm.innerHTML='<label for="impulsinho-pergunta-texto">Sua pergunta</label><div class="impulsinho-form-row"><input id="impulsinho-pergunta-texto" type="text" maxlength="180" autocomplete="off" placeholder="Ex.: Quanto trabalhei hoje?" required><button type="submit">Perguntar</button></div><p class="impulsinho-ajuda">Pergunte sobre Meu Dia, Motor, Arena, hábitos, conquistas, estatísticas, backup e configurações.</p>';
questions.append(questionForm);

root.append(questionButton,questions);
// O seletor de expressões já pertence às Configurações.
function questionsOpen(value){questions.hidden=!value;questionButton.setAttribute('aria-expanded',String(value));if(value)requestAnimationFrame(position)}
const headline=balloon.querySelector('h2');
const achievementsButton=document.createElement('button');achievementsButton.type='button';achievementsButton.dataset.acao='conquistas';achievementsButton.textContent='Conquistas';actions.prepend(achievementsButton);

for(const [id,label] of [['hoje','Meu Dia'],['motor','Motor'],['arena','Arena'],['habitos','Hábitos e Elixires']]){const b=document.createElement('button');b.type='button';b.dataset.acao=id;b.textContent=label;actions.append(b)}
const backupAction=document.createElement('button');backupAction.type='button';backupAction.dataset.acao='backup';backupAction.textContent='Atualizar Backup Geral';backupAction.hidden=true;actions.prepend(backupAction);
const countIndicator=document.createElement('span');countIndicator.className='impulsinho-contador';countIndicator.hidden=true;avatar.append(countIndicator);
function listAchievements(){try{return window.ImpulsinhoNovidades?.listar?.()||[]}catch{return []}}
function updateAchievements(){const list=listAchievements();countIndicator.hidden=!list.length;countIndicator.textContent=list.length>99?'99+':String(list.length);avatar.setAttribute('aria-label',list.length?`Conversar com o Impulsinho; ${list.length} conquistas não consultadas`:'Conversar com o Impulsinho');return list}
function manualAchievements(){
 const list=updateAchievements();
 if(!list.length){reply('Novidades e conquistas','Não há conquistas pendentes de consulta. Quando surgirem novas conquistas, vou contar a você.','curiosidade');return}
 const descriptions=list.slice(0,5).map((item,i)=>`${i+1}. ${item.title||'Conquista'}: ${item.detail||'Novo registro'}${item.projectName?' — '+item.projectName:''}.`);
 const extra=list.length>5?` Existem mais ${list.length-5} novidades; consulte a Central de Novidades para abrir cada uma.`:'';
 reply('Suas novidades',`Encontrei ${list.length} conquista${list.length===1?'':'s'} ainda não consultada${list.length===1?'':'s'}. ${descriptions.join(' ')}${extra} Para navegar até cada conquista e marcá-la como lida, use a Central de Novidades do Impulso.`,'alegria');
}
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
// Cada uma das 109 facetas tem falas próprias em facetas-falas.json,
// e cada família emocional percorre todas as suas expressões antes de repetir.
const FACET_KEY='impulsinho-facetas-v115';
let facetPhrases={},facetHistory={};
try{facetHistory=JSON.parse(localStorage.getItem(FACET_KEY)||'{}')||{}}catch{}
function saveFacetHistory(){try{localStorage.setItem(FACET_KEY,JSON.stringify(facetHistory))}catch{}}
function pickFacet(emotion){
 if(!faces.length)return null;
 const eligible=faces.filter(f=>f.emocao===emotion||(f.contextos||[]).includes(emotion));
 const pool=eligible.length?eligible:faces.filter(f=>f.id===emotionalFace[emotion]);
 if(!pool.length)return faces.find(f=>f.id==='1f9d0')||faces[0];
 const last=Number(facetHistory['index:'+emotion]??-1);const next=(last+1)%pool.length;
 facetHistory['index:'+emotion]=next;saveFacetHistory();return pool[next];
}
function express(emotion){const f=pickFacet(emotion);if(!f)return;
 const list=faceList();const i=list.indexOf(f);if(i>=0)showFace(i);else{faceImage.src=f.arquivo;faceImage.alt='';avatar.setAttribute('aria-label','Conversar com o Impulsinho — '+f.emocao)}
 const lines=facetPhrases[f.id];if(lines?.length){const key='fala:'+f.id;const next=((Number(facetHistory[key]??-1)+1)%lines.length);facetHistory[key]=next;saveFacetHistory();
 // A frase da faceta é um comentário adicional, nunca uma fonte de números.
 const addition=lines[next];if(addition&&message.textContent&&!message.textContent.includes(addition))message.textContent+=' '+addition;
 }
}
fetch('impulsinho/facetas-falas.json?v=115').then(r=>{if(!r.ok)throw Error('Facetas sem falas');return r.json()}).then(d=>{if(d.total!==109)throw Error('Catálogo de falas incompleto');facetPhrases=d.falas||{}}).catch(()=>{});
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
// Biblioteca v114: carrega 1.200 falas locais; o repertório embutido serve como fallback offline.
fetch('impulsinho/falas.json?v=114').then(r=>{if(!r.ok)throw Error('Biblioteca indisponível');return r.json()}).then(data=>{if(data.total!==1200||!data.grupos)throw Error('Biblioteca incompleta');for(const [group,arr] of Object.entries(data.grupos))if(Array.isArray(arr)&&arr.length===100)FALAS[group]=arr}).catch(()=>{});
let lastPhrase={};
function phrase(group,values={}){const arr=FALAS[group]||FALAS.geral;const previous=lastPhrase[group]??-1;const offset=arr.length>1?1+Math.floor(Math.random()*(arr.length-1)):0;const i=(previous+offset)%arr.length;lastPhrase[group]=i;return arr[i].replace(/\{(\w+)\}/g,(_,k)=>String(values[k]??''))}
function speak(event){playEmotion(event.emotion);headline.textContent=event.title;message.textContent=event.text;express(event.emotion);opened(true);eventState.lastSpoken=Date.now();eventState.seen[event.key]=Date.now();persistEvents()}
function enqueue(event){if(behavior.modo==='clique')return;if(!event||eventState.seen[event.key]||eventQueue.some(x=>x.key===event.key))return;eventQueue.push(event);eventQueue.sort((a,b)=>b.priority-a.priority);if(eventQueue.length>12)eventQueue.length=12;dispatch()}
function dispatch(){if(isBusy()||!eventQueue.length)return;const now=Date.now();const next=eventQueue[0];if(next.priority<3&&now-eventState.lastSpoken<MIN_GAP)return;eventQueue.shift();speak(next)}
function notice(key,title,text,emotion='curiosidade',priority=1){enqueue({key,title,text,emotion,priority})}
function evaluate(kind){const s=snapshot();if(!s)return;const p=s.projeto,projectKey=p?.id||'sem-projeto',today=new Date().toLocaleDateString('en-CA');
 if(p&&eventState.lastProject!==p.id){eventState.lastProject=p.id;persistEvents();notice('projeto:'+p.id+':'+today,'Impulsinho de olho!',phrase('projeto',{nome:p.nome}),'curiosidade',1)}
 if(kind==='dados'&&p){
  const hours=Math.floor(p.tempoMs/3600000);for(const milestone of [1,5,10,25,50,100,250,500,1000])if(hours>=milestone)notice('horas:'+p.id+':'+milestone,'Marco de produtividade!','Este projeto já registrou pelo menos '+milestone+' hora'+(milestone===1?'':'s')+' de trabalho. '+phrase('conquista'),'alegria',2);
  if(p.chefoesDerrotados>0)notice('arena:'+p.id+':'+p.chefoesDerrotados,'Vitória na Arena!','O projeto registra '+p.chefoesDerrotados+' chefão'+(p.chefoesDerrotados===1?' derrotado':'s derrotados')+'. '+phrase('arena'),'desafio',2);
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

// v116: síntese Web Audio, sem sons de terceiros ou carregamentos externos.
let audioContext=null,audioUnlocked=false;
const AudioEngine=window.AudioContext||window.webkitAudioContext;
function unlockAudio(){audioUnlocked=true;}
document.addEventListener('pointerdown',unlockAudio,{once:true,capture:true});
document.addEventListener('keydown',unlockAudio,{once:true,capture:true});
function playEmotion(emotion,force=false){
 if(!AudioEngine||(!force&&!audioUnlocked)||(!force&&(pref.silenciado||behavior.audio===false))||Number(behavior.volume)<=0)return false;
 try{
  audioContext??=new AudioEngine();if(audioContext.state==='suspended')audioContext.resume().catch(()=>{});
  const presets={alegria:[523,659,784],surpresa:[392,740],curiosidade:[440,554],preocupacao:[330,294],desafio:[196,262,330],cuidado:[392,440],descanso:[440,330],humor:[440,660,440]};
  const notes=presets[emotion]||[392,523];const t=audioContext.currentTime+.02;
  notes.forEach((hz,i)=>{const osc=audioContext.createOscillator(),gain=audioContext.createGain(),start=t+i*.105;
   osc.type=['sine','triangle','sine'][i%3];osc.frequency.setValueAtTime(hz,start);
   gain.gain.setValueAtTime(.0001,start);gain.gain.exponentialRampToValueAtTime(Math.max(.0001,Number(behavior.volume)/100*.24),start+.018);
   gain.gain.exponentialRampToValueAtTime(.0001,start+.15);osc.connect(gain);gain.connect(audioContext.destination);osc.start(start);osc.stop(start+.16);
  });
  return true;
 }catch{return false}
}
configHost.querySelector('#impulsinhoTesteSom').addEventListener('click',async()=>{
 const status=configHost.querySelector('#impulsinhoEstadoSom');audioUnlocked=true;
 if(!AudioEngine){status.textContent='Este navegador não oferece Web Audio API.';return}
 try{audioContext??=new AudioEngine();await audioContext.resume();if(audioContext.state!=='running'){status.textContent='O navegador bloqueou o áudio. Verifique a permissão e o volume do dispositivo.';return}
 const ok=playEmotion('alegria',true);status.textContent=ok?'Teste enviado! Se não ouviu, confira o volume do sistema, a aba e o dispositivo de saída.':'Não foi possível produzir o som.';
 }catch{status.textContent='O áudio não pôde ser iniciado neste navegador.'}
});
// Passeio de boas-vindas: apenas quando não há projeto ativo, sem tocar nos dados.
const tourSteps=[
 {title:'Vamos começar?',text:'Ainda não há projeto ativo. Vou mostrar os primeiros passos! Abra o menu no canto superior esquerdo.',emotion:'curiosidade',x:.20,y:.24},
 {title:'Crie ou abra um projeto',text:'Escolha Novo projeto para começar do zero, ou Projetos para continuar um trabalho existente.',emotion:'alegria',x:.50,y:.42},
 {title:'Seu tempo conta!',text:'Depois de abrir um projeto, use Ponto ou Foco para registrar trabalho. Eu poderei comentar seus Giros, hábitos e conquistas.',emotion:'surpresa',x:.76,y:.65}
];
let tourTimer=null,tourIndex=-1,manualTour=false;
function stopTour(){if(tourTimer){clearTimeout(tourTimer);tourTimer=null}tourIndex=-1;manualTour=false;avatar.classList.remove('impulsinho-passeio')}
function tourStep(){
 if((!manualTour&&(!behavior.tutorial||behavior.modo==='clique'))||!pref.visivel||snapshot()?.projeto||document.hidden||document.querySelector('dialog[open]')){stopTour();return}
 if(tourIndex>=tourSteps.length){stopTour();return}
 const step=tourSteps[tourIndex];const width=avatar.getBoundingClientRect().width||78;
 const tx=Math.max(8,Math.min(innerWidth-width-8,innerWidth*step.x));const ty=Math.max(8,Math.min(innerHeight-width-8,innerHeight*step.y));
 avatar.classList.add('impulsinho-passeio');pref.x=tx;pref.y=ty;position();
 headline.textContent=step.title;message.textContent=step.text;express(step.emotion);playEmotion(step.emotion);opened(true);
 tourTimer=setTimeout(()=>{if(snapshot()?.projeto){stopTour();return}tourIndex++;tourStep()},8500);
}
function startTour(){if(tourTimer||tourIndex>=0||!behavior.tutorial||snapshot()?.projeto||behavior.modo==='clique'||!pref.visivel)return;
 const key='impulsinho-tutorial-v116';try{if(localStorage.getItem(key)==='concluido')return;localStorage.setItem(key,'concluido')}catch{}
 tourIndex=0;tourStep();
}
function runTutorial(){stopTour();questionsOpen(false);if(!pref.visivel)visible(true);manualTour=true;tourIndex=0;
 if(snapshot()?.projeto){reply('Tutorial do Impulso','Você já tem um projeto ativo! Vou explicar os primeiros passos: abra o menu para navegar; use Ponto ou Foco para registrar tempo; consulte Motor, Meu Dia e Arena para acompanhar o progresso.','curiosidade');stopTour();return}
 tourStep();}
window.addEventListener('impulsinho:ignicao',e=>{
 const d=e.detail||{},s=snapshot();if(!s?.projeto||s.projeto.id!==d.projetoId)return;
 const giros=Math.max(0,Math.floor(Number(d.giros)||0)),streak=Math.max(0,Math.floor(Number(d.sequencia)||0)),best=Math.max(0,Math.floor(Number(d.recorde)||0));
 const days=d.ultimoRegistro?Math.max(0,Math.floor((Date.now()-d.ultimoRegistro)/86400000)):null;
 let emotion='curiosidade',comment='';
 if(giros===0){emotion='cuidado';comment='Ainda não há Giros completos. Registre suas primeiras atividades para alimentar o Motor.'}
 else if(streak>=7){emotion='alegria';comment=`${giros.toLocaleString('pt-BR')} Giros! Sua sequência atual é de ${streak} dias. Estou vibrando com essa constância!`}
 else if(streak>=2){emotion='alegria';comment=`São ${giros.toLocaleString('pt-BR')} Giros e ${streak} dias na sequência atual. Muito bom!`}
 else if(days!==null&&days>=7){emotion='surpresa';comment=`O Motor registra ${giros.toLocaleString('pt-BR')} Giros. Seu último registro foi há cerca de ${days} dias; que bom ver você por aqui!`}
 else if(best>=3&&streak===0){emotion='cuidado';comment=`Você já alcançou uma sequência de ${best} dias. Hoje não há sequência ativa; podemos construir outra no seu ritmo.`}
 else if(giros>=100){emotion='surpresa';comment=`Uau! ${giros.toLocaleString('pt-BR')} Giros completos! Esse Motor já tem uma bela história.`}
 else{emotion='curiosidade';comment=`Seu Motor registra ${giros.toLocaleString('pt-BR')} Giros completos. Vamos acompanhar sua evolução!`}
 // Ignição é um gesto explícito: responder mesmo com o Motor em execução, sem bloquear o botão Parar.
 reply('Ignição do Motor!',comment,emotion);
});
window.addEventListener('impulsinho:dados-alterados',()=>{if(snapshot()?.projeto)stopTour()});
window.addEventListener('impulsinho:navegacao',()=>{if(snapshot()?.projeto)stopTour()});

// Consulta manual, sem iniciar automaticamente uma conversa.
const statusButton=document.createElement('button');statusButton.type='button';statusButton.textContent='Ver avisos';statusButton.dataset.acao='avisos';actions.prepend(statusButton);
function reply(title,text,emotion='curiosidade'){playEmotion(emotion);questionsOpen(false);headline.textContent=title;message.textContent=text;express(emotion);opened(true)}
function fmtHours(ms){return (Math.max(0,Number(ms)||0)/3600000).toLocaleString('pt-BR',{maximumFractionDigits:2})}
function manualStatus(){
 const s=snapshot(),p=s?.projeto,alerts=alertPrefs();const lines=[];
 lines.push(p?'Projeto ativo: '+p.nome+'.':'Nenhum projeto ativo.');
 lines.push(s?.backupPendente?'Existem alterações pendentes no arquivo externo.':'Não há alterações pendentes indicadas no arquivo externo.');
 lines.push('Alerta de backup: '+(alerts.backup?'ativado.':'desativado.'));
 lines.push('Alerta de hábitos e Elixires: '+(alerts.habits?'ativado.':'desativado.'));
 lines.push('Avisos na fila do Impulsinho: '+eventQueue.length+'.');
 reply('Situação do Impulso',lines.join(' '),'curiosidade');
}
function manualStats(){
 const s=snapshot(),p=s?.projeto;
 if(!p){reply('Estatísticas reais','Nenhum projeto ativo. Crie ou abra um projeto para consultar suas estatísticas.');return}
 reply('Estatísticas de '+p.nome,`${fmtHours(p.tempoMs)} horas acumuladas; ${fmtHours(p.hojeMs)} horas registradas hoje; ${fmtHours(p.horasRestantesMs)} horas restantes para a meta de 10.000 horas. ${p.chefoesDerrotados} de ${p.chefoesTotais} chefões derrotados. ${p.habitosConcluidos} execuções de hábitos registradas.`,'surpresa');
}
// Pede ao aplicativo que navegue; o próprio app.js valida o destino e preserva a sessão ativa.
function goTo(topic){const pages={hoje:'dia',motor:'radar',arena:'arena',habitos:'habitos',elixires:'altar',conquistas:'insignias',estatisticas:'estatisticas',backup:'armazenamento',configuracoes:'configuracao',projetos:'projetos',ponto:'ponto',foco:'foco',calendario:'calendario',dashboard:'dashboard'};
 const pagina=pages[topic];if(pagina)window.dispatchEvent(new CustomEvent('impulsinho:ir-para',{detail:{pagina}}));
}
function manualTopic(topic){stopTour();
 const s=snapshot(),p=s?.projeto;
 if(topic==='conquistas'){goTo('conquistas');manualAchievements();return}
 if(topic==='backup'){goTo('backup');manualStatus();return}
 if(topic==='configuracoes'){goTo('configuracoes');reply('Configurações','Abri as Configurações. Aqui você escolhe temas, alertas, atalhos e como quer conversar comigo.','curiosidade');return}
 if(topic==='projetos'){goTo('projetos');reply('Projetos','Abri a lista de projetos. Escolha um projeto para que eu possa consultar seus dados reais.','curiosidade');return}
 if(!p){reply('Consulta ao Impulso','Ainda não existe projeto ativo. Abra um projeto para eu consultar seus registros reais.','curiosidade');return}
 goTo(topic);
 if(topic==='hoje')reply('Meu Dia',`Abri Meu Dia. No projeto ${p.nome}, o tempo registrado hoje é de ${fmtHours(p.hojeMs)} horas. Confira as atividades e os horários na página.`, 'curiosidade');
 else if(topic==='motor')reply('Motor do Impulso',`Abri o Motor. ${p.nome} acumula ${Math.floor((Number(p.tempoMs)||0)/10000).toLocaleString('pt-BR')} Graus completos, equivalentes a ${fmtHours(p.tempoMs)} horas registradas. Um Giro corresponde a 360 Graus.`, 'surpresa');
 else if(topic==='arena')reply('Arena',`Abri a Arena. ${p.nome} registra ${p.chefoesDerrotados} chefões derrotados, de ${p.chefoesTotais} no total. Confira o combate atual.`, 'desafio');
 else if(topic==='habitos')reply('Hábitos',`Abri Hábitos. ${p.nome} registra ${p.habitosConcluidos} conclusões de hábitos. Os detalhes e os hábitos equipados estão na página.`, 'cuidado');
 else if(topic==='elixires')reply('Elixires',`Abri o Altar dos Elixires. Você tem ${p.habitosConcluidos} execuções de hábitos registradas; confira os cofres e as recompensas na página.`, 'alegria');
 else if(topic==='estatisticas')manualStats();
 else if(topic==='ponto')reply('Ponto','Abri o Ponto. Você pode iniciar ou continuar o registro de trabalho por aqui. Não alterei nenhuma sessão.','curiosidade');
 else if(topic==='foco')reply('Foco','Abri o Foco. Você pode organizar seu período de concentração. Não iniciei nenhum temporizador.','cuidado');
 else if(topic==='calendario')reply('Calendário',`Abri o Calendário de ${p.nome}. Consulte os dias com atividades registradas.`, 'curiosidade');
 else if(topic==='dashboard')reply('Dashboard',`Abri o Dashboard. ${p.nome} já registra ${fmtHours(p.tempoMs)} horas acumuladas.`, 'surpresa');
}
// Interpretador offline: intenções explícitas e variações frequentes; sem IA remota.
function normalizeQuestion(v){return v.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9 ]/g,' ').replace(/\s+/g,' ').trim()}
function interpretQuestion(value){
 const q=normalizeQuestion(value);if(!q)return null;
 if(/\b(backup|copia de seguranca|guardar arquivo|arquivo externo|salvamento)\b/.test(q))return 'backup';
 if(/\b(configurac[a-z]*|ajustes?|preferencias?|temas?|alerta ativado)\b/.test(q))return 'configuracoes';
 if(/\b(elixir|cofre|altar)\b/.test(q))return 'elixires';
 if(/\b(habito|habitos|rotina)\b/.test(q))return 'habitos';
 if(/\b(chefao|chefoes|arena|monstro|combate)\b/.test(q))return 'arena';
 if(/\b(conquista|medalha|titulo|insignia|novidade|cerimonia)\b/.test(q))return 'conquistas';
 if(/\b(motor|grau|graus|giro|giros|pulso|propulsao)\b/.test(q))return 'motor';
 if(/\b(hoje|meu dia|dia atual|trabalhei hoje|fiz hoje)\b/.test(q))return 'hoje';
 if(/\b(estatistica|estatisticas|progresso|horas|tempo total|quanto tempo|meta|resumo|desempenho)\b/.test(q))return 'estatisticas';
 if(/\b(projeto|projetos|abrir projeto)\b/.test(q))return 'projetos';
 if(/\b(ponto|cronometro|registrar tempo)\b/.test(q))return 'ponto';
 if(/\b(foco|pomodoro|concentracao)\b/.test(q))return 'foco';
 if(/\b(calendario|agenda|dias trabalhados)\b/.test(q))return 'calendario';
 if(/\b(dashboard|painel|inicio)\b/.test(q))return 'dashboard';
 return null;
}
questionForm.addEventListener('submit',e=>{e.preventDefault();const field=questionForm.querySelector('input');const value=field.value.trim();if(!value)return;const topic=interpretQuestion(value);
 if(topic){manualTopic(topic);field.value=''}else reply('Ainda estou aprendendo','Não consegui identificar essa pergunta. Experimente perguntar sobre Meu Dia, Motor, Arena, estatísticas, hábitos, conquistas, backup ou configurações.','curiosidade');
});
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
avatar.addEventListener('pointerdown',e=>{if(e.button!==0)return;stopTour();drag={id:e.pointerId,startX:e.clientX,startY:e.clientY,x:pref.x,y:pref.y,moved:false};avatar.setPointerCapture(e.pointerId)});
avatar.addEventListener('pointermove',e=>{if(!drag||e.pointerId!==drag.id)return;const dx=e.clientX-drag.startX,dy=e.clientY-drag.startY;if(Math.hypot(dx,dy)>7)drag.moved=true;if(drag.moved){pref.x=drag.x+dx;pref.y=drag.y+dy;position()}});
avatar.addEventListener('pointerup',e=>{if(!drag||e.pointerId!==drag.id)return;const moved=drag.moved;drag=null;if(moved){save();lastDragEnd=performance.now()}});
avatar.addEventListener('pointercancel',()=>{drag=null;save()});
avatar.addEventListener('click',()=>{if(performance.now()-lastDragEnd<350)return;opened(balloon.hidden)});
questionButton.addEventListener('click',()=>{stopTour();questionsOpen(questions.hidden)});
root.addEventListener('click',e=>{const action=e.target.closest('[data-acao]')?.dataset.acao;if(!action)return;if(action==='tutorial')runTutorial();if(action==='avisos')manualStatus();if(action==='estatisticas')manualTopic('estatisticas');if(['hoje','motor','arena','habitos'].includes(action))manualTopic(action);if(action==='ajustes'){questionsOpen(false);opened(false);window.dispatchEvent(new CustomEvent('impulsinho:abrir-configuracoes'))};if(action==='conquistas')manualTopic('conquistas');if(action==='backup')window.ImpulsinhoNovidades?.atualizarBackup?.();if(action==='fechar'){questionsOpen(false);opened(false);setTimeout(dispatch,250)}if(action==='ocultar')visible(false);if(action==='silenciar'){pref.silenciado=!pref.silenciado;save()}if(action==='configurar'){questionsOpen(false);opened(false);window.dispatchEvent(new CustomEvent('impulsinho:abrir-configuracoes'))}if(action==='expressoes'){questionsOpen(false);opened(false);window.dispatchEvent(new CustomEvent('impulsinho:abrir-configuracoes'))}if(action==='anterior')nextFace(-1);if(action==='proxima')nextFace(1);if(action==='aleatoria')randomFace()});
reopen.addEventListener('click',()=>{visible(true);opened(true);avatar.focus()});

// Reações de interface: somente ações reais, com intervalo para não atrapalhar o trabalho.
const reactionHints=[
 [/menu|navega/i,'O menu é o mapa da missão. Vamos explorar!','curiosidade'],
 [/tema|escuro|claro/i,'Mudança de visual! Continuo de olho nas suas conquistas.','surpresa'],
 [/tela cheia|fullscreen/i,'Mais espaço para a missão!','alegria'],
 [/novo projeto|criar projeto/i,'Uma nova missão está nascendo!','alegria'],
 [/projetos|abrir projeto/i,'Vamos conferir seus projetos.','curiosidade'],
 [/guardar|backup|atualizar arquivo/i,'Uma cópia de segurança ajuda a proteger seu trabalho.','cuidado'],
 [/motor|igni[cç][aã]o/i,'Hora de conferir a energia do Motor!','surpresa'],
 [/arena|chef[aã]o/i,'A Arena nos espera. Vamos descobrir o próximo desafio!','desafio'],
 [/h[aá]bito|elixir/i,'Hábitos pequenos podem render grandes conquistas.','alegria'],
 [/meu dia|calend[aá]rio|estat[ií]stica/i,'Vamos examinar os registros reais do projeto.','curiosidade'],
 [/ponto|foco|iniciar|come[cç]ar/i,'Boa missão! Vou acompanhar sem interromper sua concentração.','cuidado'],
 [/imprimir|exportar/i,'Hora de organizar e conferir seus registros.','curiosidade'],
 [/configura[cç][oõ]es|ajustes/i,'Aqui você decide como quer que eu me comporte.','curiosidade']
];
let lastReactionAt=0,lastReactionLabel='';
document.addEventListener('click',e=>{
 const el=e.target.closest('button,[role="button"],input[type="button"],input[type="submit"]');
 if(!el||root.contains(el)||configHost.contains(el)||el.disabled||el.hidden||el.closest('[hidden]'))return;
 if(!pref.visivel||document.hidden||tourIndex>=0)return;
 const label=(el.getAttribute('aria-label')||el.getAttribute('title')||el.textContent||el.value||el.id||'').trim().replace(/\s+/g,' ').slice(0,100);
 if(!label)return;
 const now=Date.now();if(now-lastReactionAt<2600||label===lastReactionLabel&&now-lastReactionAt<11000)return;
 lastReactionAt=now;lastReactionLabel=label;
 // Uma reação curta e relevante; os eventos específicos (como Ignição) têm prioridade.
 const match=reactionHints.find(([pattern])=>pattern.test(label));
 const emotion=match?.[2]||['curiosidade','alegria','humor','surpresa'][Math.floor(Math.random()*4)];
 const comment=match?.[1]||`Você selecionou “${label}”. Vamos ver o que acontece!`;
 playEmotion(emotion);
 express(emotion);
 // Modo clique respeita a preferência de não abrir balões automaticamente.
 // Durante Foco/Ponto, não se sobrepõe aos controles de tempo.
 if(behavior.modo!=='clique'&&!document.querySelector('dialog[open]')&&!document.activeElement?.matches('input,textarea,select,[contenteditable="true"]')&&!['foco','ponto'].includes(snapshot()?.pagina)){
  headline.textContent='Impulsinho comenta';message.textContent=comment;opened(true);
 }
},false);


window.addEventListener('resize',position);window.addEventListener('orientationchange',position);
window.addEventListener('keydown',e=>{if(e.key==='Escape'&&(!balloon.hidden||!questions.hidden)){questionsOpen(false);opened(false);avatar.focus()}});
window.addEventListener('impulsinho:navegacao',()=>{if(!balloon.hidden)requestAnimationFrame(position)});
sync();scheduleAuto();mountSettings();setTimeout(()=>{updateAchievements();updateBackupAction();evaluate('inicio');startTour()},1800);
})();
