/* Oráculo: respostas editoriais locais, sem geração de fatos. */
(()=>{'use strict';
const norm=s=>String(s??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9 ]/g,' ').replace(/\s+/g,' ').trim();
const stop=new Set('a o as os um uma de do da dos das e em no na nos nas por para com que qual quais eu voce me se isso esse essa este esta ao'.split(' '));
const tokens=s=>[...new Set(norm(s).split(' ').filter(w=>w&&!stop.has(w)))];
function near(a,b){if(a===b)return true;if(Math.min(a.length,b.length)<5||Math.abs(a.length-b.length)>1)return false;let i=0,j=0,n=0;while(i<a.length&&j<b.length){if(a[i]===b[j]){i++;j++;continue}if(++n>1)return false;if(a.length>=b.length)i++;if(b.length>=a.length)j++;}return n+a.length-i+b.length-j<=1;}
function build(data){const rows=data.perguntas;if(!Array.isArray(rows)||rows.length!==data.total||!rows.length||new Set(rows.map(r=>r.id)).size!==rows.length||rows.some(r=>!r.pergunta||!r.resposta||!Array.isArray(r.variacoes)||!Array.isArray(r.palavras_chave)))throw Error('Base inválida');
const exact=new Map(),docs=rows.map(r=>{const forms=[...new Set([r.pergunta,...r.variacoes,...r.palavras_chave].map(norm).filter(Boolean))];for(const f of forms){if(!exact.has(f))exact.set(f,new Set());exact.get(f).add(r);}return {r,forms:forms.map(tokens)};});
const result=r=>({id:r.id,text:r.resposta,title:r.pergunta});
return q=>{const n=norm(q),direct=exact.get(n);if(direct?.size===1)return result([...direct][0]);if(direct?.size>1)return {ambiguous:true};const words=tokens(n);if(words.length<2)return null;
const ranked=docs.map(({r,forms})=>{let score=0;for(const f of forms){if(!f.length)continue;const used=new Set();let hits=0;for(const w of words){let i=f.findIndex((v,i)=>!used.has(i)&&v===w);if(i<0)i=f.findIndex((v,i)=>!used.has(i)&&near(w,v));if(i>=0){used.add(i);hits+=f[i]===w?1:.85;}}const precision=hits/words.length,recall=hits/f.length;if(hits>=1.85&&precision>=.8&&recall>=.7)score=Math.max(score,2*precision*recall/(precision+recall));}return {r,score};}).sort((a,b)=>b.score-a.score);if(ranked[0].score<.83)return null;if(ranked[0].score-ranked[1].score<.08)return {ambiguous:true};return result(ranked[0].r);};}
let engine=null;const ready=typeof document==='undefined'?Promise.resolve():fetch('impulsinho/oraculo.json?v=133').then(r=>{if(!r.ok)throw Error('Base indisponível');return r.json()}).then(data=>{engine=build(data)}).catch(()=>{});
async function ask(q){await ready;return engine?engine(q):{unavailable:true};}
const api={ask,build};if(typeof module!=='undefined'&&module.exports)module.exports=api;else window.OraculoImpulso=api;
})();
