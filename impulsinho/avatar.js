/* Impulsinho v117 — tutorial sob demanda, diagnóstico de áudio e respostas a controles. */
(()=>{'use strict';
const KEY='impulsinho-avatar-v108',DEFAULT='impulsinho/facetas/emoji_u1f9d0_3d.webp';
let pref={visivel:true,silenciado:false,flutuar:true,x:null,y:null};
try{const saved=JSON.parse(localStorage.getItem(KEY)||'null');if(saved&&typeof saved==='object')pref={...pref,...saved}}catch{}
const root=document.createElement('div');root.id='impulsinho-root';root.setAttribute('aria-label','Assistente Impulsinho');
root.innerHTML=`<button type="button" class="impulsinho-avatar" id="impulsinho-avatar" aria-label="Conversar com o Impulsinho" aria-expanded="false" aria-controls="impulsinho-balao"><img src="${DEFAULT}" alt="" draggable="false"></button><section class="impulsinho-balao" id="impulsinho-balao" aria-label="Conversa com o Impulsinho" hidden><h2>Olá! Sou o Impulsinho! 🧐</h2><p id="impulsinho-mensagem">Você pode me arrastar pela tela, fazer perguntas e consultar seu progresso. Abra meu menu de perguntas para começar.</p><div class="impulsinho-acoes"><button type="button" data-acao="estatisticas">Meu projeto</button><button type="button" data-acao="ajustes">⚙ Ajustes</button></div><div id="impulsinho-expressoes" hidden><label for="impulsinho-familia">Família emocional</label><select id="impulsinho-familia"><option value="todas">Todas as expressões</option><option value="alegria">Alegria</option><option value="curiosidade">Curiosidade</option><option value="surpresa">Surpresa</option><option value="desafio">Desafio</option><option value="preocupacao">Preocupação</option><option value="descanso">Descanso</option><option value="humor">Humor</option><option value="cuidado">Cuidado</option></select><p id="impulsinho-faceta-info" aria-live="polite">Carregando facetas...</p><div class="impulsinho-acoes"><button type="button" data-acao="anterior">◀ Anterior</button><button type="button" data-acao="proxima">Próxima ▶</button><button type="button" data-acao="aleatoria">Surpreenda-me</button></div><label for="impulsinho-auto"><input type="checkbox" id="impulsinho-auto"> Alternar expressões suavemente</label></div><div id="impulsinho-config" hidden><label for="impulsinho-movimento">Animação</label><select id="impulsinho-movimento"><option value="sim">Flutuação suave</option><option value="nao">Sem movimento</option></select><p>Áudio: ajuste os efeitos sonoros nas configurações.</p></div></section><button type="button" class="impulsinho-reabrir" id="impulsinho-reabrir" hidden aria-label="Mostrar Impulsinho">🧐 Mostrar Impulsinho</button>`;
document.body.append(root);
const avatar=root.querySelector('#impulsinho-avatar'),balloon=root.querySelector('#impulsinho-balao'),reopen=root.querySelector('#impulsinho-reabrir'),config=root.querySelector('#impulsinho-config'),motion=root.querySelector('#impulsinho-movimento'),silence=root.querySelector('[data-acao="silenciar"]');
const facePanel=root.querySelector('#impulsinho-expressoes'),family=root.querySelector('#impulsinho-familia'),info=root.querySelector('#impulsinho-faceta-info'),auto=root.querySelector('#impulsinho-auto');
config.remove();
let testeCorporalAtivo=false;
let faces=[],current=0,lastFace=-1,autoTimer=null;
const message=root.querySelector('#impulsinho-mensagem');message.setAttribute('role','status');message.setAttribute('aria-live','polite');message.setAttribute('aria-atomic','true');
const settingsKey='impulsinho-config-v112';let behavior={modo:'ambos',volume:35,audio:true,tutorial:true,personalidade:"mentor",splashAudio:true};try{behavior={...behavior,...JSON.parse(localStorage.getItem(settingsKey)||'{}')}}catch{}
const persistBehavior=()=>{try{localStorage.setItem(settingsKey,JSON.stringify(behavior))}catch{}};
const configHost=document.createElement('section');configHost.className='impulsinho-configuracoes';configHost.innerHTML=`<h3>Controles do Impulsinho</h3><p class="help">Escolha quando o Impulsinho pode abrir conversas. Espontaneamente e Ambos permitem frases automáticas; consultas manuais continuam disponíveis.</p><fieldset><legend>Abertura dos balões</legend><label><input type="radio" name="impulsinhoModo" value="espontaneo"> Espontaneamente</label><label><input type="radio" name="impulsinhoModo" value="clique"> Somente quando eu clicar</label><label><input type="radio" name="impulsinhoModo" value="ambos"> Ambos</label></fieldset><label><input type="checkbox" id="impulsinhoVisivel"> Exibir personagem</label><label><input type="checkbox" id="impulsinhoSilencio"> Silenciar efeitos do Impulsinho</label><label><input type="checkbox" id="impulsinhoFlutuar"> Flutuação suave</label><label><input type="checkbox" id="impulsinhoAlternar"> Alternar expressões automaticamente</label><label><input type="checkbox" id="impulsinhoAudio"> Sons emocionais sintetizados</label><label for="impulsinhoVolume">Volume dos sons (<output id="impulsinhoVolumeValue">35%</output>)</label><input id="impulsinhoVolume" type="range" min="0" max="100" step="5" value="35"><label><input type="checkbox" id="impulsinhoTutorial"> Tutorial guiado quando não há projeto</label><button type="button" class="btn" id="impulsinhoExpressoesBtn">Explorar as 109 expressões</button><div id="impulsinhoFacetasConfig"></div><button type="button" class="btn" id="impulsinhoTesteSom">▶ Testar som do Impulsinho</button><p id="impulsinhoEstadoSom" role="status" aria-live="polite" class="help">Os sons são gerados no dispositivo. Clique em Testar som para autorizar o áudio.</p>`;
const profiles={divertido:{gap:65000,prob:.30,lead:'Vamos nessa! ',tone:'humor',gain:1},mentor:{gap:90000,prob:.22,lead:'Uma reflexão: ',tone:'curiosidade',gain:.9},guerreiro:{gap:75000,prob:.25,lead:'Avante! ',tone:'desafio',gain:1},discreto:{gap:240000,prob:.08,lead:'',tone:'cuidado',gain:.65}};
const profile=()=>profiles[behavior.personalidade]||profiles.mentor;
configHost.insertAdjacentHTML('beforeend',`<label for="impulsinhoPersonalidade">Personalidade</label><select id="impulsinhoPersonalidade"><option value="divertido">Divertido</option><option value="mentor">Mentor</option><option value="guerreiro">Guerreiro</option><option value="discreto">Discreto</option></select><label><input type="checkbox" id="impulsinhoSplashAudio"> Vinheta sonora na abertura</label><button type="button" class="btn" id="impulsinhoSplashTeste">▶ Testar vinheta</button>`);
configHost.querySelector('#impulsinhoPersonalidade').addEventListener('change',e=>{behavior.personalidade=e.target.value;persistBehavior();reply('Personalidade alterada',profile().lead+'Estou pronto para acompanhar seu projeto.',profile().tone)});
configHost.querySelector('#impulsinhoSplashAudio').addEventListener('change',e=>{behavior.splashAudio=e.target.checked;persistBehavior()});
configHost.querySelector('#impulsinhoSplashTeste').addEventListener('click',()=>startJingle(true));
// Agrupamento sem recriar os controles nem suas preferências.
function groupSettings(title,ids){const field=document.createElement('fieldset');const legend=document.createElement('legend');legend.textContent=title;field.append(legend);for(const id of ids){const el=configHost.querySelector('#'+id);if(!el)continue;const label=el.closest('label')||configHost.querySelector('label[for="'+id+'"]');if(label&&label!==el)field.append(label);if(!label||!label.contains(el))field.append(el)}configHost.append(field)}
groupSettings('Personalidade e presença',['impulsinhoPersonalidade','impulsinhoVisivel','impulsinhoFlutuar','impulsinhoAlternar','impulsinhoExpressoesBtn','impulsinhoFacetasConfig','impulsinhoTutorial']);
groupSettings('Áudio e volume',['impulsinhoSilencio','impulsinhoAudio','impulsinhoVolume','impulsinhoTesteSom','impulsinhoEstadoSom']);
groupSettings('Vinheta de abertura',['impulsinhoSplashAudio','impulsinhoSplashTeste']);
const settingsTarget=configHost.querySelector('#impulsinhoFacetasConfig');settingsTarget.append(facePanel);facePanel.hidden=true;
function mountSettings(){const target=document.querySelector('[data-settings-section="impulsinho"] .settings-accordion-body');if(!target)return;const mount=target.querySelector('#impulsinho-settings-mount');if(!mount)return;mount.replaceChildren(configHost);syncSettings()}
function syncSettings(){configHost.querySelector("#impulsinhoPersonalidade").value=profiles[behavior.personalidade]?behavior.personalidade:"mentor";configHost.querySelector("#impulsinhoSplashAudio").checked=behavior.splashAudio!==false;configHost.querySelectorAll('input[name="impulsinhoModo"]').forEach(x=>x.checked=x.value===behavior.modo);configHost.querySelector('#impulsinhoVisivel').checked=pref.visivel;configHost.querySelector('#impulsinhoSilencio').checked=pref.silenciado;configHost.querySelector('#impulsinhoFlutuar').checked=pref.flutuar;configHost.querySelector('#impulsinhoAlternar').checked=auto.checked;configHost.querySelector('#impulsinhoAudio').checked=behavior.audio!==false;configHost.querySelector('#impulsinhoVolume').value=Number(behavior.volume??35);configHost.querySelector('#impulsinhoVolumeValue').textContent=String(behavior.volume??35)+'%';configHost.querySelector('#impulsinhoTutorial').checked=behavior.tutorial!==false}
configHost.addEventListener('change',e=>{const t=e.target;if(t.name==='impulsinhoModo'){behavior.modo=t.value;persistBehavior();if(t.value==='clique'){for(let i=eventQueue.length-1;i>=0;i--)if(!/^(backup|elixir):/.test(eventQueue[i].key))eventQueue.splice(i,1)}}if(t.id==='impulsinhoVisivel')visible(t.checked);if(t.id==='impulsinhoSilencio'){pref.silenciado=t.checked;save()}if(t.id==='impulsinhoFlutuar'){pref.flutuar=t.checked;avatar.querySelector('img').style.animationPlayState=t.checked?'running':'paused';save()}if(t.id==='impulsinhoAlternar'){auto.checked=t.checked;auto.dispatchEvent(new Event('change'))}if(t.id==='impulsinhoAudio'){behavior.audio=t.checked;persistBehavior()}if(t.id==='impulsinhoTutorial'){behavior.tutorial=t.checked;persistBehavior();if(!t.checked)stopTour()}});
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
const qTitle=document.createElement('h2');qTitle.textContent='O que você quer perguntar?';questions.append(qTitle);const menu=document.createElement('button');menu.type='button';menu.textContent='Perguntas rápidas ▾';menu.hidden=true;
const actions=balloon.querySelector('.impulsinho-acoes');
actions.id='impulsinho-perguntas-acoes';questions.append(actions);actions.hidden=true;const quick=document.createElement('select');quick.setAttribute('aria-label','Escolher pergunta rápida');const runQuick=document.createElement('button');runQuick.type='button';runQuick.textContent='Abrir';const quickRow=document.createElement('div');quickRow.className='impulsinho-form-row';quickRow.append(quick,runQuick);questions.append(quickRow);function refreshQuick(){quick.replaceChildren(new Option('Perguntas rápidas…',''));for(const [i,b] of [...actions.querySelectorAll('button')].entries()){if(!b.hidden)quick.add(new Option(b.textContent,String(i)))}runQuick.disabled=true}quick.addEventListener('change',()=>{runQuick.disabled=quick.value===''});runQuick.addEventListener('click',()=>{if(quick.value==='')return;const b=actions.querySelectorAll('button')[Number(quick.value)];if(b&&!b.hidden)b.click();if(!questions.hidden)refreshQuick()});
const tutorialButton=document.createElement('button');tutorialButton.type='button';tutorialButton.textContent='▶ Tutorial';tutorialButton.dataset.acao='tutorial';actions.prepend(tutorialButton);
const questionForm=document.createElement('form');questionForm.className='impulsinho-formulario';questionForm.setAttribute('aria-label','Escrever pergunta ao Impulsinho');
questionForm.innerHTML='<label for="impulsinho-pergunta-texto">Sua pergunta</label><div class="impulsinho-form-row"><input id="impulsinho-pergunta-texto" type="text" maxlength="180" autocomplete="off" placeholder="Ex.: Quanto trabalhei hoje?" required><button type="submit">Perguntar</button></div><p class="impulsinho-ajuda">Pergunte sobre seu projeto ou sobre o Impulso: como restaurar um backup?</p>';
questions.append(questionForm);

root.append(questionButton,questions);
// O seletor de expressões já pertence às Configurações.
function questionsOpen(value){questions.hidden=!value;questionButton.setAttribute('aria-expanded',String(value));if(value){updateBackupAction();refreshQuick();opened(false);position();requestAnimationFrame(position)}}
const headline=balloon.querySelector('h2');
const achievementsButton=document.createElement('button');achievementsButton.type='button';achievementsButton.dataset.acao='conquistas';achievementsButton.textContent='Conquistas';actions.prepend(achievementsButton);

for(const [id,label] of [['hoje','Meu Dia'],['motor','Motor'],['arena','Arena'],['habitos','Hábitos e Elixires']]){const b=document.createElement('button');b.type='button';b.dataset.acao=id;b.textContent=label;actions.append(b)}
const backupAction=document.createElement('button');backupAction.type='button';backupAction.dataset.acao='backup';backupAction.textContent='Atualizar Backup Geral';backupAction.hidden=true;actions.prepend(backupAction);
const countIndicator=document.createElement('span');countIndicator.className='impulsinho-contador';countIndicator.hidden=true;avatar.append(countIndicator);
function listAchievements(){try{return window.ImpulsinhoNovidades?.listar?.()||[]}catch{return []}}
function updateAchievements(){const list=listAchievements();countIndicator.hidden=!list.length;countIndicator.textContent=list.length>99?'99+':String(list.length);avatar.setAttribute('aria-label',list.length?`Conversar com o Impulsinho; ${list.length} conquistas não consultadas`:'Conversar com o Impulsinho');return list}
function manualAchievements(){
 const list=window.ImpulsinhoNovidades?.consultar?.()||updateAchievements();
 if(!list.length){reply('Novidades e conquistas','Não há conquistas pendentes de consulta. Quando surgirem novas conquistas, vou contar a você.','curiosidade');return}
 const descriptions=list.map((item,i)=>`${i+1}. ${item.title||'Conquista'}: ${item.detail||'Novo registro'}${item.projectName?' — '+item.projectName:''}.`);
 const extra='';
 reply('Suas novidades',`Encontrei ${list.length} conquista${list.length===1?'':'s'} nova${list.length===1?'':'s'}. ${descriptions.join(' ')}${extra} Essas novidades foram marcadas como lidas.`,'alegria');
}
function updateBackupAction(){backupAction.hidden=!snapshot()?.backupPendente}
window.addEventListener('impulsinho:novidades',updateAchievements);
window.addEventListener('impulsinho:arquivo',updateBackupAction);

const faceImage=avatar.querySelector('img');
function faceList(){return faces.filter(f=>family.value==='todas'||(f.contextos||[]).includes(family.value))}
function showFace(index){const list=faceList();if(!list.length)return;current=(index%list.length+list.length)%list.length;const f=list[current];faceImage.src=f.arquivo;faceImage.alt='';avatar.setAttribute('aria-label','Conversar com o Impulsinho — '+f.emocao);info.textContent=`${current+1} de ${list.length} · ${f.unicode} · ${f.emocao} · intensidade ${f.intensidade}/2`;lastFace=faces.indexOf(f)}
function nextFace(step=1){showFace(current+step)}
function randomFace(){if(testeCorporalAtivo)return;const list=faceList();if(!list.length)return;const offset=list.length>1?1+Math.floor(Math.random()*(list.length-1)):0;showFace(current+offset)}
// Eventos reais, sem regravar os dados do Impulso e sem fabricar estatísticas.
const EVENTS_KEY='impulsinho-eventos-v110';
let eventState={seen:{},lastSpoken:0,lastProject:null,queue:[]};
try{const v=JSON.parse(localStorage.getItem(EVENTS_KEY)||'null');if(v&&typeof v==='object')eventState={...eventState,...v,queue:[]}}catch{}
if(!eventState.seen||typeof eventState.seen!=='object'||Array.isArray(eventState.seen))eventState.seen={};
const persistEvents=()=>{try{const keys=Object.keys(eventState.seen);const transient=keys.filter(k=>!k.startsWith('horas:')&&!k.startsWith('arena:'));if(transient.length>512){transient.sort((a,b)=>Number(eventState.seen[b])-Number(eventState.seen[a]));for(const k of transient.slice(512))delete eventState.seen[k]}localStorage.setItem(EVENTS_KEY,JSON.stringify({seen:eventState.seen,lastSpoken:eventState.lastSpoken,lastProject:eventState.lastProject}))}catch{}};
const eventQueue=[];
let eventTimer=null;
const DAY=86400000, MIN_GAP=90000;
const emotionalFace={alegria:'1f973',surpresa:'1f62e',curiosidade:'1f9d0',preocupacao:'1f628',desafio:'1f620',cuidado:'1f642'};
// Cada uma das 109 facetas tem falas próprias em facetas-falas.json,
// e cada família emocional percorre todas as suas expressões antes de repetir.
const FACET_KEY='impulsinho-facetas-v136';
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
function express(emotion,appendComment=true){const f=pickFacet(emotion);if(!f)return;
 const list=faceList();const i=list.indexOf(f);if(i>=0)showFace(i);else{faceImage.src=f.arquivo;faceImage.alt='';avatar.setAttribute('aria-label','Conversar com o Impulsinho — '+f.emocao)}
 const lines=facetPhrases[f.id];if(lines?.length){const key='fala:'+f.id;const next=((Number(facetHistory[key]??-1)+1)%lines.length);facetHistory[key]=next;saveFacetHistory();
 // A frase da faceta é um comentário adicional, nunca uma fonte de números.
 const addition=lines[next];if(appendComment&&addition&&message.textContent&&!message.textContent.includes(addition))message.textContent+=' '+addition;
 }
}
fetch('impulsinho/facetas-falas.json?v=136').then(r=>{if(!r.ok)throw Error('Facetas sem falas');return r.json()}).then(d=>{if(d.total!==109)throw Error('Catálogo de falas incompleto');facetPhrases=d.falas||{}}).catch(()=>{});
function snapshot(){try{return window.Impulsinho?.consultar?.()||null}catch{return null}}
// v119: frases motivacionais fornecidas pelo autor, 1000 textos originais.
const MOTIV_KEY='impulsinho-motivacionais-v119';
let motivacionais=[], motivUltimas=[], motivUltimaHora=Date.now(), motivCarregadas=false;
try {
 const state=JSON.parse(localStorage.getItem(MOTIV_KEY)||'null');
 if(state&&Array.isArray(state.ids))motivUltimas=state.ids.filter(Number.isInteger).slice(-80);
 if(state&&Number.isFinite(state.ultima))motivUltimaHora=state.ultima;
}catch{}
fetch('impulsinho/motivacionais.json?v=119').then(r=>{if(!r.ok)throw Error('Arquivo de frases indisponível');return r.json()})
.then(d=>{if(!Array.isArray(d.frases)||d.frases.length!==1000)throw Error('Quantidade de frases inválida');
 motivacionais=d.frases.filter(x=>Number.isInteger(x.id)&&typeof x.frase==='string'&&x.frase.trim()&&typeof x.categoria==='string');
 motivCarregadas=motivacionais.length===1000;
}).catch(()=>{motivCarregadas=false});
function categoriaMotivacional(){
 const page=String(snapshot()?.pagina||'').toLowerCase();
 if(/h[aá]bit|elixir/.test(page))return 'hábitos';
 if(/motor|radar|ponto|dia|calend/.test(page))return 'uso do tempo';
 if(/foco|pomodoro/.test(page))return 'foco e disciplina';
 if(/arena|chef|vit[oó]ria/.test(page))return 'motivação';
 return null;
}
function fraseMotivacional(manual=false){
 if(!motivCarregadas||!pref.visivel)return false;
 const category=categoriaMotivacional();
 const matching=motivacionais.filter(x=>!motivUltimas.includes(x.id)&&(!category||x.categoria===category));
 const available=matching.length?matching:motivacionais.filter(x=>!motivUltimas.includes(x.id));
 const pool=available.length?available:motivacionais;
 if(!pool.length)return false;
 const selected=pool[Math.floor(Math.random()*pool.length)];
 motivUltimas.push(selected.id);motivUltimas=motivUltimas.slice(-80);
 motivUltimaHora=Date.now();
 try{localStorage.setItem(MOTIV_KEY,JSON.stringify({ids:motivUltimas,ultima:motivUltimaHora}))}catch{}
 const emotion=selected.categoria==='estoicismo'?'cuidado':selected.categoria==='positividade'?'alegria':selected.categoria==='motivação'?'desafio':'curiosidade';
 if(manual)reply('Uma ideia para você',selected.frase,emotion);
 else speak({key:'motivacional:'+selected.id,title:'Uma ideia para você',text:selected.frase,emotion});
 return true;
}
const motivSessionStart=Date.now();
// Oferece uma frase apenas ocasionalmente e somente quando a conversa está livre.
setInterval(()=>{
 if(document.hidden||behavior.modo==='clique'||!pref.visivel||!motivCarregadas||tourIndex>=0)return;
 const interval=behavior.personalidade==='discreto'?12*60000:5*60000;
 if(Date.now()-Math.max(motivUltimaHora,motivSessionStart)<interval||Date.now()-eventState.lastSpoken<60000)return;
 if(isBusy()||eventQueue.some(e=>e.priority>=2)||document.querySelector('#r2d10 .r2-panel:not([hidden])'))return;
 fraseMotivacional();
},15000);
const botaoFrase=document.createElement('button');
botaoFrase.type='button';botaoFrase.textContent='✨ Uma frase';botaoFrase.dataset.acao='frase-motivacional';
actions.append(botaoFrase);
botaoFrase.addEventListener('click',e=>{e.stopPropagation();if(!fraseMotivacional(true))reply('Frases motivacionais','A biblioteca de frases ainda está carregando. Tente novamente em instantes.','curiosidade')});

function alertPrefs(){try{const p=JSON.parse(localStorage.getItem('impulso-alertas-v1')||'null');return {backup:p?.backup===true,habits:p?.habits===true}}catch{return {backup:false,habits:false}}}
function isBusy(){return testeCorporalAtivo||!!window.ImpulsinhoAtividade?.()||behavior.modo==='clique'||document.hidden||!pref.visivel||!balloon.hidden||!questions.hidden||document.querySelector('dialog[open]')!==null||document.activeElement?.matches('input,textarea,select,[contenteditable="true"]')||['foco','ponto'].includes(snapshot()?.pagina)}
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
function speak(event){if(event.key.startsWith('atalhos:')||event.key.startsWith('conselho-evolucao:'))window.dispatchEvent(new CustomEvent('impulsinho:gesto-real',{detail:{tipo:'dica'}}));reminderSave.hidden=!event.key.startsWith('backup:');playEmotion(event.emotion);headline.textContent=event.title;message.textContent=profile().lead+event.text;express(event.emotion);opened(true);eventState.lastSpoken=Date.now();eventState.seen[event.key]=Date.now();persistEvents()}
function enqueue(event){if(behavior.modo==='clique'&&!event?.key?.startsWith('backup:')&&!event?.key?.startsWith('elixir:'))return;if(!event||eventState.seen[event.key]||eventQueue.some(x=>x.key===event.key))return;eventQueue.push(event);eventQueue.sort((a,b)=>b.priority-a.priority);if(eventQueue.length>12)eventQueue.length=12;dispatch()}
function dispatch(){const a=alertPrefs();for(let i=eventQueue.length-1;i>=0;i--){const k=eventQueue[i].key;if((k.startsWith('backup:')&&!a.backup)||(k.startsWith('elixir:')&&!a.habits))eventQueue.splice(i,1)}if(isBusy()||!eventQueue.length||window.__impulsoGestoRealOcupado)return;const now=Date.now();const next=eventQueue[0];if(next.priority<3&&now-eventState.lastSpoken<profile().gap)return;eventQueue.shift();speak(next)}
function notice(key,title,text,emotion='curiosidade',priority=1){enqueue({key,title,text,emotion,priority})}
// v121: evolução calculada exclusivamente a partir dos registros do projeto.
const evolutionStages=[
 {name:'Aprendiz',min:0,emotion:'curiosidade',lines:['Vamos construir uma rotina simples.','Um registro de cada vez já é progresso.']},
 {name:'Companheiro',min:25,emotion:'alegria',lines:['Já temos experiência juntos. Vamos consolidar os hábitos.','Que tal reconhecer o que funcionou nesta semana?']},
 {name:'Estrategista',min:100,emotion:'curiosidade',lines:['Observe quais atividades rendem mais progresso.','Planeje o próximo passo com base nos seus registros.']},
 {name:'Mestre',min:500,emotion:'surpresa',lines:['Experiência também significa saber quando descansar.','Revise suas prioridades antes de aumentar o ritmo.']},
 {name:'Guardião do Impulso',min:2000,emotion:'alegria',lines:['Proteja o progresso que construiu, inclusive com backups.','A jornada continua: qualidade e equilíbrio também importam.']}
];
function evolution(p){if(!p)return null;const n=x=>Math.max(0,Number(x)||0);const giros=Math.floor(n(p.tempoMs)/3600000);const pontos=giros+5*n(p.chefoesDerrotados)+n(p.habitosConcluidos)+2*n(p.sequenciaRecorde);let index=0;for(let i=1;i<evolutionStages.length;i++)if(pontos>=evolutionStages[i].min)index=i;return {giros,pontos,index,stage:evolutionStages[index],next:evolutionStages[index+1]||null}}
function evolutionText(e){return `${e.stage.name} — ${e.pontos.toLocaleString('pt-BR')} pontos de experiência. ${e.next?'Faltam '+(e.next.min-e.pontos).toLocaleString('pt-BR')+' pontos para '+e.next.name+'.':'Estágio máximo alcançado.'}`}
function manualEvolution(){const e=evolution(snapshot()?.projeto);if(!e){reply('Minha evolução','Abra um projeto para consultar minha evolução.');return}reply('Minha evolução',evolutionText(e)+' '+e.stage.lines[Math.floor(Math.random()*e.stage.lines.length)],e.stage.emotion)}
const evolutionButton=document.createElement('button');evolutionButton.type='button';evolutionButton.textContent='Minha evolução';actions.append(evolutionButton);evolutionButton.addEventListener('click',manualEvolution);
let evolutionObserved=new Map();
function observeEvolution(p){const e=evolution(p);if(!e)return;let previous=evolutionObserved.get(p.id);if(previous===undefined){try{const stored=localStorage.getItem('impulsinho-evolucao:'+p.id);if(stored!==null)previous=Number(stored)}catch{}}evolutionObserved.set(p.id,e.index);try{localStorage.setItem('impulsinho-evolucao:'+p.id,String(e.index))}catch{}if(Number.isInteger(previous)&&e.index>previous)notice('evolucao:'+p.id+':'+e.index,'Evoluí com você!',evolutionText(e)+' '+e.stage.lines[0],e.stage.emotion,2)}
function evaluate(kind){const s=snapshot();if(!s)return;const p=s.projeto,projectKey=p?.id||'sem-projeto',today=new Date().toLocaleDateString('en-CA');
 if(p)observeEvolution(p);
 if(p&&eventState.lastProject!==p.id){eventState.lastProject=p.id;persistEvents();notice('projeto:'+p.id+':'+today,'Impulsinho de olho!',phrase('projeto',{nome:p.nome}),'curiosidade',1)}
 if(kind==='dados'&&p){
  const hours=Math.floor(p.tempoMs/3600000);for(const milestone of [1,5,10,25,50,100,250,500,1000])if(hours>=milestone)notice('horas:'+p.id+':'+milestone,'Marco de produtividade!','Este projeto já registrou pelo menos '+milestone+' hora'+(milestone===1?'':'s')+' de trabalho. '+phrase('conquista'),'alegria',2);
  if(p.chefoesDerrotados>0)notice('arena:'+p.id+':'+p.chefoesDerrotados,'Vitória na Arena!','O projeto registra '+p.chefoesDerrotados+' chefão'+(p.chefoesDerrotados===1?' derrotado':'s derrotados')+'. '+phrase('arena'),'desafio',2);
 }
 if(p&&kind==='periodico'&&Math.random()<0.08){const e=evolution(p);notice('conselho-evolucao:'+p.id+':'+today,'Conselho de '+e.stage.name,e.stage.lines[Math.floor(Math.random()*e.stage.lines.length)],e.stage.emotion,1)}
 if(p&&kind==='periodico'&&Math.random()<0.07)notice('atalhos:'+projectKey+':'+today,'Dica de teclado',phrase('atalhos'),'curiosidade',1);
 const alerts=alertPrefs();
 
 
}
window.addEventListener('impulsinho:dados-alterados',()=>evaluate('dados'));
window.addEventListener('impulsinho:navegacao',()=>evaluate('navegacao'));
document.addEventListener('visibilitychange',()=>{if(!document.hidden)dispatch()});
eventTimer=setInterval(()=>{dispatch();if(!document.hidden)evaluate('periodico')},30000);

// v116: síntese Web Audio, sem sons de terceiros ou carregamentos externos.
let audioContext=null,audioUnlocked=false;
const AudioEngine=window.AudioContext||window.webkitAudioContext;
function unlockAudio(){audioUnlocked=true;try{if(AudioEngine){audioContext??=new AudioEngine();audioContext.resume().catch(()=>{})}}catch{}}
let jinglePlayed=false;
async function startJingle(test=false){
 if(!AudioEngine||(!test&&(jinglePlayed||behavior.splashAudio===false||pref.silenciado||!document.getElementById('splash'))))return;
 try{audioContext??=new AudioEngine();await audioContext.resume();if(audioContext.state!=='running'||(!test&&!document.getElementById('splash'))||(!test&&jinglePlayed))return;
 if(!test)jinglePlayed=true;
 const splash=document.getElementById('splash');const remaining=test?3.7:Math.max(.1,3.7-(performance.now()-(window.impulsoSplashStarted||performance.now()))/1000);
 const notes=[261.63,293.66,329.63,392,440,523.25,659.25,783.99,1046.5];const step=remaining/notes.length;
 notes.forEach((hz,i)=>{const t=audioContext.currentTime+.01+i*step,o=audioContext.createOscillator(),g=audioContext.createGain();o.type='sine';o.frequency.value=hz;g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(.12+i*.025,t+Math.min(.035,step*.2));g.gain.exponentialRampToValueAtTime(.0001,t+step*.94);o.connect(g);g.connect(audioContext.destination);o.start(t);o.stop(t+step)});
 }catch{}
}
if(document.getElementById('splash')){startJingle();document.addEventListener('pointerdown',()=>startJingle(),{once:true,capture:true});document.addEventListener('keydown',()=>startJingle(),{once:true,capture:true})}
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
   gain.gain.setValueAtTime(.0001,start);gain.gain.exponentialRampToValueAtTime(Math.max(.0001,Number(behavior.volume)/100*.48*profile().gain),start+.018);
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
function reply(title,text,emotion='curiosidade',documental=false){reminderSave.hidden=true;eventState.lastSpoken=Date.now();persistEvents();playEmotion(emotion);questionsOpen(false);headline.textContent=title;message.textContent=(documental?'':profile().lead)+text;express(emotion,!documental);opened(true)}
function manualLink(){const a=document.createElement('a');a.href='https://github.com/magpe-stack/Impulso/blob/main/README.md';a.target='_blank';a.rel='noopener noreferrer';a.textContent='Consultar o Manual do Impulso ↗';a.style.cssText='display:block;margin-top:10px;color:inherit;text-decoration:underline;font-weight:600';message.append(a);position();requestAnimationFrame(position)}
function fmtHours(ms){return (Math.max(0,Number(ms)||0)/3600000).toLocaleString('pt-BR',{maximumFractionDigits:2})}
function manualStatus(){
 const s=snapshot(),p=s?.projeto,alerts=alertPrefs();const lines=[];
 lines.push(p?'Projeto ativo: '+p.nome+'.':'Nenhum projeto ativo.');
 lines.push(s?.backupPendente?'Existem alterações pendentes no arquivo externo.':'Não há alterações pendentes indicadas no arquivo externo.');
 lines.push('Alerta de backup: '+(alerts.backup?'ativado.':'desativado.'));
 lines.push('Alerta de hábitos e Elixires: '+(alerts.habits?'ativado.':'desativado.'));
 lines.push('Avisos na fila do Impulsinho: '+eventQueue.length+'.');const activity=window.ImpulsinhoAtividade?.();if(activity)lines.push(activity.label+(activity.paused?' em pausa.':' em andamento.'));const pending=eventQueue.find(e=>/^(backup|elixir):/.test(e.key)&& (e.key.startsWith('backup:')?alerts.backup:alerts.habits));if(pending){eventQueue.splice(eventQueue.indexOf(pending),1);speak(pending);questionsOpen(false);return;}
 const novidades=window.ImpulsinhoNovidades?.consultar?.()||[];if(novidades.length)lines.push('Conquistas consultadas: '+novidades.map(x=>x.detail+' — '+x.projectName).join('; ')+'.');
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
 if(topic==='evolucao'){manualEvolution();return}
 const s=snapshot(),p=s?.projeto;
 if(topic==='conquistas'){manualAchievements();goTo('conquistas');return}
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
function routeQuestion(value){
 const q=normalizeQuestion(value);
 const nav=q.match(/^(?:abrir|abra|ir para|mostrar|mostre) (?:o |a |os |as )?(motor|arena|habitos|elixires|conquistas|estatisticas|meu dia|projetos|ponto|foco|calendario|dashboard|configuracoes)$/);
 if(nav)return {kind:'navigation',topic:nav[1]==='meu dia'?'hoje':nav[1]};
 const rules=[
 ['projetos',/^quantos projetos (?:eu )?(?:tenho|criei|cadastrei)$/],
 ['hoje',/^(?:quantas horas (?:eu )?(?:trabalhei|registrei) hoje|quanto(?: tempo)? (?:eu )?trabalhei hoje|quanto tempo (?:eu )?registrei hoje)$/],
 ['total',/^(?:quantas horas (?:eu )?(?:tenho|acumulei|trabalhei)|quanto tempo (?:eu )?(?:trabalhei|acumulei)|quanto tempo tenho registrado)$/],
 ['arena',/^quantos chefoes (?:eu )?(?:derrotei|venci)$/],
 ['habitos',/^quantos habitos (?:eu )?(?:conclui|completei|fiz)$/],
 ['restante',/^quantas horas (?:me )?faltam (?:para (?:a meta|10000 horas|10 mil horas))$/],
 ['motor',/^(?:quantos graus (?:eu )?tenho|meu motor)$/],
 ['giros',/^quantos giros (?:eu )?tenho$/],
 ['estatisticas',/^(?:meu progresso|minhas estatisticas|meu desempenho)$/]
 ];
 for(const [topic,re] of rules)if(re.test(q))return {kind:'live',topic};
 return {kind:'knowledge'};
}
function answerLive(topic){
 stopTour();const s=snapshot(),p=s?.projeto;
 const say=t=>reply('Consulta ao Impulso',t,'curiosidade',true);
 if(!s)return say('Não consegui consultar os dados reais agora.');
 if(topic==='projetos')return say(`Você tem ${s.projetos} projeto(s) cadastrado(s).`);
 if(!p)return say('Nenhum projeto ativo. Abra um projeto para consultar seus registros.');
 const prefix=`No projeto ${p.nome}, `;
 switch(topic){
 case 'hoje':return say(prefix+`você registrou ${fmtHours(p.hojeMs)} horas hoje.`);
 case 'total':return say(prefix+`você acumula ${fmtHours(p.tempoMs)} horas registradas.`);
 case 'arena':return say(prefix+`você derrotou ${p.chefoesDerrotados} de ${p.chefoesTotais} chefões.`);
 case 'habitos':return say(prefix+`você registrou ${p.habitosConcluidos} conclusões de hábitos.`);
 case 'restante':return say(prefix+`faltam ${fmtHours(p.horasRestantesMs)} horas para a meta de 10.000 horas.`);
 case 'motor':return say(prefix+`você acumula ${Math.floor(p.tempoMs/10000).toLocaleString('pt-BR')} Graus completos.`);
 case 'giros':return say(prefix+`você acumula ${Math.floor(p.tempoMs/3600000).toLocaleString('pt-BR')} Giros completos.`);
 default:return manualStats();
 }
}
questionForm.addEventListener('submit',async e=>{e.preventDefault();const field=questionForm.querySelector('input'),button=questionForm.querySelector('button');const value=field.value.trim();if(!value||button.disabled)return;const route=routeQuestion(value);
 if(route.kind==='navigation'){manualTopic(route.topic);field.value='';return}
 if(route.kind==='live'){answerLive(route.topic);field.value='';return}
 button.disabled=true;try{const r=await window.OraculoImpulso?.ask(value);stopTour();if(r?.text){reply('Oráculo do Impulso',r.text,'curiosidade',true);field.value=''}else {reply('Oráculo do Impulso',r?.unavailable?'Minha base de respostas não está disponível. Atualize o aplicativo com conexão.':r?.ambiguous?'Encontrei mais de uma interpretação. Pode especificar a função ou o que deseja saber?':'Não tenho uma resposta cadastrada com confiança suficiente. Reformule usando o nome da função ou consulte o Manual.','curiosidade',true);manualLink()}}catch{reply('Oráculo do Impulso','Não consegui consultar minha base de respostas agora.','cuidado',true);manualLink()}finally{button.disabled=false}
});
function scheduleAuto(){if(autoTimer)clearInterval(autoTimer);autoTimer=null;if(auto.checked&&pref.visivel){autoTimer=setInterval(()=>{if(!document.hidden&&balloon.hidden&&pref.visivel&&!window.ImpulsinhoAtividade?.())randomFace()},20000)}}
fetch('impulsinho/catalogo.json?v=109').then(res=>{if(!res.ok)throw Error('Catálogo indisponível');return res.json()}).then(data=>{faces=(data.facetas||[]).filter(f=>f.arquivo&&f.emocao);if(faces.length!==109)throw Error('Catálogo incompleto');showFace(Math.max(0,faces.findIndex(f=>f.id==='1f9d0')));info.textContent='109 expressões prontas. Use os controles para explorá-las.'}).catch(()=>{info.textContent='Não foi possível carregar o catálogo de expressões. Verifique os arquivos e atualize a página.'});
family.addEventListener('change',()=>showFace(0));auto.addEventListener('change',()=>{try{localStorage.setItem('impulsinho-auto-v109',auto.checked?'1':'0')}catch{}scheduleAuto()});
try{auto.checked=localStorage.getItem('impulsinho-auto-v109')==='1'}catch{}
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(pref))}catch{}};
const clamp=(n,a,b)=>Math.max(a,Math.min(n,b));
function position(){const size=avatar.getBoundingClientRect().width||78;pref.x=clamp(Number.isFinite(pref.x)?pref.x:innerWidth-size-14,8,Math.max(8,innerWidth-size-8));pref.y=clamp(Number.isFinite(pref.y)?pref.y:innerHeight-size-90,8,Math.max(8,innerHeight-size-8));avatar.style.left=pref.x+'px';avatar.style.top=pref.y+'px';if(!balloon.hidden){const width=balloon.getBoundingClientRect().width||Math.min(310,innerWidth-24),height=balloon.getBoundingClientRect().height;let left=clamp(pref.x+size/2-width/2,12,Math.max(12,innerWidth-width-12));let top=pref.y-height-10;if(top<12)top=Math.min(innerHeight-height-12,pref.y+size+10);balloon.style.left=left+'px';balloon.style.top=clamp(top,12,Math.max(12,innerHeight-height-12))+'px'}
 const qsize=questionButton.getBoundingClientRect();const toggleW=qsize.width||30,toggleH=qsize.height||30;
 questionButton.style.left=clamp(pref.x-12,8,Math.max(8,innerWidth-toggleW-8))+'px';
 questionButton.style.top=clamp(pref.y+size-18,8,Math.max(8,innerHeight-toggleH-8))+'px';
 if(!questions.hidden){const width=questions.getBoundingClientRect().width||Math.min(330,innerWidth-24),height=questions.getBoundingClientRect().height;
  let left=clamp(pref.x-width-12,12,Math.max(12,innerWidth-width-12));
  if(pref.x<width+20)left=clamp(pref.x+size+10,12,Math.max(12,innerWidth-width-12));
  let top=clamp(pref.y+size/2-height/2,12,Math.max(12,innerHeight-height-12));
  if(!balloon.hidden){const speech=balloon.getBoundingClientRect();if(left<speech.right&&left+width>speech.left&&top<speech.bottom&&top+height>speech.top){top=clamp(speech.bottom+10,12,Math.max(12,innerHeight-height-12));}}
  questions.style.left=left+'px';questions.style.top=top+'px';
 }}
