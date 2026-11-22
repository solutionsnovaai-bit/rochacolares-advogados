import {useEffect,useId,useRef,useState,type FormEvent} from 'react'
import {Link} from 'react-router-dom'
import {Check,Clock3,Copy,Compass,FileCheck2,Eye,LockKeyhole,MessagesSquare,Plus,ShieldCheck,MapPin,Phone,Instagram,ChevronLeft} from 'lucide-react'
import {site,whatsappLink} from '../../config/site'
import {faq,steps,pillars} from '../../content/labor'
import {gsap,useGSAP,ScrollTrigger} from '../../lib/gsap'
import {reducedMotion} from '../../lib/motion'
import {jumpTo} from '../../hooks/useLenis'
import {Button} from '../ui/Button'
import {WhatsApp} from '../ui/WhatsApp'
import {Photo} from '../ui/Photo'

function Process(){
 const ref=useRef<HTMLElement>(null)
 useGSAP(()=>{const mm=gsap.matchMedia();mm.add('(prefers-reduced-motion: no-preference)',()=>{
 gsap.fromTo('.step-line',{strokeDashoffset:1},{strokeDashoffset:0,ease:'none',scrollTrigger:{trigger:'.process-steps',start:'top 72%',end:'bottom 74%',scrub:true}})
 gsap.utils.toArray<HTMLElement>('.process-step').forEach(e=>gsap.from(e,{opacity:.45,y:12,duration:.55,scrollTrigger:{trigger:e,start:'top 91%',once:true}}))
 });return()=>mm.revert()},{scope:ref})
 return <section className="process sect-dark" id="atendimento" ref={ref}><div className="shell process-grid"><div className="process-aside"><p className="eyebrow"><i/>Como funciona</p><h2>Um passo<br/><em>de cada vez.</em></h2><p className="body-copy">Do primeiro contato ao acompanhamento, você participa das decisões sobre o seu caso.</p><Photo name="hands-signing" alt="Mãos com uma caneta sobre um documento."/></div><ol className="process-steps"><li aria-hidden="true" className="step-track"><svg viewBox="0 0 2 100" preserveAspectRatio="none"><path className="step-line" pathLength="1" d="M1 0V100"/></svg></li>{steps.map(([title,desc],i)=><li className="process-step" key={title}><span className="step-no">0{i+1}</span><div><h3>{title}</h3><p>{desc}</p></div></li>)}</ol></div></section>
}
function Deadline(){return <aside className="deadline" id="prazo"><div className="shell deadline-row"><Clock3 size={36} strokeWidth={1.25}/><div><p className="eyebrow dark-label">Prazos trabalhistas</p><h2>Prazo é direito.</h2></div><div><p>Em regra, você tem até <strong>dois anos após o fim do contrato</strong> para ajuizar uma ação. Podem ser cobrados, em geral, créditos dos <strong>cinco anos anteriores ao ajuizamento</strong>.</p><small>Informação geral. As exceções dependem do caso. <a href="https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm" target="_blank" rel="noopener noreferrer">Art. 7º, XXIX, da Constituição Federal.</a></small></div></div></aside>}
const questions=[
 {key:'Emprego atual',question:'Você ainda trabalha nesse emprego?',options:['Sim, continuo trabalhando','Não, o contrato terminou','Prefiro explicar depois']},
 {key:'Registro em carteira',question:'Sua carteira de trabalho foi assinada?',options:['Sim','Não','Em parte do período','Não tenho certeza']},
 {key:'Situação',question:'Qual tema se aproxima da sua situação?',options:['Vínculo e registro','Jornada e remuneração','Saúde, segurança ou assédio','Desligamento e verbas','Outro assunto']},
 {key:'Tempo de contrato',question:'Por quanto tempo você trabalhou nesse vínculo?',options:['Menos de 1 ano','De 1 a 3 anos','Mais de 3 anos','Não tenho certeza']},
 {key:'Relato',question:'O que aconteceu?',options:[]},
]
function Triage({transfer}:{transfer:(s:string)=>void}){
 const [step,setStep]=useState(0),[answers,setAnswers]=useState<string[]>(['','','','','']),[error,setError]=useState('')
 const panel=useRef<HTMLDivElement>(null),title=useRef<HTMLHeadingElement>(null),first=useRef(true),uid=useId()
 const question=questions[step],summary=questions.map((q,i)=>q.key+' — '+(answers[i].trim()||'A explicar em conversa.')).join('\n')
 const message='Olá, gostaria de conversar sobre a minha situação de trabalho.\n\n'+summary
 const target=whatsappLink(message)
 useEffect(()=>{if(first.current){first.current=false;return}title.current?.focus({preventScroll:true});if(!panel.current||reducedMotion())return
 const motion=gsap.fromTo(panel.current,{opacity:.4,x:10},{opacity:1,x:0,duration:.3});return()=>{motion.kill()}},[step])
 const update=(value:string)=>{setAnswers(old=>old.map((v,i)=>i===step?value:v));setError('')}
 const change=(n:number)=>{setError('');setStep(n)}
 return <section id="triagem" className="triage"><div className="shell triage-grid"><div><p className="eyebrow dark-label"><i/>Avalie seu caso</p><h2>Organize<br/><em>seu relato.</em></h2><p className="body-copy">Cinco perguntas para preparar a primeira conversa. Você pode revisar as respostas antes de escolher como compartilhá-las.</p><p className="privacy-note"><LockKeyhole size={17} strokeWidth={1.25}/>Suas respostas ficam nesta página enquanto ela está aberta.</p></div>
 <div className="triage-card"><div className="triage-meta"><span className="eyebrow dark-label">{step<5?'Preparação da conversa':'Relato organizado'}</span><div className="progress-ring"><svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="17"/><circle cx="20" cy="20" r="17" pathLength="100" strokeDasharray="100" strokeDashoffset={100-Math.min(step+1,5)*20}/></svg><span>{Math.min(step+1,5)}/5</span></div></div>
 <div ref={panel}>{step<5 ? <form onSubmit={e=>{e.preventDefault();if(step<4&&!answers[step]){setError('Selecione uma opção para continuar.');return}change(step+1)}}>
 <h3 ref={title} tabIndex={-1} id={uid}>{question.question}</h3>{step<4?<fieldset aria-labelledby={uid} className="choice-list">{question.options.map(o=><label key={o} className={answers[step]===o?'selected':''}><input name={'q'+step} type="radio" value={o} checked={answers[step]===o} onChange={()=>update(o)}/><span>{o}</span></label>)}</fieldset>:<label className="field"><span>Relato breve (opcional)</span><textarea maxLength={1200} rows={4} placeholder="Se desejar, conte o essencial sem incluir documentos ou dados de terceiros." value={answers[4]} onChange={e=>update(e.target.value)}/></label>}
 {error&&<p role="alert" className="form-error">{error}</p>}<div className="triage-actions">{step>0&&<button type="button" className="quiet-button" onClick={()=>change(step-1)}><ChevronLeft size={16}/>Voltar</button>}<button className="button ink-button">{step===4?'Ver meu resumo':'Continuar'}</button></div></form>:
 <div><h3 tabIndex={-1} ref={title}>Seu resumo</h3><dl className="answer-list">{questions.map((q,i)=><div key={q.key}><dt>{q.key}</dt><dd>{answers[i]||'A explicar em conversa.'}</dd></div>)}</dl><div className="triage-actions"><button className="quiet-button" onClick={()=>change(0)}>Revisar respostas</button>{target.startsWith('https')?<a href={target} className="button ink-button" target="_blank" rel="noopener noreferrer"><WhatsApp/>Abrir WhatsApp</a>:<button className="button ink-button" onClick={()=>transfer(message)}>Levar ao contato</button>}</div></div>}</div></div></div></section>
}
const pillarIcons=[ShieldCheck,MessagesSquare,Eye,Compass,FileCheck2]
function Pillars(){return <section id="pilares" className="pillars sect-dark"><div className="shell"><p className="eyebrow"><i/>Pilares</p><h2>Como conduzimos <em>cada conversa.</em></h2><div className="pillars-grid">{pillars.map(([t,d],i)=>{const Icon=pillarIcons[i];return <article key={t}><Icon size={27} strokeWidth={1.25}/><h3>{t}</h3><p>{d}</p></article>})}</div></div></section>}
function Faq(){const [open,setOpen]=useState<number|null>(0),id=useId()
 useEffect(()=>{const t=setTimeout(()=>ScrollTrigger.refresh(),380);return()=>clearTimeout(t)},[open])
 return <section className="faq" id="duvidas"><div className="shell faq-grid"><div><p className="eyebrow dark-label"><i/>Perguntas frequentes</p><h2>Dúvidas<br/><em>comuns.</em></h2></div><div>{faq.map(([q,a],i)=><article className={'faq-item '+(open===i?'on':'')} key={q}><h3><button aria-expanded={open===i} aria-controls={id+i} id={id+'q'+i} onClick={()=>setOpen(open===i?null:i)}>{q}<Plus size={18} strokeWidth={1.25}/></button></h3><div className="faq-answer" id={id+i} role="region" aria-labelledby={id+'q'+i} inert={open!==i}><div><p>{a}</p></div></div></article>)}</div></div></section>
}
function Closing(){const ref=useRef<HTMLElement>(null),link=whatsappLink()
 useGSAP(()=>{const mm=gsap.matchMedia();mm.add('(prefers-reduced-motion: no-preference)',()=>{gsap.fromTo('.closing-scale',{yPercent:-8},{yPercent:9,ease:'none',scrollTrigger:{trigger:ref.current,start:'top bottom',end:'bottom top',scrub:true}})});return()=>mm.revert()},{scope:ref})
 return <section className="closing sect-dark" ref={ref}><div className="shell"><img className="closing-scale" src="/assets/img/hero-scales.webp" alt="" loading="lazy"/><div><p className="eyebrow"><i/>Orientação trabalhista</p><h2>Vamos conversar sobre<br/><em>o seu trabalho?</em></h2><Button className="gold-button" href={link} target={link.startsWith('https')?'_blank':undefined} rel="noopener noreferrer"><WhatsApp/>Converse pelo WhatsApp</Button></div></div></section>}
