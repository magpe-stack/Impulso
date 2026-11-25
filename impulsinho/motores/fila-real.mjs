// Fila transitória: nunca altera os dados do projeto.
export function criarFilaReal({agora=Date.now,limite=24,validade=120000}={}){
 const itens=[];let recebidos=0,exibidos=0,descartados=0,ultimo='—';
 function inserir(tipo,projetoId=null){recebidos++;if(itens.length>=limite){itens.shift();descartados++}itens.push({tipo,projetoId,ate:agora()+validade});ultimo=tipo;}
 function retirar(projetoId){while(itens.length){const i=itens.shift();if(i.ate>=agora()&&(!i.projetoId||i.projetoId===projetoId))return i;descartados++;}return null;}
 function adiar(i){itens.push(i);}
 function resultado(ok){if(ok)exibidos++;else descartados++;}
 function limpar(){descartados+=itens.length;itens.length=0;}
 return {inserir,retirar,adiar,resultado,limpar,status:()=>({recebidos,exibidos,descartados,pendentes:itens.length,ultimo})};
}
