import {useEffect,useRef,useState} from 'react'
import {Plus,X,ChevronLeft,ChevronRight} from 'lucide-react'
import {areas,scenes} from '../../content/labor'
import {Photo} from '../ui/Photo'
import {useTilt} from '../../hooks/useTilt'
import {lockScroll,jumpTo} from '../../hooks/useLenis'
import {gsap,useGSAP,ScrollTrigger,Flip} from '../../lib/gsap'
import {desktopMotion,reducedMotion} from '../../lib/motion'
const manifesto='Toda relação de trabalho carrega uma história que merece ser ouvida.'
function Manifesto(){
 const root=useRef<HTMLElement>(null)
 useGSAP(()=>{const mm=gsap.matchMedia();mm.add(desktopMotion,()=>{
  gsap.from('.manifest-word',{opacity:.26,stagger:.055,ease:'none',scrollTrigger:{trigger:'.manifest-words',start:'top 72%',end:'bottom 45%',scrub:.5}})
  gsap.to('.folio-photo img',{yPercent:8,scale:1.14,ease:'none',scrollTrigger:{trigger:root.current,start:'top bottom',end:'bottom top',scrub:true}})
  ScrollTrigger.create({trigger:'.manifest-left',start:'top 120px',end:'+=120',pin:true,pinSpacing:false})
  gsap.fromTo(root.current,{'--folio-tone':'#e8e2d6'},{'--folio-tone':'#f4efe7',scrollTrigger:{trigger:root.current,start:'top bottom',end:'top 25%',scrub:true}})
 });return()=>mm.revert()},{scope:root})
 return <section className="manifest" id="escritorio" ref={root}><div className="shell manifest-grid"><div className="manifest-left">
 <p className="eyebrow dark-label"><i/>O escritório</p><h2>Direito começa<br/><em>com escuta.</em></h2>
 <p className="manifest-words">{manifesto.split(' ').map((w,i)=><span key={i} className="manifest-word">{w} </span>)}</p>
 <p className="body-copy">Entre o que está no contrato e o que se vive no dia a dia, há detalhes que importam. Nosso trabalho começa por entender essa diferença e traduzir o direito em escolhas que você possa compreender.</p>
 <a href="#atendimento" className="text-link">Conheça o atendimento</a></div>
 <figure className="folio-photo"><Photo name="law-books" alt="Volumes jurídicos de capa de couro e bordas douradas."/><div className="folio-inset"><img src="/assets/img/gavel.webp" alt="Martelo de madeira sobre pedra escura." loading="lazy"/></div></figure></div></section>
}
function Areas(){
 const grid=useRef<HTMLDivElement>(null),panel=useRef<HTMLDialogElement>(null),origin=useRef<HTMLButtonElement|null>(null)
 const [id,setId]=useState<number|null>(null);const area=id!==null?areas[id]:null
 useTilt(grid)
 useGSAP(()=>{const mm=gsap.matchMedia();mm.add('(prefers-reduced-motion: no-preference)',()=>{
   ScrollTrigger.batch('.area-card',{start:'top 96%',once:true,onEnter:els=>gsap.fromTo(els,{y:17,opacity:.55},{y:0,opacity:1,stagger:.035,duration:.5})})
 });return()=>mm.revert()},{scope:grid})
 useEffect(()=>{if(id===null||!panel.current)return
   const dialog=panel.current,button=origin.current,card=dialog.querySelector<HTMLElement>('.area-sheet')
   const previous=button?Flip.getState(button):null
   dialog.showModal();lockScroll('area',true)
   const ctx=gsap.context(()=>{if(previous&&card&&!reducedMotion())Flip.from(previous,{targets:card,scale:true,absolute:false,duration:.48,ease:'editorial',fade:true})},dialog)
   return()=>{ctx.revert();dialog.close();lockScroll('area',false);button?.focus({preventScroll:true})}
 },[id])
 return <section className="areas sect-dark" id="atuacao"><div className="shell"><div className="section-intro"><div><p className="eyebrow"><i/>Áreas de atuação</p><h2>As questões do<br/><em>seu trabalho.</em></h2></div>
 <p>Situações do cotidiano profissional, da contratação ao desligamento. Selecione um tema para entender o que pode ser analisado.</p></div>
 <div className="area-grid" ref={grid}>{areas.map((a,i)=><button key={a.id} className="area-card" data-flip-id={'area-'+a.id} onClick={e=>{origin.current=e.currentTarget;setId(i)}} aria-haspopup="dialog"><img src={'/assets/icons/'+a.id+'.svg'} alt=""/><h3>{a.title}</h3><span>{a.brief}</span><Plus size={16} strokeWidth={1.25}/></button>)}</div></div>
 <dialog className="detail-dialog" ref={panel} data-lenis-prevent onCancel={()=>setId(null)} onClick={e=>{if(e.target===e.currentTarget)setId(null)}} aria-labelledby="area-title">{area&&<article className="area-sheet" data-flip-id={'area-'+area.id}><button className="close-sheet" onClick={()=>setId(null)} aria-label="Fechar detalhe"><X/></button><img src={'/assets/icons/'+area.id+'.svg'} alt=""/><p className="eyebrow">Área de atuação</p><h3 id="area-title">{area.title}</h3><p>{area.detail}</p><h4>Documentos que podem ajudar</h4><p>{area.docs}</p><a className="button gold-button" href="#triagem" onClick={()=>setId(null)}>Organize seu relato</a></article>}</dialog></section>
}
function Practice(){
 const root=useRef<HTMLElement>(null),track=useRef<HTMLDivElement>(null),clip=useRef<HTMLDivElement>(null),control=useRef<ScrollTrigger|null>(null)
 const [active,setActive]=useState(0)
 useGSAP(()=>{const mm=gsap.matchMedia();mm.add('(min-width: 900px) and (min-height: 600px) and (prefers-reduced-motion: no-preference)',()=>{
   if(!track.current||!clip.current)return
   const distance=()=>track.current!.scrollWidth-clip.current!.clientWidth
   const tween=gsap.to(track.current,{x:()=>-distance(),ease:'none',scrollTrigger:{trigger:root.current,start:'top top',end:()=>'+='+distance(),pin:true,scrub:.45,invalidateOnRefresh:true,onUpdate:s=>setActive(Math.round(s.progress*(scenes.length-1)))}})
   control.current=tween.scrollTrigger||null
   gsap.utils.toArray<HTMLElement>('.scene').forEach(s=>gsap.fromTo(s.querySelector('.photo'),{scale:1.08},{scale:1,ease:'none',scrollTrigger:{trigger:s,containerAnimation:tween,start:'left right',end:'right left',scrub:true}}))
   return()=>{control.current=null}
 });return()=>mm.revert()},{scope:root})
 const go=(n:number)=>{const tr=control.current;if(tr)jumpTo(tr.start+(tr.end-tr.start)*n/(scenes.length-1));else if(clip.current){clip.current.scrollTo({left:clip.current.clientWidth*n,behavior:reducedMotion()?'instant':'smooth'})}}
 return <section id="direitos" className="practice" ref={root}><div className="shell"><div className="practice-head"><div><p className="eyebrow dark-label"><i/>Direitos na prática</p><h2>O direito na <em>vida real.</em></h2></div><div className="practice-controls"><span>0{active+1} / 05</span><button aria-label="Cena anterior" disabled={active===0} onClick={()=>go(active-1)}><ChevronLeft size={18}/></button><button aria-label="Próxima cena" disabled={active===4} onClick={()=>go(active+1)}><ChevronRight size={18}/></button></div></div>
 <div className="scene-clip" ref={clip} tabIndex={0} role="region" aria-label="Cenas de trabalho" onScroll={()=>{if(!control.current&&clip.current)setActive(Math.round(clip.current.scrollLeft/clip.current.clientWidth))}} onKeyDown={e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();go(Math.min(4,Math.max(0,active+(e.key==='ArrowRight'?1:-1))))}}}><div className="scene-track" ref={track}>{scenes.map(s=><article className="scene" key={s.name}><Photo name={s.img} alt={s.alt}/><div className="scene-copy"><p className="eyebrow">{s.name}</p><h3>{s.title}</h3><p>{s.text}</p></div></article>)}</div></div><div className="scene-pages">{scenes.map((s,i)=><button key={s.name} aria-label={'Ir para '+s.name} aria-current={i===active?'step':undefined} onClick={()=>go(i)}><span/></button>)}</div></div></section>
}
export default function Editorial(){return <><Manifesto/><Areas/><Practice/></>}
