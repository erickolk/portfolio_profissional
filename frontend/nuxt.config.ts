// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
    '@vueuse/motion/nuxt',
  ],

  tailwindcss: {
    cssPath: '~/assets/styles/tailwind.css',
    configPath: 'tailwind.config.ts',
    exposeConfig: false,
    viewer: false,
  },

  components: [
    {
      path: '~/components',
      pathPrefix: false,
    }
  ],

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Erick Oliveira - Desenvolvedor Full Stack | Sistemas e Automações',
      htmlAttrs: {
        lang: 'pt-BR'
      },
      meta: [
        { name: 'description', content: 'Desenvolvedor Full Stack especializado em sistemas sob medida, automações e landing pages de alta conversão. Raízes em Arapiraca, soluções para o Brasil.' },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'theme-color', content: '#0a0a0a' },
        // Open Graph
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'Erick Oliveira - Desenvolvedor Full Stack' },
        { property: 'og:locale', content: 'pt_BR' },
        // Twitter Card
        { name: 'twitter:card', content: 'summary_large_image' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' },
      ],
    },
    pageTransition: { name: 'page', mode: 'out-in' }
  },

  runtimeConfig: {
    public: {
      apiUrl: process.env.NUXT_PUBLIC_API_URL || 'http://localhost:5000',
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000',
      whatsappNumber: process.env.NUXT_PUBLIC_WHATSAPP_NUMBER || '5582999999999',
      calendlyLink: process.env.NUXT_PUBLIC_CALENDLY_LINK || 'https://calendly.com/erick/diagnostico-15',
    }
  },

  image: {
    format: ['webp', 'png', 'jpg'],
    quality: 80,
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
    },
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/sitemap.xml', '/robots.txt']
    },
    compressPublicAssets: true,
    minify: true
  },

  vite: {
    build: {
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks: {
            'three': ['three'],
            'vue-vendor': ['vue', 'vue-router']
          }
        }
      }
    },
    optimizeDeps: {
      include: ['three']
    }
  },

  experimental: {
    payloadExtraction: false
  },

  typescript: {
    strict: true,
    typeCheck: false
  },

  // Performance optimizations
  routeRules: {
    '/': { prerender: true, index: true },
    '/about': { prerender: true },
    '/services': { prerender: true },
    '/projects': { prerender: true },
    '/cursos': { prerender: true },
    '/contact': { prerender: true }
  }
})
