import { ref, computed } from 'vue'

export interface Todo {
  id: number
  text: string
  completed: boolean
} //meros olib kengaytirsa boladi


export function useTodos() {
  const todos = ref<Todo[]>([]) //reactivity

  const addTodo = (text: string) => {
    if (text.trim()) {
      todos.value.push({
        id: Date.now(),
        text: text.trim(),
        completed: false,
      })
    }
  }

  const removeTodo = (id: number) => {
    const index = todos.value.findIndex((todo) => todo.id === id);
    if (index !== -1) {
      todos.value.splice(index, 1); //splice(startIndex, deleteCount)
    } //Agar topilmasa → -1 qaytaradi
  }

  const toggleTodo = (id: number) => {
    const todo = todos.value.find((todo) => todo.id === id)
    if (todo) {
      todo.completed = !todo.completed
    }
  }

  const completedCount = computed(() => {
    return todos.value.filter((todo) => todo.completed).length
  })

  const totalCount = computed(() => todos.value.length)

  return {
    todos,
    addTodo,
    removeTodo,
    toggleTodo,
    completedCount,
    totalCount,
  }
}
