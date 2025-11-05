<template>
  <div
    :class="separatorClasses"
    role="separator"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  orientation?: 'horizontal' | 'vertical'
  spacing?: 'none' | 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  orientation: 'horizontal',
  spacing: 'md'
})

const separatorClasses = computed(() => {
  const baseClasses = 'bg-border'
  
  const orientationClasses = props.orientation === 'horizontal' 
    ? 'w-full h-px' 
    : 'h-full w-px'
  
  const spacingClasses = {
    none: '',
    sm: props.orientation === 'horizontal' ? 'my-2' : 'mx-2',
    md: props.orientation === 'horizontal' ? 'my-4' : 'mx-4',
    lg: props.orientation === 'horizontal' ? 'my-6' : 'mx-6'
  }
  
  return [
    baseClasses,
    orientationClasses,
    spacingClasses[props.spacing]
  ].join(' ')
})
</script>