function opened(v){if(v){updateAchievements();updateBackupAction()}balloon.hidden=!v;avatar.setAttribute('aria-expanded',String(v));if(v){questionsOpen(false);position();requestAnimationFrame(position)}}
function visible(v){if(!v)questionsOpen(false);pref.visivel=v;avatar.hidden=!v;avatar.style.display=v?'':'none';questionButton.hidden=!v;reopen.hidden=v;opened(false);save();scheduleAuto();updateActivity(window.ImpulsinhoAtividade?.())}
function sync(){avatar.querySelector('img').style.animationPlayState=pref.flutuar?'running':'paused';visible(pref.visivel);position()}
let drag=null,lastDragEnd=0;
avatar.addEventListener('pointerdown',e=>{if(e.button!==0)return;stopTour();drag={id:e.pointerId,startX:e.clientX,startY:e.clientY,x:pref.x,y:pref.y,moved:false};avatar.setPointerCapture(e.pointerId)});
avatar.addEventListener('pointermove',e=>{if(!drag||e.pointerId!==drag.id)return;const dx=e.clientX-drag.startX,dy=e.clientY-drag.startY;if(Math.hypot(dx,dy)>7)drag.moved=true;if(drag.moved){pref.x=drag.x+dx;pref.y=drag.y+dy;position()}});
avatar.addEventListener('pointerup',e=>{if(!drag||e.pointerId!==drag.id)return;const moved=drag.moved;drag=null;if(moved){save();lastDragEnd=performance.now()}});
avatar.addEventListener('pointercancel',()=>{drag=null;save()});
avatar.addEventListener('click',()=>{if(performance.now()-lastDragEnd<350)return;opened(balloon.hidden)});
questionButton.addEventListener('click',()=>{stopTour();questionsOpen(questions.hidden)});
root.addEventListener('click',e=>{const action=e.target.closest('[data-acao]')?.dataset.acao;if(!action)return;if(action==='tutorial')runTutorial();if(action==='avisos')manualStatus();if(action==='estatisticas')manualTopic('estatisticas');if(['hoje','motor','arena','habitos'].includes(action))manualTopic(action);if(action==='ajustes'){questionsOpen(false);opened(false);window.dispatchEvent(new CustomEvent('impulsinho:abrir-configuracoes'))};if(action==='conquistas')manualTopic('conquistas');if(action==='backup')window.ImpulsinhoNovidades?.atualizarBackup?.();if(action==='ocultar')visible(false);if(action==='silenciar'){pref.silenciado=!pref.silenciado;save()}if(action==='configurar'){questionsOpen(false);opened(false);window.dispatchEvent(new CustomEvent('impulsinho:abrir-configuracoes'))}if(action==='expressoes'){questionsOpen(false);opened(false);window.dispatchEvent(new CustomEvent('impulsinho:abrir-configuracoes'))}if(action==='anterior')nextFace(-1);if(action==='proxima')nextFace(1);if(action==='aleatoria')randomFace()});
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
let dismissedClick=null;
document.addEventListener('click',e=>{
 if(root.contains(e.target)||configHost.contains(e.target))return;
 if(!balloon.hidden||!questions.hidden){dismissedClick=e;questionsOpen(false);opened(false);}
},true);
document.addEventListener('click',e=>{
 if(e===dismissedClick||e.target.closest?.('#r2d10,#r2-settings,.palette-option'))return;
 const el=e.target.closest('button,[role="button"],input[type="button"],input[type="submit"]');
 if(!el||root.contains(el)||configHost.contains(el)||el.disabled||el.hidden||el.closest('[hidden]'))return;
 if(!pref.visivel||document.hidden||tourIndex>=0)return;
 const label=(el.getAttribute('aria-label')||el.getAttribute('title')||el.textContent||el.value||el.id||'').trim().replace(/\s+/g,' ').slice(0,100);
 if(!label)return;
 const now=Date.now();if(now-lastReactionAt<2600||label===lastReactionLabel&&now-lastReactionAt<11000)return;
 lastReactionAt=now;lastReactionLabel=label;
 // Uma reação curta e relevante; os eventos específicos (como Ignição) têm prioridade.
 const match=reactionHints.find(([pattern])=>pattern.test(label));
 const emotion=match?.[2]||profile().tone||'curiosidade';
 const comment=match?.[1]||`Você selecionou “${label}”. Vamos ver o que acontece!`;
 playEmotion(emotion);
 express(emotion,false);
 // Modo clique respeita a preferência de não abrir balões automaticamente.
 // Durante Foco/Ponto, não se sobrepõe aos controles de tempo.
 if(behavior.modo!=='clique'&&balloon.hidden&&questions.hidden&&!document.querySelector('dialog[open]')&&!document.activeElement?.matches('input,textarea,select,[contenteditable="true"]')&&!['foco','ponto'].includes(snapshot()?.pagina)){
  headline.textContent='Impulsinho comenta';message.textContent=comment;opened(true);
 }
},false);


