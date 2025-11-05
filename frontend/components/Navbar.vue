<template>
  <header 
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      isScrolled ? 'bg-background/80 backdrop-blur-lg shadow-lg py-3' : 'bg-transparent py-6'
    ]"
  >
    <nav class="container mx-auto px-4">
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <NuxtLink 
          to="/" 
          class="text-2xl font-bold gradient-text hover:opacity-80 transition-opacity"
        >
          Erick<span class="text-primary">.</span>dev
        </NuxtLink>

        <!-- Desktop Menu -->
        <div class="hidden md:flex items-center space-x-8">
          <NuxtLink
            v-for="item in menuItems"
            :key="item.path"
            :to="item.path"
            class="text-foreground/80 hover:text-primary transition-colors duration-200 font-medium"
            active-class="text-primary"
          >
            {{ item.label }}
          </NuxtLink>
          
          <!-- CTA Button -->
          <button
            @click="openDiagnostic"
            class="px-6 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all duration-200 font-medium shadow-lg hover:shadow-primary/50 pulse-glow"
          >
            Diagnóstico 15min
          </button>
        </div>

        <!-- Mobile Menu Button -->
        <button
          @click="toggleMobileMenu"
          class="md:hidden p-2 text-foreground hover:text-primary transition-colors"
          aria-label="Menu"
        >
          <svg
            v-if="!isMobileMenuOpen"
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          <svg
            v-else
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <!-- Mobile Menu -->
      <Transition
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0 -translate-y-4"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-4"
      >
        <div
          v-if="isMobileMenuOpen"
          class="md:hidden mt-4 pb-4 space-y-4"
        >
          <NuxtLink
            v-for="item in menuItems"
            :key="item.path"
            :to="item.path"
            @click="closeMobileMenu"
            class="block text-foreground/80 hover:text-primary transition-colors duration-200 font-medium py-2"
            active-class="text-primary"
          >
            {{ item.label }}
          </NuxtLink>
          <button
            @click="openDiagnostic"
            class="w-full px-6 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all duration-200 font-medium shadow-lg"
          >
            Diagnóstico 15min
          </button>
        </div>
      </Transition>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const menuItems = [
  { label: 'Home', path: '/' },
  { label: 'Sobre', path: '/about' },
  { label: 'Serviços', path: '/services' },
  { label: 'Projetos', path: '/projects' },
  { label: 'Cursos', path: '/cursos' },
  { label: 'Contato', path: '/contact' },
]

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

const openDiagnostic = () => {
  closeMobileMenu()
  // TODO: Abrir modal de diagnóstico
  // Temporariamente, vamos redirecionar para contato
  navigateTo('/contact')
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
/* Adiciona suporte para menu mobile */
</style>

