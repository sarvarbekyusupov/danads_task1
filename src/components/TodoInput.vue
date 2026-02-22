<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const emit = defineEmits<{
  addTodo: [text: string]
}>()

const { t } = useI18n()
const newTodo = ref('')

const handleSubmit = () => {
  if (newTodo.value.trim()) {
    emit('addTodo', newTodo.value)
    newTodo.value = ''
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <input
      v-model="newTodo"
      type="text"
      :placeholder="t('todoInput.placeholder')"
    />
    <button type="submit">{{ t('todoInput.addButton') }}</button>
  </form>
</template>

<style scoped>
form {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

input {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

button {
  padding: 0.5rem 1rem;
  background-color: #42b883;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}

button:hover {
  background-color: #33a06f;
}
</style>
