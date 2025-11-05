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
            Cursos e Capacitação em TI
          </h1>
          <p
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :enter="{ opacity: 1, y: 0, transition: { delay: 100 } }"
            class="text-xl text-muted-foreground"
          >
            Treinamento prático e objetivo para empresas e profissionais
          </p>
        </div>
      </div>
    </section>

    <!-- Courses -->
    <section class="py-20">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <UiCard
            v-for="(course, index) in courses"
            :key="index"
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :visible="{ opacity: 1, y: 0, transition: { delay: index * 100 } }"
            :hover="true"
          >
            <div class="mb-4">
              <div class="text-5xl mb-3">{{ course.icon }}</div>
              <UiBadge variant="primary">{{ course.duration }}</UiBadge>
            </div>
            <h3 class="text-2xl font-bold mb-3">{{ course.title }}</h3>
            <p class="text-muted-foreground mb-6">{{ course.description }}</p>
            
            <h4 class="font-semibold mb-3">O que você vai aprender:</h4>
            <ul class="space-y-2 mb-6">
              <li
                v-for="(topic, idx) in course.topics"
                :key="idx"
                class="flex items-start gap-2"
              >
                <svg class="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                <span class="text-sm">{{ topic }}</span>
              </li>
            </ul>
            
            <UiButton variant="outline" class="w-full" @click="handleCourseInterest(course)">
              Tenho interesse
            </UiButton>
          </UiCard>
        </div>
      </div>
    </section>

    <!-- Target Audience -->
    <section class="py-20 bg-secondary/50">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <h2 class="text-3xl md:text-4xl font-bold text-center mb-12">
            Para quem são os cursos?
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <UiCard
              v-for="(audience, index) in targetAudience"
              :key="index"
              class="text-center"
            >
              <div class="text-5xl mb-4">{{ audience.icon }}</div>
              <h3 class="text-xl font-bold mb-2">{{ audience.title }}</h3>
              <p class="text-muted-foreground text-sm">{{ audience.description }}</p>
            </UiCard>
          </div>
        </div>
      </div>
    </section>

    <!-- Format -->
    <section class="py-20">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <h2 class="text-3xl md:text-4xl font-bold text-center mb-12">
            Formato dos Treinamentos
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <UiCard>
              <div class="text-4xl mb-4">🏢</div>
              <h3 class="text-2xl font-bold mb-3">In-Company</h3>
              <p class="text-muted-foreground mb-4">
                Treinamento presencial ou online exclusivo para sua equipe, 
                com conteúdo adaptado às necessidades da empresa.
              </p>
              <ul class="space-y-2 text-sm text-muted-foreground">
                <li>✓ Horários flexíveis</li>
                <li>✓ Conteúdo personalizado</li>
                <li>✓ Material didático incluso</li>
                <li>✓ Certificado de conclusão</li>
              </ul>
            </UiCard>
            
            <UiCard>
              <div class="text-4xl mb-4">👤</div>
              <h3 class="text-2xl font-bold mb-3">Individual</h3>
              <p class="text-muted-foreground mb-4">
                Aulas particulares online com foco total nas suas necessidades 
                e ritmo de aprendizado.
              </p>
              <ul class="space-y-2 text-sm text-muted-foreground">
                <li>✓ Aulas 100% personalizadas</li>
                <li>✓ Suporte direto com instrutor</li>
                <li>✓ Projetos práticos</li>
                <li>✓ Mentoria contínua</li>
              </ul>
            </UiCard>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-20 bg-secondary/50">
      <div class="container mx-auto px-4">
        <UiCard class="max-w-3xl mx-auto text-center bg-gradient-to-r from-primary/10 to-accent/10">
          <div class="text-5xl mb-6">🎓</div>
          <h2 class="text-3xl font-bold mb-4">
            Pronto para capacitar sua equipe?
          </h2>
          <p class="text-lg text-muted-foreground mb-8">
            Entre em contato para receber uma proposta personalizada
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <UiButton size="lg" @click="navigateTo('/contact')">
              Solicitar Proposta
            </UiButton>
            <UiButton size="lg" variant="outline" @click="openWhatsApp">
              Falar no WhatsApp
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
  title: 'Cursos e Treinamentos - Erick Oliveira | Capacitação em TI',
  meta: [
    {
      name: 'description',
      content: 'Cursos e treinamentos em tecnologia: Office básico, Lógica de Programação, Desenvolvimento Web, Automação e APIs. Formatos in-company e individual.'
    },
    {
      property: 'og:title',
      content: 'Cursos e Treinamentos - Erick Oliveira'
    },
    {
      property: 'og:url',
      content: `${config.public.siteUrl}/cursos`
    }
  ]
})

// Courses
const courses = [
  {
    icon: '💻',
    title: 'Office Básico',
    duration: '20-30h',
    description: 'Domine as ferramentas essenciais do dia a dia: Word, Excel e PowerPoint com foco prático.',
    topics: [
      'Word: documentos profissionais e formatação',
      'Excel: fórmulas, tabelas e gráficos',
      'PowerPoint: apresentações impactantes',
      'Dicas de produtividade'
    ]
  },
  {
    icon: '🧠',
    title: 'Lógica e Programação',
    duration: '40-50h',
    description: 'Base sólida de lógica de programação para quem quer começar na área de desenvolvimento.',
    topics: [
      'Fundamentos de algoritmos',
      'Estruturas de controle e repetição',
      'Funções e modularização',
      'Resolução de problemas práticos'
    ]
  },
  {
    icon: '🌐',
    title: 'Desenvolvimento Web',
    duration: '60-80h',
    description: 'Aprenda a criar sites e aplicações web modernas do zero ao deploy.',
    topics: [
      'HTML, CSS e JavaScript',
      'Vue.js ou React (frameworks modernos)',
      'Backend com Node.js',
      'Banco de dados e APIs',
      'Deploy e hospedagem'
    ]
  },
  {
    icon: '⚙️',
    title: 'Automação e APIs',
    duration: '30-40h',
    description: 'Automatize tarefas e integre sistemas usando APIs e ferramentas modernas.',
    topics: [
      'Conceitos de APIs REST',
      'Integração de serviços',
      'Web scraping',
      'Bots e automações',
      'Casos práticos'
    ]
  }
]

// Target Audience
const targetAudience = [
  {
    icon: '🏢',
    title: 'Empresas',
    description: 'Capacite sua equipe e aumente a produtividade com tecnologia'
  },
  {
    icon: '👨‍💼',
    title: 'Profissionais',
    description: 'Desenvolva novas habilidades e destaque-se no mercado'
  },
  {
    icon: '🎓',
    title: 'Estudantes',
    description: 'Prepare-se para o mercado de trabalho com conhecimento prático'
  }
]

const handleCourseInterest = (course: any) => {
  // Track event
  if (typeof window !== 'undefined' && (window as any).dataLayer) {
    (window as any).dataLayer.push({
      event: 'curso_interest',
      event_category: 'engagement',
      event_label: course.title
    })
  }
  
  navigateTo({
    path: '/contact',
    query: { course: course.title }
  })
}

const openWhatsApp = () => {
  const message = encodeURIComponent('Olá Erick, tenho interesse em conhecer mais sobre os cursos de capacitação.')
  window.open(`https://wa.me/${config.public.whatsappNumber}?text=${message}`, '_blank')
  
  // Track event
  if (typeof window !== 'undefined' && (window as any).dataLayer) {
    (window as any).dataLayer.push({
      event: 'whatsapp_click',
      event_category: 'engagement',
      event_label: 'cursos_page'
    })
  }
}
</script>