window.addEventListener('resize',position);window.addEventListener('orientationchange',position);
window.addEventListener('keydown',e=>{if(e.key==='Escape'&&(!balloon.hidden||!questions.hidden)){questionsOpen(false);opened(false);avatar.focus()}});
window.addEventListener('impulsinho:navegacao',()=>{if(!balloon.hidden)requestAnimationFrame(position)});
const reminderSave=document.createElement('button');reminderSave.type='button';reminderSave.textContent='Guardar Backup Geral';reminderSave.hidden=true;balloon.append(reminderSave);reminderSave.onclick=()=>window.dispatchEvent(new CustomEvent('impulsinho:guardar-backup'));
const activityBadge=document.createElement('button');activityBadge.type='button';activityBadge.className='impulsinho-atividade';activityBadge.hidden=true;root.append(activityBadge);
let activeActivity=null;
function updateActivity(status){activeActivity=status;activityBadge.hidden=true;if(status){activityBadge.textContent=(status.paused?'⏸ ':'● ')+status.label;activityBadge.setAttribute('aria-label',status.label+(status.paused?' em pausa':' em andamento')+' — abrir atividade');}position()}
activityBadge.onclick=()=>{if(activeActivity)window.dispatchEvent(new CustomEvent('impulsinho:ir-para',{detail:{pagina:activeActivity.page}}))};
window.addEventListener('impulsinho:atividade',e=>updateActivity(e.detail));
const paletteOpinions={original:'Gosto do contraste clássico entre vermelho, preto e branco!',vinho:'Adoro o magenta e o roxo: parecem magia de RPG!', 'blue-sky':'Esses azuis me deixam tranquilo. Gostei!',trinity:'Que mistura ousada! O laranja e o verde me animam.',granfino:'Elegante! O grafite é discreto, embora eu prefira um pouco mais de cor.',ecologico:'Adoro esses verdes, parecem energia renovada!',mistico:'Roxo e magenta? Parece que entramos numa aventura mágica!'};
const paletteEmotions={original:'desafio',vinho:'alegria','blue-sky':'descanso',trinity:'surpresa',granfino:'curiosidade',ecologico:'cuidado',mistico:'humor'};
let paletteReactionTimer;
window.ImpulsinhoOpinarPaleta=function(palette){
 if(!pref.visivel||!Object.prototype.hasOwnProperty.call(paletteOpinions,palette))return;
 clearTimeout(paletteReactionTimer);
 paletteReactionTimer=setTimeout(()=>{
  if(!pref.visivel)return;
  stopTour();
  questionsOpen(false);
  reminderSave.hidden=true;
  headline.textContent='Minha opinião sobre o tema';
  message.textContent=paletteOpinions[palette];
  balloon.hidden=false;
  avatar.setAttribute('aria-expanded','true');
  position();requestAnimationFrame(position);
  express(paletteEmotions[palette],false);
  playEmotion(paletteEmotions[palette]);
  eventState.lastSpoken=Date.now();persistEvents();
 },200);
};
// Também permite solicitar uma opinião clicando na paleta já selecionada.
document.addEventListener('click',e=>{
 const radio=e.target.closest?.('.palette-option')?.querySelector('input[name="impulsoPalette"]');
 if(radio)window.ImpulsinhoOpinarPaleta(radio.value);
},true);


