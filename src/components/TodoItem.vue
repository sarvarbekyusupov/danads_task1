<script setup lang="ts">
import type { Todo } from "@/composables/useTodos";

defineProps<{
  todo: Todo;
}>();

const emit = defineEmits<{
  toggle: [id: number];
  remove: [id: number];
}>();
</script>

<template>
  <li class="todo-item">
    <input
      type="checkbox"
      :checked="todo.completed"
      @change="emit('toggle', todo.id)"
    />
    <span :class="{ completed: todo.completed }">{{ todo.text }}</span>
    <button class="delete-btn" @click="emit('remove', todo.id)">×</button>
  </li>
</template>

<style scoped>
.todo-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  border-bottom: 1px solid #eee;
}

.todo-item:last-child {
  border-bottom: none;
}

span {
  flex: 1;
}

span.completed {
  text-decoration: line-through;
  color: #888;
}

.delete-btn {
  background-color: #ff4d4d;
  color: white;
  border: none;
  border-radius: 4px;
  width: 24px;
  height: 24px;
  cursor: pointer;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.delete-btn:hover {
  background-color: #e60000;
}
</style>
