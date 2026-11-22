import {useRef,useState} from 'react'
import {ArrowDown, ChevronLeft, ChevronRight, ShieldCheck, MessagesSquare, Compass, Pause, Play} from 'lucide-react'
import {Button} from '../ui/Button'
import {WhatsApp} from '../ui/WhatsApp'
import {Dust} from '../ui/Dust'
import {useIntro,desktopMotion,reducedMotion} from '../../lib/motion'
import {gsap,useGSAP,SplitText} from '../../lib/gsap'
import {whatsappLink} from '../../config/site'
import {picture} from '../../lib/images'
const slides=[
  {top:'Seu trabalho,',bottom:'seus direitos.',body:'Orientação jurídica para quem trabalha. Entenda seus direitos e os caminhos possíveis em cada etapa da sua relação de emprego.',image:'hero-scales',label:'Sigilo profissional',detail:'Sua história, em confiança.',icon:ShieldCheck},
  {top:'Cada vínculo,',bottom:'uma história.',body:'O que acontece no dia a dia ajuda a compreender uma relação de trabalho. Conheça os elementos que orientam essa análise.',image:'law-books',label:'Atendimento direto',detail:'Espaço para ser ouvido.',icon:MessagesSquare},
  {top:'Cada decisão,',bottom:'com clareza.',body:'Do primeiro relato à leitura dos documentos, entenda como funciona o atendimento e participe das decisões sobre o seu caso.',image:'gavel',label:'Orientação jurídica',detail:'Um passo de cada vez.',icon:Compass},
]
const terms=['Rescisão','Horas extras','Vínculo empregatício','FGTS','Assédio no trabalho','Saúde do trabalhador','Jornada de trabalho']
export function Hero(){
  const el=useRef<HTMLElement>(null),artBox=useRef<HTMLDivElement>(null),head=useRef<HTMLHeadingElement>(null)
  const [index,setIndex]=useState(0),[paused,setPaused]=useState(false);const ready=useIntro(),slide=slides[index],Icon=slide.icon,wa=whatsappLink()
  useGSAP(()=>{if(!ready||reducedMotion()||!head.current)return
    const split=SplitText.create(head.current,{type:'lines',mask:'lines',autoSplit:true,onSplit(s){return gsap.from(s.lines,{yPercent:104,stagger:.10,duration:.95,ease:'editorial'})}})
    gsap.fromTo('.hero-object',{scale:1.23,opacity:0},{scale:1,opacity:1,duration:1.25,ease:'expo.out'})
    gsap.fromTo('.hero-kicker,.hero-desc,.hero-actions,.hero-foot,.hero-note',{y:14,opacity:0},{y:0,opacity:1,stagger:.055,duration:.7,ease:'editorial',delay:.1})
    return()=>split.revert()
  },{scope:el,dependencies:[ready,index],revertOnUpdate:true})
  useGSAP(()=>{const mm=gsap.matchMedia();mm.add(desktopMotion,()=>{
    const root=el.current,art=artBox.current;if(!root||!art)return
    const x=gsap.quickTo(art,'x',{duration:.9}),y=gsap.quickTo(art,'y',{duration:.9})
    const move=(e:PointerEvent)=>{const b=root.getBoundingClientRect();x((e.clientX/b.width-.5)*15);y(((e.clientY-b.top)/b.height-.5)*11)}
    const clear=()=>{x(0);y(0)}
    root.addEventListener('pointermove',move);root.addEventListener('pointerleave',clear)
    gsap.to('.hero-hall',{yPercent:13,ease:'none',scrollTrigger:{trigger:root,start:'top top',end:'bottom top',scrub:true}})
    gsap.to('.art-depth',{yPercent:8,ease:'none',scrollTrigger:{trigger:root,start:'top top',end:'bottom top',scrub:true}})
    return()=>{root.removeEventListener('pointermove',move);root.removeEventListener('pointerleave',clear)}
  });return()=>mm.revert()},{scope:el})
  return <><section className={'hero slide-'+index} id="inicio" ref={el} aria-label="Apresentação">
    <div className="hero-hall" aria-hidden="true"/><div className="hero-shade"/><div className="art-depth"><div ref={artBox} className="art-position"><img key={slide.image} className="hero-object" src={picture(slide.image).src} alt="" fetchPriority={index===0?'high':'auto'} style={{backgroundImage:'url('+picture(slide.image).placeholder+')'}}/></div></div>
    <Dust/><div className="hero-shell shell">
      <div className="hero-copy" aria-live="polite" aria-atomic="true">
        <p className="eyebrow hero-kicker"><i/> Advocacia trabalhista</p>
        <h1 ref={head} key={index}><span>{slide.top}</span><em>{slide.bottom}</em></h1>
        <p className="hero-desc">{slide.body}</p>
        <div className="hero-actions"><Button className="gold-button" href={wa} target={wa.startsWith('https')?'_blank':undefined} rel="noopener noreferrer"><WhatsApp size={19}/> Converse pelo WhatsApp</Button><Button className="line-button" href="#direitos">Entenda seus direitos</Button></div>
      </div>
      <aside className="hero-note"><span className="note-icon"><Icon size={23} strokeWidth={1.25}/></span><div><b>{slide.label}</b><small>{slide.detail}</small></div></aside>
      <div className="hero-foot"><a href="#escritorio" className="explore"><span><ArrowDown size={15} strokeWidth={1.25}/></span>Explore o conteúdo</a>
        <div className="slide-nav" aria-label="Destaques"><span className="slide-num">0{index+1}</span><span className="slide-rule"><i style={{left:index*33.333+'%'}}/></span><span className="slide-total">03</span>
        <button type="button" aria-label="Destaque anterior" onClick={()=>setIndex((index+2)%3)}><ChevronLeft size={16}/></button><button type="button" aria-label="Próximo destaque" onClick={()=>setIndex((index+1)%3)}><ChevronRight size={16}/></button></div></div>
    </div></section>
    <div className="marquee" aria-label="Temas trabalhistas"><div className="marquee-skew"><div className="marquee-belt" style={{animationPlayState:paused?'paused':'running'}}>{[0,1,2,3].map(i=><div className="marquee-set" key={i} aria-hidden={i>0}>{terms.map(t=><span key={t}><img aria-hidden="true" src="/assets/icons/spark.svg" width="10" height="10" alt=""/>{t}</span>)}</div>)}</div></div><button className="marquee-toggle" aria-label={paused?'Retomar movimento dos temas':'Pausar movimento dos temas'} aria-pressed={paused} onClick={()=>setPaused(v=>!v)}>{paused?<Play size={12}/>:<Pause size={12}/>}</button></div></>
}
