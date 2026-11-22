import {useRef} from 'react'
import {Link,useLocation} from 'react-router-dom'
import {ArrowUp} from 'lucide-react'
import {Brand} from '../ui/Brand'
import {publicName,site} from '../../config/site'
import {gsap,useGSAP} from '../../lib/gsap'
export function Footer(){
 const el=useRef<HTMLElement>(null),home=useLocation().pathname==='/'
 useGSAP(()=>{const mm=gsap.matchMedia();mm.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)',()=>{
 gsap.fromTo('.footer-word span',{yPercent:14},{yPercent:0,scrollTrigger:{trigger:el.current,start:'top bottom',end:'bottom bottom',scrub:true}})
 });return()=>mm.revert()},{scope:el})
 return <footer ref={el} className="footer"><div className="shell"><div className="footer-top"><Link to="/#inicio" aria-label="Página inicial"><Brand/></Link><nav className="footer-links" aria-label="Navegação de rodapé"><a href={home?'#atuacao':'/#atuacao'}>Áreas de atuação</a><a href={home?'#contato':'/#contato'}>Contato</a><Link to="/privacidade">Privacidade</Link></nav><a className="back-top" href={home?'#inicio':'#principal'}>Voltar ao topo <ArrowUp size={15}/></a></div>
 <div className="footer-word" aria-hidden="true"><span style={{display:'inline-block'}}>{site.shortName||site.name||'Advocacia'}</span></div><div className="footer-bottom"><span>© {new Date().getFullYear()} {publicName()}{site.oab&&' · '+site.oab}</span><span>As informações deste site têm caráter informativo e não substituem consulta jurídica.</span></div></div></footer>
}
