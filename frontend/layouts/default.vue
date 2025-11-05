<template>
  <div class="min-h-screen flex flex-col bg-background text-foreground">
    <Navbar />
    <main class="flex-1 pt-20">
      <slot />
    </main>
    <Footer />
    <FloatingWhatsApp />
  </div>
</template>

<script setup lang="ts">
// Layout padrão do site
</script>

<style scoped>
/* Estilos específicos do layout podem ser adicionados aqui */
</style>

