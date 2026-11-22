import { useState, type ImgHTMLAttributes } from 'react'
import { picture } from '../../lib/images'
export function Photo({ name, className='', ...props }: ImgHTMLAttributes<HTMLImageElement> & {name:string}) {
  const [loaded,setLoaded]=useState(false)
  const {src,placeholder}=picture(name)
  return <span className={'photo '+className} style={{backgroundImage:placeholder ? 'url('+placeholder+')' : undefined}}><img decoding="async" loading="lazy" {...props} src={src} className={loaded?'is-loaded':''} onLoad={()=>setLoaded(true)} /></span>
}
