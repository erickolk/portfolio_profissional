<template>
  <UiCard
    :hover="true"
    padding="none"
    class="overflow-hidden cursor-pointer"
    @click="handleClick"
  >
    <!-- Imagem -->
    <div class="relative h-48 overflow-hidden bg-secondary">
      <NuxtImg
        v-if="caseData.image"
        :src="caseData.image"
        :alt="caseData.title"
        class="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        loading="lazy"
      />
      <div v-else class="w-full h-full flex items-center justify-center">
        <svg class="w-16 h-16 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
      
      <!-- Categoria Badge -->
      <div class="absolute top-4 left-4">
        <UiBadge variant="primary">
          {{ caseData.category }}
        </UiBadge>
      </div>
    </div>
    
    <!-- Conteúdo -->
    <div class="p-6">
      <!-- Título -->
      <h3 class="text-xl font-bold mb-2 line-clamp-2">
        {{ caseData.title }}
      </h3>
      
      <!-- Subtítulo -->
      <p class="text-muted-foreground mb-4 line-clamp-2">
        {{ caseData.subtitle }}
      </p>
      
      <!-- Stack/Tecnologias -->
      <div class="flex flex-wrap gap-2 mb-4">
        <UiBadge
          v-for="tech in caseData.techStack?.slice(0, 4)"
          :key="tech"
          variant="secondary"
          size="sm"
        >
          {{ tech }}
        </UiBadge>
        <UiBadge
          v-if="caseData.techStack && caseData.techStack.length > 4"
          variant="secondary"
          size="sm"
        >
          +{{ caseData.techStack.length - 4 }}
        </UiBadge>
      </div>
      
      <!-- KPIs se disponíveis -->
      <div v-if="hasKPIs" class="grid grid-cols-2 gap-4 pt-4 border-t border-border">
        <div v-for="(kpi, index) in displayKPIs" :key="index" class="text-center">
          <p class="text-2xl font-bold text-primary">{{ kpi.value }}</p>
          <p class="text-xs text-muted-foreground">{{ kpi.label }}</p>
        </div>
      </div>
      
      <!-- Botão -->
      <div class="mt-4 flex items-center text-primary font-medium group">
        <span>Ver case completo</span>
        <svg
          class="w-5 h-5 ml-2 transition-transform duration-200 group-hover:translate-x-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </div>
    </div>
  </UiCard>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface CaseData {
  id: string
  slug: string
  title: string
  subtitle: string
  category: string
  image?: string
  techStack?: string[]
  kpis?: Array<{ label: string; value: string }>
}

interface Props {
  caseData: CaseData
}

const props = defineProps<Props>()

const emit = defineEmits<{
  click: [caseData: CaseData]
}>()

const hasKPIs = computed(() => {
  return props.caseData.kpis && props.caseData.kpis.length > 0
})

const displayKPIs = computed(() => {
  return props.caseData.kpis?.slice(0, 2) || []
})

const handleClick = () => {
  emit('click', props.caseData)
}
</script>

