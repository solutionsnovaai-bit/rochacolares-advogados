import { useRef, type AnchorHTMLAttributes } from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { useMagnetic } from '../../hooks/useMagnetic'
export function Button({className,children,...props}: AnchorHTMLAttributes<HTMLAnchorElement>){
  const ref=useRef<HTMLAnchorElement>(null)
  useMagnetic(ref)
  return <a {...props} ref={ref} className={twMerge(clsx('button',className))}>{children}</a>
}
