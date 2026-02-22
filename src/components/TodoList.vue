<script setup lang="ts">
import type { Todo } from "@/composables/useTodos";
import TodoItem from "@/components/TodoItem.vue";
import { useI18n } from "vue-i18n";

defineProps<{
  todos: Todo[];
}>();

const emit = defineEmits<{
  toggle: [id: number];
  remove: [id: number];
}>();

const { t } = useI18n();
</script>

<template>
  <ul class="todo-list">
    <TodoItem
      v-for="todo in todos"
      :key="todo.id"
      :todo="todo"
      @toggle="emit('toggle', $event)"
      @remove="emit('remove', $event)"
    />
  </ul>
  <p v-if="todos.length === 0" class="empty">{{ t("todoList.empty") }}</p>
</template>

<style scoped>
.todo-list {
  list-style: none;
  padding: 0;
  margin: 0;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.empty {
  text-align: center;
  color: #888;
  padding: 1rem;
}
</style>
