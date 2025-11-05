<template>
  <section class="relative w-full h-screen overflow-hidden">
    <!-- Canvas para Three.js -->
    <canvas
      ref="canvasRef"
      class="absolute inset-0 w-full h-full"
      :class="{ 'opacity-0': !isWebGLSupported || prefersReducedMotion }"
    />
    
    <!-- Fallback para dispositivos sem WebGL ou com reduced motion -->
    <div
      v-if="!isWebGLSupported || prefersReducedMotion"
      class="absolute inset-0 bg-gradient-to-br from-background via-secondary to-background"
    />
    
    <!-- Conteúdo textual (renderizado server-side para SEO) -->
    <div class="relative z-10 h-full flex items-center justify-center">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto text-center">
          <!-- H1 principal para SEO -->
          <h1
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :enter="{ opacity: 1, y: 0, transition: { duration: 800, delay: 200 } }"
            class="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
          >
            <span class="gradient-text">{{ typedText }}</span>
            <span class="animate-pulse">|</span>
          </h1>
          
          <!-- H2 secundário -->
          <p
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :enter="{ opacity: 1, y: 0, transition: { duration: 800, delay: 400 } }"
            class="text-lg md:text-xl lg:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto"
          >
            Desenvolvedor Full Stack especializado em sistemas, automações e experiências web de alta conversão.
          </p>
          
          <!-- CTAs -->
          <div
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :enter="{ opacity: 1, y: 0, transition: { duration: 800, delay: 600 } }"
            class="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button
              @click="handleDiagnosticClick"
              class="px-8 py-4 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-primary/50 pulse-glow"
            >
              🎯 Diagnóstico Grátis - 15min
            </button>
            <button
              @click="scrollToProjects"
              class="px-8 py-4 bg-secondary text-foreground rounded-lg hover:bg-secondary/80 border border-border transition-all duration-200 font-semibold text-lg"
            >
              Ver Meus Projetos
            </button>
          </div>
          
          <!-- Scroll Indicator -->
          <div
            v-motion
            :initial="{ opacity: 0 }"
            :enter="{ opacity: 1, transition: { duration: 800, delay: 1000 } }"
            class="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          >
            <div class="animate-bounce">
              <svg
                class="w-6 h-6 text-muted-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import * as THREE from 'three'

const canvasRef = ref<HTMLCanvasElement | null>(null)
const isWebGLSupported = ref(true)
const prefersReducedMotion = ref(false)

// Typing effect para o texto principal
const fullText = 'Transformo ideias em soluções digitais que geram resultados.'
const typedText = ref('')
let typingIndex = 0
let typingInterval: NodeJS.Timeout | null = null

// Three.js variables
let scene: THREE.Scene | null = null
let camera: THREE.PerspectiveCamera | null = null
let renderer: THREE.WebGLRenderer | null = null
let particles: THREE.Points | null = null
let particlePositions: Float32Array | null = null
let lines: THREE.LineSegments | null = null
let animationFrameId: number | null = null

const particleCount = 200
const maxDistance = 150
const mousePosition = { x: 0, y: 0 }

// Verifica suporte WebGL
const checkWebGLSupport = (): boolean => {
  try {
    const canvas = document.createElement('canvas')
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    )
  } catch (e) {
    return false
  }
}

// Verifica preferência de movimento reduzido
const checkReducedMotion = (): boolean => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// Inicializa Three.js
const initThree = () => {
  if (!canvasRef.value) return

  // Scene
  scene = new THREE.Scene()

  // Camera
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    3000
  )
  camera.position.z = 600

  // Renderer
  renderer = new THREE.WebGLRenderer({
    canvas: canvasRef.value,
    antialias: true,
    alpha: true,
  })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))

  // Criar partículas
  createParticles()
  
  // Criar linhas
  createLines()
}

// Criar partículas
const createParticles = () => {
  if (!scene) return

  const geometry = new THREE.BufferGeometry()
  particlePositions = new Float32Array(particleCount * 3)

  // Posições aleatórias das partículas
  for (let i = 0; i < particleCount * 3; i += 3) {
    particlePositions[i] = Math.random() * 1200 - 600
    particlePositions[i + 1] = Math.random() * 800 - 400
    particlePositions[i + 2] = Math.random() * 800 - 400
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3))

  // Material das partículas
  const material = new THREE.PointsMaterial({
    color: 0x3b82f6,
    size: 3,
    transparent: true,
    opacity: 0.8,
  })

  particles = new THREE.Points(geometry, material)
  scene.add(particles)
}

// Criar linhas conectando partículas próximas
const createLines = () => {
  if (!scene) return

  const lineGeometry = new THREE.BufferGeometry()
  const positions = new Float32Array(particleCount * particleCount * 3)
  lineGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

  const material = new THREE.LineBasicMaterial({
    color: 0x3b82f6,
    transparent: true,
    opacity: 0.3,
  })

  lines = new THREE.LineSegments(lineGeometry, material)
  scene.add(lines)
}

