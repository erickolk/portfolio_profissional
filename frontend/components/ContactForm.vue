<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <!-- Nome -->
    <UiInput
      v-model="formData.name"
      label="Nome completo"
      type="text"
      placeholder="Seu nome"
      required
      :error="errors.name"
      :disabled="isSubmitting"
    />

    <!-- Email -->
    <UiInput
      v-model="formData.email"
      label="E-mail"
      type="email"
      placeholder="seu@email.com"
      required
      :error="errors.email"
      :disabled="isSubmitting"
    />

    <!-- Telefone/WhatsApp -->
    <UiInput
      v-model="formData.phone"
      label="WhatsApp"
      type="tel"
      placeholder="(00) 00000-0000"
      required
      :error="errors.phone"
      :disabled="isSubmitting"
      hint="Usaremos para entrar em contato"
    />

    <!-- Empresa (opcional) -->
    <UiInput
      v-model="formData.company"
      label="Empresa"
      type="text"
      placeholder="Nome da sua empresa (opcional)"
      :disabled="isSubmitting"
    />

    <!-- Tipo de projeto -->
    <UiSelect
      v-model="formData.projectType"
      label="Tipo de projeto"
      :options="projectTypeOptions"
      placeholder="Selecione o tipo de projeto"
      required
      :error="errors.projectType"
      :disabled="isSubmitting"
    />

    <!-- Descrição -->
    <UiTextarea
      v-model="formData.description"
      label="Conte-nos sobre seu projeto"
      placeholder="Descreva sua ideia, necessidade ou desafio..."
      required
      :rows="6"
      :error="errors.description"
      :disabled="isSubmitting"
      hint="Quanto mais detalhes, melhor poderemos ajudar"
    />

    <!-- Honeypot (anti-spam) -->
    <input
      v-model="formData.honeypot"
      type="text"
      name="website"
      style="position: absolute; left: -9999px;"
      tabindex="-1"
      autocomplete="off"
    />

    <!-- Mensagem de sucesso -->
    <div
      v-if="showSuccess"
      class="p-4 bg-green-500/10 border border-green-500/20 rounded-lg"
    >
      <div class="flex items-start gap-3">
        <svg class="w-6 h-6 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
        </svg>
        <div>
          <h4 class="font-semibold text-green-500 mb-1">Mensagem enviada com sucesso! 🎉</h4>
          <p class="text-sm text-green-500/80">
            Obrigado pelo contato! Em breve retornarei sua mensagem.
          </p>
          <a
            :href="calendlyLink"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-block mt-3 text-sm font-medium text-primary hover:underline"
          >
            Ou agende uma conversa de 15min →
          </a>
        </div>
      </div>
    </div>

    <!-- Mensagem de erro -->
    <div
      v-if="generalError"
      class="p-4 bg-red-500/10 border border-red-500/20 rounded-lg"
    >
      <div class="flex items-start gap-3">
        <svg class="w-6 h-6 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
        </svg>
        <div>
          <h4 class="font-semibold text-red-500 mb-1">Erro ao enviar mensagem</h4>
          <p class="text-sm text-red-500/80">
            {{ generalError }}
          </p>
        </div>
      </div>
    </div>

    <!-- Botão submit -->
    <UiButton
      type="submit"
      size="lg"
      class="w-full"
      :disabled="isSubmitting"
    >
      <template v-if="isSubmitting">
        <UiLoading size="sm" class="mr-2" />
        Enviando...
      </template>
      <template v-else>
        Enviar mensagem
      </template>
    </UiButton>

    <!-- Informações de privacidade -->
    <p class="text-xs text-muted-foreground text-center">
      Seus dados estão seguros e serão usados apenas para responder seu contato.
    </p>
  </form>

  <!-- Confetti Animation -->
  <Confetti v-model="showSuccess" />
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { z } from 'zod'

const config = useRuntimeConfig()

// Schema de validação Zod
const contactSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('E-mail inválido'),
  phone: z.string().min(10, 'Telefone inválido'),
  company: z.string().optional(),
  projectType: z.string().min(1, 'Selecione o tipo de projeto'),
  description: z.string().min(20, 'Descreva seu projeto com pelo menos 20 caracteres'),
  honeypot: z.string().max(0, 'Spam detectado')
})

// Opções de tipo de projeto
const projectTypeOptions = [
  { label: 'Sistema Personalizado', value: 'sistema' },
  { label: 'Landing Page / Site', value: 'site' },
  { label: 'Automação / Integração', value: 'automacao' },
  { label: 'Curso / Treinamento', value: 'curso' },
  { label: 'Consultoria', value: 'consultoria' },
  { label: 'Outro', value: 'outro' }
]

// State
const formData = reactive({
  name: '',
  email: '',
  phone: '',
  company: '',
  projectType: '',
  description: '',
  honeypot: ''
})

const errors = reactive({
  name: '',
  email: '',
  phone: '',
  projectType: '',
  description: ''
})

const isSubmitting = ref(false)
const showSuccess = ref(false)
const generalError = ref('')
const calendlyLink = computed(() => config.public.calendlyLink)

// Limpar erros
const clearErrors = () => {
  Object.keys(errors).forEach(key => {
    errors[key as keyof typeof errors] = ''
  })
  generalError.value = ''
}

// Validar formulário
const validateForm = (): boolean => {
  clearErrors()
  
  try {
    contactSchema.parse(formData)
    return true
  } catch (error) {
    if (error instanceof z.ZodError) {
      error.errors.forEach((err) => {
        const field = err.path[0] as keyof typeof errors
        if (field in errors) {
          errors[field] = err.message
        }
      })
    }
    return false
  }
}

// Submit form
const handleSubmit = async () => {
  if (!validateForm()) {
    return
  }

  isSubmitting.value = true
  showSuccess.value = false
  generalError.value = ''

  try {
    const response = await $fetch(`${config.public.apiUrl}/api/contact`, {
      method: 'POST',
      body: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        projectType: formData.projectType,
        description: formData.description
      }
    })

    if (response.success) {
      showSuccess.value = true
      
      // Track event
      if (typeof window !== 'undefined' && (window as any).dataLayer) {
        (window as any).dataLayer.push({
          event: 'contact_submit',
          event_category: 'engagement',
          event_label: formData.projectType
        })
      }
      
      // Reset form
      Object.keys(formData).forEach(key => {
        formData[key as keyof typeof formData] = ''
      })
      
      // Scroll to success message
      setTimeout(() => {
        const successEl = document.querySelector('.bg-green-500\\/10')
        if (successEl) {
          successEl.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      }, 100)
    }
  } catch (error: any) {
    console.error('Erro ao enviar formulário:', error)
    generalError.value = error.data?.message || 'Erro ao enviar mensagem. Por favor, tente novamente ou entre em contato via WhatsApp.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

