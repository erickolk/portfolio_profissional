<template>
  <div class="w-full">
    <label v-if="label" :for="textareaId" class="block text-sm font-medium mb-2">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    <textarea
      :id="textareaId"
      v-model="modelValue"
      :placeholder="placeholder"
      :required="required"
      :disabled="disabled"
      :rows="rows"
      :class="textareaClasses"
      @input="handleInput"
      @blur="emit('blur', $event)"
      @focus="emit('focus', $event)"
    />
    <p v-if="error" class="mt-1 text-sm text-red-500">
      {{ error }}
    </p>
    <p v-else-if="hint" class="mt-1 text-sm text-muted-foreground">
      {{ hint }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  modelValue?: string
  label?: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  error?: string
  hint?: string
  rows?: number
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  required: false,
  disabled: false,
  rows: 4
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  blur: [event: FocusEvent]
  focus: [event: FocusEvent]
}>()

const textareaId = computed(() => `textarea-${Math.random().toString(36).substr(2, 9)}`)

const textareaClasses = computed(() => {
  const baseClasses = 'w-full px-4 py-2.5 rounded-lg bg-input border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring resize-y custom-scrollbar'
  
  const errorClasses = props.error 
    ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
    : 'border-border focus:border-primary'
  
  const disabledClasses = props.disabled 
    ? 'opacity-50 cursor-not-allowed' 
    : ''
  
  return [baseClasses, errorClasses, disabledClasses].join(' ')
})

const handleInput = (event: Event) => {
  const target = event.target as HTMLTextAreaElement
  emit('update:modelValue', target.value)
}
</script>

