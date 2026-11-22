import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { site, publicName } from './src/config/site'

function metadata(): Plugin {
  const origin = (site.siteUrl || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? 'https://' + process.env.VERCEL_PROJECT_PRODUCTION_URL : '')).replace(/\/+$/, '')
  const escape = (str: string) => str.replace(/[&<>"']/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&apos;' }[c]!))
  const title = site.name ? site.name + ' | Advocacia trabalhista' : 'Direitos do trabalhador | Advocacia trabalhista'
  const robots = 'User-agent: *\nAllow: /\n' + (origin ? 'Sitemap: ' + origin + '/sitemap.xml\n' : '')
  const sitemap = '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' + (origin ? ['/', '/privacidade'].map(p => '<url><loc>'+escape(origin+p)+'</loc></url>').join('') : '') + '</urlset>'
  return {
    name: 'office-metadata',
    transformIndexHtml(html) {
      const data = Object.fromEntries(Object.entries({ '@context':'https://schema.org', '@type':'LegalService', name:site.name, serviceType: publicName() === site.name ? 'Direito do Trabalho' : publicName(), telephone:site.phone, url:origin, address:site.address, areaServed:site.city, sameAs:site.instagram }).filter(([,v])=>v))
      return html.replaceAll('%TITLE%',escape(title)).replaceAll('%OG_IMAGE%',escape(origin + '/og-image.jpg')).replace('<!--STRUCTURED-->','<script type="application/ld+json">'+JSON.stringify(data).replaceAll('<','\\u003c')+'</script>')
    },
    generateBundle() {
      this.emitFile({type:'asset',fileName:'robots.txt',source:robots})
      this.emitFile({type:'asset',fileName:'sitemap.xml',source:sitemap})
    },
    configureServer(server) {
      server.middlewares.use((req,res,next) => {
        if (req.url !== '/robots.txt' && req.url !== '/sitemap.xml') return next()
        res.setHeader('Content-Type', req.url === '/robots.txt' ? 'text/plain' : 'application/xml')
        res.end(req.url === '/robots.txt' ? robots : sitemap)
      })
    },
  }
}
export default defineConfig({ plugins:[react(), tailwindcss(), metadata()], build:{rollupOptions:{output:{manualChunks:{motion:['gsap','gsap/ScrollTrigger','gsap/SplitText','gsap/Flip','lenis']}}}} })
