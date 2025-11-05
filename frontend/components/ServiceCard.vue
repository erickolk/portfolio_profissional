<template>
  <UiCard :hover="true" class="h-full">
    <!-- Ícone -->
    <div class="mb-6">
      <div class="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center">
        <span class="text-4xl">{{ icon }}</span>
      </div>
    </div>
    
    <!-- Título -->
    <h3 class="text-2xl font-bold mb-3">
      {{ title }}
    </h3>
    
    <!-- Descrição -->
    <p class="text-muted-foreground mb-6 leading-relaxed">
      {{ description }}
    </p>
    
    <!-- Características -->
    <ul v-if="features && features.length > 0" class="space-y-2 mb-6">
      <li
        v-for="(feature, index) in features"
        :key="index"
        class="flex items-start gap-2"
      >
        <svg class="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
        </svg>
        <span class="text-sm">{{ feature }}</span>
      </li>
    </ul>
    
    <!-- CTA -->
    <UiButton
      variant="outline"
      class="w-full group"
      @click="handleClick"
    >
      <span>Saiba mais</span>
      <svg
        class="w-5 h-5 ml-2 transition-transform duration-200 group-hover:translate-x-1"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
      </svg>
    </UiButton>
  </UiCard>
</template>

<script setup lang="ts">
interface Props {
  icon: string
  title: string
  description: string
  features?: string[]
}

defineProps<Props>()

const emit = defineEmits<{
  click: []
}>()

const handleClick = () => {
  emit('click')
}
</script>

