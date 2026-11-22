import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { Flip } from 'gsap/Flip'
import { CustomEase } from 'gsap/CustomEase'
gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText, Flip, CustomEase)
CustomEase.create('editorial', '0.22,1,0.36,1')
export { gsap, useGSAP, ScrollTrigger, SplitText, Flip }
