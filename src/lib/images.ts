import tiny from './placeholders.json'
export function picture(name: string) {
  return { src:'/assets/img/'+name+'.webp', placeholder:(tiny as Record<string,string>)[name] || '' }
}
