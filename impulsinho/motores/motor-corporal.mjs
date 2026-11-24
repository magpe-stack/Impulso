import {criarAnimador} from './motor-animacao.mjs';
export function selecionar(catalogo, evento, {contexto=false, ids}={}) {
  const permitidos = catalogo.gestos.filter(g => g.gesto.renderizar_producao && g.gesto.evento_proposto === evento && (g.politica === 'elegivel' && g.gesto.uso_automatico || g.politica === 'contextual' && contexto));
  if(ids) return ids.length <= 2 && new Set(ids).size === ids.length && ids.every(id=>permitidos.some(g=>g.id===id)) ? ids.map(id=>permitidos.find(g=>g.id===id)) : [];
  const dupla=catalogo.combinacoes.find(c=>c.evento===evento);
  if(dupla && contexto) return selecionar(catalogo,evento,{contexto,ids:[dupla.esquerda,dupla.direita]});
  return permitidos.slice(0,1);
}
export function criarMotor({avatar, palco, catalogo, pasta, alertaPermitido=()=>false}) {
  if(!avatar || !palco || !palco.contains(avatar)) throw new Error('Avatar deve estar dentro do palco');
  const camada=document.createElement('div'); camada.className='ic-corporal'; camada.setAttribute('aria-hidden','true'); palco.append(camada);
  const animador=criarAnimador();
  let ultimo=-Infinity, geracao=0, timer, destruido=false;
  function limpar(){animador.limpar();geracao++; clearTimeout(timer); camada.replaceChildren();}
  const observer=new ResizeObserver(limpar); observer.observe(palco); observer.observe(avatar);
  window.addEventListener('scroll',limpar,true); window.addEventListener('resize',limpar);
  async function mostrar(evento, op={}) {
    if(destruido || performance.now()-ultimo < (catalogo.regras.intervalo_minimo_ms||8000)) return false;
    if((op.alerta || /backup|alerta|elixir/i.test(evento)) && !alertaPermitido(op.alerta||evento)) return false;
    const gestos=selecionar(catalogo,evento,op); if(!gestos.length) return false;
    limpar(); const token=geracao;
    const imagens=await Promise.all(gestos.map(async g=>{const img=new Image(); img.alt=''; img.className='ic-gesto'; img.src=new URL(g.arquivo,new URL(pasta.replace(/\/?$/,'/'),document.baseURI)).href; try{await img.decode();return img;}catch{return null;}}));
    if(token!==geracao || destruido || imagens.some(i=>!i)) return false;
    const a=avatar.getBoundingClientRect(), p=camada.getBoundingClientRect();
    if(!a.width || !a.height || !p.width || !p.height) return false;
    const pos=[];
    for(let i=0;i<gestos.length;i++){
      const g=gestos[i].gesto, img=imagens[i], w=a.width*g.escala_relativa_avatar, h=w*img.naturalHeight/img.naturalWidth;
      const x=g.ancora==='inferior'?a.left+(a.width-w)/2: i===0?a.left-w-4:a.right+4;
      const y=g.ancora==='inferior'?a.bottom+4:a.top+(a.height-h)/2;
      if(x<p.left||y<p.top||x+w>p.right||y+h>p.bottom||x<0||y<0||x+w>innerWidth||y+h>innerHeight) return false;
      const colide=[...document.querySelectorAll('button,a,input,select,textarea,[role="button"],[contenteditable="true"]')].some(el=>{const r=el.getBoundingClientRect();return r.width&&r.height&&x<r.right&&x+w>r.left&&y<r.bottom&&y+h>r.top;});
      if(colide) return false;
      pos.push({x,y,w,h});
    }
    imagens.forEach((img,i)=>{const {x,y,w,h}=pos[i];Object.assign(img.style,{left:`${x-p.left}px`,top:`${y-p.top}px`,width:`${w}px`,height:`${h}px`});camada.append(img);});
    animador.animar(imagens,evento,Math.max(...gestos.map(g=>g.gesto.duracao_ms)));
    ultimo=performance.now(); timer=setTimeout(limpar,Math.max(...gestos.map(g=>g.gesto.duracao_ms)));return true;
  }
  return {mostrar,limpar,destruir(){destruido=true;limpar();animador.destruir();observer.disconnect();window.removeEventListener('scroll',limpar,true);window.removeEventListener('resize',limpar);camada.remove();}};
}
