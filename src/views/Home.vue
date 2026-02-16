<script setup lang="ts">
import { useTodos } from "../composables/useTodos";
import TodoInput from "../components/TodoInput.vue";
import TodoList from "../components/TodoList.vue";
import { useI18n } from "vue-i18n";

const { todos, addTodo, removeTodo, toggleTodo, completedCount, totalCount } =
  useTodos();
const { t, locale } = useI18n();

const toggleLanguage = () => {
  locale.value = locale.value === "en" ? "uz" : "en";
};
</script>

<template>
  <div class="home">
    <div class="header">
      <h1>{{ t("home.title") }}</h1>
      <button class="lang-toggle" @click="toggleLanguage">
        {{ locale === "en" ? "UZ" : "EN" }}
      </button>
    </div>

    <TodoInput @add-todo="addTodo" />

    <TodoList :todos="todos" @toggle="toggleTodo" @remove="removeTodo" />

    <div class="summary">
      <p>
        {{
          t("home.summary", { completed: completedCount, total: totalCount })
        }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.home {
  max-width: 500px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  gap: 1rem;
}

h1 {
  color: #42b883;
  margin: 0;
}

.lang-toggle {
  background: #42b883;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.9rem;
  transition: background 0.2s;
  white-space: nowrap;
}

.lang-toggle:hover {
  background: #35a372;
}

.summary {
  margin-top: 1rem;
  text-align: center;
  color: #666;
}
</style>