type Fields={name:string;phone:string;subject:string;message:string}
function Contact({draft}:{draft:{text:string;key:number}}){
 const [fields,setFields]=useState<Fields>({name:'',phone:'',subject:'',message:''}),[errors,setErrors]=useState<Partial<Fields>>({}),[preview,setPreview]=useState(''),[status,setStatus]=useState('')
 const summaryRef=useRef<HTMLDivElement>(null)
 useEffect(()=>{if(draft.key){setFields(f=>({...f,message:draft.text,subject:'Relato da triagem'}));setPreview('');setStatus('')}},[draft])
 const update=(key:keyof Fields,v:string)=>{setFields(f=>({...f,[key]:v}));setErrors(e=>({...e,[key]:undefined}));setPreview('');setStatus('')}
 function submit(e:FormEvent<HTMLFormElement>){e.preventDefault();const next:Partial<Fields>={}
 if(!fields.name.trim())next.name='Informe seu nome.'
 if(fields.phone.trim()&&!/^\+?[\d\s().-]+$/.test(fields.phone))next.phone='Use um telefone com DDD.'
 if(fields.phone.trim()&&(fields.phone.replace(/\D/g,'').length<10||fields.phone.replace(/\D/g,'').length>15))next.phone='Confira o DDD e o número.'
 if(!fields.subject.trim())next.subject='Informe o assunto da conversa.'
 if(!fields.message.trim())next.message='Escreva uma mensagem.'
 setErrors(next);if(Object.keys(next).length){(e.currentTarget.elements.namedItem(Object.keys(next)[0]) as HTMLElement)?.focus();return}
 const msg=['Olá, meu nome é '+fields.name.trim()+'.',fields.phone.trim()?'Meu WhatsApp é '+fields.phone.trim()+'.':'','Assunto: '+fields.subject.trim(),fields.message.trim()].filter(Boolean).join('\n')
 setPreview(msg);setStatus('');setTimeout(()=>summaryRef.current?.focus({preventScroll:false}),0)}
 const wa=whatsappLink(preview),channels=Boolean(site.phone||site.whatsapp||site.instagram||site.city||site.address||site.hours)
 return <section id="contato" className="contact"><div className="shell contact-grid"><div><p className="eyebrow dark-label"><i/>Contato</p><h2>Conte a<br/><em>sua história.</em></h2><p className="body-copy">Prepare uma mensagem com o essencial para iniciar sua conversa com o escritório.</p>
 <aside className="contact-info">{site.name&&<h3>{site.name}</h3>}{site.phone&&<a href={'tel:'+site.phone.replace(/[^\d+]/g,'')}><Phone/>{site.phone}</a>}{site.whatsapp&&<a href={whatsappLink()} target="_blank" rel="noopener noreferrer"><WhatsApp/>{site.whatsapp}</a>}{site.instagram&&<a href={site.instagram.startsWith('https://')?site.instagram:'https://www.instagram.com/'+site.instagram.replace(/^@/,'')} target="_blank" rel="noopener noreferrer"><Instagram/>Instagram</a>}{(site.address||site.city)&&<p><MapPin/>{[site.address,site.city].filter(Boolean).join(' · ')}</p>}{site.hours&&<p><Clock3/>{site.hours}</p>}{!channels&&<p><LockKeyhole/>Você decide quando compartilhar a mensagem.</p>}</aside></div>
 <form noValidate className="contact-form" onSubmit={submit}><div className="form-pair">{(['name','phone'] as const).map(k=><label key={k} className="field"><span>{k==='name'?'Nome':'WhatsApp (opcional)'}</span><input name={k} required={k==='name'} maxLength={k==='name'?100:25} type={k==='name'?'text':'tel'} autoComplete={k==='name'?'given-name':'tel'} placeholder={k==='name'?'Seu nome':'DDD e número'} value={fields[k]} onChange={e=>update(k,e.target.value)} aria-invalid={!!errors[k]} aria-describedby={errors[k]?'err-'+k:undefined}/>{errors[k]&&<small id={'err-'+k} className="form-error">{errors[k]}</small>}</label>)}</div>
 {(['subject','message'] as const).map(k=><label key={k} className="field"><span>{k==='subject'?'Assunto':'Mensagem'}</span>{k==='subject'?<input name={k} required maxLength={150} placeholder="Sobre o que você gostaria de conversar?" value={fields[k]} onChange={e=>update(k,e.target.value)} aria-invalid={!!errors[k]} aria-describedby={errors[k]?'err-'+k:undefined}/>:<textarea name={k} required maxLength={3000} rows={5} placeholder="Descreva brevemente sua situação." value={fields[k]} onChange={e=>update(k,e.target.value)} aria-invalid={!!errors[k]} aria-describedby={errors[k]?'err-'+k:undefined}/>} {errors[k]&&<small className="form-error" id={'err-'+k}>{errors[k]}</small>}</label>)}
 <p className="field-help">Evite incluir números de documentos ou dados sensíveis. <Link to="/privacidade">Privacidade</Link></p><button className="button ink-button">Preparar mensagem</button>
 {preview&&<div tabIndex={-1} ref={summaryRef} className="message-preview"><h3>Mensagem preparada</h3><p>{preview}</p><div>{wa.startsWith('https')&&<a className="button ink-button" href={wa} target="_blank" rel="noopener noreferrer"><WhatsApp/>Abrir WhatsApp</a>}<button type="button" className="button dark-line" onClick={async()=>{try{await navigator.clipboard.writeText(preview);setStatus('Mensagem copiada.')}catch{setStatus('Selecione o texto acima e use a opção de copiar do seu navegador.')}}}><Copy size={16}/>Copiar mensagem</button></div>{status&&<p className="feedback" role="status"><Check size={15}/>{status}</p>}</div>}</form></div></section>
}
export default function Engagement(){
 const [draft,setDraft]=useState({text:'',key:0}),root=useRef<HTMLDivElement>(null)
 useGSAP(()=>{const mm=gsap.matchMedia();mm.add('(prefers-reduced-motion: no-preference)',()=>{
   ScrollTrigger.batch('.pillars-grid article,.triage-card,.faq-item,.contact-form,.deadline-row',{start:'top 93%',once:true,onEnter:items=>gsap.from(items,{y:18,opacity:.55,stagger:.045,duration:.6,ease:'editorial'})})
   gsap.fromTo('.process-aside .photo',{clipPath:'inset(0 0 12% 0 round 24px)',scale:1.04},{clipPath:'inset(0 0 0% 0 round 24px)',scale:1,scrollTrigger:{trigger:'.process-aside .photo',start:'top 90%',end:'center 64%',scrub:true}})
 });return()=>mm.revert()},{scope:root})
 return <div ref={root}><Process/><Deadline/><Triage transfer={text=>{setDraft(d=>({text,key:d.key+1}));const target=document.getElementById('contato');if(target){history.pushState(null,'','#contato');jumpTo(target);target.tabIndex=-1;target.focus({preventScroll:true})}}}/><Pillars/><Faq/><Closing/><Contact draft={draft}/></div>
}
