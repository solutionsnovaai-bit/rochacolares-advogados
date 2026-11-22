import { useEffect, type RefObject } from 'react'
import { desktopMotion } from '../lib/motion'
import { gsap } from '../lib/gsap'
export function useMagnetic<T extends HTMLElement>(ref:RefObject<T|null>) {
  useEffect(()=>{const el=ref.current;if(!el)return
    const mm=gsap.matchMedia()
    mm.add(desktopMotion,()=>{
      const x=gsap.quickTo(el,'x',{duration:.28}),y=gsap.quickTo(el,'y',{duration:.28})
      const move=(e:PointerEvent)=>{const b=el.getBoundingClientRect();x((e.clientX-b.left-b.width/2)*.08);y((e.clientY-b.top-b.height/2)*.12)}
      const leave=()=>{x(0);y(0)}
      el.addEventListener('pointermove',move);el.addEventListener('pointerleave',leave)
      return ()=>{el.removeEventListener('pointermove',move);el.removeEventListener('pointerleave',leave)}
    });return ()=>mm.revert()
  },[ref])
}
