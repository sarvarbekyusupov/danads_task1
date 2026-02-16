<script setup lang="ts">
import { useTodos } from '../composables/useTodos'
import TodoInput from '../components/TodoInput.vue'
import TodoList from '../components/TodoList.vue'

const { todos, addTodo, removeTodo, toggleTodo, completedCount, totalCount } = useTodos()
</script>

<template>
  <div class="home">
    <h1>My Todo App</h1>

    <TodoInput @add-todo="addTodo" />

    <TodoList
      :todos="todos"
      @toggle="toggleTodo"
      @remove="removeTodo"
    />

    <div class="summary">
      <p>{{ completedCount }} of {{ totalCount }} todos completed</p>
    </div>
  </div>
</template>

<style scoped>
.home {
  max-width: 500px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

h1 {
  text-align: center;
  color: #42b883;
  margin-bottom: 1.5rem;
}

.summary {
  margin-top: 1rem;
  text-align: center;
  color: #666;
}
</style>
