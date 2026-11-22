import { useRef, type Ref } from 'react'
import { gsap, useGSAP } from '../../lib/gsap'
import { usePreloader } from '../../hooks/usePreloader'
import './Loader.css'

const metal = '/assets/logo/intro/'
type IntroOptions = { short?: boolean; reduced?: boolean }

function Plate({ side }: { side: 'left' | 'right' }) {
  return (
    <div aria-hidden="true" className={`rc-intro__plate rc-intro__plate--${side}`}>
      <div className="rc-intro__surface" />
      <div className="rc-intro__light" />
    </div>
  )
}

/** The same stage can be sampled frame by frame for the film and the still. */
export function IntroStage({ ref, presentation = false }: { ref?: Ref<HTMLDivElement>; presentation?: boolean }) {
  return (
    <div ref={ref} className="rc-intro" role={presentation ? 'img' : 'status'} aria-label={presentation ? 'Rocha Colares Advogados' : 'Carregando Rocha Colares Advogados'}>
      <Plate side="left" />
      <Plate side="right" />
      <div className="rc-intro__camera" aria-hidden="true">
        <div className="rc-intro__lockup">
          <div className="rc-intro__symbol">
            <img className="rc-intro__metal" src={metal + 'monogram.webp'} alt="" fetchPriority="high" />
            <img className="rc-intro__edge" src={metal + 'highlight.webp'} alt="" />
            <i className="rc-intro__glint" />
          </div>
          <div className="rc-intro__name">
            <img src={metal + 'wordmark.webp'} alt="" />
            <i className="rc-intro__foil" />
          </div>
          <div className="rc-intro__signature">
            <img src={metal + 'signature.webp'} alt="" />
          </div>
        </div>
      </div>
      {!presentation && <div className="rc-intro__instrument" aria-hidden="true">
        <svg className="rc-intro__register" preserveAspectRatio="none" viewBox="0 0 100 100">
          <path pathLength="1" d="M0 3V0H2M98 0h2v3M100 97v3h-2M2 100H0v-3" />
        </svg>
        <div className="rc-intro__status"><span className="rc-intro__percent">000</span><span className="rc-intro__caption">Direito do Trabalho</span></div>
        <div className="rc-intro__track"><div className="rc-intro__advance"><i /></div></div>
      </div>}
    </div>
  )
}

/** Labels are shared by the site, the high-resolution still and the motion master. */
export function buildIntroTimeline(root: HTMLElement, { short = false, reduced = false }: IntroOptions = {}) {
  const find = gsap.utils.selector(root)
  const timeline = gsap.timeline({ paused: true })
  const camera = find('.rc-intro__camera'), lockup = find('.rc-intro__lockup')
  const symbol = find('.rc-intro__symbol'), metalFace = find('.rc-intro__metal')
  const edge = find('.rc-intro__edge'), glint = find('.rc-intro__glint')
  const word = find('.rc-intro__name'), foil = find('.rc-intro__foil')
  const signature = find('.rc-intro__signature'), light = find('.rc-intro__light')
  const left = find('.rc-intro__plate--left'), right = find('.rc-intro__plate--right')
  const instrument = find('.rc-intro__instrument')

  if (reduced) {
    timeline.addLabel('formado', 0).addLabel('saída', .08).addLabel('hero', .08)
      .to(root, { opacity: 0, duration: .3, ease: 'sine.inOut' }, 'saída')
      .addLabel('fim', .38)
    return timeline
  }

  // One camera move follows the recessed edge into the complete, frontal mark.
  const formed = short ? .36 : 2.52
  const out = short ? .46 : 3.02
  const duration = short ? .42 : .90
  timeline.addLabel('formado', formed).addLabel('saída', out)
    .addLabel('hero', out + (short ? .12 : .47)).addLabel('fim', out + duration)
    .fromTo(camera, {
      scale: short ? 1.09 : 6.25,
      xPercent: short ? 0 : 5.4, yPercent: short ? 0 : 13.8,
      rotation: short ? 0 : -6.5,
    }, { scale: 1, xPercent: 0, yPercent: 0, rotation: 0, duration: short ? .32 : 2.3, ease: short ? 'power2.out' : 'power3.inOut', force3D: true }, 0)
    .fromTo(metalFace, { opacity: short ? .7 : .60 }, { opacity: 1, duration: short ? .19 : 1.2, ease: 'sine.out' }, 0)
    .fromTo(edge, { opacity: short ? .06 : .51 }, { opacity: .13, duration: short ? .22 : 1.8, ease: 'sine.inOut' }, 0)
    .fromTo(glint, { '--rc-pass': '-33%', opacity: short ? 0 : .79 }, {
      '--rc-pass': '135%', opacity: short ? 0 : .50, duration: short ? .01 : 1.40, ease: 'sine.inOut',
    }, .015)
    .fromTo(light, { opacity: short ? .9 : .49 }, { opacity: 1, duration: short ? .3 : 2.25, ease: 'sine.inOut' }, 0)
    .fromTo(word, { opacity: 0, clipPath: short ? 'inset(0 0% 0 0)' : 'inset(0 102% 0 0)', yPercent: short ? 5 : 13 }, {
      opacity: 1, clipPath: 'inset(0 0% 0 0)', yPercent: 0, duration: short ? .25 : 1.15, ease: 'power2.inOut',
    }, short ? .015 : .95)
    .fromTo(foil, { '--rc-pass': '-30%', opacity: .63 }, {
      '--rc-pass': '135%', opacity: .16, duration: short ? .22 : 1.08, ease: 'sine.inOut',
    }, short ? .045 : 1.16)
    .fromTo(signature, { opacity: 0, yPercent: short ? 3 : 16 }, {
      opacity: 1, yPercent: 0, duration: short ? .18 : .60, ease: 'power2.out',
    }, short ? .11 : 1.68)
    .fromTo(glint, { '--rc-pass': '-23%', opacity: 0 }, {
      '--rc-pass': '139%', opacity: short ? 0 : .31, duration: short ? .01 : .78, ease: 'sine.inOut', immediateRender: false,
    }, short ? .33 : 1.81)
    .to(lockup, { opacity: 0, y: short ? -4 : -12, duration: short ? .18 : .36, ease: 'power2.in' }, out)
    .to(symbol, { filter: 'brightness(1.14)', duration: short ? .12 : .28, ease: 'sine.in' }, out)
    .to(left, { clipPath: 'inset(0% 100% 0% 0%)', duration: duration - .01, ease: 'expo.inOut' }, out + .01)
    .to(right, { clipPath: 'inset(0% 0% 0% 100%)', duration: duration - .01, ease: 'expo.inOut' }, out + .01)

  if (instrument.length) {
    timeline.fromTo(find('.rc-intro__register path'), { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: short ? .13 : .64, ease: 'power2.out' }, 0)
      .fromTo(find('.rc-intro__status'), { opacity: 0, y: 5 }, { opacity: 1, y: 0, duration: short ? .12 : .38 }, short ? 0 : .22)
      .to(instrument, { opacity: 0, y: -3, duration: short ? .12 : .24, ease: 'sine.in' }, out)
  }
  return timeline
}

