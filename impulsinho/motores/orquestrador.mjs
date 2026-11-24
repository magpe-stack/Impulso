import {criarMotor} from './motor-corporal.mjs';
import {criarCoordenador} from './motor-emocional.mjs';
import {criarPersonalidade} from './motor-personalidade.mjs';
import {criarContexto} from './motor-contextual.mjs';
import {criarMemoria} from './motor-memoria.mjs';
export function criarOrquestrador({avatar,palco,catalogo,pasta,expressao,balao,estado=()=>({}),armazenamento,atalhos=[],documento=globalThis.document, fabricaMotor=criarMotor, agora=()=>performance.now(), agoraMemoria=Date.now, intervaloVerificacao=30000,onErro=()=>{}}={}){
 if(typeof expressao!=='function'||typeof balao!=='function'||typeof estado!=='function')throw new TypeError('Adaptadores obrigatórios');
 let encerrado=false,timer=null,ocupado=false;
 const ler=()=>{const s=estado()||{};return {...s,visivel:s.visivel!==false&&!documento?.hidden};};
 const alertaPermitido=k=>ler().alertas?.[k]===true;
 const memoria=criarMemoria({armazenamento,agora:agoraMemoria});
 const motor=fabricaMotor({avatar,palco,catalogo,pasta,alertaPermitido});
 const coordenador=criarCoordenador({motor,expressao,balao,alertaPermitido,agora});
 const personalidade=criarPersonalidade({coordenador,estado:ler,agora,atalhos,memoria});
 const contexto=criarContexto({personalidade,estado:ler,agora,memoria});
 function atualizar(){if(encerrado)return;const s=ler();if(s.habilitado===false||!s.visivel||s.silencio)coordenador.limpar();else coordenador.atualizarPreferencias();}
 async function verificar(){if(encerrado||ocupado)return false;ocupado=true;try{atualizar();return await contexto.verificar();}finally{ocupado=false;}}
 function iniciar(){if(encerrado||timer!==null)return false;timer=setInterval(()=>{verificar().catch(onErro);},Math.max(1000,intervaloVerificacao));documento?.addEventListener?.('visibilitychange',atualizar);return true;}
 function parar(){if(timer!==null){clearInterval(timer);timer=null;documento?.removeEventListener?.('visibilitychange',atualizar);}if(!encerrado)coordenador.limpar();}
 return {iniciar,parar,atualizar,verificar,navegar:s=>!encerrado&&contexto.navegar(s),receber:async e=>!encerrado&&contexto.receber(e),snapshot:()=>({encerrado,executando:timer!==null,contexto:contexto.snapshot(),memoria:memoria.status()}),limparMemoria:()=>!encerrado&&memoria.limpar(),destruir(){if(encerrado)return;parar();encerrado=true;contexto.destruir();personalidade.destruir();coordenador.destruir();motor.destruir();}};
}
