import {useEffect,useRef} from 'react'
import {gsap} from '../../lib/gsap'
import {desktopMotion} from '../../lib/motion'
export function Cursor(){const ref=useRef<HTMLDivElement>(null)
  useEffect(()=>{const mm=gsap.matchMedia();mm.add(desktopMotion,()=>{const c=ref.current;if(!c)return
    const x=gsap.quickTo(c,'x',{duration:.22}),y=gsap.quickTo(c,'y',{duration:.22})
    const move=(e:PointerEvent)=>{const n=e.target as HTMLElement;const hit=!!n.closest('a,button,[data-cursor]');x(e.clientX);y(e.clientY);c.classList.toggle('hot',hit);c.style.opacity=n.closest('input,textarea,select,dialog')?'0':'1'}
    const hide=()=>{c.style.opacity='0'}
    window.addEventListener('pointermove',move);document.documentElement.addEventListener('pointerleave',hide);return()=>{window.removeEventListener('pointermove',move);document.documentElement.removeEventListener('pointerleave',hide);hide()}
  });return()=>mm.revert()},[]);return <div ref={ref} className="cursor" aria-hidden="true"/>}
