import {lazy,Suspense,useEffect} from 'react'
import {Hero} from '../components/hero/Hero'
import {ScrollTrigger} from '../lib/gsap'
const editorial=import('../components/sections/Editorial')
const engagement=import('../components/sections/Engagement')
const Editorial=lazy(()=>editorial),Engagement=lazy(()=>engagement)
function Ready(){useEffect(()=>{ScrollTrigger.refresh();window.dispatchEvent(new Event('rc-content-ready'))},[]);return null}
export default function Home(){return <><Hero/><Suspense fallback={null}><Editorial/><Engagement/><Ready/></Suspense></>}
