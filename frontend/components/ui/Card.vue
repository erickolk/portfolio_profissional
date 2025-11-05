<template>
  <div
    :class="cardClasses"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  hover?: boolean
  bordered?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  hover: false,
  bordered: true,
  padding: 'md'
})

const cardClasses = computed(() => {
  const baseClasses = 'bg-card rounded-lg transition-all duration-200'
  
  const hoverClasses = props.hover ? 'hover:-translate-y-2 hover:shadow-xl cursor-pointer glow-effect' : ''
  
  const borderClasses = props.bordered ? 'border border-border' : ''
  
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  }
  
  return [
    baseClasses,
    hoverClasses,
    borderClasses,
    paddingClasses[props.padding]
  ].join(' ')
})
</script>

