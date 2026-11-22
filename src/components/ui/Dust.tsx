import {useEffect,useRef} from 'react'
import {gsap} from '../../lib/gsap'
export function Dust({className=''}:{className?:string}){
  const ref=useRef<HTMLCanvasElement>(null)
  useEffect(()=>{const c=ref.current;if(!c)return
    const mm=gsap.matchMedia()
    mm.add('(min-width: 760px) and (prefers-reduced-motion: no-preference)',()=>{
      const ctx=c.getContext('2d');if(!ctx)return
      const points=Array.from({length:36},()=>({x:Math.random(),y:Math.random(),r:.5+Math.random(),phase:Math.random()*6.28}))
      let active=true
      const resize=new ResizeObserver(()=>{c.width=Math.max(1,c.clientWidth);c.height=Math.max(1,c.clientHeight)});resize.observe(c)
      const observer=new IntersectionObserver(([entry])=>{active=entry.isIntersecting});observer.observe(c)
      const draw=(t:number)=>{if(!active||document.hidden)return;ctx.clearRect(0,0,c.width,c.height)
        for(const p of points){const x=(p.x*c.width+Math.sin(t*.12+p.phase)*10),y=((p.y*c.height-t*(2+p.r))%c.height+c.height)%c.height
          ctx.fillStyle='rgba(224,198,144,'+(.12+(1+Math.sin(t*.5+p.phase))*.13)+')';ctx.beginPath();ctx.arc(x,y,p.r,0,Math.PI*2);ctx.fill()}}
      gsap.ticker.add(draw);return()=>{gsap.ticker.remove(draw);resize.disconnect();observer.disconnect()}
    });return()=>mm.revert()
  },[])
  return <canvas ref={ref} className={'dust '+className} aria-hidden="true"/>
}
