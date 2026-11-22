import { useEffect, type RefObject } from 'react'
import { desktopMotion } from '../lib/motion'
import { gsap } from '../lib/gsap'
export function useTilt(ref:RefObject<HTMLDivElement|null>){
  useEffect(()=>{const mm=gsap.matchMedia();mm.add(desktopMotion,()=>{
    const grid=ref.current;if(!grid)return
    let prior:HTMLElement|null=null
    function reset(){if(prior)gsap.to(prior,{rotateX:0,rotateY:0,duration:.35,overwrite:'auto'});prior=null}
    function move(e:PointerEvent){const card=(e.target as HTMLElement).closest<HTMLElement>('.area-card');if(card!==prior)reset();if(!card)return
      prior=card;const b=card.getBoundingClientRect(),x=(e.clientX-b.left)/b.width,y=(e.clientY-b.top)/b.height
      card.style.setProperty('--mx',x*100+'%');card.style.setProperty('--my',y*100+'%')
      gsap.to(card,{rotateX:(.5-y)*4,rotateY:(x-.5)*4,transformPerspective:900,duration:.25,overwrite:'auto'})
    }grid.addEventListener('pointermove',move);grid.addEventListener('pointerleave',reset);return()=>{grid.removeEventListener('pointermove',move);grid.removeEventListener('pointerleave',reset)}
  });return()=>mm.revert()},[ref])
}
