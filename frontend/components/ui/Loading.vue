<template>
  <div :class="containerClasses">
    <div :class="spinnerClasses">
      <div class="animate-spin rounded-full border-t-2 border-b-2" :class="borderClasses" />
    </div>
    <p v-if="text" :class="textClasses">
      {{ text }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  text?: string
  fullscreen?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  fullscreen: false
})

const containerClasses = computed(() => {
  const baseClasses = 'flex flex-col items-center justify-center gap-4'
  const fullscreenClasses = props.fullscreen 
    ? 'fixed inset-0 bg-background/80 backdrop-blur-sm z-50' 
    : ''
  
  return [baseClasses, fullscreenClasses].join(' ')
})

const spinnerClasses = computed(() => {
  const sizeMap = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  }
  
  return sizeMap[props.size]
})

const borderClasses = computed(() => {
  const sizeMap = {
    sm: 'border-primary w-6 h-6',
    md: 'border-primary w-10 h-10',
    lg: 'border-primary w-16 h-16',
    xl: 'border-primary w-24 h-24'
  }
  
  return sizeMap[props.size]
})

const textClasses = computed(() => {
  const sizeMap = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  }
  
  return ['text-muted-foreground font-medium', sizeMap[props.size]].join(' ')
})
</script>

