<template>
  <div class="min-h-screen">
    <!-- Hero -->
    <section class="py-20 bg-gradient-to-b from-secondary/50 to-background">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto text-center">
          <h1
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :enter="{ opacity: 1, y: 0 }"
            class="text-4xl md:text-5xl font-bold mb-6"
          >
            Sobre Mim
          </h1>
          <p
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :enter="{ opacity: 1, y: 0, transition: { delay: 100 } }"
            class="text-xl text-muted-foreground"
          >
            Desenvolvedor Full Stack apaixonado por criar soluções que impactam pessoas e negócios
          </p>
        </div>
      </div>
    </section>

    <!-- Story -->
    <section class="py-20">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <UiCard class="mb-12">
            <div class="prose prose-invert max-w-none">
              <h2 class="text-2xl font-bold mb-4">Minha História</h2>
              <p class="text-lg text-muted-foreground leading-relaxed mb-4">
                Sou Erick Oliveira, desenvolvedor full stack com raízes em Arapiraca, Alagoas, 
                e com uma visão voltada para todo o Brasil. Minha jornada na tecnologia começou 
                com a curiosidade de entender como as coisas funcionam e evoluiu para uma paixão 
                por criar soluções que realmente fazem a diferença.
              </p>
              <p class="text-lg text-muted-foreground leading-relaxed mb-4">
                Ao longo da minha carreira, desenvolvi desde sistemas complexos de gestão até 
                automações que economizam horas de trabalho manual. Cada projeto é uma oportunidade 
                de aprender, inovar e, principalmente, ajudar empresas e pessoas a alcançarem seus objetivos.
              </p>
              <p class="text-lg text-muted-foreground leading-relaxed">
                Além de desenvolver, também atuo como instrutor, compartilhando conhecimento e 
                capacitando equipes para que possam aproveitar ao máximo a tecnologia em seus negócios.
              </p>
            </div>
          </UiCard>

          <!-- Mission -->
          <UiCard class="text-center bg-gradient-to-r from-primary/10 to-accent/10">
            <h3 class="text-2xl font-bold mb-4">Missão</h3>
            <p class="text-xl gradient-text font-semibold">
              "Raízes em Arapiraca, soluções para o Brasil"
            </p>
            <p class="text-muted-foreground mt-4">
              Levar tecnologia de qualidade e acessível para negócios de todos os tamanhos, 
              começando local e escalando nacionalmente.
            </p>
          </UiCard>
        </div>
      </div>
    </section>

    <!-- Skills/Technologies -->
    <section class="py-20 bg-secondary/50">
      <div class="container mx-auto px-4">
        <div class="max-w-5xl mx-auto">
          <h2
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :visible="{ opacity: 1, y: 0 }"
            class="text-3xl md:text-4xl font-bold text-center mb-12"
          >
            Stack Tecnológico
          </h2>
          
          <div class="space-y-8">
            <!-- Frontend -->
            <div>
              <h3 class="text-xl font-bold mb-4">Frontend</h3>
              <div class="flex flex-wrap gap-3">
                <UiBadge v-for="tech in frontendTech" :key="tech" variant="primary" size="lg">
                  {{ tech }}
                </UiBadge>
              </div>
            </div>

            <!-- Backend -->
            <div>
              <h3 class="text-xl font-bold mb-4">Backend</h3>
              <div class="flex flex-wrap gap-3">
                <UiBadge v-for="tech in backendTech" :key="tech" variant="primary" size="lg">
                  {{ tech }}
                </UiBadge>
              </div>
            </div>

            <!-- Database -->
            <div>
              <h3 class="text-xl font-bold mb-4">Banco de Dados</h3>
              <div class="flex flex-wrap gap-3">
                <UiBadge v-for="tech in databaseTech" :key="tech" variant="primary" size="lg">
                  {{ tech }}
                </UiBadge>
              </div>
            </div>

            <!-- Tools -->
            <div>
              <h3 class="text-xl font-bold mb-4">Ferramentas & Outros</h3>
              <div class="flex flex-wrap gap-3">
                <UiBadge v-for="tech in toolsTech" :key="tech" variant="primary" size="lg">
                  {{ tech }}
                </UiBadge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-20">
      <div class="container mx-auto px-4">
        <UiCard class="max-w-3xl mx-auto text-center">
          <h2 class="text-3xl font-bold mb-4">Vamos trabalhar juntos?</h2>
          <p class="text-lg text-muted-foreground mb-8">
            Estou sempre aberto a novos projetos e oportunidades de colaboração
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <UiButton size="lg" @click="navigateTo('/contact')">
              Entrar em Contato
            </UiButton>
            <UiButton size="lg" variant="outline" @click="navigateTo('/cursos')">
              Ver Cursos
            </UiButton>
          </div>
        </UiCard>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig()

// SEO
useHead({
  title: 'Sobre - Erick Oliveira | Desenvolvedor Full Stack',
  meta: [
    {
      name: 'description',
      content: 'Conheça Erick Oliveira, desenvolvedor full stack com raízes em Arapiraca, AL. Especializado em sistemas, automações e treinamentos tecnológicos.'
    },
    {
      property: 'og:title',
      content: 'Sobre - Erick Oliveira | Desenvolvedor Full Stack'
    },
    {
      property: 'og:url',
      content: `${config.public.siteUrl}/about`
    }
  ]
})

// Technologies
const frontendTech = [
  'Nuxt 3',
  'Vue.js',
  'TypeScript',
  'JavaScript',
  'TailwindCSS',
  'Shadcn Vue',
  'Three.js'
]

const backendTech = [
  'Node.js',
  'Express',
  'Fastify',
  'Python',
  'API REST',
  'GraphQL'
]

const databaseTech = [
  'PostgreSQL',
  'MongoDB',
  'Mongoose',
  'Supabase',
  'Redis'
]

const toolsTech = [
  'Docker',
  'Git',
  'Linux',
  'Puppeteer',
  'JWT Auth',
  'Nodemailer',
  'SEO & Performance'
]
</script>

<style scoped>
.prose {
  max-width: none;
}

.prose h2 {
  color: hsl(var(--foreground));
}

.prose p {
  color: hsl(var(--muted-foreground));
}
</style>