// v147: integração opcional, sem modificar os dados de produtividade.
let motorPending=null, motor147=null, motorOwn=false, motorText='', motorPrev=null;
const motorToggle=document.createElement('input');motorToggle.type='checkbox';motorToggle.checked=behavior.motor147===true;
const motorLabel=document.createElement('label');motorLabel.append(motorToggle,' Ativar novo motor contextual do Impulsinho');configHost.append(motorLabel);
const motorStatus=document.createElement('p');motorStatus.className='help';motorStatus.textContent='Motor contextual opcional.';configHost.append(motorStatus);
const gesturePanel=document.createElement('section');gesturePanel.innerHTML='<h4>Controles corporais</h4><p class="help">Teste manual independente do motor automático. A galeria inclui imagens reservadas ao diagnóstico.</p><div class="ic-test-buttons"></div><img class="ic-test-preview" alt="" hidden><p role="status" aria-live="polite" class="help"></p>';configHost.append(gesturePanel);
const gestureButtons=gesturePanel.querySelector('div'),gesturePreview=gesturePanel.querySelector('img'),gestureStatus=gesturePanel.querySelector('[role=status]');let gestureRun=0;
async function gestureCatalog(){const r=await fetch('impulsinho/motores/catalogo-gestual.json');if(!r.ok)throw Error('Catálogo indisponível');return (await r.json()).gestos;}
async function previewGesture(g,token){const img=new Image();img.src='impulsinho/gestos/'+g.arquivo;await img.decode();if(token!==gestureRun)return false;gesturePreview.src=img.src;gesturePreview.alt=g.nome;gesturePreview.hidden=false;gestureStatus.textContent=g.nome+' — '+img.naturalWidth+' × '+img.naturalHeight+' — imagem carregada';gesturePreview.animate?.([{opacity:.3},{opacity:1}],{duration:matchMedia('(prefers-reduced-motion: reduce)').matches?0:250});return true;}
function gestureButton(label,fn){const b=document.createElement('button');b.type='button';b.className='btn';b.textContent=label;b.onclick=async()=>{const token=++gestureRun;try{await fn(token)}catch(e){if(token===gestureRun)gestureStatus.textContent='Falha: '+e.message}};gestureButtons.append(b);}
for(const [label,id] of [['Acenar','u1f44b'],['Aplaudir','u1f44f'],['Aprovar','u1f44d'],['Força','u1f4aa'],['Vitória','u270c'],['Apontar','u261d']])gestureButton(label,async token=>{const gs=await gestureCatalog();const g=gs.find(x=>x.id===id||x.id.startsWith(id+'_'));if(!g)throw Error('Gesto ausente');await previewGesture(g,token);});
gestureButton('Testar todos os 47 gestos',async token=>{const gs=await gestureCatalog();let ok=0,fail=[];for(const g of gs){if(token!==gestureRun)return;try{if(await previewGesture(g,token))ok++;}catch{fail.push(g.arquivo)}await new Promise(r=>setTimeout(r,650));}if(token===gestureRun)gestureStatus.textContent=ok+'/'+gs.length+' carregadas'+(fail.length?' — Falhas: '+fail.join(', '):' — sem falhas');});
gestureButton('Parar teste',()=>{gesturePreview.hidden=true;gestureStatus.textContent='Teste interrompido.'});
const integrated=document.createElement('section');integrated.innerHTML='<h4>Teste no personagem</h4><p class="help">Observe o Impulsinho na tela. Este teste não altera projetos nem registra conquistas.</p><div class="ic-test-buttons"></div><p class="help" role="status" aria-live="polite"></p>';configHost.append(integrated);
const integratedStatus=integrated.querySelector('[role=status]');let integratedRun=0,integratedMotor=null,integratedSaved=null;
const scenes151=[['Acenar','u1f44b','alegria','Olá! Vamos começar?'],['Aplaudir','u1f44f','alegria','Muito bem!'],['Aprovar','u1f44d','alegria','Excelente trabalho!'],['Força','u1f4aa','desafio','Continue firme!'],['Vitória','u270c','alegria','Vitória!'],['Apontar','u261d','curiosidade','Veja esta dica!']];
function stopIntegrated(){integratedRun++;integratedMotor?.destruir();integratedMotor=null;if(integratedSaved){const v=integratedSaved;integratedSaved=null;faceImage.src=v.src;avatar.setAttribute('aria-label',v.label);current=v.current;lastFace=v.lastFace;info.textContent=v.info;headline.textContent=v.title;message.textContent=v.text;reminderSave.hidden=v.reminder;opened(v.open);if(v.questions)questionsOpen(true);}testeCorporalAtivo=false;if(behavior.motor147)motor147?.iniciar();}
async function runIntegrated(scenes){stopIntegrated();if(!pref.visivel||!avatar.getBoundingClientRect().width){integratedStatus.textContent='Exiba o Impulsinho antes de testar.';return;}if(window.ImpulsinhoAtividade?.()){integratedStatus.textContent='Encerre a atividade antes do teste.';return;}const token=integratedRun;testeCorporalAtivo=true;motor147?.parar();integratedSaved={src:faceImage.src,label:avatar.getAttribute('aria-label'),current,lastFace,info:info.textContent,title:headline.textContent,text:message.textContent,reminder:reminderSave.hidden,open:!balloon.hidden,questions:!questions.hidden};try{const [{criarMotor},catalogo]=await Promise.all([import('./motores/motor-corporal.mjs'),fetch('impulsinho/motores/catalogo-gestual.json').then(r=>{if(!r.ok)throw Error('Catálogo indisponível');return r.json()})]);if(token!==integratedRun)return;integratedMotor=criarMotor({avatar,palco:document.body,catalogo,pasta:'impulsinho/gestos/'});let count=0;for(const [label,id,emotion,text] of scenes){if(token!==integratedRun)return;const g=catalogo.gestos.find(g=>g.id===id);if(!g)throw Error('Gesto ausente: '+id);express(emotion,false);headline.textContent='Impulsinho — teste';message.textContent=text;reminderSave.hidden=true;opened(true);await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));if(token!==integratedRun)return;const ok=await integratedMotor.mostrar(g.gesto.evento_proposto,{contexto:true,ids:[id],teste:true});if(token!==integratedRun)return;if(ok)count++;integratedStatus.textContent=label+': '+(ok?'gesto exibido junto ao personagem':'não foi possível posicionar ou carregar o gesto');await new Promise(r=>setTimeout(r,2800));}if(token===integratedRun){stopIntegrated();integratedStatus.textContent=count+'/'+scenes.length+' gestos exibidos no personagem.';}}catch(e){if(token===integratedRun){stopIntegrated();integratedStatus.textContent='Falha: '+e.message;}}}
function integratedButton(label,fn){const b=document.createElement('button');b.type='button';b.className='btn';b.textContent=label;b.onclick=fn;integrated.querySelector('div').append(b);}
for(const scene of scenes151)integratedButton(scene[0],()=>runIntegrated([scene]));integratedButton('Testar coreografia completa',()=>runIntegrated(scenes151));integratedButton('Parar teste integrado',()=>{stopIntegrated();integratedStatus.textContent='Teste interrompido.'});window.addEventListener('pagehide',stopIntegrated);document.addEventListener('visibilitychange',()=>{if(document.hidden&&testeCorporalAtivo)stopIntegrated()});
const motorClear=document.createElement('button');motorClear.type='button';motorClear.textContent='Limpar memória comportamental';configHost.append(motorClear);motorClear.onclick=()=>{if(motor147&&confirm('Limpar apenas a memória comportamental do Impulsinho?'))motor147.limparMemoria()};
const motorPages={dia:'meu_dia',entradas:'entrada_manual',altar:'elixires',visao:'cofre',configuracao:'configuracoes',armazenamento:'backup'};
function motorState(){const a=alertPrefs();return {habilitado:!testeCorporalAtivo&&behavior.motor147===true&&pref.visivel&&behavior.modo!=='clique',visivel:!document.hidden,foco:!!window.__impulsoGestoRealOcupado||!!window.ImpulsinhoAtividade?.()||['ponto','foco'].includes(snapshot()?.pagina),silencio:false,dicas:true,espontaneo:behavior.motor147===true&&behavior.modo!=='clique',editando:!!document.activeElement?.matches('input,textarea,select,[contenteditable="true"]'),modal:!!document.querySelector('dialog[open]')||!questions.hidden||(!balloon.hidden&&!motorOwn),alertas:{backup:a.backup,elixir:a.habits}}}
function motorNavigate(){const page=snapshot()?.pagina;motor147?.navegar(motorPages[page]||page);motor147?.atualizar()}
function motorData(){const p=snapshot()?.projeto,prev=motorPrev;motorPrev=p;if(!p||!prev||p.id!==prev.id||!motor147||!motorState().habilitado||motorState().foco)return;const e=p.chefoesDerrotados>prev.chefoesDerrotados?'chefao_derrotado':p.habitosConcluidos>prev.habitosConcluidos?'habito_concluido':p.tempoMs>prev.tempoMs?'atividade_concluida':null;if(e)motor147.receber(e).catch(console.warn)}
async function motorInit(){if(motor147)return;if(motorPending)return motorPending;motorPending=(async()=>{try{const [{criarOrquestrador},catalogo]=await Promise.all([import('./motores/orquestrador.mjs'),fetch('impulsinho/motores/catalogo-gestual.json').then(r=>{if(!r.ok)throw Error('Catálogo indisponível');return r.json()})]);
// Catálogo corporal completo, validado na distribuição 149.
const palco=document.body;
const faceMap={alegria:'alegria',satisfacao:'alegria',determinacao:'desafio',celebracao:'surpresa',atencao:'curiosidade',calma:'descanso',esperanca:'alegria'};
motor147=criarOrquestrador({avatar,palco,catalogo,pasta:'impulsinho/gestos/',estado:motorState,expressao:k=>{if(k!=='neutra'&&!isBusy())express(faceMap[k]||'curiosidade',false)},balao:t=>{if(!t){if(motorOwn&&message.textContent===motorText)opened(false);motorOwn=false;return}if(isBusy()||motorState().modal)return;motorOwn=true;motorText=t;reminderSave.hidden=true;headline.textContent='Impulsinho';message.textContent=t;opened(true)},onErro:console.warn});motorPrev=snapshot()?.projeto;motorNavigate();if(behavior.motor147)motor147.iniciar();motorStatus.textContent='Motor contextual disponível, com gestos corporais.';
}catch(e){motorStatus.textContent='Motor contextual indisponível; assistente original preservado.';console.warn(e)}finally{motorPending=null}})();return motorPending}
motorToggle.onchange=async()=>{behavior.motor147=motorToggle.checked;persistBehavior();if(behavior.motor147){await motorInit();if(behavior.motor147){motor147?.iniciar();motorNavigate()}}else motor147?.parar()};
window.addEventListener('impulsinho:navegacao',motorNavigate);window.addEventListener('impulsinho:atividade',()=>motor147?.atualizar());
window.addEventListener('pagehide',()=>motor147?.parar());window.addEventListener('pageshow',()=>{if(behavior.motor147)motor147?.iniciar()});
// v153: eventos emitidos pelos caminhos reais de gravação, sem simular registros.
const realPanel=document.createElement('section');realPanel.innerHTML='<h4>Diagnóstico de acontecimentos reais</h4><p class="help" role="status">Aguardando motor.</p>';configHost.append(realPanel);
const realStatus=realPanel.querySelector('p');
const realScenes={
"projeto-renomeado":["u270d", "curiosidade", "Nome atualizado!"],
"registro-excluido":["u1faf3", "descanso", "Registro removido."],
"visao-revelada":["u1f450", "surpresa", "Uma nova parte da sua Visão!"],
"visao-completa":["u1faf6", "alegria", "Sua Visão está completa!"],
"projeto-importado":["u1f91d", "alegria", "Projeto recebido!"],
"backup-restaurado":["u1f44c", "alegria", "Backup restaurado!"],
"habito-novo":["u270d", "alegria", "Um novo hábito!"],
"habito-equipado":["u1f44a", "desafio", "Elixir equipado!"],
"habito-desequipado":["u1faf4", "descanso", "Elixir desequipado."],
"projeto-excluido":["u1faf3", "descanso", "Projeto removido."],
"habito-excluido":["u1faf3", "descanso", "Hábito removido."],
"foco-retomado":["u270a", "desafio", "Vamos retomar!"],
"foco-pausado":["u1faf4", "descanso", "Uma pausa."],
"foco-descartado":["u1f450", "descanso", "Você pode recomeçar quando quiser."],
"pomodoro-start":["u1f91b", "desafio", "Vamos ao Pomodoro!"],
"pomodoro-pause":["u1faf4", "descanso", "Pausa registrada."],
"pomodoro-resume":["u270a", "desafio", "De volta ao trabalho!"],
"pomodoro-reset":["u1f450", "descanso", "Pronto para recomeçar."],
"foco-resultado-yes":["u1f596", "alegria", "Objetivo alcançado!"],
"foco-resultado-partial":["u1f90f", "curiosidade", "Cada avanço conta."],
"foco-resultado-no":["u1f64f", "descanso", "Reavalie o objetivo com calma."],
"elixir-copiado":["u1f44c", "alegria", "Frase copiada!"],
"exportacao-solicitada":["u1faf1", "curiosidade", "Exportação solicitada."],

 abertura:['u1f44b','alegria','Olá!'], 'projeto-novo':['u1f44d','alegria','Projeto criado!'], 'projeto-aberto':['u1f44b','alegria','Vamos continuar!'],
 'ponto-inicio':['u1f4aa','desafio','Bom trabalho!'], 'foco-inicio':['u1f4aa','desafio','Bom foco!'], 'ponto-fim':['u1f44f','alegria','Trabalho concluído!'], 'foco-fim':['u1f44f','alegria','Sessão registrada!'],
 entrada:['u1f44d','alegria','Registro salvo!'],habito:['u1f44f','alegria','Hábito concluído!'],elixir:['u270c','alegria','Elixir conquistado!'],cofre:['u1f64c','alegria','Cofre aberto!'],chefao:['u1f4aa','desafio','Chefão derrotado!'],backup:['u1f44d','alegria','Backup gravado!'],dica:['u261d','curiosidade','Uma dica!'],'alerta-backup':['u270b','curiosidade','Atenção!'], 'alerta-habits':['u270b','curiosidade','Atenção!'],meta:['u1f64c','alegria','Meta alcançada!']};
