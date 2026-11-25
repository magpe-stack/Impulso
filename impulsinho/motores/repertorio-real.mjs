// Seleção por acontecimento, sem inventar conquistas nem usar gestos bloqueados.
const grupos={
 saudacao:['u1f44b','u1f590','u1f596'],
 conquista:['u1f44f','u270c','u1f44d','u1f44c','u270a'],
 recompensa:['u1faf6','u1faf0','u1f91f','u1f64c','u270c'],
 incentivo:['u1f4aa','u270a','u1f44a','u1f91b','u1f91c'],
 pausa:['u1faf4','u1faf3','u1f450'],
 apoio:['u1f450','u1f932','u1faf4','u1f64f'],
 dica:['u261d','u1f91a'],
 escrita:['u270d','u1f44c'],
 surpresa:['u1f450','u1f932','u1faf4'],
 confirmacao:['u1f44d','u1f44c','u1f590']
};
const tipos={abertura:'saudacao','projeto-aberto':'saudacao','projeto-novo':'confirmacao',entrada:'confirmacao',backup:'confirmacao','backup-restaurado':'confirmacao','elixir-copiado':'confirmacao','ponto-fim':'conquista','foco-fim':'conquista',habito:'conquista','foco-resultado-yes':'conquista',elixir:'recompensa',cofre:'recompensa',meta:'recompensa','visao-completa':'recompensa',chefao:'conquista','ponto-inicio':'incentivo','foco-inicio':'incentivo','foco-retomado':'incentivo','pomodoro-start':'incentivo','pomodoro-resume':'incentivo','habito-equipado':'incentivo','foco-pausado':'pausa','pomodoro-pause':'pausa','foco-descartado':'apoio','foco-resultado-no':'apoio','pomodoro-reset':'apoio',dica:'dica','projeto-renomeado':'escrita','habito-novo':'escrita','visao-revelada':'surpresa'};
const grandes=new Set(['chefao','meta','visao-completa','cofre']);
const preferencias={mentor:['u1f44c','u261d','u1f932','u1f44d'],guerreiro:['u1f4aa','u270a','u1f44a','u270c'],divertido:['u1f596','u1faf0','u1f91f','u1f44f'],discreto:['u1f44c','u1f44d','u1faf4','u1f44b']};
export function criarRepertorio(catalogo){
 const validos=new Set(catalogo.gestos.filter(g=>g.gesto.renderizar_producao&&(g.politica==='elegivel'||g.politica==='contextual')).map(g=>g.id));
 const ultimos=new Map();
 return {planejar(tipo,base,perfil='mentor',{ativo=false, reduzido=false, pendentes=0}={}){
 const grupo=tipos[tipo];let pool=[...new Set([base,...(grupos[grupo]||[])])].filter(id=>validos.has(id));
 if(!pool.length)return [];
 const chave=tipo+':'+perfil;const anterior=ultimos.get(chave);const preferidos=preferencias[perfil]||preferencias.mentor;
 pool.sort((a,b)=>Number(preferidos.includes(b))-Number(preferidos.includes(a)));
 const indice=pool.indexOf(anterior);const primeiro=pool[(indice+1)%pool.length];ultimos.set(chave,primeiro);
 const grande=grandes.has(tipo);const passos=[{id:primeiro,duracao:perfil==='discreto'||ativo?1600:grande?2600:2100}];
 if(grande&&!ativo&&!reduzido&&perfil!=='discreto'&&pendentes<3){const segundo=['u1f64c','u270c','u1faf6','u1f44f'].find(id=>id!==primeiro&&validos.has(id));if(segundo)passos.push({id:segundo,duracao:2300});}
 return passos;
 }};
}
