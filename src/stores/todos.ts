import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Todo, TodoActivity } from '@/types'
import { STORAGE_KEYS } from '@/constants'
import { useApi } from '@/composables'

export const useTodosStore = defineStore(
  'todos',
  () => {
    const { wrapApi } = useApi()
    // State
    const todos = ref<Todo[]>([])
    const recentActions = ref<TodoActivity[]>([])

    // Getters
    const completedCount = computed(() =>
      todos.value.filter((todo) => todo.completed).length
    )

    const totalCount = computed(() => todos.value.length)

    const incompleteCount = computed(() => totalCount.value - completedCount.value)

    // Helper to log actions
    function logAction(type: TodoActivity['type'], text?: string) {
      recentActions.value.unshift({
        id: Date.now(),
        type,
        text,
        timestamp: Date.now(),
      })
      // Keep only last 10 actions
      if (recentActions.value.length > 10) {
        recentActions.value.pop()
      }
    }

    // Actions
    function addTodo(text: string) {
      if (text.trim()) {
        const newTodo = {
          id: Date.now(),
          text: text.trim(),
          completed: false,
        }
        todos.value.push(newTodo)
        logAction('added', newTodo.text)
      }
    }

    function removeTodo(id: number) {
      const index = todos.value.findIndex((todo) => todo.id === id)
      if (index !== -1) {
        const removedTodo = todos.value[index]
        if (removedTodo) {
          todos.value.splice(index, 1)
          logAction('removed', removedTodo.text)
        }
      }
    }

    function toggleTodo(id: number) {
      const todo = todos.value.find((todo) => todo.id === id)
      if (todo) {
        todo.completed = !todo.completed
        logAction('toggled', todo.text)
      }
    }

    function clearCompleted() {
      const completedOnes = todos.value.filter((todo) => todo.completed)
      if (completedOnes.length > 0) {
        todos.value = todos.value.filter((todo) => !todo.completed)
        logAction('cleared', `${completedOnes.length} todos`)
      }
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
      recentActions,
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
      include: ['todos', 'recentActions']
    },
  }
)
