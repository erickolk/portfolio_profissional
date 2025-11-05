<template>
  <div class="min-h-screen">
    <!-- Hero -->
    <section class="py-20 bg-gradient-to-b from-secondary/50 to-background">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto text-center">
          <h1
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :enter="{ opacity: 1, y: 0 }"
            class="text-4xl md:text-5xl font-bold mb-6"
          >
            Serviços que Transformam Negócios
          </h1>
          <p
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :enter="{ opacity: 1, y: 0, transition: { delay: 100 } }"
            class="text-xl text-muted-foreground"
          >
            Soluções tecnológicas sob medida para impulsionar seu crescimento
          </p>
        </div>
      </div>
    </section>

    <!-- Services -->
    <section class="py-20">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <ServiceCard
            v-for="(service, index) in services"
            :key="index"
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :visible="{ opacity: 1, y: 0, transition: { delay: index * 100 } }"
            :icon="service.icon"
            :title="service.title"
            :description="service.description"
            :features="service.features"
            @click="handleServiceClick(service)"
          />
        </div>
      </div>
    </section>

    <!-- How it Works -->
    <section class="py-20 bg-secondary/50">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <h2 class="text-3xl md:text-4xl font-bold text-center mb-12">
            Como Funciona
          </h2>
          <div class="space-y-8">
            <div
              v-for="(step, index) in steps"
              :key="index"
              v-motion
              :initial="{ opacity: 0, x: -30 }"
              :visible="{ opacity: 1, x: 0, transition: { delay: index * 100 } }"
            >
              <UiCard class="flex gap-6">
                <div class="flex-shrink-0">
                  <div class="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold">
                    {{ index + 1 }}
                  </div>
                </div>
                <div>
                  <h3 class="text-xl font-bold mb-2">{{ step.title }}</h3>
                  <p class="text-muted-foreground">{{ step.description }}</p>
                </div>
              </UiCard>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-20">
      <div class="container mx-auto px-4">
        <UiCard class="max-w-3xl mx-auto text-center bg-gradient-to-r from-primary/10 to-accent/10">
          <div class="text-5xl mb-6">💡</div>
          <h2 class="text-3xl font-bold mb-4">
            Tem um projeto em mente?
          </h2>
          <p class="text-lg text-muted-foreground mb-8">
            Vamos conversar sobre como transformar sua ideia em realidade
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <UiButton size="lg" @click="navigateTo('/contact')">
              Solicitar Orçamento
            </UiButton>
            <UiButton size="lg" variant="outline" @click="navigateTo('/projects')">
              Ver Projetos
            </UiButton>
          </div>
        </UiCard>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig()

// SEO
useHead({
  title: 'Serviços - Erick Oliveira | Desenvolvimento de Sistemas e Automações',
  meta: [
    {
      name: 'description',
      content: 'Serviços de desenvolvimento: sistemas personalizados, landing pages de alta conversão, automações e integrações, capacitação de equipes.'
    },
    {
      property: 'og:title',
      content: 'Serviços - Erick Oliveira'
    },
    {
      property: 'og:url',
      content: `${config.public.siteUrl}/services`
    }
  ]
})

// Services
const services = [
  {
    icon: '🎯',
    title: 'Sistemas Personalizados',
    description: 'Criação de sistemas internos, ERPs e dashboards sob medida para empresas. Backend robusto, APIs seguras e UX eficiente.',
    features: [
      'ERPs e sistemas de gestão',
      'Dashboards e painéis administrativos',
      'Portais internos e intranets',
      'APIs RESTful e integrações',
      'Arquitetura escalável'
    ]
  },
  {
    icon: '🚀',
    title: 'Sites e Landing Pages',
    description: 'Páginas modernas e otimizadas para captar clientes e gerar vendas. SEO técnico, copy estratégica e performance impecável.',
    features: [
      'Landing pages de alta conversão',
      'Sites institucionais modernos',
      'SEO técnico e otimização',
      'Performance 100/100',
      'Design responsivo'
    ]
  },
  {
    icon: '⚙️',
    title: 'Automação e Integrações',
    description: 'Conecte ferramentas, elimine tarefas repetitivas e ganhe tempo. Bots, integrações com APIs e automações personalizadas.',
    features: [
      'Automação de processos',
      'Integração de sistemas',
      'Bots para Discord, WhatsApp, etc',
      'Scraping e coleta de dados',
      'Webhooks e notificações'
    ]
  },
  {
    icon: '📚',
    title: 'Capacitação e Cursos de TI',
    description: 'Treinamento de equipes e cursos personalizados. Office básico, lógica de programação, automação e mais.',
    features: [
      'Office básico (Word, Excel, PowerPoint)',
      'Lógica e programação',
      'Desenvolvimento web',
      'Automação e APIs',
      'Treinamento in-company'
    ]
  }
]

// Steps
const steps = [
  {
    title: 'Diagnóstico Inicial',
    description: 'Conversamos sobre seu desafio, necessidades e objetivos. Essa etapa é gratuita e pode ser feita em 15 minutos.'
  },
  {
    title: 'Proposta Personalizada',
    description: 'Apresento uma proposta detalhada com escopo, prazos e investimento. Sem surpresas, tudo transparente.'
  },
  {
    title: 'Desenvolvimento',
    description: 'Coloco a mão na massa e desenvolvo a solução com atualizações constantes sobre o progresso.'
  },
  {
    title: 'Entrega e Treinamento',
    description: 'Entrego o projeto finalizado e ofereço treinamento para que sua equipe possa usar com autonomia.'
  },
  {
    title: 'Suporte Contínuo',
    description: 'Fico disponível para suporte, ajustes e evoluções conforme seu negócio cresce.'
  }
]

const handleServiceClick = (service: any) => {
  // Track event
  if (typeof window !== 'undefined' && (window as any).dataLayer) {
    (window as any).dataLayer.push({
      event: 'service_view',
      event_category: 'engagement',
      event_label: service.title
    })
  }
  
  navigateTo('/contact')
}
</script>

