<template>
  <UiModal
    v-if="caseData"
    v-model="isOpen"
    size="xl"
    :closable="true"
    :close-on-backdrop="true"
  >
    <!-- Header customizado -->
    <template #header>
      <div>
        <UiBadge variant="primary" class="mb-2">
          {{ safeCaseData.category }}
        </UiBadge>
        <h2 class="text-3xl font-bold">{{ safeCaseData.title }}</h2>
        <p class="text-lg text-muted-foreground mt-2">{{ safeCaseData.subtitle }}</p>
      </div>
    </template>

    <!-- Conteúdo -->
    <div class="space-y-8">
      <!-- Imagem destaque -->
      <div v-if="safeCaseData.image" class="rounded-lg overflow-hidden">
        <NuxtImg
          :src="safeCaseData.image"
          :alt="safeCaseData.title"
          class="w-full h-96 object-cover"
        />
      </div>

      <!-- KPIs -->
      <div v-if="safeCaseData.kpis && safeCaseData.kpis.length > 0" class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div
          v-for="(kpi, index) in safeCaseData.kpis"
          :key="index"
          class="text-center p-4 bg-secondary rounded-lg"
        >
          <p class="text-3xl font-bold text-primary mb-1">{{ kpi.value }}</p>
          <p class="text-sm text-muted-foreground">{{ kpi.label }}</p>
        </div>
      </div>

      <!-- Problema -->
      <div v-if="safeCaseData.problem">
        <h3 class="text-2xl font-bold mb-4 flex items-center gap-2">
          <span class="text-red-500">⚠️</span>
          O Problema
        </h3>
        <p class="text-lg text-muted-foreground leading-relaxed">
          {{ safeCaseData.problem }}
        </p>
      </div>

      <UiSeparator v-if="safeCaseData.problem || safeCaseData.solution" />

      <!-- Solução -->
      <div v-if="safeCaseData.solution">
        <h3 class="text-2xl font-bold mb-4 flex items-center gap-2">
          <span class="text-green-500">✅</span>
          A Solução
        </h3>
        <p class="text-lg text-muted-foreground leading-relaxed">
          {{ safeCaseData.solution }}
        </p>
      </div>

      <!-- Arquitetura -->
      <div v-if="safeCaseData.architectureSvg">
        <h3 class="text-2xl font-bold mb-4 flex items-center gap-2">
          <span>🏗️</span>
          Arquitetura
        </h3>
        <div class="bg-secondary p-6 rounded-lg" v-html="safeCaseData.architectureSvg" />
      </div>

      <UiSeparator v-if="safeCaseData.architectureSvg || (safeCaseData.techStack && safeCaseData.techStack.length > 0)" />

      <!-- Tecnologias -->
      <div v-if="safeCaseData.techStack && safeCaseData.techStack.length > 0">
        <h3 class="text-2xl font-bold mb-4 flex items-center gap-2">
          <span>⚙️</span>
          Tecnologias Utilizadas
        </h3>
        <div class="flex flex-wrap gap-3">
          <UiBadge
            v-for="tech in safeCaseData.techStack"
            :key="tech"
            variant="primary"
            size="lg"
          >
            {{ tech }}
          </UiBadge>
        </div>
      </div>

      <!-- Processo -->
      <div v-if="safeCaseData.process && safeCaseData.process.length > 0">
        <h3 class="text-2xl font-bold mb-4 flex items-center gap-2">
          <span>🔄</span>
          Processo de Desenvolvimento
        </h3>
        <div class="space-y-4">
          <div
            v-for="(step, index) in safeCaseData.process"
            :key="index"
            class="flex gap-4"
          >
            <div class="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
              {{ index + 1 }}
            </div>
            <div>
              <h4 class="font-semibold text-lg mb-1">{{ step.title }}</h4>
              <p class="text-muted-foreground">{{ step.description }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Resultados -->
      <div v-if="safeCaseData.results && safeCaseData.results.length > 0">
        <h3 class="text-2xl font-bold mb-4 flex items-center gap-2">
          <span>📊</span>
          Resultados
        </h3>
        <ul class="space-y-3">
          <li
            v-for="(result, index) in safeCaseData.results"
            :key="index"
            class="flex items-start gap-3"
          >
            <svg class="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
            <span class="text-lg">{{ result }}</span>
          </li>
        </ul>
      </div>

      <!-- CTA -->
      <div class="bg-gradient-to-r from-primary/10 to-accent/10 p-8 rounded-lg text-center">
        <h3 class="text-2xl font-bold mb-4">Quer algo similar para seu negócio?</h3>
        <p class="text-muted-foreground mb-6">
          Vamos conversar sobre como posso ajudar a transformar sua ideia em realidade.
        </p>
        <UiButton size="lg" @click="handleContactClick">
          Solicitar Orçamento
        </UiButton>
      </div>
    </div>

    <!-- Footer com navegação -->
    <template #footer>
      <div class="flex justify-between w-full">
        <UiButton
          v-if="hasPrevious"
          variant="secondary"
          @click="navigatePrevious"
        >
          ← Case Anterior
        </UiButton>
        <div v-else />
        <UiButton
          v-if="hasNext"
          variant="secondary"
          @click="navigateNext"
        >
          Próximo Case →
        </UiButton>
      </div>
    </template>
  </UiModal>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface ProcessStep {
  title: string
  description: string
}

interface CaseData {
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
  process?: ProcessStep[]
  results?: string[]
  kpis?: Array<{ label: string; value: string }>
}

interface Props {
  modelValue: boolean
  caseData: CaseData | null
  hasPrevious?: boolean
  hasNext?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  hasPrevious: false,
  hasNext: false
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  previous: []
  next: []
  contact: [caseData: CaseData]
}>()

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

// Garantir que sempre temos um objeto válido para evitar erros de compilação
const safeCaseData = computed(() => props.caseData || {
  id: '',
  slug: '',
  title: '',
  subtitle: '',
  category: '',
  image: undefined,
  problem: undefined,
  solution: undefined,
  architectureSvg: undefined,
  techStack: [],
  process: [],
  results: [],
  kpis: []
})

const navigatePrevious = () => {
  emit('previous')
}

const navigateNext = () => {
  emit('next')
}

const handleContactClick = () => {
  if (props.caseData) {
    emit('contact', props.caseData)
    
    // Track event
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: 'case_contact_click',
        event_category: 'engagement',
        event_label: safeCaseData.value.title
      })
    }
    
    // Fechar modal e ir para contato
    isOpen.value = false
    navigateTo('/contact')
  }
}
</script>

