import {useCallback,useEffect,useLayoutEffect,useRef,useState} from 'react'
import {Routes,Route,useLocation} from 'react-router-dom'
import {Navbar} from './components/navbar/Navbar'
import {Footer} from './components/footer/Footer'
import {Cursor} from './components/cursor/Cursor'
import {Loader} from './components/loader/Loader'
import {WhatsApp} from './components/ui/WhatsApp'
import Home from './routes/Home'
import Privacy from './routes/Privacy'
import NotFound from './routes/NotFound'
import {IntroContext,reducedMotion} from './lib/motion'
import {useLenis,lockScroll,jumpTo} from './hooks/useLenis'
import {gsap,ScrollTrigger} from './lib/gsap'
import {site,publicName,whatsappLink} from './config/site'

export default function App(){
 const [loading,setLoading]=useState(true),[intro,setIntro]=useState(false),[float,setFloat]=useState(false)
 const start=useCallback(()=>setIntro(true),[]),finish=useCallback(()=>{setIntro(true);setLoading(false)},[])
 const {pathname,hash}=useLocation(),prev=useRef(pathname),wipe=useRef<HTMLDivElement>(null),wrap=useRef<HTMLDivElement>(null),main=useRef<HTMLElement>(null)
 useLenis()
 useLayoutEffect(()=>{lockScroll('loader',loading);return()=>lockScroll('loader',false)},[loading])
 useLayoutEffect(()=>{
   const different=prev.current!==pathname;prev.current=pathname
   if(different){jumpTo(0,true);main.current?.focus({preventScroll:true})}
   if(different&&!reducedMotion()&&wipe.current){const tween=gsap.fromTo(wipe.current,{scaleY:1,transformOrigin:'top'},{scaleY:0,duration:.58,ease:'expo.inOut'});return()=>{tween.kill()}}
 },[pathname])
 useEffect(()=>{
   const pageTitle=pathname==='/' ? (site.name?site.name+' | Advocacia trabalhista':'Direitos do trabalhador | Advocacia trabalhista') : (pathname==='/privacidade'?'Privacidade':'Página não encontrada')+' | '+publicName()
   document.title=pageTitle
   const setMeta=(sel:string,v:string)=>document.querySelector(sel)?.setAttribute('content',v)
   setMeta('meta[property="og:title"]',pageTitle);setMeta('meta[name="twitter:title"]',pageTitle)
   let canonical=document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
   if(site.siteUrl&&['/','/privacidade'].includes(pathname)){if(!canonical){canonical=document.createElement('link');canonical.rel='canonical';document.head.append(canonical)}canonical.href=site.siteUrl.replace(/\/$/,'')+pathname}else canonical?.remove()
   let robots=document.querySelector<HTMLMetaElement>('meta[name="robots"]')
   if(!robots){robots=document.createElement('meta');robots.name='robots';document.head.append(robots)}robots.content=['/','/privacidade'].includes(pathname)?'index,follow':'noindex'
   if(loading)return
   const settle=()=>{ScrollTrigger.refresh();if(hash){const dest=document.getElementById(decodeURIComponent(hash.slice(1)));if(dest)jumpTo(dest,true)}}
   settle();window.addEventListener('rc-content-ready',settle)
   const refresh=()=>ScrollTrigger.refresh(true)
   document.fonts.ready.then(refresh);window.addEventListener('load',refresh)
   let timer=0;const imageLoaded=(e:Event)=>{if(e.target instanceof HTMLImageElement){clearTimeout(timer);timer=window.setTimeout(refresh,170)}}
   document.addEventListener('load',imageLoaded,true)
   return()=>{window.removeEventListener('rc-content-ready',settle);window.removeEventListener('load',refresh);clearTimeout(timer);document.removeEventListener('load',imageLoaded,true)}
 },[pathname,hash,loading])
 useEffect(()=>{function scroll(){const contact=document.getElementById('contato');setFloat(window.scrollY>360&&(!contact||contact.getBoundingClientRect().top>innerHeight*.8))}scroll();addEventListener('scroll',scroll,{passive:true});return()=>removeEventListener('scroll',scroll)},[pathname])
 const link=whatsappLink()
 return <IntroContext.Provider value={intro}><div ref={wrap} inert={loading}><a className="skip" href="#principal">Pular para o conteúdo</a><Navbar/><main id="principal" ref={main} tabIndex={-1}><Routes><Route path="/" element={<Home/>}/><Route path="/privacidade" element={<Privacy/>}/><Route path="*" element={<NotFound/>}/></Routes></main><Footer/>
 {float&&<a className="floating-wa" aria-label={link.startsWith('https')?'Conversar pelo WhatsApp':'Ir ao contato'} href={link==='#contato'&&pathname!=='/'?'/#contato':link} target={link.startsWith('https')?'_blank':undefined} rel="noopener noreferrer"><WhatsApp size={22}/></a>}
 </div><div className="route-wipe" ref={wipe} aria-hidden="true"/><Cursor/>{loading&&<Loader onIntro={start} onFinish={finish}/>}</IntroContext.Provider>
}
