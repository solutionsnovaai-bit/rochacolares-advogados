import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from '../lib/gsap'

let smooth: Lenis | undefined
const locks = new Set<string>()
export function lockScroll(key:string, lock:boolean){
  if(lock) locks.add(key); else locks.delete(key)
  document.documentElement.classList.toggle('scroll-locked',Boolean(locks.size))
  if(locks.size) smooth?.stop(); else smooth?.start()
}
export function jumpTo(target:HTMLElement | number, immediate=false) {
  if(smooth) smooth.scrollTo(target,{offset:typeof target==='number'?0:-75,immediate,force:true})
  else if(typeof target==='number') window.scrollTo({top:target,behavior:'instant'})
  else target.scrollIntoView({behavior:'instant'})
}
export function useLenis(){
  useEffect(()=>{
    gsap.ticker.lagSmoothing(0)
    const mm=gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)',()=>{
      const instance = new Lenis({ autoRaf:false, smoothWheel:true, duration:1.05, anchors:false, allowNestedScroll:true })
      smooth = instance
      if(locks.size)instance.stop()
      instance.on('scroll', ScrollTrigger.update)
      let skew=0;const root=document.documentElement
      instance.on('scroll',({velocity}:Lenis)=>{skew=Math.max(-6,Math.min(6,velocity*.17))})
      const tick=(t:number)=>{instance.raf(t*1000);if(Math.abs(skew)>.02){root.style.setProperty('--marquee-skew',skew+'deg');skew*=.94}}
      gsap.ticker.add(tick)
      return ()=>{gsap.ticker.remove(tick);instance.destroy();smooth=undefined}
    })
    const navigate=(e:MouseEvent)=>{
      if(e.defaultPrevented || e.button!==0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey)return
      const a=(e.target as Element)?.closest('a')
      if(!a || a.target==='_blank' || !a.hash || a.origin!==location.origin || a.pathname!==location.pathname)return
      const el=document.getElementById(decodeURIComponent(a.hash.slice(1)));if(!el)return
      e.preventDefault();history.pushState(null,'',a.hash)
      jumpTo(el)
      if(!el.hasAttribute('tabindex'))el.setAttribute('tabindex','-1')
      el.focus({preventScroll:true})
    }
    document.addEventListener('click',navigate)
    return ()=>{mm.revert();document.removeEventListener('click',navigate)}
  },[])
}
