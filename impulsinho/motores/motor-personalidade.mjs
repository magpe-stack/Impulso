import {cenas} from './motor-emocional.mjs';
const frases=Object.freeze({
 sessao_iniciada:['Vamos começar!','Tudo pronto para mais uma sessão.','Que tal dar o primeiro passo?'],
 foco_iniciado:['Um passo de cada vez.','Agora é hora de focar.','Dedique sua atenção a esta atividade.'],
 atividade_concluida:['Atividade concluída!','Mais uma atividade registrada.','Bom trabalho nesta etapa!'],
 habito_concluido:['Mais um hábito concluído!','Pequenos passos também contam.','Mais um hábito na sua jornada.'],
 progresso_confirmado:['Seu esforço está fazendo diferença.','Cada avanço conta.','Continue no seu ritmo.'],
 conquista_desbloqueada:['Nova conquista!','Uma conquista para celebrar!','Mais um marco alcançado.'],
 chefao_derrotado:['Chefão derrotado!','Vitória na Arena!','Mais um desafio superado!'],
 recompensa_liberada:['Recompensa liberada!','Sua recompensa está disponível.','Hora de conferir sua recompensa!'],
 pausa_solicitada:['Hora de uma pausa.','Descanse um pouco.','Retome quando estiver pronto.'],
 meta_proxima:['Você está perto da meta!','Falta pouco para esse marco.','Mais um passo rumo à meta.'],
 entrada_manual_aberta:['Registre sua atividade.','Informe o início e o término da atividade.','Confira os horários antes de registrar.']
});
const dicas=['Revise seus objetivos antes de iniciar uma sessão.','Use Meu Dia para revisar suas atividades.','Divida tarefas grandes em pequenas etapas.'];
export function criarPersonalidade({coordenador, estado=()=>({}), agora=()=>performance.now(), intervaloEspontaneo=900000, intervaloDica=300000, atalhos=[], memoria}={}){
 if(typeof coordenador?.receber!=='function')throw new TypeError('Coordenador obrigatório');
 const indices=new Map(), pendentes=new Set(); let ultimoEspontaneo=agora(), ultimaDica=-Infinity, encerrado=false;
 const listaDicas=[...dicas,...atalhos.filter(a=>a?.verificado===true && typeof a.texto==='string' && a.texto.trim()).map(a=>a.texto.slice(0,240))];
 function escolher(chave,lista){return lista[(memoria?.indice(chave)??indices.get(chave)??0)%lista.length];}
 async function receber(evento,opcoes={}){
  if(encerrado || !Object.hasOwn(cenas,evento)||pendentes.has(evento))return false;
  const s=estado()||{}; if(s.habilitado===false)return false;
  const dica=evento==='dica_exibida';
  if(dica&&(s.foco||s.silencio||s.visivel===false||s.dicas===false||Math.min(agora()-ultimaDica,memoria?.decorrido("dica")??Infinity)<intervaloDica))return false;
  if(s.visivel===false || (s.silencio && cenas[evento][2]<3))return false;
  const lista=dica?listaDicas:frases[evento];
  const mensagem=evento.startsWith('alerta_')?undefined:(opcoes.mensagem || (lista?escolher(evento,lista):undefined));
  pendentes.add(evento);
  try{const ok=await coordenador.receber(evento,{...opcoes,mensagem}); if(ok&&!encerrado){if(lista&&!opcoes.mensagem){indices.set(evento,(indices.get(evento)||0)+1);memoria?.avancar(evento);}memoria?.registrar(evento);if(dica){ultimaDica=agora();memoria?.marcar("dica");}}return ok;}finally{pendentes.delete(evento);}
 }
 async function verificar(){const s=estado()||{};if(encerrado||s.espontaneo!==true||s.foco||s.silencio||s.visivel===false||s.habilitado===false||Math.min(agora()-ultimoEspontaneo,memoria?.decorrido("espontaneo")??Infinity)<intervaloEspontaneo)return false;ultimoEspontaneo=agora();memoria?.marcar("espontaneo");return receber('dica_exibida');}
 return {receber,verificar,destruir(){encerrado=true;indices.clear();}};
}
