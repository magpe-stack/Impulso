(()=>{'use strict';
const KEY='impulso-data-v1',THEME='impulso-theme', $=s=>document.querySelector(s), main=$('#main'),nav=$('#nav'),modal=$('#modal');
const names=['Sentinela das Cinzas','Lobo de Bronze','Guardião do Eco','Aranha Rubra','Golem de Sal','Hidra Menor','Cavaleiro Oco','Serpente Lunar','Troll da Névoa','Corvo de Ferro','Basilisco Verde','Manticora do Vale','Espectro do Norte','Titã de Argila','Grifo Carmesim','Dragão da Bruma','Colosso das Ruínas','Quimera Solar','Leviatã Azul','Minotauro Real','Fênix Sombria','Vigia das Estrelas','Devorador de Rochas','Rei dos Espinhos','Bruxa da Tempestade','Centurião Abissal','Beemote de Cristal','Guardião do Vórtice','Dragão de Obsidiana','Imperador de Gelo','Hidra Imperial','Ciclope Ancestral','Titã das Marés','Arauto do Eclipse','Colosso Escarlate','Serafim Caído','Fera do Infinito','Lorde do Trovão','Quimera Celestial','Monarca das Sombras','Leviatã Primordial','Dragão de Ouro','Guardião do Tempo','Imperatriz do Caos','Arquiteto do Vazio','Titã do Horizonte','Soberano das Chamas','Devorador de Sóis','Senhor das Eras','Guardião do Alvorecer','Caçador de Cometas','Esfinge das Dunas','Sentinela de Safira','Cavaleiro da Aurora','Serpente do Firmamento','Golem de Âmbar','Oráculo das Montanhas','Quimera de Prata','Titã do Deserto','Vigia do Abismo','Dragão de Jade','Soberana das Marés','Arauto da Gravidade','Colosso de Aço','Fênix do Crepúsculo','Leviatã da Tempestade','Monarca do Relâmpago','Guardião da Nebulosa','Imperador de Rubi','Devorador de Montanhas','Quimera do Eclipse','Titã das Constelações','Dragão da Eternidade','Senhor das Profundezas','Sentinela do Cosmos','Imperatriz das Estrelas','Colosso do Infinito','Oráculo do Tempo','Fera da Supernova','Monarca dos Universos','Dragão do Horizonte Final','Titã do Vazio Astral','Guardião dos Mil Sóis','Imperador das Galáxias','Leviatã da Criação','Arauto do Fim dos Tempos','Soberano da Matéria','Devorador de Constelações','Quimera do Absoluto','Titã do Multiverso','Guardião da Singularidade','Imperatriz do Infinito','Dragão do Último Eclipse','Monarca da Eternidade','Colosso das Dez Mil Luas','Senhor da Origem','Devorador do Destino','Soberano das Dez Mil Horas','Guardião do Último Portal','Arquichefão do Impulso'];
const emojis=['🛡️','🐺','🗿','🕷️','🪨','🐉','⚔️','🐍','👹','🐦‍⬛','🦎','🦁','👻','🗿','🦅','🐲','🗿','🐲','🐋','🐂','🔥','👁️','🪨','👑','🧙','⚔️','💎','🌀','🐲','❄️'];
const uid=()=>crypto.randomUUID?crypto.randomUUID():`${Date.now()}-${Math.random()}`;
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const pad=n=>String(n).padStart(2,'0'),dateKey=t=>{const d=new Date(t);return `${pad(d.getDate())}-${pad(d.getMonth()+1)}-${d.getFullYear()}`},clock=t=>new Date(t).toLocaleTimeString('pt-BR',{hour12:false}),stamp=t=>`${dateKey(t)} · ${clock(t)}`,mins=ms=>`${Math.floor(ms/3600000)}h ${pad(Math.floor(ms%3600000/60000))}min`,hours=ms=>(ms/3600000).toLocaleString('pt-BR',{maximumFractionDigits:2}),now=()=>Date.now();
let state;try{state=JSON.parse(localStorage.getItem(KEY)||'null')}catch{}if(!state||!Array.isArray(state.projects))state={version:1,projects:[],active:null};let page='inicio',order='asc';
function save(){try{localStorage.setItem(KEY,JSON.stringify(state));return true}catch(e){alert('Não foi possível salvar. Verifique o armazenamento do navegador e exporte um backup.');return false}}
function project(){return state.projects.find(p=>p.id===state.active)||null}function normalize(p){p.records??=[];p.habits??=[];p.created??=now();return p}
state.projects.forEach(normalize);if(!project())state.active=state.projects[0]?.id||null;
function toast(s){const t=$('#toast');t.textContent=s;t.style.display='block';clearTimeout(toast.timer);toast.timer=setTimeout(()=>t.style.display='none',3000)}
function ask(s){return confirm(s)}function close(){if(modal.open)modal.close()}function show(html){modal.innerHTML=html;modal.showModal();modal.querySelector('[data-cancel]')?.addEventListener('click',close);modal.querySelector('form')?.addEventListener('submit',e=>e.preventDefault());modal.querySelector('textarea')?.focus()}
function sorted(p){return [...p.records].sort((a,b)=>a.start-b.start||(a.type==='start'?-1:1))}
function intervals(p,includeLive=false){let open=null,segments=[];for(const r of sorted(p)){if(r.type==='start'){if(open===null)open=r.start}else if(r.type==='end'){if(open!==null&&r.start>open){segments.push([open,r.start]);open=null}}else if((r.type==='habit'||r.type==='activity')&&r.end>r.start){if(Array.isArray(r.segments))segments.push(...r.segments.filter(x=>Array.isArray(x)&&x.length===2&&x[1]>x[0]));else segments.push([r.start,r.end])}}if(includeLive&&open!==null&&open<now())segments.push([open,now()]);if(includeLive&&p.pointSession?.status==='running'&&p.pointSession.start<now())segments.push([p.pointSession.start,now()]);return merge(segments)}
function merge(parts){parts.sort((a,b)=>a[0]-b[0]);const out=[];for(const [a,b] of parts){if(!out.length||a>out[out.length-1][1])out.push([a,b]);else out[out.length-1][1]=Math.max(b,out[out.length-1][1])}return out}
function total(p,live=false){return intervals(p,live).reduce((s,[a,b])=>s+b-a,0)}
function running(p){const seq=sorted(p).filter(r=>r.type==='start'||r.type==='end');return p.pointSession?.status==='running'||seq.at(-1)?.type==='start'}
function duration(ms){const seconds=Math.floor(Math.max(0,ms)/1000);return `${Math.floor(seconds/3600)}h ${pad(Math.floor(seconds%3600/60))}min ${pad(seconds%60)}s`}
function dayTotal(p,day){let sum=0;for(const [a,b] of intervals(p)){let t=a;while(t<b){const d=new Date(t),mid=new Date(d.getFullYear(),d.getMonth(),d.getDate()+1).getTime(),end=Math.min(b,mid);if(dateKey(t)===day)sum+=end-t;t=end}}return sum}
// A Arena acompanha exatamente as 10.000 horas (600.000 minutos), sem bônus
// que antecipem a conclusão. A resistência cresce a cada chefão.
const BOSS_COUNT=names.length, BOSS_GOAL_MIN=600000;
const bossWeights=Array.from({length:BOSS_COUNT},(_,i)=>60+40*i+1.2*i*i);
const bossWeightSum=bossWeights.reduce((a,b)=>a+b,0);
const bossThresholds=bossWeights.map((_,i)=>Math.round(BOSS_GOAL_MIN*bossWeights.slice(0,i+1).reduce((a,b)=>a+b,0)/bossWeightSum));
function bossHP(i){return bossThresholds[i]-(i?bossThresholds[i-1]:0)}
function damage(p){return Math.min(BOSS_GOAL_MIN,Math.floor(total(p)/60000))}
function bossStatus(p){const dmg=damage(p);let level=0;while(level<BOSS_COUNT&&dmg>=bossThresholds[level])level++;if(level===BOSS_COUNT)return {level,hp:0,left:0,done:level};const hp=bossHP(level),previous=level?bossThresholds[level-1]:0;return {level,hp,left:hp-(dmg-previous),done:level}}
function addRecord(p,r){p.records.push({id:uid(),...r});if(save()){render();toast('Registro salvo')} }
function delRecord(id){const p=project();const r=p?.records.find(x=>x.id===id);if(!r||!ask('Excluir permanentemente este registro? O tempo e o progresso serão recalculados.'))return;p.records=p.records.filter(x=>x.id!==id);save();render()}
function fmtNumber(n){return n.toLocaleString('pt-BR')}
function btn(text,action,cls=''){return `<button class="btn ${cls}" data-action="${action}">${text}</button>`}
function header(title,subtitle=''){return `<div class="hero"><h1>${title}</h1>${subtitle?`<p>${subtitle}</p>`:''}</div>`}
function metric(v,label){return `<div class="metric"><strong>${v}</strong><small>${label}</small></div>`}
function actions(){return `<div class="actions">${btn('⏵ Ponto','point','primary')}${btn('✍ Entrada manual','manual')}${btn('⬇ Exportar','export')}${btn('⬆ Importar','importProject')}${btn('▣ Imprimir','print')}</div>`}
function render(){const p=project();const items=[['inicio','Início'],['new','Novo'],['projetos','Projetos'],['arena','Arena'],['radar','Radar'],['dia','Meu Dia']];nav.innerHTML=items.map(([id,label])=>`<button ${id==='new'?'data-action="new"':`data-page="${id}"`} class="${page===id?'active':''}">${label}</button>`).join('');if(!p&& !['inicio','projetos'].includes(page))page='inicio';if(page==='inicio')renderHome(p);if(page==='ponto')renderPoint(p);if(page==='projetos')renderProjects();if(page==='dia')renderDay(p);if(page==='habitos')renderHabits(p);if(page==='arena')renderArena(p);if(page==='radar')renderRadar(p);nav.querySelectorAll('button').forEach(b=>b.classList.toggle('active',b.dataset.page===page));}
function renderHome(p){main.innerHTML=header('Seu próximo impulso começa agora','Projetos independentes. Progresso real. Maestria construída minuto a minuto.')+`<div class="actions">${btn('+ Novo Projeto','new','primary')}${btn('Meus Projetos','projects')}${btn('⬇ Exportar','export')}${btn('⬆ Importar','importProject')}</div>`+(p?`<section class="panel"><div class="row between"><h2>${esc(p.name)}</h2>${btn('Trocar projeto','projects')}</div><p class="muted">Iniciado em ${stamp(p.created)}</p><div class="grid">${metric(`<span id="homeLiveTotal">${duration(total(p,true))}</span>`,'Tempo acumulado')}${metric(p.records.filter(r=>r.type==='habit').length,'Hábitos executados')}${metric(`${bossStatus(p).done}/${BOSS_COUNT}`,'Chefões derrotados')}${metric(`${(total(p)/36000000000).toFixed(3)}%`,'Meta de 10.000 horas')}</div><div class="actions">${btn('⏵ Registrar ponto','point','primary')}${btn('Meu Dia','day')}${btn('Radar','radar')}</div></section>`:`<section class="panel"><h2>Nenhum projeto ainda</h2><p>Crie seu primeiro projeto para começar a registrar seu tempo.</p>${btn('+ Novo Projeto','new','primary')}</section>`)}
function renderProjects(){main.innerHTML=header('Meus Projetos','Cada projeto possui seus próprios registros, hábitos e Arena.')+`<div class="actions">${btn('+ Novo Projeto','new','primary')}${btn('▣ Imprimir lista','printProjects')}</div>`+(state.projects.length?state.projects.map(p=>`<article class="list-card"><div class="row between"><div><h3>${esc(p.name)} ${p.id===state.active?'· Ativo':''}</h3><div class="muted">Criado em ${stamp(p.created)} · ${mins(total(p))}</div></div><div class="row"><button class="btn small" data-open="${p.id}">Abrir</button><button class="btn small" data-rename="${p.id}">Renomear</button><button class="trash" title="Excluir projeto" aria-label="Excluir projeto" data-delete-project="${p.id}">🗑</button></div></div></article>`).join(''):'<p>Nenhum projeto cadastrado.</p>')}
function recordKind(r){return r.type==='habit'?'Hábito':r.type==='activity'?(r.source==='point'?'Ponto':'Entrada Manual'):'Ponto'}
function recordName(r){return String(r.name||r.note||'—').slice(0,50)}
function recordTable(rows,day=null){return `<div class="table-wrap"><table><thead><tr><th>Atividade</th><th>Nome</th><th>Início</th><th>Término</th><th aria-label="Excluir"></th></tr></thead><tbody>${rows.map(r=>`<tr><td>${recordKind(r)}</td><td>${esc(recordName(r))}${day&&r.end>r.start&&dateKey(r.start)!==dateKey(r.end)?`<div class="muted" style="font-size:.82rem">Neste dia: ${mins(dayPart(r,day))} · Atividade completa: ${duration(r.end-r.start)}</div>`:""}</td><td>${r.type==='legacyEnd'?'—':stamp(r.start)}</td><td>${r.end?stamp(r.end):r.type==='legacyEnd'?stamp(r.start):'—'}</td><td><button class="trash" ${r.pairId?`data-delete-pair="${r.id}|${r.pairId}"`:`data-delete-record="${r.id}"`} title="Excluir registro" aria-label="Excluir registro">🗑</button></td></tr>`).join('')}</tbody></table></div>`}
function dayGroups(p){
 const groups=new Map();
 for(const r of historyRows(p)){
  const start=Number(r.start),end=Number(r.end);
  if(!Number.isFinite(start))continue;
  const add=day=>{if(!groups.has(day))groups.set(day,[]);groups.get(day).push(r)};
  if(!Number.isFinite(end)||end<=start){add(dateKey(start));continue}
  let cursor=start;
  while(cursor<end){
   add(dateKey(cursor));
   const d=new Date(cursor),next=new Date(d.getFullYear(),d.getMonth(),d.getDate()+1).getTime();
   if(next<=cursor)break;
   cursor=Math.min(end,next);
  }
 }
 return groups;
}
function dayPart(r,day){
 const start=Number(r.start),end=Number(r.end);
 if(!Number.isFinite(start)||!Number.isFinite(end)||end<=start)return 0;
 let cursor=start,ms=0;
 const segments=Array.isArray(r.segments)?r.segments:[[start,end]];
 for(const segment of segments){
  if(!Array.isArray(segment)||segment.length!==2)continue;
  let a=Number(segment[0]),b=Number(segment[1]);
  while(Number.isFinite(a)&&Number.isFinite(b)&&a<b){
   const d=new Date(a),next=new Date(d.getFullYear(),d.getMonth(),d.getDate()+1).getTime();
   const stop=Math.min(b,next);
   if(dateKey(a)===day)ms+=stop-a;
   if(stop<=a)break;
   a=stop;
  }
 }
 return ms;
}
function renderDay(p){
 const groups=dayGroups(p);
 const days=[...groups.keys()].sort((a,b)=>{const parse=s=>s.split('-').reverse().join('-');return order==='asc'?parse(a).localeCompare(parse(b)):parse(b).localeCompare(parse(a))});
 main.innerHTML=header('Meu Dia',esc(p.name))+actions()+`<div class="row between"><p class="muted">Atividades que atravessam datas aparecem em cada dia trabalhado. O Histórico mantém um único registro.</p><label>Ordem <select class="filter" id="order"><option value="asc" ${order==='asc'?'selected':''}>Mais antigos primeiro</option><option value="desc" ${order==='desc'?'selected':''}>Mais recentes primeiro</option></select></label></div>`+(days.length?days.map(day=>`<section class="day"><div class="day-head"><h2>Meu Dia ${day}</h2><div class="row"><strong>Total trabalhado: ${mins(dayTotal(p,day))}</strong><button class="btn small" type="button" data-print-day="${day}" aria-label="Imprimir somente Meu Dia ${day}">▣ Imprimir</button></div></div>${recordTable(groups.get(day).sort((a,b)=>order==='asc'?a.start-b.start:b.start-a.start),day)}</section>`).join(''):'<section class="panel">Nenhum registro neste projeto. Utilize Ponto ou Entrada Manual.</section>');
}

function renderHabits(p){main.innerHTML=header('Hábitos',esc(p.name))+`<div class="actions">${btn('+ Criar hábito','newHabit','primary')}${btn('⏵ Ponto','point')}</div>`+(p.habits.length?p.habits.map(h=>{const t=h.timer,elapsed=t?Math.min(h.minutes*60000,(t.elapsed||0)+(t.runningSince?Math.max(0,now()-t.runningSince):0)):0,remaining=Math.max(0,h.minutes*60000-elapsed);return `<div class="list-card"><div class="row between"><div><h3>${esc(h.name)}</h3><span class="muted">${h.minutes} minutos estipulados · ${p.records.filter(r=>r.habitId===h.id).length} execuções</span></div><button class="trash" title="Excluir hábito" data-delete-habit="${h.id}">🗑</button></div><div class="pomodoro" aria-label="Pomodoro de ${h.minutes} minutos"><strong data-pomodoro="${h.id}">${duration(remaining)}</strong><div class="progress"><span data-pomodoro-progress="${h.id}" style="width:${elapsed/(h.minutes*60000)*100}%"></span></div><div class="row"><button class="btn small" data-habit-control="${h.id}" data-mode="${!t?'start':t.runningSince?'pause':'resume'}">${!t?'▶ Iniciar':t.runningSince?'⏸ Pausar':'▶ Retomar'}</button>${t?`<button class="btn small" data-habit-control="${h.id}" data-mode="finish">✓ Concluir</button><button class="btn small" data-habit-control="${h.id}" data-mode="reset">↺ Reiniciar</button>`:''}</div></div></div>`}).join(''):'<section class="panel">Nenhum hábito criado. Comece adicionando um hábito.</section>')+`<p class="help">O Pomodoro conta o tempo real em execução, com pausa e retomada. Ao concluir, registra somente o tempo efetivamente decorrido (até o limite estipulado), sem duplicar intervalos já contabilizados pelo ponto.</p>`}
function habitControl(id,mode){const p=project(),h=p?.habits.find(x=>x.id===id);if(!h)return;const t=h.timer;const elapsed=t?(t.elapsed||0)+(t.runningSince?Math.max(0,now()-t.runningSince):0):0;if(mode==='start')h.timer={startedAt:now(),elapsed:0,runningSince:now(),segments:[]};else if(mode==='pause'&&t?.runningSince){t.segments??=[];t.segments.push([t.runningSince,now()]);t.elapsed=elapsed;t.runningSince=null}else if(mode==='resume'&&t&&!t.runningSince)t.runningSince=now();else if(mode==='reset'){if(!ask('Reiniciar o Pomodoro e descartar o tempo desta sessão?'))return;delete h.timer}else if(mode==='finish'&&t){if(t.runningSince){t.segments??=[];t.segments.push([t.runningSince,now()])}const seg=(t.segments||[]).filter(([a,b])=>b>a);const measured=seg.reduce((sum,[a,b])=>sum+b-a,0);if(!measured){alert('Inicie o Pomodoro antes de concluir.');return}if(!ask('Concluir este hábito e registrar o tempo efetivamente executado?'))return;const end=now();p.records.push({id:uid(),type:'habit',habitId:h.id,name:h.name,start:seg[0][0],end,segments:seg,note:'',source:'pomodoro'});delete h.timer}save();render()}
function historyRows(p){
 const result=[],open=[];
 for(const r of sorted(p)){
  if(r.type==='start'){open.push(r);continue}
  if(r.type==='end'){
   const a=open.shift();
   if(a)result.push({id:a.id,type:'legacyPoint',name:'Ponto',start:a.start,end:r.start,note:[a.note,r.note].filter(Boolean).join(' / '),pairId:r.id});
   else result.push({...r,type:'legacyEnd'});
   continue;
  }
  result.push(r);
 }
 for(const a of open)result.push({...a,type:'legacyOpen'});
 return result.sort((a,b)=>b.start-a.start);
}


function renderArena(p){const b=bossStatus(p),pct=b.hp?100*(b.hp-b.left)/b.hp:100;main.innerHTML=header('Arena de 100 Chefões',esc(p.name))+`<section class="panel"><h2>${b.level===BOSS_COUNT?'Arena conquistada!':`Chefão ${b.level+1}/${BOSS_COUNT} — ${names[b.level]}`}</h2><div class="boss"><div class="boss-art" style="font-size:${Math.min(110,55+b.level*1.1)}px">${emojis[b.level%emojis.length]||'🐲'}</div><div style="flex:1"><strong>${b.level===BOSS_COUNT?'Todos derrotados':`${fmtNumber(b.left)} / ${fmtNumber(b.hp)} HP restantes`}</strong><div class="progress"><span style="width:${pct}%"></span></div><p class="help">Progresso: 1 HP por minuto efetivamente acumulado, até 10.000 horas. Cada chefão exige mais tempo que o anterior.</p></div></div></section><section class="panel"><h2>Progressão dos adversários</h2><div class="grid">${names.map((n,i)=>`<div class="metric"><strong>${i<b.done?'✓':i===b.level?'⚔':'🔒'} ${i+1}</strong><small>${esc(n)} · ${fmtNumber(bossHP(i))} HP · até ${hours(bossThresholds[i]*60000)} h</small></div>`).join('')}</div></section>`}
function radarMarks(){let marks='';for(let i=0;i<360;i++){const a=(i-90)*Math.PI/180,major=i%30===0,medium=i%10===0;const r1=major?99:medium?102:105;marks+=`<line x1="${120+r1*Math.cos(a)}" y1="${120+r1*Math.sin(a)}" x2="${120+109*Math.cos(a)}" y2="${120+109*Math.sin(a)}" stroke="var(--muted)" stroke-width="${major?1.7:.65}"/>`;}for(let i=0;i<60;i++){const a=(i*6-90)*Math.PI/180,major=i%5===0;marks+=`<line x1="${120+(major?58:62)*Math.cos(a)}" y1="${120+(major?58:62)*Math.sin(a)}" x2="${120+67*Math.cos(a)}" y2="${120+67*Math.sin(a)}" stroke="var(--muted)" stroke-width="${major?2:1}"/>`;}return marks}
function renderRadar(p){const ms=total(p,true),angle=(ms/10000)%360,active=running(p),second=(ms/1000)%60;main.innerHTML=header('Radar Espacial do Tempo',esc(p.name))+`<section class="panel"><p class="radar-status" id="radarStatus">${active?'● Ponto em andamento — radar ativo':'○ Ponto parado'}</p><svg class="radar" viewBox="0 0 240 240" role="img" aria-label="Radar com 360 graus externos e 60 segundos internos"><circle cx="120" cy="120" r="96" fill="none" stroke="var(--line)" stroke-width="1.5"/><circle cx="120" cy="120" r="70" fill="none" stroke="var(--line)" stroke-width="1.5"/>${radarMarks()}<circle id="radarArc" cx="120" cy="120" r="94" fill="none" stroke="var(--color-4)" stroke-width="3" stroke-dasharray="${2*Math.PI*94}" stroke-dashoffset="${2*Math.PI*94*(1-angle/360)}" transform="rotate(-90 120 120)"/><g id="radarHand" transform="rotate(${second*6} 120 120)"><line x1="120" y1="137" x2="120" y2="52" stroke="var(--color-4)" stroke-width="2.5" stroke-linecap="round"/></g><circle cx="120" cy="120" r="5" fill="var(--color-4)"/><text id="radarAngle" x="120" y="151" text-anchor="middle" font-size="14" font-weight="800">${Math.floor(angle)}°</text></svg><p class="muted" style="text-align:center">Anel interno: 60 segundos, com ponteiro contínuo. Anel externo: 360 graus, 1° a cada 10 segundos.</p><div class="grid">${metric(`<span id="radarTotal">${duration(ms)}</span>`,'Tempo total')}${metric('10.000 h','Meta de maestria')}${metric(`<span id="radarRemaining">${hours(Math.max(0,36000000000-ms))} h</span>`,'Horas restantes')}</div><h3 style="margin-top:20px">Maestria: <span id="radarMastery">${(ms/36000000000*100).toFixed(4)}%</span></h3><div class="progress"><span id="radarProgress" style="width:${Math.min(100,ms/360000000)}%"></span></div></section>`}
function liveTick(){const p=project();if(!p)return;if(page==='ponto'&&p.pointSession?.status==='running'){const el=$('#pointElapsed');if(el)el.textContent=duration(now()-p.pointSession.start)}const ms=total(p,true);if(page==='habitos'){document.querySelectorAll('[data-pomodoro]').forEach(el=>{const h=p.habits.find(x=>x.id===el.dataset.pomodoro);if(!h?.timer)return;const t=h.timer,elapsed=Math.min(h.minutes*60000,(t.elapsed||0)+(t.runningSince?Math.max(0,now()-t.runningSince):0));el.textContent=duration(Math.max(0,h.minutes*60000-elapsed));const bar=document.querySelector(`[data-pomodoro-progress="${h.id}"]`);if(bar)bar.style.width=`${100*elapsed/(h.minutes*60000)}%`})}if(page==='radar'){
 const arc=$('#radarArc');if(!arc)return;const angle=(ms/10000)%360,c=2*Math.PI*94;
 arc.setAttribute('stroke-dashoffset',String(c*(1-angle/360)));
 $('#radarHand')?.setAttribute('transform',`rotate(${(ms/1000)%60*6} 120 120)`);
 $('#radarAngle').textContent=`${Math.floor(angle)}°`;
 $('#radarTotal').textContent=duration(ms);
 $('#radarRemaining').textContent=`${hours(Math.max(0,36000000000-ms))} h`;
 $('#radarMastery').textContent=`${(ms/36000000000*100).toFixed(4)}%`;
 $('#radarProgress').style.width=`${Math.min(100,ms/360000000)}%`;
 $('#radarStatus').textContent=running(p)?'● Ponto em andamento — radar ativo':'○ Ponto parado';
 }else if(page==='inicio'){
 const value=$('#homeLiveTotal');if(value)value.textContent=duration(ms);
 }}
setInterval(liveTick,250);

function newProject(){show(`<h2>Novo Projeto</h2><form id="projectForm"><label class="field">Nome do projeto (até 50 caracteres)<input name="name" maxlength="50" required autofocus></label><div class="modal-actions">${btn('Cancelar','cancel') }<button class="btn primary" type="submit">Criar projeto</button></div></form>`);$('#projectForm').onsubmit=e=>{e.preventDefault();const name=e.target.elements.name.value.trim();if(!name)return;const p={id:uid(),name:name.slice(0,50),created:now(),records:[],habits:[]};state.projects.push(p);state.active=p.id;if(save()){close();page='inicio';render()}}}
function rename(id){const p=state.projects.find(p=>p.id===id);if(!p)return;show(`<h2>Renomear projeto</h2><form id="renameForm"><label class="field">Nome<input name="name" maxlength="50" required value="${esc(p.name)}"></label><div class="modal-actions">${btn('Cancelar','cancel')}<button class="btn primary" type="submit">Salvar</button></div></form>`);$('#renameForm').onsubmit=e=>{e.preventDefault();const n=e.target.elements.name.value.trim();if(!n)return;p.name=n.slice(0,50);save();close();render()}}
function point(){
 if(!project()){toast('Abra um projeto antes de registrar um ponto.');page='projetos'}
 else page='ponto';
 close();render();
}
function renderPoint(p){
 const session=p.pointSession;
 const title=header('Ponto',esc(p.name));
 if(!session){
  main.innerHTML=title+`<section class="panel"><h2>Iniciar trabalho</h2><p class="help">Informe o nome da atividade. A data e a hora serão registradas automaticamente ao iniciar.</p><form id="pointForm"><label class="field">Nome do trabalho (até 50 caracteres)<input name="name" maxlength="50" required autocomplete="off" placeholder="Ex.: Desenvolvimento do aplicativo"></label><div class="actions"><button class="btn primary" type="submit">▶ Iniciar</button></div></form></section>`;
  $('#pointForm').onsubmit=e=>{e.preventDefault();const name=e.currentTarget.elements.name.value.trim().slice(0,50);if(!name)return;const draft={name,start:now(),status:'running'};p.pointSession=draft;if(!save()){delete p.pointSession;return}render();toast('Ponto iniciado. Você pode navegar pelo aplicativo.')};
  return;
 }
 if(session.status==='running'){
  main.innerHTML=title+`<section class="panel"><h2>Trabalho em andamento</h2><p><strong>${esc(session.name)}</strong></p><p class="help">Início: ${stamp(session.start)}. O ponto permanece salvo mesmo que você saia desta página ou feche o aplicativo.</p><div class="modal-time" id="pointElapsed" role="timer" aria-label="Tempo decorrido">${duration(now()-session.start)}</div><div class="actions"><button class="btn primary" id="pointStop" type="button">■ Terminar e salvar</button></div><p class="help">Ao terminar, o registro será incluído automaticamente no Meu Dia, inclusive se atravessar a meia-noite.</p></section>`;
  $('#pointStop').onclick=()=>{const end=now();if(!Number.isFinite(session.start)||end<=session.start){alert('O horário de início do ponto é inválido.');return}if(!ask('Terminar este trabalho e salvar no Meu Dia?'))return;const record={id:uid(),type:'activity',name:session.name.slice(0,50),start:session.start,end,note:'',source:'point'};p.records.push(record);delete p.pointSession;if(!save()){p.records=p.records.filter(r=>r.id!==record.id);p.pointSession=session;return}render();toast('Trabalho concluído e salvo no Meu Dia')};
  return;
 }
 // Compatibilidade com pontos interrompidos pela versão anterior.
 if(session.status==='stopped'){
  main.innerHTML=title+`<section class="panel"><h2>Trabalho encerrado, aguardando gravação</h2><p><strong>${esc(session.name)}</strong></p><p>Início: ${stamp(session.start)}</p><p>Término: ${stamp(session.end)}</p><div class="modal-time">${duration(session.end-session.start)}</div><div class="actions"><button class="btn primary" id="pointFinish" type="button">✓ Salvar no Meu Dia</button></div></section>`;
  $('#pointFinish').onclick=()=>{if(!Number.isFinite(session.start)||!Number.isFinite(session.end)||session.end<=session.start){alert('Horários inválidos.');return}const record={id:uid(),type:'activity',name:session.name.slice(0,50),start:session.start,end:session.end,note:'',source:'point'};p.records.push(record);delete p.pointSession;if(!save()){p.records=p.records.filter(r=>r.id!==record.id);p.pointSession=session;return}render();toast('Trabalho salvo')};
 }
}

function manual(){
 const p=project();
 if(!p){show('<h2>Entrada manual (retroativa)</h2><p>Selecione um projeto em Meus Projetos antes de lançar uma atividade.</p><div class="modal-actions"><button class="btn" data-action="cancel">Fechar</button></div>');return;}
 const d=new Date();
 const months=['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
 const timeOptions=(max,selected)=>Array.from({length:max},(_,i)=>`<option value="${i}" ${i===selected?'selected':''}>${pad(i)}</option>`).join('');
 const dateFields=(prefix,title)=>`<fieldset><legend>${title}</legend><div class="form-grid"><label class="field">Dia<input name="${prefix}Day" type="number" min="1" max="31" value="${d.getDate()}" required></label><label class="field">Mês<select name="${prefix}Month">${months.map((m,i)=>`<option value="${i}" ${i===d.getMonth()?'selected':''}>${m}</option>`).join('')}</select></label><label class="field">Ano<input name="${prefix}Year" type="number" min="1970" max="9999" value="${d.getFullYear()}" required></label></div><div class="form-grid two"><label class="field">Hora (24h)<select name="${prefix}Hour">${timeOptions(24,d.getHours())}</select></label><label class="field">Minuto<select name="${prefix}Minute">${timeOptions(60,prefix==='start'?Math.max(0,d.getMinutes()-1):d.getMinutes())}</select></label></div></fieldset>`;
 show(`<h2>Entrada manual (retroativa)</h2><form id="manualForm"><label class="field">Título da atividade (máximo 50 caracteres)<input name="name" maxlength="50" required placeholder="O que você realizou?"></label>${dateFields('start','Data e horário de início')}${dateFields('end','Data e horário de término')}<p class="help">O término pode ocorrer no mesmo dia ou em um dia posterior. O tempo será contabilizado em cada dia efetivamente trabalhado.</p><div class="modal-actions">${btn('Cancelar','cancel')}<button class="btn primary" type="submit">Lançar entrada</button></div></form>`);
 const f=$('#manualForm');
 f.onsubmit=e=>{
  e.preventDefault();const x=f.elements,name=x.name.value.trim().slice(0,50);
  const parseDate=prefix=>{
   const year=Number(x[prefix+'Year'].value),month=Number(x[prefix+'Month'].value),day=Number(x[prefix+'Day'].value),hour=Number(x[prefix+'Hour'].value),minute=Number(x[prefix+'Minute'].value);
   if(!Number.isInteger(year)||year<1970||year>9999||!Number.isInteger(month)||month<0||month>11||!Number.isInteger(day)||day<1||day>31||!Number.isInteger(hour)||hour<0||hour>23||!Number.isInteger(minute)||minute<0||minute>59)return null;
   const date=new Date(0);date.setFullYear(year,month,day);date.setHours(hour,minute,0,0);
   if(date.getFullYear()!==year||date.getMonth()!==month||date.getDate()!==day||date.getHours()!==hour||date.getMinutes()!==minute)return null;
   return date.getTime();
  };
  const start=parseDate('start'),end=parseDate('end');
  if(!name||start===null||end===null||end<=start||end>now()){
   alert('Verifique o título, as datas e os horários. O término deve ser posterior ao início e não pode estar no futuro.');return;
  }
  addRecord(p,{type:'activity',name,start,end,note:'',source:'manual'});close();
 };
}
function newHabit(){const p=project();show(`<h2>Criar hábito</h2><form id="habitForm"><label class="field">Nome do hábito<input name="name" maxlength="50" required></label><label class="field">Duração estipulada (minutos)<input name="minutes" type="number" min="1" max="1440" value="30" required></label><div class="modal-actions">${btn('Cancelar','cancel')}<button class="btn primary" type="submit">Criar hábito</button></div></form>`);$('#habitForm').onsubmit=e=>{e.preventDefault();const x=e.target.elements,name=x.name.value.trim(),minutes=+x.minutes.value;if(!name||!Number.isInteger(minutes)||minutes<1||minutes>1440)return;p.habits.push({id:uid(),name:name.slice(0,50),minutes});save();close();render()}}
function runHabit(id){const p=project(),h=p.habits.find(h=>h.id===id);if(!h)return;show(`<h2>Concluir hábito</h2><p><strong>${esc(h.name)}</strong> · ${h.minutes} minutos</p><p class="help">O intervalo será registrado retroativamente, terminando no momento da confirmação. Confirme apenas se realizou o hábito durante esse período.</p><form id="runForm"><label class="field">Observação (opcional)<textarea name="note" maxlength="50"></textarea><small id="count">0/50</small></label><div class="modal-actions">${btn('Cancelar','cancel')}<button class="btn primary" type="submit">Confirmar conclusão</button></div></form>`);const f=$('#runForm');f.elements.note.oninput=()=>$('#count').textContent=`${f.elements.note.value.length}/50`;f.onsubmit=e=>{e.preventDefault();const end=now();addRecord(p,{type:'habit',habitId:h.id,name:h.name,start:end-h.minutes*60000,end,note:f.elements.note.value.slice(0,50),source:'habit'});close()}}
function backup(){const payload={app:'Impulso',version:1,exportedAt:new Date().toISOString(),data:state};const blob=new Blob([JSON.stringify(payload,null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=`impulso-backup-${dateKey(now())}.json`;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)}
function exportProject(){
 const p=project();
 if(!p){toast('Abra um projeto antes de exportar.');return}
 const payload={app:'Impulso',version:1,kind:'project',exportedAt:new Date().toISOString(),project:structuredClone(p)};
 const slug=p.name.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,45)||'projeto';
 const blob=new Blob([JSON.stringify(payload,null,2)],{type:'application/json'});
 const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;
 a.download=`impulso-projeto-${slug}-${dateKey(now())}.json`;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
}
function importProject(file){
 if(!file)return;
 if(file.size>40*1024*1024){alert('Arquivo maior que 40 MB.');return}
 const reader=new FileReader;
 reader.onload=()=>{
  try{
   const payload=JSON.parse(reader.result);
   if(!payload||payload.app!=='Impulso'||payload.version!==1||payload.kind!=='project'||!payload.project||typeof payload.project!=='object')throw Error('Selecione um projeto individual exportado pelo Impulso.');
   // Reutiliza as mesmas verificações estruturais usadas na restauração geral.
   validate({app:'Impulso',version:1,data:{projects:[payload.project]}});
   const imported=structuredClone(payload.project);
   normalize(imported);
   if(state.projects.length>=10000)throw Error('Limite de projetos atingido.');
   const collision=state.projects.some(p=>p.id===imported.id);
   if(!ask(collision?`O projeto "${imported.name}" já possui o mesmo identificador de um projeto existente. Importar uma cópia independente, sem substituir o original?`:`Importar o projeto "${imported.name}" sem apagar os projetos existentes?`))return;
   // Cada importação cria um projeto independente, mesmo ao importar o mesmo arquivo novamente.
   imported.id=uid();
   const previous=state.active;
   state.projects.push(imported);
   state.active=imported.id;
   if(!save()){state.projects.pop();state.active=previous;return}
   page='inicio';render();toast('Projeto importado com sucesso');
  }catch(e){alert('Falha ao importar projeto: '+e.message)}
 };
 reader.onerror=()=>alert('Não foi possível ler o arquivo.');
 reader.readAsText(file);
}
function validate(o){if(o?.kind==='project')throw Error('Este arquivo contém apenas um projeto. Restaurar Backup aceita somente um Backup Geral.');if(!o||o.app!=='Impulso'||o.version!==1||!o.data||!Array.isArray(o.data.projects)||o.data.projects.length>10000)throw Error('Backup inválido ou incompatível');const ids=new Set;for(const p of o.data.projects){if(typeof p.id!=='string'||ids.has(p.id)||typeof p.name!=='string'||p.name.length>50||!Array.isArray(p.records)||!Array.isArray(p.habits))throw Error('Estrutura de projeto inválida');ids.add(p.id);if(p.records.length>200000||p.habits.length>20000)throw Error('Backup excede os limites');if(p.pointSession!==undefined){const q=p.pointSession;if(!q||typeof q.name!=='string'||!q.name.trim()||q.name.length>50||typeof(q.note??'')!=='string'||(q.note||'').length>50||!Number.isFinite(q.start)||q.start<0||!['running','stopped'].includes(q.status)||(q.status==='stopped'&&(!Number.isFinite(q.end)||q.end<=q.start)))throw Error('Ponto em andamento inválido')}for(const r of p.records){if(typeof r.id!=='string'||!['start','end','habit','activity'].includes(r.type)||!Number.isFinite(r.start)||r.start<0||r.start>8640000000000000||(r.end!==undefined&&(!Number.isFinite(r.end)||r.end<r.start))||typeof(r.note??'')!=='string'||(r.note||'').length>50)throw Error('Registro inválido')}for(const h of p.habits){if(typeof h.id!=='string'||typeof h.name!=='string'||h.name.length>50||!Number.isInteger(h.minutes)||h.minutes<1||h.minutes>1440)throw Error('Hábito inválido')}}return o.data}
function importBackup(file){if(!file)return;if(file.size>40*1024*1024){alert('Arquivo maior que 40 MB.');return}const reader=new FileReader;reader.onload=()=>{try{const data=validate(JSON.parse(reader.result));if(!ask('Restaurar este backup substituirá TODOS os projetos atuais. Deseja continuar?'))return;const old=state;state=data;state.projects.forEach(normalize);if(!project())state.active=state.projects[0]?.id||null;if(!save()){state=old;return}page='inicio';render();toast('Backup restaurado')}catch(e){alert('Falha ao importar: '+e.message)}};reader.readAsText(file)}
function printReport(projectsOnly=false,selectedDay=null){
 const previous=main.innerHTML,p=project();
 if(projectsOnly){main.innerHTML=header('Lista de projetos',`Emitido em ${stamp(now())}`)+`<section class="panel">${state.projects.map(x=>`<p><strong>${esc(x.name)}</strong> — ${stamp(x.created)} — ${mins(total(x))}</p>`).join('')}</section>`}
 else if(p){
  const groups=dayGroups(p);
  if(selectedDay&&!/^\d{2}-\d{2}-\d{4}$/.test(selectedDay))return;
  if(selectedDay&&!groups.has(selectedDay)){toast('Nenhum registro para imprimir nesta data.');return}
  const days=[...groups.keys()].filter(d=>!selectedDay||d===selectedDay).sort((a,b)=>a.split('-').reverse().join('-').localeCompare(b.split('-').reverse().join('-')));
  const summary=selectedDay?`<section class="panel"><h2>Resumo do dia</h2><div class="grid">${metric(mins(dayTotal(p,selectedDay)),'Tempo trabalhado no dia')}${metric(groups.get(selectedDay).length,'Registros do dia')}</div></section>`:`<section class="panel"><h2>Resumo do projeto</h2><div class="grid">${metric(mins(total(p)),'Tempo acumulado')}${metric(p.records.filter(r=>r.type==='habit').length,'Hábitos realizados')}${metric(bossStatus(p).done+'/'+BOSS_COUNT,'Chefões derrotados')}${metric((total(p)/36000000000).toFixed(3)+'%','Maestria')}</div></section>`;
  main.innerHTML=header(selectedDay?`Meu Dia ${selectedDay} — ${esc(p.name)}`:`Relatório — ${esc(p.name)}`,`Emitido em ${stamp(now())}`)+summary+days.map(day=>`<section class="day"><div class="day-head"><h2>Meu Dia ${day}</h2><strong>Total trabalhado: ${mins(dayTotal(p,day))}</strong></div><table><thead><tr><th>Atividade</th><th>Nome</th><th>Início</th><th>Término</th></tr></thead><tbody>${groups.get(day).sort((a,b)=>a.start-b.start).map(r=>`<tr><td>${recordKind(r)}</td><td>${esc(recordName(r))}${r.end>r.start&&dateKey(r.start)!==dateKey(r.end)?`<div class="muted">Neste dia: ${mins(dayPart(r,day))} · Total da atividade: ${duration(r.end-r.start)}</div>`:""}</td><td>${r.type==='legacyEnd'?'—':stamp(r.start)}</td><td>${r.end?stamp(r.end):r.type==='legacyEnd'?stamp(r.start):'—'}</td></tr>`).join('')}</tbody></table></section>`).join('');
 }else return;
 const restore=()=>{window.removeEventListener('afterprint',restore);render()};
 window.addEventListener('afterprint',restore);
 window.print();
 setTimeout(()=>{if(main.innerHTML!==previous)restore()},1500);
}
function about(){
 show(`<div class="about-content"><h2>Sobre o Impulso</h2><p><strong>Impulso — Motor de Produtividade Pessoal</strong></p><p>Versão 24 · PWA offline-first para acompanhar projetos independentes, trabalho, hábitos e a jornada simbólica de 10.000 horas.</p><p>Os registros são armazenados neste navegador. Para preservar seus dados, utilize regularmente <strong>Guardar</strong> (backup geral) e exporte seus projetos.</p><p>Em <strong>Meu Dia</strong>, atividades que atravessam a meia-noite aparecem em todos os dias envolvidos. O tempo de cada dia é calculado separadamente, enquanto o Histórico mantém o registro original.</p><p>O aplicativo inclui Ponto, Entrada Manual, Hábitos, Radar e Arena com 100 chefões. O progresso não é uma garantia de domínio profissional.</p><p><a href="https://github.com/magpe-stack/Impulso" target="_blank" rel="noopener noreferrer">Repositório GitHub</a> · <a href="https://github.com/magpe-stack/Impulso/blob/main/README.md" target="_blank" rel="noopener noreferrer">Manual de uso</a></p><div class="actions"><button class="btn primary" type="button" data-cancel>Fechar</button></div></div>`);
}
function action(name){switch(name){case 'new':newProject();break;case 'projects':page='projetos';render();break;case 'day':page='dia';render();break;case 'radar':page='radar';render();break;case 'point':point();break;case 'manual':manual();break;case 'habitPage':page='habitos';render();break;case 'backup':backup();break;case 'export':exportProject();break;case 'import':$('#importFile').click();break;case 'importProject':$('#importProjectFile').click();break;case 'print':printReport();break;case 'printProjects':printReport(true);break;case 'newHabit':newHabit();break;case 'cancel':close();break}}
const menuToggle=$('#menuToggle'),menuDrawer=$('#menuDrawer'),menuBackdrop=$('#menuBackdrop'),menuClose=$('#menuClose');
function setMenu(open){menuDrawer.classList.toggle('open',open);menuDrawer.setAttribute('aria-hidden',String(!open));menuDrawer.inert=!open;menuBackdrop.hidden=!open;menuToggle.setAttribute('aria-expanded',String(open));menuToggle.setAttribute('aria-label',open?'Fechar menu':'Abrir menu');document.body.classList.toggle('menu-open',open);if(open)menuClose.focus();else if(menuDrawer.contains(document.activeElement))menuToggle.focus()}
menuToggle.addEventListener('click',()=>setMenu(!menuDrawer.classList.contains('open')));menuClose.addEventListener('click',()=>setMenu(false));menuBackdrop.addEventListener('click',()=>setMenu(false));document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menuDrawer.classList.contains('open')){e.preventDefault();setMenu(false)}if(e.key==='Tab'&&menuDrawer.classList.contains('open')){const focusable=[...menuDrawer.querySelectorAll('button:not([disabled]),a[href]')];const first=focusable[0],last=focusable[focusable.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}});
document.querySelector('.brand')?.addEventListener('click',e=>{if(location.origin==='https://magpe-stack.github.io'&&location.pathname.replace(/\/$/,'')==='/Impulso'){e.preventDefault();history.replaceState(null,'','/Impulso/#inicio');setMenu(false);page='inicio';render()}});
document.addEventListener('click',e=>{const el=e.target.closest('[data-action],[data-page],[data-open],[data-rename],[data-delete-project],[data-delete-record],[data-delete-pair],[data-run-habit],[data-habit-control],[data-delete-habit],[data-print-day]');if(!el)return;if(menuDrawer.contains(el))setMenu(false);if(el.dataset.printDay){printReport(false,el.dataset.printDay);return}if(el.dataset.action){action(el.dataset.action);return}if(el.dataset.page){page=el.dataset.page;render();return}if(el.dataset.open){state.active=el.dataset.open;save();page='inicio';render();return}if(el.dataset.rename){rename(el.dataset.rename);return}if(el.dataset.deleteProject){if(!ask('Excluir este projeto e TODOS os seus registros, hábitos e progresso? Esta ação não pode ser desfeita.'))return;state.projects=state.projects.filter(p=>p.id!==el.dataset.deleteProject);if(!project())state.active=state.projects[0]?.id||null;save();render();return}if(el.dataset.deletePair){const ids=el.dataset.deletePair.split('|'),p=project();if(!p||!ask('Excluir este ponto antigo e seus registros de início e término?'))return;p.records=p.records.filter(r=>!ids.includes(r.id));save();render();return}if(el.dataset.deleteRecord){delRecord(el.dataset.deleteRecord);return}if(el.dataset.habitControl){habitControl(el.dataset.habitControl,el.dataset.mode);return}if(el.dataset.runHabit){runHabit(el.dataset.runHabit);return}if(el.dataset.deleteHabit){const p=project(),id=el.dataset.deleteHabit;if(!ask('Excluir este hábito? As execuções já registradas permanecerão no histórico e poderão ser excluídas individualmente.'))return;p.habits=p.habits.filter(h=>h.id!==id);save();render()}});
document.addEventListener('change',e=>{if(e.target.id==='order'){order=e.target.value;render()}});$('#importFile').addEventListener('change',e=>{importBackup(e.target.files[0]);e.target.value=''});$('#importProjectFile').addEventListener('change',e=>{importProject(e.target.files[0]);e.target.value=''});$('#about').onclick=()=>{setMenu(false);about()};$('#theme').onclick=()=>{document.body.classList.toggle('dark');localStorage.setItem(THEME,document.body.classList.contains('dark')?'dark':'light');$('#theme').setAttribute('aria-pressed',String(document.body.classList.contains('dark')))};$('#fullscreen').onclick=()=>{if(document.fullscreenElement)document.exitFullscreen?.();else document.documentElement.requestFullscreen?.().catch(()=>toast('Tela cheia indisponível neste navegador'))};if(localStorage.getItem(THEME)==='dark')document.body.classList.add('dark');$('#theme').setAttribute('aria-pressed',String(document.body.classList.contains('dark')));document.addEventListener('fullscreenchange',()=>$('#fullscreen').setAttribute('aria-label',document.fullscreenElement?'Sair da tela cheia':'Entrar em tela cheia'));modal.addEventListener('click',e=>{if(e.target===modal)close()});render();
// Progresso calculado em tempo real: independe do disparo de animações CSS.
(function startSplash(){
 const splash=document.getElementById('splash');
 if(!splash)return;
 const ring=splash.querySelector('.splash-fill');
 const word=splash.querySelector('.splash-wordmark');
 const duration=4000;
 const started=performance.now();
 function frame(time){
  if(!splash.isConnected)return;
  const progress=Math.max(0,Math.min(1,(time-started)/duration));
  if(ring){ring.style.animation='none';ring.style.strokeDasharray='100';ring.style.strokeDashoffset=String(100-100*progress)}
  if(word){word.style.animation='none';word.style.opacity=String(Math.min(1,Math.max(0,(progress-.12)/.28)));}
  if(progress<1){requestAnimationFrame(frame)}else{
   splash.classList.add('hide');
   setTimeout(()=>splash.remove(),400);
  }
 }
 requestAnimationFrame(frame);
 // Evita splash preso caso a aba fique em segundo plano durante a inicialização.
 setTimeout(()=>{if(splash.isConnected){splash.classList.add('hide');setTimeout(()=>splash.remove(),400)}},5000);
})();
if('serviceWorker'in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));
})();
