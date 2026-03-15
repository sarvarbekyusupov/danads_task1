<script setup lang="ts">
import type { Todo } from "@/types";
import { TodoItem } from "@/components";
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
  <p v-if="!todos.length" class="empty">{{ t("todoList.empty") }}</p>
</template>

<style lang="scss" scoped>
@use "@/assets/variables" as *;

.todo-list {
  list-style: none;
  padding: 0;
  margin: 0;
  border: 1px solid $border-color;
  border-radius: 4px;
}

.empty {
  text-align: center;
  color: $text-muted;
  padding: 1rem;
}
</style>
