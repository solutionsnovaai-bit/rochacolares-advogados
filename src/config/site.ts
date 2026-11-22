/** Dados públicos do escritório. Use o WhatsApp com DDI e DDD. */
export const site = {
  name: '', shortName: '', phone: '', whatsapp: '+55 (11) 95100-7967',
  instagram: '', address: '', city: '', siteUrl: '', hours: '',
}
export const practiceName = 'Advocacia trabalhista'
export const publicName = () => site.name.trim() || practiceName
export function whatsappLink(message = '') {
  const number = site.whatsapp.replace(/\D/g, '')
  return number ? 'https://wa.me/' + number + (message ? '?text=' + encodeURIComponent(message) : '') : '#contato'
}
export const navItems = [
  { id: 'inicio', label: 'Início' }, { id: 'escritorio', label: 'O escritório' },
  { id: 'atuacao', label: 'Atuação' }, { id: 'atendimento', label: 'Atendimento' },
  { id: 'duvidas', label: 'Dúvidas' },
]
