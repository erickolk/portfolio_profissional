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
            Portfólio de Projetos
          </h1>
          <p
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :enter="{ opacity: 1, y: 0, transition: { delay: 100 } }"
            class="text-xl text-muted-foreground"
          >
            Soluções reais que transformaram negócios e geraram resultados
          </p>
        </div>
      </div>
    </section>

    <!-- Filters -->
    <section class="py-8 sticky top-20 bg-background/80 backdrop-blur-lg z-10 border-b border-border">
      <div class="container mx-auto px-4">
        <div class="flex flex-wrap gap-3 justify-center">
          <UiButton
            v-for="filter in filters"
            :key="filter.value"
            :variant="selectedFilter === filter.value ? 'primary' : 'secondary'"
            size="sm"
            @click="selectedFilter = filter.value"
          >
            {{ filter.label }}
          </UiButton>
        </div>
      </div>
    </section>

    <!-- Projects Grid -->
    <section class="py-20">
      <div class="container mx-auto px-4">
        <div v-if="filteredCases.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="(caseItem, index) in filteredCases"
            :key="caseItem.id"
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :visible="{ opacity: 1, y: 0, transition: { delay: index * 50 } }"
          >
            <CaseCard
              :case-data="caseItem"
              @click="openCase(caseItem)"
            />
          </div>
        </div>
        <div v-else class="text-center py-20">
          <div class="text-6xl mb-4">📦</div>
          <p class="text-xl text-muted-foreground">
            Em breve, novos projetos serão adicionados aqui
          </p>
        </div>
      </div>
    </section>

    <!-- Case Modal -->
    <CaseModal
      v-model="isCaseModalOpen"
      :case-data="selectedCase"
      :has-previous="hasPreviousCase"
      :has-next="hasNextCase"
      @previous="navigateCase(-1)"
      @next="navigateCase(1)"
      @contact="handleContactFromCase"
    />

    <!-- CTA -->
    <section class="py-20 bg-secondary/50">
      <div class="container mx-auto px-4">
        <UiCard class="max-w-3xl mx-auto text-center">
          <h2 class="text-3xl font-bold mb-4">
            Gostou dos projetos?
          </h2>
          <p class="text-lg text-muted-foreground mb-8">
            Vamos criar algo incrível juntos!
          </p>
          <UiButton size="lg" @click="navigateTo('/contact')">
            Iniciar um Projeto
          </UiButton>
        </UiCard>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const config = useRuntimeConfig()
const { cases: allCases } = useCases()

// SEO
useHead({
  title: 'Projetos - Erick Oliveira | Portfólio de Soluções Digitais',
  meta: [
    {
      name: 'description',
      content: 'Veja os projetos desenvolvidos: Evolutech CRM, Automação Fiscal, Guardião Digital, SaaS para negócios locais e mais.'
    },
    {
      property: 'og:title',
      content: 'Projetos - Erick Oliveira'
    },
    {
      property: 'og:url',
      content: `${config.public.siteUrl}/projects`
    }
  ]
})

// Filters
const filters = [
  { label: 'Todos', value: 'all' },
  { label: 'Produto', value: 'produto' },
  { label: 'Automação', value: 'automacao' },
  { label: 'Consultoria', value: 'consultoria' }
]

const selectedFilter = ref('all')

// Cases data
const cases = ref(allCases)

const filteredCases = computed(() => {
  if (selectedFilter.value === 'all') {
    return cases.value
  }
  return cases.value.filter(c => c.category.toLowerCase() === selectedFilter.value)
})

// Modal
const isCaseModalOpen = ref(false)
const selectedCase = ref(null)
const selectedCaseIndex = ref(-1)

const openCase = (caseData: any) => {
  selectedCase.value = caseData
  selectedCaseIndex.value = filteredCases.value.findIndex(c => c.id === caseData.id)
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

const hasPreviousCase = computed(() => selectedCaseIndex.value > 0)
const hasNextCase = computed(() => selectedCaseIndex.value < filteredCases.value.length - 1)

const navigateCase = (direction: number) => {
  const newIndex = selectedCaseIndex.value + direction
  if (newIndex >= 0 && newIndex < filteredCases.value.length) {
    selectedCaseIndex.value = newIndex
    selectedCase.value = filteredCases.value[newIndex]
  }
}

const handleContactFromCase = (caseData: any) => {
  // Pode passar dados do case para o formulário de contato via query params
  navigateTo({
    path: '/contact',
    query: { project: caseData.slug }
  })
}
</script>