let realRepertorio,realFila,realMotor,realCatalog,realLoading,realBusy=false,realNext=0,realReason='';
const realEarly=[];
function realEnabled(){return behavior.motor147===true&&pref.visivel&&behavior.modo!=='clique'}
function realReport(){const d=realFila?.status();realStatus.textContent=d?`Recebidos: ${d.recebidos} · Exibidos: ${d.exibidos} · Pendentes: ${d.pendentes} · Não exibidos: ${d.descartados} · Último: ${d.ultimo}. ${realReason}`:realReason||'Aguardando motor.';}
async function realInit(){if(realMotor)return;if(realLoading)return realLoading;realLoading=(async()=>{const [{criarFilaReal},{criarMotor},{criarRepertorio},r]=await Promise.all([import('./motores/fila-real.mjs'),import('./motores/motor-corporal.mjs'),import('./motores/repertorio-real.mjs'),fetch('impulsinho/motores/catalogo-gestual.json')]);if(!r.ok)throw Error('Catálogo indisponível');realCatalog=await r.json();realRepertorio=criarRepertorio(realCatalog);realFila=criarFilaReal();realMotor=criarMotor({avatar,palco:document.body,catalogo:realCatalog,pasta:'impulsinho/gestos/'});for(const e of realEarly.splice(0))realFila.inserir(e.tipo,e.projetoId);realReport()})().catch(e=>{realReason=e.message;realReport()}).finally(()=>{realLoading=null});return realLoading;}
function realReceive(e){if(!realEnabled()||!realScenes[e?.tipo])return;if(realFila)realFila.inserir(e.tipo,e.projetoId);else{if(realEarly.length<24)realEarly.push(e);realInit()}realReport();}
window.addEventListener('impulsinho:gesto-real',e=>realReceive(e.detail));
window.addEventListener('impulsinho:lembrete',e=>{const a=alertPrefs();if((e.detail?.kind==='backup'&&a.backup)||(e.detail?.kind==='habits'&&a.habits))realReceive({tipo:'alerta-'+e.detail.kind})});
async function realTick(){if(!realEnabled()){realFila?.limpar();realEarly.length=0;realReport();return}if(!realMotor){await realInit();return}if(realBusy||testeCorporalAtivo||Date.now()<realNext||!realFila.status().pendentes)return;
 if(document.hidden||document.querySelector('dialog[open]')||!questions.hidden||document.activeElement?.matches('input,textarea,select,[contenteditable="true"]')){realReason='Aguardando interface livre.';realReport();return}
 const i=realFila.retirar(snapshot()?.projeto?.id);if(!i){realReport();return}const activity=window.ImpulsinhoAtividade?.();const active=!!activity&&!activity.paused;if(i.tipo.startsWith('alerta-')&&!alertPrefs()[i.tipo.slice(7)]){realFila.resultado(false);realReport();return}
 if(active&&!['ponto-inicio','foco-inicio','foco-retomado','pomodoro-start','pomodoro-resume'].includes(i.tipo)){realFila.adiar(i);realNext=Date.now()+4000;realReason='Aguardando fim da atividade.';realReport();return}
 const [id,emotion,text]=realScenes[i.tipo];realBusy=true;window.__impulsoGestoRealOcupado=true;let own=false,shown=false;const phrase=profile().lead+text;
 try{const passos=realRepertorio.planejar(i.tipo,id,behavior.personalidade,{ativo:active,reduzido:matchMedia('(prefers-reduced-motion: reduce)').matches,pendentes:realFila.status().pendentes});express(emotion,false);await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));
 for(const [n,p] of passos.entries()){if(!realEnabled()||testeCorporalAtivo||document.hidden||document.querySelector('dialog[open]')||(n&&window.ImpulsinhoAtividade?.()))break;const g=realCatalog.gestos.find(x=>x.id===p.id);if(!g)continue;let ok=await realMotor.mostrar(g.gesto.evento_proposto,{contexto:true,ids:[p.id],real:true,sequencia:n>0,duracao:p.duracao});if(!ok&&n===0&&p.id!==id){const fallback=realCatalog.gestos.find(x=>x.id===id);if(fallback)ok=await realMotor.mostrar(fallback.gesto.evento_proposto,{contexto:true,ids:[id],real:true,duracao:p.duracao});}if(!ok)continue;shown=true;if(!active&&balloon.hidden&&!own){headline.textContent='Impulsinho';message.textContent=phrase;reminderSave.hidden=true;opened(true);own=true;}await new Promise(r=>setTimeout(r,p.duracao+80));}
 realReason=shown?'Gesto exibido no personagem.':'Sem espaço livre ou imagem indisponível.';
 }catch(e){realReason=e.message}finally{realFila.resultado(shown);realMotor.limpar();if(own&&message.textContent===phrase)opened(false);realBusy=false;window.__impulsoGestoRealOcupado=false;realNext=Date.now()+(behavior.personalidade==='discreto'?14000:8000);realReport()}}
setInterval(()=>{realTick().catch(console.warn)},500);
window.addEventListener('pagehide',()=>{realFila?.limpar();realMotor?.limpar()});
if(realEnabled())realReceive({tipo:'abertura'});
motorToggle.addEventListener('change',()=>{if(realEnabled())realReceive({tipo:'abertura'});else{realFila?.limpar();realMotor?.limpar();realReport()}});

if(behavior.motor147)motorInit();

sync();updateActivity(window.ImpulsinhoAtividade?.());scheduleAuto();mountSettings();setTimeout(()=>{updateAchievements();updateBackupAction();evaluate('inicio');startTour()},1800);
})();
