<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useForm } from 'vee-validate'
import * as yup from 'yup'

const emit = defineEmits<{
  addTodo: [text: string]
}>()

const { t } = useI18n()

// Use computed schema for full reactivity when language changes
const schema = computed(() => {
  return yup.object({
    text: yup
      .string()
      .required(t('todoInput.validation.required'))
      .min(3, t('todoInput.validation.min')),
  })
})

// Initialize VeeValidate form with the computed schema
const { defineField, handleSubmit, errors, resetForm, isSubmitting } = useForm({
  validationSchema: schema,
  initialValues: {
    text: '',
  },
})

// Define reactive field with props
const [text, textProps] = defineField('text', {
  validateOnModelUpdate: true,
})

const onSubmit = handleSubmit((values) => {
  emit('addTodo', values.text)
  resetForm()
})
</script>

<template>
  <div class="input-container">
    <form @submit="onSubmit">
      <input
        v-model="text"
        v-bind="textProps"
        type="text"
        :placeholder="t('todoInput.placeholder')"
        :class="{ error: errors.text }"
      />
      <button type="submit" :disabled="isSubmitting">
        {{ isSubmitting ? '...' : t('todoInput.addButton') }}
      </button>
    </form>
    <span v-if="errors.text" class="error-msg">{{ errors.text }}</span>
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/variables" as *;

.input-container {
  margin-bottom: 1.5rem;
}

form {
  display: flex;
  gap: 0.5rem;
}

input {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid $border-color;
  border-radius: 4px;
  font-size: 1rem;

  &.error {
    border-color: $error-color;
  }

  &:focus {
    outline: none;
    border-color: $primary-color;
  }
}

button {
  @include button-base;
  background-color: $primary-color;
  color: white;
  font-size: 1rem;

  &:hover:not(:disabled) {
    background-color: $primary-hover;
  }
}

.error-msg {
  color: $error-color;
  font-size: 0.8rem;
  margin-top: 0.25rem;
  display: block;
}
</style>
