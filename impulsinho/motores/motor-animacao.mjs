const perfis = Object.freeze({
  sessao_iniciada:'aceno', chefao_derrotado:'celebracao', conquista_desbloqueada:'celebracao', progresso_confirmado:'incentivo', habito_concluido:'incentivo', tutorial_alvo_visivel:'apontamento', dica_exibida:'apontamento', cumprimento_explicito:'cumprimento', recompensa_liberada:'celebracao', pausa_solicitada:'suave'
});
export function quadros(evento, lado=1){
 const perfil=perfis[evento] || 'suave';
 const seq={aceno:[0,12,-12,8,0],celebracao:[0,-8,8,-5,0],incentivo:[0,-6,6,0],apontamento:[0,5,0],cumprimento:[0,5,0],suave:[0,0]};
 return seq[perfil].map((r,i,a)=>({transform:`scale(${i===0||i===a.length-1?.88:.76}) rotate(${r*lado}deg)`,opacity:i===0||i===a.length-1?0:1,offset:i/(a.length-1)}));
}
export function criarAnimador({preferencia=globalThis.matchMedia?.('(prefers-reduced-motion: reduce)')}={}){
 const ativos=new Set(); let encerrado=false;
 function limpar(){for(const a of ativos)a.cancel();ativos.clear();}
 function mudar(){if(preferencia?.matches)limpar();}
 preferencia?.addEventListener?.('change',mudar);
 function animar(imagens,evento,duracao=1800){
  limpar(); if(encerrado||preferencia?.matches)return;
  for(const [i,img] of imagens.entries()){
   if(typeof img.animate!=='function')continue;
   const a=img.animate(quadros(evento,i===0?1:-1),{duration:Math.max(200,Math.min(5000,duracao)),easing:'ease-in-out',fill:'none'});
   ativos.add(a); a.finished.then(()=>ativos.delete(a),()=>ativos.delete(a));
  }
 }
 return {animar,limpar,destruir(){encerrado=true;limpar();preferencia?.removeEventListener?.('change',mudar);}};
}
