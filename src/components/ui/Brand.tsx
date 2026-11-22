import { site, publicName } from '../../config/site'
export function Brand() {
  return <span className="brand" aria-label={publicName()}><img src="/assets/logo/logo-mark.png" className="brand-mark" alt="" />{site.name ? <span className="brand-name">{site.name}</span> : <img className="brand-words" src="/assets/logo/wordmark-white.png" alt="Rocha Colares Advogados" />}</span>
}
