import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {criarRepertorio} from './repertorio-real.mjs';
import {selecionar} from './motor-corporal.mjs';
const c=JSON.parse(readFileSync(new URL('./catalogo-gestual.json',import.meta.url)));const r=criarRepertorio(c);
const a=Array.from({length:5},()=>r.planejar('habito','u1f44f')[0].id);assert.equal(new Set(a).size,5);
assert.equal(r.planejar('chefao','u1f4aa','guerreiro').length,3);
for(const op of [{ativo:true},{reduzido:true},{pendentes:3}])assert.equal(r.planejar('chefao','u1f4aa','mentor',op).length,1);
assert.equal(r.planejar('chefao','u1f4aa','discreto').length,1);
assert.notEqual(criarRepertorio(c).planejar('habito','u1f44f','mentor')[0].id,criarRepertorio(c).planejar('habito','u1f44f','guerreiro')[0].id);
assert.deepEqual(r.planejar('desconhecido','u1f595'),[]);
for(const tipo of ['habito','chefao','cofre','meta','dica','abertura','foco-descartado'])for(let i=0;i<10;i++)for(const p of r.planejar(tipo,'u1f44d')){const g=c.gestos.find(x=>x.id===p.id);assert.equal(selecionar(c,g.gesto.evento_proposto,{contexto:true,ids:[p.id]}).length,1);}
console.log('Repertório: testes aprovados');
