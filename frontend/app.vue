<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
const { getPersonSchema, getLocalBusinessSchema, getOrganizationSchema, getWebSiteSchema } = useSchema()

// Configurações globais podem ser adicionadas aqui
useHead({
  htmlAttrs: {
    class: 'dark'
  },
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify(getPersonSchema())
    },
    {
      type: 'application/ld+json',
      children: JSON.stringify(getLocalBusinessSchema())
    },
    {
      type: 'application/ld+json',
      children: JSON.stringify(getOrganizationSchema())
    },
    {
      type: 'application/ld+json',
      children: JSON.stringify(getWebSiteSchema())
    }
  ]
})
</script>
