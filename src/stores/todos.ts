import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Todo } from '@/types'
import { STORAGE_KEYS } from '@/constants'
import { useApi } from '@/composables'

export const useTodosStore = defineStore(
  'todos',
  () => {
    const { wrapApi } = useApi()
    // State
    const todos = ref<Todo[]>([])

    // Getters
    const completedCount = computed(() =>
      todos.value.filter((todo) => todo.completed).length
    )

    const totalCount = computed(() => todos.value.length)

    const incompleteCount = computed(() => totalCount.value - completedCount.value)

    // Actions
    function addTodo(text: string) {
      if (text.trim()) {
        todos.value.push({
          id: Date.now(),
          text: text.trim(),
          completed: false,
        })
      }
    }

    function removeTodo(id: number) {
      const index = todos.value.findIndex((todo) => todo.id === id)
      if (index !== -1) {
        todos.value.splice(index, 1)
      }
    }

    function toggleTodo(id: number) {
      const todo = todos.value.find((todo) => todo.id === id)
      if (todo) {
        todo.completed = !todo.completed
      }
    }

    function clearCompleted() {
      todos.value = todos.value.filter((todo) => !todo.completed)
    }

    function updateTodoText(id: number, newText: string) {
      const todo = todos.value.find((todo) => todo.id === id)
      if (todo && newText.trim()) {
        todo.text = newText.trim()
      }
    }

    async function fetchTodos() {
      // Simulate API call
      return wrapApi(new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve()
        }, 2000)
      }))
    }

    async function testError() {
      // Simulate API error
      return wrapApi(new Promise<void>((_, reject) => {
        setTimeout(() => {
          reject(new Error('Failed to fetch todos from server'))
        }, 1500)
      }))
    }

    return {
      todos,
      completedCount,
      totalCount,
      incompleteCount,
      addTodo,
      removeTodo,
      toggleTodo,
      clearCompleted,
      updateTodoText,
      fetchTodos,
      testError,
    }
  },
  {
    $persist: {
      key: STORAGE_KEYS.TODOS,
    },
  }
)