// Animar cena
const animate = () => {
  if (!scene || !camera || !renderer || !particles || !particlePositions || !lines) return

  animationFrameId = requestAnimationFrame(animate)

  // Movimento orgânico das partículas (Perlin-like)
  const time = Date.now() * 0.0001

  for (let i = 0; i < particleCount * 3; i += 3) {
    // Movimento suave baseado em seno/cosseno
    particlePositions[i] += Math.sin(time + i) * 0.3
    particlePositions[i + 1] += Math.cos(time + i * 0.5) * 0.3
    particlePositions[i + 2] += Math.sin(time + i * 0.3) * 0.3

    // Manter dentro dos limites
    if (Math.abs(particlePositions[i]) > 600) particlePositions[i] *= 0.99
    if (Math.abs(particlePositions[i + 1]) > 400) particlePositions[i + 1] *= 0.99
    if (Math.abs(particlePositions[i + 2]) > 400) particlePositions[i + 2] *= 0.99
  }

  // Interação com mouse (repel effect)
  const mouseInfluence = 30
  for (let i = 0; i < particleCount * 3; i += 3) {
    const dx = particlePositions[i] - mousePosition.x
    const dy = particlePositions[i + 1] - mousePosition.y
    const distance = Math.sqrt(dx * dx + dy * dy)

    if (distance < 200) {
      const force = (200 - distance) / 200
      particlePositions[i] += dx * force * 0.03
      particlePositions[i + 1] += dy * force * 0.03
    }
  }

  // Atualizar posições das partículas
  if (particles.geometry.attributes.position) {
    particles.geometry.attributes.position.needsUpdate = true
  }

  // Atualizar linhas conectando partículas próximas
  updateLines()

  // Rotação suave da câmera
  camera.position.x += (mousePosition.x * 0.05 - camera.position.x) * 0.01
  camera.position.y += (-mousePosition.y * 0.05 - camera.position.y) * 0.01
  camera.lookAt(scene.position)

  renderer.render(scene, camera)
}

// Atualizar linhas
const updateLines = () => {
  if (!lines || !particlePositions) return

  const positions = lines.geometry.attributes.position.array as Float32Array
  let vertexPos = 0

  for (let i = 0; i < particleCount; i++) {
    for (let j = i + 1; j < particleCount; j++) {
      const dx = particlePositions[i * 3] - particlePositions[j * 3]
      const dy = particlePositions[i * 3 + 1] - particlePositions[j * 3 + 1]
      const dz = particlePositions[i * 3 + 2] - particlePositions[j * 3 + 2]
      const distance = Math.sqrt(dx * dx + dy * dy + dz * dz)

      if (distance < maxDistance) {
        positions[vertexPos++] = particlePositions[i * 3]
        positions[vertexPos++] = particlePositions[i * 3 + 1]
        positions[vertexPos++] = particlePositions[i * 3 + 2]

        positions[vertexPos++] = particlePositions[j * 3]
        positions[vertexPos++] = particlePositions[j * 3 + 1]
        positions[vertexPos++] = particlePositions[j * 3 + 2]
      }
    }
  }

  lines.geometry.setDrawRange(0, vertexPos / 3)
  lines.geometry.attributes.position.needsUpdate = true
}

// Redimensionar canvas
const handleResize = () => {
  if (!camera || !renderer) return

  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

// Mouse move
const handleMouseMove = (event: MouseEvent) => {
  mousePosition.x = (event.clientX - window.innerWidth / 2) * 0.5
  mousePosition.y = (event.clientY - window.innerHeight / 2) * 0.5
}

// Visibilidade da página (pausar quando não visível)
const handleVisibilityChange = () => {
  if (document.hidden) {
    if (animationFrameId !== null) {
      cancelAnimationFrame(animationFrameId)
      animationFrameId = null
    }
  } else {
    animate()
  }
}

// Typing effect
const startTypingEffect = () => {
  typingInterval = setInterval(() => {
    if (typingIndex < fullText.length) {
      typedText.value = fullText.substring(0, typingIndex + 1)
      typingIndex++
    } else {
      if (typingInterval) clearInterval(typingInterval)
    }
  }, 50)
}

// Actions
const handleDiagnosticClick = () => {
  // Track event
  if (typeof window !== 'undefined' && (window as any).dataLayer) {
    (window as any).dataLayer.push({
      event: 'diagnostic_click',
      event_category: 'engagement',
      event_label: 'hero_cta'
    })
  }
  navigateTo('/contact')
}

const scrollToProjects = () => {
  const element = document.getElementById('projects')
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  } else {
    navigateTo('/projects')
  }
}

// Lifecycle
onMounted(() => {
  isWebGLSupported.value = checkWebGLSupport()
  prefersReducedMotion.value = checkReducedMotion()

  if (isWebGLSupported.value && !prefersReducedMotion.value) {
    initThree()
    animate()
    window.addEventListener('resize', handleResize)
    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('visibilitychange', handleVisibilityChange)
  }

  startTypingEffect()
})

onUnmounted(() => {
  // Cleanup Three.js
  if (animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId)
  }
  if (renderer) {
    renderer.dispose()
  }
  if (scene) {
    scene.clear()
  }

  // Cleanup event listeners
  window.removeEventListener('resize', handleResize)
  window.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('visibilitychange', handleVisibilityChange)

  // Cleanup typing interval
  if (typingInterval) {
    clearInterval(typingInterval)
  }
})
</script>

<style scoped>
/* Garantir que o canvas não interfira na interação */
canvas {
  pointer-events: none;
}
</style>

