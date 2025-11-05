<template>
  <div>
    <!-- Hero Section -->
    <HeroThreePlexus />

    <!-- Value Props -->
    <section class="py-20 bg-secondary/50">
      <div class="container mx-auto px-4">
        <h2
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :visible="{ opacity: 1, y: 0 }"
          class="text-3xl md:text-4xl font-bold text-center mb-12"
        >
          Como posso ajudar seu negócio
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="(prop, index) in valueProps"
            :key="index"
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :visible="{ opacity: 1, y: 0, transition: { delay: index * 100 } }"
          >
            <UiCard :hover="true" class="text-center h-full">
              <div class="text-5xl mb-4">{{ prop.icon }}</div>
              <h3 class="text-xl font-bold mb-3">{{ prop.title }}</h3>
              <p class="text-muted-foreground">{{ prop.description }}</p>
            </UiCard>
          </div>
        </div>
      </div>
    </section>

    <!-- Segment Banners -->
    <section class="py-20">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <UiCard
            v-for="(segment, index) in segments"
            :key="index"
            :hover="true"
            class="text-center cursor-pointer"
            @click="navigateTo(segment.link)"
          >
            <div class="text-4xl mb-4">{{ segment.icon }}</div>
            <h3 class="text-xl font-bold mb-2">{{ segment.title }}</h3>
            <p class="text-muted-foreground mb-4">{{ segment.description }}</p>
            <UiButton variant="outline" size="sm">
              {{ segment.cta }}
            </UiButton>
          </UiCard>
        </div>
      </div>
    </section>

    <!-- Projetos em Destaque -->
    <section id="projects" class="py-20 bg-secondary/50">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :visible="{ opacity: 1, y: 0 }"
            class="text-3xl md:text-4xl font-bold mb-4"
          >
            Projetos em Destaque
          </h2>
          <p
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :visible="{ opacity: 1, y: 0, transition: { delay: 100 } }"
            class="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Soluções reais que transformaram negócios e geraram resultados
          </p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
          <div
            v-for="(caseItem, index) in featuredCases"
            :key="caseItem.id"
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :visible="{ opacity: 1, y: 0, transition: { delay: index * 100 } }"
          >
            <CaseCard
              :case-data="caseItem"
              @click="openCase(caseItem)"
            />
          </div>
        </div>
        <div class="text-center">
          <UiButton size="lg" @click="navigateTo('/projects')">
            Ver todos os projetos
          </UiButton>
        </div>
      </div>
    </section>

    <!-- Depoimentos -->
    <section class="py-20">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :visible="{ opacity: 1, y: 0 }"
            class="text-3xl md:text-4xl font-bold mb-4"
          >
            O que dizem sobre meu trabalho
          </h2>
          <p
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :visible="{ opacity: 1, y: 0, transition: { delay: 100 } }"
            class="text-lg text-muted-foreground"
          >
            A melhor propaganda é o resultado que entregamos
          </p>
        </div>
        <div class="max-w-4xl mx-auto">
          <div
            v-for="(testimonial, index) in testimonials"
            :key="testimonial.id"
            v-motion
            :initial="{ opacity: 0, scale: 0.95 }"
            :visible="{ opacity: 1, scale: 1, transition: { delay: index * 200 } }"
            class="mb-6"
          >
            <UiCard :class="testimonial.featured ? 'bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20' : ''">
              <div class="flex items-center justify-center mb-4">
                <div class="text-2xl">
                  <span v-for="i in 5" :key="i" :class="i <= testimonial.rating ? 'text-yellow-400' : 'text-gray-400'">⭐</span>
                </div>
              </div>
              <p class="text-xl mb-6 italic text-muted-foreground">
                "{{ testimonial.text }}"
              </p>
              <div>
                <p class="font-semibold text-lg">{{ testimonial.name }}</p>
                <p class="text-sm text-muted-foreground">{{ testimonial.role }} - {{ testimonial.company }}</p>
                <p class="text-xs text-primary mt-1">{{ testimonial.project }}</p>
              </div>
            </UiCard>
          </div>
        </div>
      </div>
    </section>

    <!-- Como Trabalho -->
    <section class="py-20 bg-secondary/50">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :visible="{ opacity: 1, y: 0 }"
            class="text-3xl md:text-4xl font-bold mb-4"
          >
            Como trabalho
          </h2>
          <p
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :visible="{ opacity: 1, y: 0, transition: { delay: 100 } }"
            class="text-lg text-muted-foreground"
          >
            Um processo simples e eficiente
          </p>
        </div>
        <div class="max-w-4xl mx-auto">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div
              v-for="(step, index) in processSteps"
              :key="index"
              v-motion
              :initial="{ opacity: 0, scale: 0.9 }"
              :visible="{ opacity: 1, scale: 1, transition: { delay: index * 100 } }"
              class="text-center"
            >
              <div class="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                {{ index + 1 }}
              </div>
              <h3 class="text-lg font-bold mb-2">{{ step.title }}</h3>
              <p class="text-sm text-muted-foreground">{{ step.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Final -->
    <section class="py-20">
      <div class="container mx-auto px-4">
        <UiCard class="max-w-3xl mx-auto text-center bg-gradient-to-r from-primary/10 to-accent/10">
          <div class="text-5xl mb-6">🚀</div>
          <h2 class="text-3xl md:text-4xl font-bold mb-4">
            Pronto para transformar sua ideia em realidade?
          </h2>
          <p class="text-lg text-muted-foreground mb-8">
            Vamos conversar sobre como posso ajudar seu negócio a crescer
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <UiButton size="lg" @click="navigateTo('/contact')">
              Solicitar Orçamento
            </UiButton>
            <UiButton size="lg" variant="outline" @click="openCalendly">
              Agendar Diagnóstico 15min
            </UiButton>
          </div>
        </UiCard>
      </div>
    </section>

    <!-- Case Modal -->
    <CaseModal
      v-if="selectedCase"
      v-model="isCaseModalOpen"
      :case-data="selectedCase"
      :has-previous="false"
      :has-next="false"
      @contact="navigateTo('/contact')"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const config = useRuntimeConfig()
const { cases: allCases } = useCases()
const { testimonials: allTestimonials } = useTestimonials()

// Featured cases (primeiros 3)
const featuredCases = allCases.slice(0, 3)

// Testimonials (mostrar todos, com destaque para o featured)
const testimonials = allTestimonials.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))

