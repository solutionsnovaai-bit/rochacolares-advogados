import { Compass, Eye, LockKeyhole, MessagesSquare, Route } from 'lucide-react'

export const steps = [
  ['Contato', 'Você conta o que aconteceu e quais dúvidas gostaria de esclarecer.'],
  ['Análise do caso', 'O contexto do trabalho, as datas e os documentos ajudam a compreender a situação.'],
  ['Estratégia', 'Conversamos sobre os caminhos possíveis, seus limites e o que cada escolha envolve.'],
  ['Ação', 'Com sua decisão e a contratação formalizada, são adotadas as providências combinadas.'],
  ['Acompanhamento', 'Você recebe informações sobre o andamento e pode esclarecer dúvidas ao longo do percurso.'],
]

export const pillars = [
  { Icon: LockKeyhole, title: 'Sigilo', text: 'O cuidado com a sua história começa na primeira conversa.' },
  { Icon: MessagesSquare, title: 'Atendimento direto', text: 'Espaço para perguntas e para contar os detalhes que importam.' },
  { Icon: Eye, title: 'Transparência', text: 'Etapas, possibilidades e condições explicadas em linguagem clara.' },
  { Icon: Compass, title: 'Estratégia', text: 'Cada escolha considera o contexto e os documentos do seu caso.' },
  { Icon: Route, title: 'Acompanhamento', text: 'Orientação para entender o que já aconteceu e os próximos passos.' },
]

export const constitution = 'https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm#art7xxix'
const laborCode = 'https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452compilado.htm'

export const faqs = [
  { question: 'Posso questionar uma demissão por justa causa?', answer: 'A justa causa pode ser discutida na Justiça do Trabalho. A análise considera o motivo indicado pela empresa, as circunstâncias e as provas disponíveis. Guarde a comunicação da dispensa e os documentos relacionados ao ocorrido.', source: 'CLT, art. 482', href: laborCode + '#art482' },
  { question: 'O que é rescisão indireta?', answer: 'É uma forma de encerrar o contrato quando o empregador comete uma falta grave prevista em lei. As consequências de continuar ou interromper o trabalho dependem da situação. Busque orientação individual antes de tomar essa decisão.', source: 'CLT, art. 483', href: laborCode + '#art483' },
  { question: 'Qual é o prazo para uma ação trabalhista?', answer: 'Em regra, após o fim do contrato, há até dois anos para ajuizar a ação. Normalmente, podem ser discutidos créditos dos cinco anos que antecedem o ajuizamento. As datas e as particularidades do caso precisam ser examinadas.', source: 'Constituição Federal, art. 7º, XXIX', href: constitution },
  { question: 'Trabalhei sem carteira assinada. E agora?', answer: 'A falta de registro não impede a análise do vínculo. Importa como o trabalho acontecia na prática, incluindo a prestação pessoal, a frequência, o pagamento e a subordinação. Mensagens, comprovantes e testemunhas podem ajudar a reconstruir essa rotina.', source: 'CLT, arts. 2º e 3º', href: laborCode + '#art3' },
  { question: 'Quem trabalha em home office tem direito a horas extras?', answer: 'A resposta depende da jornada, da forma de prestação do trabalho e das regras aplicáveis. A CLT prevê tratamento específico para o teletrabalho por produção ou tarefa. Contrato, horários e registros ajudam a avaliar cada situação.', source: 'CLT, arts. 62 e 75-B', href: laborCode + '#art75b' },
]

export const questions = [
  { label: 'Situação atual', title: 'Você ainda trabalha nesse emprego?', options: ['Sim, ainda trabalho', 'Meu contrato terminou', 'Estou em aviso prévio', 'Outra situação'] },
  { label: 'Registro', title: 'Sua carteira de trabalho foi assinada?', options: ['Sim, durante todo o período', 'Somente em parte do período', 'Trabalhei sem registro', 'Tenho dúvida'] },
  { label: 'Assunto', title: 'Qual assunto gostaria de conversar?', options: ['Rescisão e pagamentos', 'Jornada e horas extras', 'Registro e vínculo', 'Saúde ou ambiente de trabalho', 'Outro assunto'] },
  { label: 'Tempo de contrato', title: 'Por quanto tempo você trabalhou nesse vínculo?', options: ['Menos de seis meses', 'De seis meses a dois anos', 'Mais de dois anos', 'Não sei ao certo'] },
  { label: 'Relato', title: 'O que aconteceu?', options: [] },
]