export function Loader({ onIntro, onFinish }: { onIntro: () => void; onFinish: () => void }) {
  const root = useRef<HTMLDivElement>(null)
  const meter = useRef<((n: number) => void) | null>(null)
  const atRest = useRef(false), assetsReady = useRef(false)
  const release = useRef<(() => void) | null>(null)
  const { progress, done, reduced, short } = usePreloader()

  useGSAP(() => {
    const stage = root.current
    if (!stage) return
    const animation = buildIntroTimeline(stage, { short, reduced })
    const value = { current: 0 }
    const count = stage.querySelector<HTMLElement>('.rc-intro__percent')!
    const status = stage.querySelector<HTMLElement>('.rc-intro__caption')!
    const bar = stage.querySelector<HTMLElement>('.rc-intro__advance')!
    const paint = () => {
      const n = Math.round(value.current)
      count.textContent = String(n).padStart(3, '0')
      status.textContent = n < 36 ? 'Direito do Trabalho' : n < 78 ? 'Estratégia' : 'Defesa'
      bar.style.transform = 'scaleX(' + n / 100 + ')'
    }
    const easeMeter = gsap.quickTo(value, 'current', { duration: reduced ? .05 : short ? .14 : .34, ease: 'power2.out', onUpdate: paint })
    meter.current = easeMeter
    let leaving = false, introduced = false, finished = false
    const introduce = () => { if (!introduced) { introduced = true; onIntro() } }
    const finish = () => { if (!finished) { finished = true; introduce(); onFinish() } }
    release.current = () => {
      if (leaving || !atRest.current || !assetsReady.current) return
      leaving = true
      easeMeter.tween.pause()
      value.current = 100
      paint()
      animation.call(introduce, [], 'hero').eventCallback('onComplete', finish)
      animation.play('saída')
    }
    const opening = animation.tweenTo('saída', { ease: 'none', onComplete: () => { atRest.current = true; release.current?.() } })
    const watchdog = window.setTimeout(finish, 5930)
    return () => {
      window.clearTimeout(watchdog)
      opening.kill()
      animation.kill()
      easeMeter.tween.kill()
      meter.current = null
      release.current = null
      atRest.current = false
      assetsReady.current = false
    }
  }, { scope: root, dependencies: [short, reduced, onIntro, onFinish], revertOnUpdate: true })
  useGSAP(() => { meter.current?.(progress) }, { dependencies: [progress] })
  useGSAP(() => {
    assetsReady.current = done
    if (done) release.current?.()
  }, { dependencies: [done] })
  return <IntroStage ref={root} />
}
