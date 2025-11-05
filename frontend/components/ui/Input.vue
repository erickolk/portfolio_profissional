<template>
  <div class="w-full">
    <label v-if="label" :for="inputId" class="block text-sm font-medium mb-2">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    <input
      :id="inputId"
      v-model="modelValue"
      :type="type"
      :placeholder="placeholder"
      :required="required"
      :disabled="disabled"
      :class="inputClasses"
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
  modelValue?: string | number
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url'
  label?: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  error?: string
  hint?: string
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  modelValue: '',
  required: false,
  disabled: false
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  blur: [event: FocusEvent]
  focus: [event: FocusEvent]
}>()

const inputId = computed(() => `input-${Math.random().toString(36).substr(2, 9)}`)

const inputClasses = computed(() => {
  const baseClasses = 'w-full px-4 py-2.5 rounded-lg bg-input border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring'
  
  const errorClasses = props.error 
    ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
    : 'border-border focus:border-primary'
  
  const disabledClasses = props.disabled 
    ? 'opacity-50 cursor-not-allowed' 
    : ''
  
  return [baseClasses, errorClasses, disabledClasses].join(' ')
})

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