// Modal para cases
const isCaseModalOpen = ref(false)
const selectedCase = ref(null)

const openCase = (caseData: any) => {
  selectedCase.value = caseData
  isCaseModalOpen.value = true
  
  // Track event
  if (typeof window !== 'undefined' && (window as any).dataLayer) {
    (window as any).dataLayer.push({
      event: 'case_view',
      event_category: 'engagement',
      event_label: caseData.title
    })
  }
}

// SEO
useHead({
  title: 'Erick Oliveira - Desenvolvedor Full Stack | Sistemas e Automações',
  meta: [
    {
      name: 'description',
      content: 'Desenvolvedor Full Stack especializado em sistemas sob medida, automações e landing pages de alta conversão. Raízes em Arapiraca, soluções para o Brasil.'
    },
    {
      property: 'og:title',
      content: 'Erick Oliveira - Desenvolvedor Full Stack'
    },
    {
      property: 'og:description',
      content: 'Desenvolvedor Full Stack especializado em sistemas sob medida, automações e landing pages de alta conversão.'
    },
    {
      property: 'og:url',
      content: config.public.siteUrl
    }
  ]
})

// Value Props
const valueProps = [
  {
    icon: '⚙️',
    title: 'Automação de Processos',
    description: 'Elimine tarefas repetitivas e ganhe tempo automatizando seus processos'
  },
  {
    icon: '🎯',
    title: 'Sistemas Sob Medida',
    description: 'Soluções personalizadas que se adaptam perfeitamente ao seu negócio'
  },
  {
    icon: '🔌',
    title: 'Integrações de APIs',
    description: 'Conecte suas ferramentas e sistemas para trabalhar de forma integrada'
  },
  {
    icon: '📚',
    title: 'Capacitação de Equipes',
    description: 'Treinamento e cursos para sua equipe dominar novas tecnologias'
  }
]

// Segments
const segments = [
  {
    icon: '🏪',
    title: 'Negócios Locais',
    description: 'Soluções para estabelecimentos e empresas regionais',
    cta: 'Saiba mais',
    link: '/services'
  },
  {
    icon: '👔',
    title: 'Gestores',
    description: 'Sistemas de gestão e automações empresariais',
    cta: 'Ver soluções',
    link: '/services'
  },
  {
    icon: '🎓',
    title: 'Escolas e Treinamentos',
    description: 'Cursos e capacitação em tecnologia',
    cta: 'Ver cursos',
    link: '/cursos'
  }
]

// Process Steps
const processSteps = [
  {
    title: 'Diagnóstico',
    description: 'Entendo seu desafio e necessidades'
  },
  {
    title: 'Proposta',
    description: 'Apresento a solução ideal e investimento'
  },
  {
    title: 'Entrega',
    description: 'Desenvolvimento e implementação'
  },
  {
    title: 'Treinamento',
    description: 'Suporte e capacitação da equipe'
  }
]

const openCalendly = () => {
  window.open(config.public.calendlyLink, '_blank')
  
  // Track event
  if (typeof window !== 'undefined' && (window as any).dataLayer) {
    (window as any).dataLayer.push({
      event: 'diagnostic_click',
      event_category: 'engagement',
      event_label: 'cta_final'
    })
  }
}
</script>

