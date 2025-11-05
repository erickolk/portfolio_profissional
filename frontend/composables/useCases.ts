// Dados mock dos cases/projetos
export interface CaseData {
  id: string
  slug: string
  title: string
  subtitle: string
  category: string
  image?: string
  problem?: string
  solution?: string
  architectureSvg?: string
  techStack?: string[]
  process?: Array<{ title: string; description: string }>
  results?: string[]
  kpis?: Array<{ label: string; value: string }>
}

export const useCases = () => {
  const cases: CaseData[] = [
    {
      id: '1',
      slug: 'evolutech-crm',
      title: 'Evolutech CRM',
      subtitle: 'Sistema completo de gestão de relacionamento com clientes para empresas de tecnologia',
      category: 'Produto',
      image: '/images/cases/evolutech-crm.jpg',
      problem: 'Empresas de tecnologia precisavam de um CRM específico para gerenciar leads técnicos, projetos de desenvolvimento e relacionamento com desenvolvedores de forma eficiente.',
      solution: 'Desenvolvimento de CRM completo com módulos de pipeline de vendas, gestão de projetos, integração com ferramentas de desenvolvimento (GitHub, Jira), dashboard analítico e automações personalizadas.',
      techStack: ['Nuxt 3', 'Vue.js', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'Docker', 'Redis'],
      process: [
        {
          title: 'Análise e Planejamento',
          description: 'Levantamento de requisitos, mapeamento de processos e definição da arquitetura do sistema'
        },
        {
          title: 'Desenvolvimento Ágil',
          description: 'Desenvolvimento em sprints com entregas incrementais e feedback constante do cliente'
        },
        {
          title: 'Integrações',
          description: 'Integração com APIs de terceiros (GitHub, Slack, WhatsApp) e sistema de notificações'
        },
        {
          title: 'Deploy e Treinamento',
          description: 'Deploy em produção, treinamento da equipe e documentação completa do sistema'
        }
      ],
      results: [
        'Redução de 40% no tempo de gestão de leads',
        'Aumento de 35% na taxa de conversão',
        'Automação de 60% dos processos manuais',
        'Melhoria na comunicação interna entre equipes'
      ],
      kpis: [
        { label: 'Taxa de Conversão', value: '+35%' },
        { label: 'Tempo Economizado', value: '40%' },
        { label: 'Automações', value: '60%' }
      ]
    },
    {
      id: '2',
      slug: 'automacao-fiscal-arapiraca',
      title: 'Automação Fiscal Arapiraca',
      subtitle: 'Sistema de automação de processos fiscais para prefeitura e empresas locais',
      category: 'Automação',
      image: '/images/cases/automacao-fiscal.jpg',
      problem: 'Processos fiscais manuais consumiam horas de trabalho diário, gerando erros e atrasos no atendimento ao contribuinte e na arrecadação municipal.',
      solution: 'Desenvolvimento de sistema automatizado que integra processos fiscais, gera relatórios automáticos, envia notificações e permite consulta online de débitos e documentos.',
      techStack: ['Nuxt 3', 'Node.js', 'Python', 'PostgreSQL', 'Docker', 'API REST'],
      process: [
        {
          title: 'Mapeamento de Processos',
          description: 'Análise detalhada dos processos fiscais existentes e identificação de pontos de automação'
        },
        {
          title: 'Desenvolvimento da Solução',
          description: 'Criação de módulos de automação, integração com sistemas legados e APIs governamentais'
        },
        {
          title: 'Testes e Validação',
          description: 'Testes extensivos com dados reais e validação com equipe técnica da prefeitura'
        },
        {
          title: 'Treinamento e Suporte',
          description: 'Capacitação completa da equipe e suporte contínuo para ajustes e melhorias'
        }
      ],
      results: [
        'Redução de 70% no tempo de processamento de documentos fiscais',
        'Eliminação de erros manuais',
        'Melhoria significativa no atendimento ao contribuinte',
        'Aumento na eficiência da arrecadação'
      ],
      kpis: [
        { label: 'Redução de Tempo', value: '70%' },
        { label: 'Erros Eliminados', value: '100%' },
        { label: 'Satisfação', value: '95%' }
      ]
    },
    {
      id: '3',
      slug: 'guardiao-digital',
      title: 'Guardião Digital',
      subtitle: 'Sistema de monitoramento e segurança digital para empresas',
      category: 'Produto',
      image: '/images/cases/guardiao-digital.jpg',
      problem: 'Empresas precisavam de uma solução completa para monitorar a segurança digital, detectar ameaças em tempo real e proteger dados sensíveis sem depender de soluções internacionais caras.',
      solution: 'Plataforma de segurança digital com monitoramento 24/7, detecção de ameaças, relatórios de segurança, compliance LGPD e dashboard em tempo real.',
      techStack: ['Vue.js', 'Node.js', 'Python', 'MongoDB', 'Docker', 'Elasticsearch', 'WebSockets'],
      process: [
        {
          title: 'Análise de Requisitos',
          description: 'Definição de funcionalidades de segurança, compliance e integrações necessárias'
        },
        {
          title: 'Arquitetura de Segurança',
          description: 'Desenvolvimento de arquitetura segura com criptografia, logs e auditoria'
        },
        {
          title: 'Sistema de Monitoramento',
          description: 'Implementação de monitoramento em tempo real e alertas automáticos'
        },
        {
          title: 'Deploy e Configuração',
          description: 'Instalação em ambiente seguro, configuração e treinamento da equipe'
        }
      ],
      results: [
        'Detecção de ameaças em tempo real',
        'Redução de 80% em incidentes de segurança',
        'Compliance total com LGPD',
        'Dashboard intuitivo para gestão de segurança'
      ],
      kpis: [
        { label: 'Ameaças Detectadas', value: '100%' },
        { label: 'Redução de Incidentes', value: '80%' },
        { label: 'Uptime', value: '99.9%' }
      ]
    },
    {
      id: '4',
      slug: 'saas-negocios-locais',
      title: 'SaaS para Negócios Locais',
      subtitle: 'Plataforma multi-tenant para gestão de estabelecimentos comerciais locais',
      category: 'Produto',
      image: '/images/cases/saas-local.jpg',
      problem: 'Estabelecimentos comerciais locais precisavam de uma solução acessível para gestão de estoque, vendas, clientes e financeiro, sem depender de sistemas caros e complexos.',
      solution: 'Plataforma SaaS multi-tenant com módulos de gestão completos, aplicativo mobile, relatórios automatizados e integração com gateways de pagamento.',
      techStack: ['Nuxt 3', 'Vue.js', 'Node.js', 'Express', 'PostgreSQL', 'Redis', 'Docker', 'AWS'],
      process: [
        {
          title: 'Pesquisa e Validação',
          description: 'Entrevistas com comerciantes locais para entender necessidades reais'
        },
        {
          title: 'MVP e Testes',
          description: 'Desenvolvimento de MVP com funcionalidades essenciais e testes com usuários beta'
        },
        {
          title: 'Escalabilidade',
          description: 'Arquitetura multi-tenant escalável para suportar milhares de estabelecimentos'
        },
        {
          title: 'Lançamento e Crescimento',
          description: 'Lançamento público, onboarding de clientes e evolução contínua da plataforma'
        }
      ],
      results: [
        'Mais de 200 estabelecimentos utilizando a plataforma',
        'Redução de 50% nos custos operacionais dos clientes',
        'Aumento de 30% nas vendas através de relatórios e insights',
        'Plataforma escalável e acessível para pequenos negócios'
      ],
      kpis: [
        { label: 'Clientes Ativos', value: '200+' },
        { label: 'Redução de Custos', value: '50%' },
        { label: 'Aumento de Vendas', value: '+30%' }
      ]
    },
    {
      id: '5',
      slug: 'integracao-banco-cora',
      title: 'Integração Banco Cora',
      subtitle: 'Sistema de integração financeira via API para automação de pagamentos e conciliação',
      category: 'Automação',
      image: '/images/cases/banco-cora.jpg',
      problem: 'Empresas precisavam automatizar processos financeiros como recebimento de pagamentos, conciliação bancária e emissão de boletos, mas as integrações existentes eram complexas e caras.',
      solution: 'Desenvolvimento de integração completa com API do Banco Cora, incluindo automação de pagamentos, webhooks para notificações, conciliação automática e dashboard financeiro.',
      techStack: ['Node.js', 'Express', 'PostgreSQL', 'Redis', 'Webhooks', 'API REST', 'OAuth 2.0'],
      process: [
        {
          title: 'Análise da API',
          description: 'Estudo detalhado da documentação da API do Banco Cora e definição de fluxos'
        },
        {
          title: 'Desenvolvimento da Integração',
          description: 'Implementação de endpoints, autenticação OAuth, webhooks e tratamento de erros'
        },
        {
          title: 'Automações',
          description: 'Criação de fluxos automatizados para pagamentos, conciliação e notificações'
        },
        {
          title: 'Testes e Deploy',
          description: 'Testes extensivos em ambiente sandbox e deploy em produção com monitoramento'
        }
      ],
      results: [
        'Automação completa de processos financeiros',
        'Redução de 90% no tempo de conciliação bancária',
        'Integração segura e confiável com API bancária',
        'Dashboard em tempo real de transações e saldos'
      ],
      kpis: [
        { label: 'Automação', value: '100%' },
        { label: 'Redução de Tempo', value: '90%' },
        { label: 'Confiabilidade', value: '99.9%' }
      ]
    },
    {
      id: '6',
      slug: 'app-checagem-sintomas',
      title: 'App de Checagem de Sintomas',
      subtitle: 'Aplicativo mobile para triagem de sintomas e orientação de saúde',
      category: 'Consultoria',
      image: '/images/cases/app-sintomas.jpg',
      problem: 'Durante a pandemia, clínicas e hospitais precisavam de uma forma eficiente de fazer triagem inicial de pacientes, reduzindo aglomerações e otimizando o atendimento.',
      solution: 'Desenvolvimento de aplicativo mobile com questionário inteligente de sintomas, sistema de scoring, recomendações personalizadas e integração com sistemas de agendamento.',
      techStack: ['React Native', 'Node.js', 'MongoDB', 'API REST', 'Firebase', 'Push Notifications'],
      process: [
        {
          title: 'Pesquisa e Validação',
          description: 'Entrevistas com profissionais de saúde para definir critérios de triagem'
        },
        {
          title: 'Desenvolvimento Mobile',
          description: 'Criação do app mobile com UX intuitiva e algoritmo de scoring de sintomas'
        },
        {
          title: 'Backend e Integrações',
          description: 'Desenvolvimento de API robusta e integração com sistemas de saúde'
        },
        {
          title: 'Testes e Lançamento',
          description: 'Testes com profissionais de saúde e lançamento gradual para validação'
        }
      ],
      results: [
        'Redução de 60% no tempo de triagem',
        'Melhoria na organização do atendimento',
        'Sistema de scoring preciso para priorização',
        'Interface intuitiva e acessível para todos os públicos'
      ],
      kpis: [
        { label: 'Redução de Tempo', value: '60%' },
        { label: 'Precisão', value: '92%' },
        { label: 'Satisfação', value: '88%' }
      ]
    }
  ]

  const getCaseBySlug = (slug: string): CaseData | undefined => {
    return cases.find(c => c.slug === slug)
  }

  const getCasesByCategory = (category: string): CaseData[] => {
    if (category === 'all') return cases
    return cases.filter(c => c.category.toLowerCase() === category.toLowerCase())
  }

  return {
    cases,
    getCaseBySlug,
    getCasesByCategory
  }
}

