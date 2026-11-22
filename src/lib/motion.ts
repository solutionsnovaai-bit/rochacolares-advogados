import { createContext, useContext } from 'react'
export const IntroContext = createContext(false)
export const useIntro = () => useContext(IntroContext)
export const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
export const desktopMotion = '(min-width: 900px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)'
