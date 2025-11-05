<template>
  <div v-if="show" class="confetti-container">
    <div
      v-for="i in 50"
      :key="i"
      class="confetti"
      :style="getConfettiStyle(i)"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

interface Props {
  show: boolean
  duration?: number
}

const props = withDefaults(defineProps<Props>(), {
  duration: 3000
})

const emit = defineEmits<{
  'update:show': [value: boolean]
}>()

const show = ref(props.show)

const getConfettiStyle = (index: number) => {
  const colors = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#ec4899']
  const color = colors[index % colors.length]
  const left = Math.random() * 100
  const animationDelay = Math.random() * 0.5
  const animationDuration = 2 + Math.random() * 2
  
  return {
    left: `${left}%`,
    backgroundColor: color,
    animationDelay: `${animationDelay}s`,
    animationDuration: `${animationDuration}s`
  }
}

watch(() => props.show, (newVal) => {
  show.value = newVal
  if (newVal) {
    setTimeout(() => {
      show.value = false
      emit('update:show', false)
    }, props.duration)
  }
})

onMounted(() => {
  if (props.show) {
    setTimeout(() => {
      show.value = false
      emit('update:show', false)
    }, props.duration)
  }
})
</script>

<style scoped>
.confetti-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 9999;
  overflow: hidden;
}

.confetti {
  position: absolute;
  width: 10px;
  height: 10px;
  background: #3b82f6;
  top: -10px;
  animation: confetti-fall linear forwards;
}

@keyframes confetti-fall {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translateY(100vh) rotate(720deg);
    opacity: 0;
  }
}
</style>

