import {cenas} from './motor-emocional.mjs';
export function criarMemoria({armazenamento, agora=Date.now, chave='impulso.impulsinho.memoria.v1'}={}){
 if(armazenamento===undefined){try{armazenamento=globalThis.localStorage;}catch{}}
 const vazio=()=>({versao:1,indices:{},tempos:{},recentes:[]});
 let dados=vazio(), persistente=false;
 const valido=t=>Number.isSafeInteger(t)&&t>=0&&t<=agora();
 try{const raw=armazenamento?.getItem(chave); if(raw&&raw.length<=32768){const d=JSON.parse(raw);if(d?.versao===1){for(const k of Object.keys(cenas)){if(Number.isSafeInteger(d.indices?.[k])&&d.indices[k]>=0)dados.indices[k]=d.indices[k]%1000000;}for(const k of ['dica','espontaneo','contextual'])if(valido(d.tempos?.[k]))dados.tempos[k]=d.tempos[k];if(Array.isArray(d.recentes))dados.recentes=d.recentes.filter(r=>r&&Object.hasOwn(cenas,r.evento)&&valido(r.t)&&agora()-r.t<=604800000).slice(-40).map(({evento,t})=>({evento,t}));}}persistente=!!armazenamento;}catch{}
 function salvar(){try{if(!armazenamento)return false;armazenamento.setItem(chave,JSON.stringify(dados));return persistente=true;}catch{return persistente=false;}}
 return {indice(k){return Object.hasOwn(cenas,k)?dados.indices[k]||0:0;},avancar(k){if(!Object.hasOwn(cenas,k))return false;dados.indices[k]=((dados.indices[k]||0)+1)%1000000;salvar();return true;},registrar(evento){if(!Object.hasOwn(cenas,evento))return false;const t=agora();dados.recentes=dados.recentes.filter(r=>t-r.t<=604800000).slice(-39);dados.recentes.push({evento,t});salvar();return true;},marcar(k){if(!['dica','espontaneo','contextual'].includes(k))return false;dados.tempos[k]=agora();salvar();return true;},decorrido(k){const t=dados.tempos[k];return Number.isFinite(t)?Math.max(0,agora()-t):Infinity;},snapshot(){return JSON.parse(JSON.stringify(dados));},status(){return {persistente};},limpar(){dados=vazio();try{if(!armazenamento)return false;armazenamento.removeItem(chave);return true;}catch{persistente=false;return false;}}};
}
