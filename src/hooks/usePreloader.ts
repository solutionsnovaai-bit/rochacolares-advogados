import {useEffect,useState} from 'react'
import { reducedMotion } from '../lib/motion'
import { ScrollTrigger } from '../lib/gsap'
const visitKey = 'rc-intro-bronze-v2'
export function usePreloader(){
  const [progress,setProgress]=useState(0),[done,setDone]=useState(false)
  const [timing]=useState(()=>{let repeat=false;try{repeat=sessionStorage.getItem(visitKey)==='1'}catch{/* disabled storage */}return {short:repeat,reduced:reducedMotion()}})
  useEffect(()=>{
    let active=true,completed=0
    const urls=[
      '/assets/logo/intro/monogram.webp', '/assets/logo/intro/highlight.webp',
      '/assets/logo/intro/wordmark.webp', '/assets/logo/intro/signature.webp',
      '/assets/img/intro-surface.webp', '/assets/img/hero-scales.webp', '/assets/img/hero-bg.webp',
    ]
    const images=urls.map(src=>new Promise<void>(resolve=>{const i=new Image();i.onload=i.onerror=()=>resolve();i.src=src}))
    const fontReady=Promise.all([document.fonts.load('400 2em "Cormorant Garamond Variable"'),document.fonts.load('italic 400 2em "Cormorant Garamond Variable"'),document.fonts.load('500 1em "Manrope Variable"')]).then(()=>document.fonts.ready)
    const tasks=[...images,fontReady]
    const loading=Promise.allSettled(tasks.map(p=>p.finally(()=>{if(active)setProgress(Math.round(++completed/tasks.length*100))})))
    let minTimer=0
    const minimum=new Promise<void>(res=>{minTimer=window.setTimeout(res,timing.reduced?80:timing.short?320:1850)})
    const finish=()=>{if(active){setProgress(100);setDone(true);try{sessionStorage.setItem(visitKey,'1')}catch{/* optional */}}}
    const safety=window.setTimeout(finish, timing.reduced?160:4850)
    Promise.all([loading,minimum]).then(()=>{clearTimeout(safety);finish()})
    loading.then(()=>{if(active)ScrollTrigger.refresh()})
    return()=>{active=false;clearTimeout(safety);clearTimeout(minTimer)}
  },[timing])
  return {progress,done,...timing}
}
