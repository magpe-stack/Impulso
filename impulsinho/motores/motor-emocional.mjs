// Adaptadores de interface fornecidos na integração; nenhum dado de produtividade é alterado.
export const cenas = Object.freeze(Object.fromEntries(Object.entries({
 sessao_iniciada:['alegria','Vamos começar!',1],
 foco_iniciado:['determinacao','Um passo de cada vez.',1],
 atividade_concluida:['satisfacao','Atividade concluída!',2],
 habito_concluido:['alegria','Mais um hábito concluído!',2],
 progresso_confirmado:['determinacao','Seu esforço está fazendo diferença.',1],
 conquista_desbloqueada:['celebracao','Nova conquista!',3],
 chefao_derrotado:['celebracao','Chefão derrotado!',4],
 recompensa_liberada:['celebracao','Recompensa liberada!',3],
 dica_exibida:['atencao','Uma dica para facilitar seu trabalho.',1],
 pausa_solicitada:['calma','Hora de uma pausa.',2],
 meta_proxima:['esperanca','Você está perto da meta!',1],
 entrada_manual_aberta:['atencao','Registre sua atividade.',1],
 alerta_backup:['atencao','Faça um backup para evitar perda de dados.',3,'backup'],
 alerta_elixir:['atencao','Conclua um hábito para liberar o cofre, quando disponível.',2,'elixir']
}).map(([k,v])=>[k,Object.freeze(v)])));
export function criarCoordenador({motor, expressao, balao, alertaPermitido=()=>false, agora=()=>performance.now(), intervalo=8000, duracao=1800}={}) {
 if(!motor?.mostrar || !motor?.limpar || typeof expressao!=='function' || typeof balao!=='function') throw new TypeError('Adaptadores obrigatórios');
 let ativo=null, ultimo=-Infinity, token=0, timer, encerrado=false;
 function limpar(){token++;clearTimeout(timer);ativo=null;motor.limpar();expressao('neutra');balao('');}
 async function receber(evento,{contexto=false, mensagem}={}){
  if(encerrado || !Object.hasOwn(cenas,evento)) return false;
  const [face,texto,prioridade,alerta]=cenas[evento];
  if(alerta && !alertaPermitido(alerta)) return false;
  const t=agora();
  if(ativo ? prioridade<=ativo.prioridade : t-ultimo<intervalo) return false;
  limpar(); const id=token; ativo={prioridade,alerta}; ultimo=t;
  expressao(face); balao(typeof mensagem==='string' && mensagem.trim()?mensagem.slice(0,240):texto);
  timer=setTimeout(()=>{if(id===token)limpar();},duracao);
  if(!alerta){try{await motor.mostrar(evento,{contexto});}catch{/* face e balão continuam disponíveis */}}
  return id===token;
 }
 function atualizarPreferencias(){if(ativo?.alerta && !alertaPermitido(ativo.alerta))limpar();}
 return {receber,limpar,atualizarPreferencias,destruir(){if(!encerrado){encerrado=true;limpar();}}};
}
