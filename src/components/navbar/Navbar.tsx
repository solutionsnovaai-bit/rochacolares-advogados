import {useEffect,useRef,useState} from 'react'
import {Link,useLocation} from 'react-router-dom'
import {Menu,X} from 'lucide-react'
import {Brand} from '../ui/Brand'
import {WhatsApp} from '../ui/WhatsApp'
import {Button} from '../ui/Button'
import {navItems,whatsappLink} from '../../config/site'
import {gsap,useGSAP,ScrollTrigger} from '../../lib/gsap'
import {useIntro,reducedMotion} from '../../lib/motion'
import {lockScroll} from '../../hooks/useLenis'

export function Navbar(){
  const [open,setOpen]=useState(false),[active,setActive]=useState('inicio')
  const header=useRef<HTMLElement>(null),panel=useRef<HTMLDialogElement>(null),trigger=useRef<HTMLButtonElement>(null)
  const location=useLocation(),heroReady=useIntro()
  const href=(id:string)=>location.pathname==='/' ? '#'+id : '/#'+id
  const home=location.pathname==='/'
  useGSAP(()=>{if(!heroReady)return
    if(!reducedMotion())gsap.fromTo(header.current,{y:-25,opacity:0},{y:0,opacity:1,duration:.7,ease:'editorial'})
    const bar=header.current?.querySelector('.read-progress')
    ScrollTrigger.create({start:0,end:'max',onUpdate:self=>{
      header.current?.classList.toggle('compact',self.scroll()>50)
      header.current?.classList.toggle('nav-away',self.direction===1&&self.scroll()>180&&!header.current.contains(document.activeElement))
      if(bar)(bar as HTMLElement).style.transform='scaleX('+self.progress+')'
      if(home){const current=navItems.filter(i=>{const n=document.getElementById(i.id);return n&&n.getBoundingClientRect().top<innerHeight*.45}).at(-1)
      if(current)setActive(current.id)}
    }})
  },{scope:header,dependencies:[heroReady,home],revertOnUpdate:true})
  useEffect(()=>{setOpen(false)},[location.pathname])
  useEffect(()=>{if(!open)return
    const d=panel.current;if(!d)return
    d.showModal();lockScroll('menu',true)
    const first=d.querySelector<HTMLElement>('a');first?.focus()
    const ctx=gsap.context(()=>{if(!reducedMotion())gsap.from('.menu-link',{y:18,opacity:0,stagger:.045,duration:.4})},d)
    const mq=window.matchMedia('(min-width: 1061px)')
    const dismiss=()=>{if(mq.matches)setOpen(false)}
    mq.addEventListener('change',dismiss)
    return()=>{ctx.revert();d.close();lockScroll('menu',false);mq.removeEventListener('change',dismiss);trigger.current?.focus({preventScroll:true})}
  },[open])
  const wa=whatsappLink()
  return <><header ref={header} className="navbar"><div className="nav-inner shell">
    {home?<a href="#inicio" className="home-brand" aria-label="Página inicial"><Brand/></a>:<Link to="/#inicio" className="home-brand" aria-label="Página inicial"><Brand/></Link>}
    <nav className="nav-links" aria-label="Navegação principal">{navItems.map(i=><a key={i.id} href={href(i.id)} aria-current={home&&active===i.id?'location':undefined}>{i.label}</a>)}</nav>
    <Button className="nav-contact" href={wa==='#contato'?href('contato'):wa} target={wa.startsWith('https')?'_blank':undefined} rel="noopener noreferrer"><WhatsApp/> Fale conosco</Button>
    <button className="menu-toggle" ref={trigger} aria-label="Abrir menu" aria-haspopup="dialog" aria-controls="mobile-menu" aria-expanded={open} onClick={()=>setOpen(true)}><Menu strokeWidth={1.25}/></button>
  </div><i className="read-progress"/></header>
  <dialog className="mobile-menu" id="mobile-menu" aria-label="Menu de navegação" ref={panel} data-lenis-prevent onCancel={()=>setOpen(false)}>
    <div className="menu-head"><Brand/><button aria-label="Fechar menu" onClick={()=>setOpen(false)}><X/></button></div>
    <nav>{[...navItems,{id:'triagem',label:'Avalie seu caso'},{id:'contato',label:'Contato'}].map(i=><a className="menu-link" key={i.id} href={href(i.id)} onClick={()=>setOpen(false)}>{i.label}</a>)}</nav>
  </dialog></>
}
