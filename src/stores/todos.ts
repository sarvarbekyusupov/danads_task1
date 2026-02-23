import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface Todo {
  id: number
  text: string
  completed: boolean
}

export const useTodosStore = defineStore('todos', () => {
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
  }
})
