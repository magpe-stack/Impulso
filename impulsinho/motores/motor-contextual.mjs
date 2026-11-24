import {cenas} from './motor-emocional.mjs';
export const ambientes=Object.freeze({inicio:'Revise seus objetivos para hoje.',projetos:'Confira qual projeto está ativo.',arena:'Acompanhe seu progresso na Arena.',radar:'Observe a evolução do seu projeto.',meu_dia:'Revise as atividades registradas.',ponto:'Confira o estado da sessão antes de sair.',habitos:'Escolha um pequeno passo para hoje.',entrada_manual:'Confira as datas e os horários.',elixires:'Escolha hábitos adequados à sua rotina.',cofre:'Confira as recompensas disponíveis.',configuracoes:'Revise suas preferências.',backup:'Guarde uma cópia dos seus dados.'});
export function criarContexto({personalidade, estado=()=>({}), agora=()=>performance.now(), intervalo=900000, memoria}={}){
 if(typeof personalidade?.receber!=='function')throw new TypeError('Personalidade obrigatória');
 let secao=null, encerrado=false, ocupado=false, ultima=agora();
 function navegar(nome){if(encerrado)return false;secao=Object.hasOwn(ambientes,nome)?nome:null;return secao!==null;}
 function snapshot(){return {...estado(),secao};}
 async function receber(evento){if(encerrado||!Object.hasOwn(cenas,evento))return false;const s=snapshot();if(s.habilitado===false||s.visivel===false)return false;return personalidade.receber(evento,{contexto:false});}
 async function verificar(){const s=snapshot();if(encerrado||ocupado||!secao||s.habilitado===false||s.visivel===false||s.foco||s.silencio||s.dicas===false||s.espontaneo!==true||s.editando||s.modal||Math.min(agora()-ultima,memoria?.decorrido("contextual")??Infinity)<intervalo)return false;ocupado=true;ultima=agora();memoria?.marcar("contextual");try{return await personalidade.receber('dica_exibida',{mensagem:ambientes[secao],contexto:false});}finally{ocupado=false;}}
 return {navegar,snapshot,receber,verificar,destruir(){encerrado=true;secao=null;}};
}
