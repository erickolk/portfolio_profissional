import { ref, watch, onMounted } from 'vue'

export type Theme = 'light' | 'dark'

export const useTheme = () => {
  const theme = ref<Theme>('dark')

  const setTheme = (newTheme: Theme) => {
    theme.value = newTheme
    
    if (typeof document !== 'undefined') {
      document.documentElement.classList.remove('light', 'dark')
      document.documentElement.classList.add(newTheme)
      localStorage.setItem('theme', newTheme)
    }
  }

  const toggleTheme = () => {
    const newTheme = theme.value === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
  }

  onMounted(() => {
    // Verificar preferência salva ou preferência do sistema
    const savedTheme = localStorage.getItem('theme') as Theme | null
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

    if (savedTheme) {
      setTheme(savedTheme)
    } else if (prefersDark) {
      setTheme('dark')
    } else {
      setTheme('dark') // Default para dark
    }
  })

  return {
    theme,
    setTheme,
    toggleTheme
  }
}

