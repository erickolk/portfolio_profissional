import { ref, onMounted, onUnmounted } from 'vue'

export const useScrollReveal = (threshold = 0.1) => {
  const isVisible = ref(false)
  const elementRef = ref<HTMLElement | null>(null)
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    if (!elementRef.value) return

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            isVisible.value = true
            // Opcionalmente, parar de observar após a primeira revelação
            // observer?.disconnect()
          }
        })
      },
      {
        threshold,
        rootMargin: '0px 0px -100px 0px'
      }
    )

    observer.observe(elementRef.value)
  })

  onUnmounted(() => {
    observer?.disconnect()
  })

  return {
    isVisible,
    elementRef
  }
}

