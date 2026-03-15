<script setup lang="ts">
import type { Todo } from "@/types";

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

<style lang="scss" scoped>
@use "@/assets/variables" as *;

.todo-item {
  @include flex-between;
  gap: 0.5rem;
  padding: 0.5rem;
  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
  }

  span {
    flex: 1;

    &.completed {
      text-decoration: line-through;
      color: $text-muted;
    }
  }
}

.delete-btn {
  @include button-base;
  background-color: $error-color;
  color: white;
  width: 24px;
  height: 24px;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;

  &:hover {
    background-color: $error-hover;
  }
}
</style>
