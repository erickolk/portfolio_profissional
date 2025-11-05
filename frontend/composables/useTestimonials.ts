// Dados mock de depoimentos
export interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  project: string
  image?: string
  rating: number
  text: string
  featured?: boolean
}

export const useTestimonials = () => {
  const testimonials: Testimonial[] = [
    {
      id: '1',
      name: 'Patroa (Cliente Especial)',
      role: 'Gestora',
      company: 'Prefeitura de Arapiraca',
      project: 'Automação Fiscal Arapiraca',
      rating: 5,
      text: 'O sistema de automação fiscal desenvolvido pelo Erick transformou completamente nosso trabalho. Antes, gastávamos horas fazendo processos manuais que agora são automatizados. A redução de tempo foi impressionante e eliminamos completamente os erros. O atendimento ao contribuinte melhorou muito e conseguimos ser muito mais eficientes. Recomendo totalmente!',
      featured: true
    },
    {
      id: '2',
      name: 'Maria Silva',
      role: 'CEO',
      company: 'TechSolutions AL',
      project: 'Evolutech CRM',
      rating: 5,
      text: 'O CRM desenvolvido pelo Erick foi exatamente o que nossa empresa precisava. Ele entendeu perfeitamente nossas necessidades e criou uma solução que se adapta perfeitamente ao nosso fluxo de trabalho. A integração com GitHub e outras ferramentas que usamos foi fundamental. Nosso time está muito mais produtivo!',
      featured: false
    },
    {
      id: '3',
      name: 'João Santos',
      role: 'Diretor Comercial',
      company: 'Comércio Local Ltda',
      project: 'SaaS para Negócios Locais',
      rating: 5,
      text: 'Estávamos usando planilhas e processos manuais que geravam muitos erros. Com a plataforma do Erick, conseguimos automatizar tudo e ter controle total do nosso negócio. O melhor de tudo é que é acessível e fácil de usar. Nossas vendas aumentaram significativamente após começarmos a usar os relatórios e insights da plataforma.',
      featured: false
    },
    {
      id: '4',
      name: 'Ana Costa',
      role: 'Coordenadora de TI',
      company: 'Empresa de Saúde',
      project: 'App de Checagem de Sintomas',
      rating: 5,
      text: 'O aplicativo desenvolvido pelo Erick foi essencial durante a pandemia. Conseguimos fazer triagem eficiente dos pacientes, reduzir aglomerações e organizar melhor o atendimento. A interface é intuitiva e o sistema de scoring é muito preciso. Foi uma solução que realmente fez a diferença!',
      featured: false
    }
  ]

  const getFeaturedTestimonial = (): Testimonial | undefined => {
    return testimonials.find(t => t.featured)
  }

  const getTestimonialsByProject = (projectSlug: string): Testimonial[] => {
    return testimonials.filter(t => t.project.toLowerCase().includes(projectSlug.toLowerCase()))
  }

  return {
    testimonials,
    getFeaturedTestimonial,
    getTestimonialsByProject
  }
}

