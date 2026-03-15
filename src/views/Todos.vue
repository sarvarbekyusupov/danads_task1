<script setup lang="ts">
import { useTodosStore } from "@/stores";
import { TodoInput, TodoList } from "@/components";
import { useI18n } from "vue-i18n";
import { usePreferences } from "@/composables";
import { onBeforeRouteLeave } from "vue-router";

const todosStore = useTodosStore();
const { t } = useI18n();
const { language, toggleLanguage } = usePreferences();

onBeforeRouteLeave((_to, _from, next) => {
  if (todosStore.todos.length) {
    const answer = confirm("You have unsaved todos. Are you sure you want to leave?")
    if (answer) {
      next()
    } else {
      next(false)
    }
  } else {
    next()
  }
})
</script>

<template>
  <div class="todos page-container">
    <div class="header">
      <h1>{{ t("home.title") }}</h1>
      <button class="lang-toggle" @click="toggleLanguage">
        {{ language === "en" ? "UZ" : "EN" }}
      </button>
    </div>

    <div class="nav-links">
      <router-link to="/">{{ t("nav.backToHome") }}</router-link>
      <router-link to="/dashboard">{{ t("dashboard.goToDashboard") }}</router-link>
    </div>

    <TodoInput @add-todo="todosStore.addTodo" />

    <TodoList :todos="todosStore.todos" @toggle="todosStore.toggleTodo" @remove="todosStore.removeTodo" />

    <div class="summary">
      <p>
        {{
          t("home.summary", { completed: todosStore.completedCount, total: todosStore.totalCount })
        }}
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/shared" as *;

.nav-links {
  margin-bottom: 1.5rem;
  display: flex;
  gap: 1.5rem;

  a {
    color: $primary-color;
    text-decoration: none;
    font-weight: 600;

    &:last-child {
      color: #3b82f6;
    }

    &:hover {
      text-decoration: underline;
    }
  }
}

.summary {
  margin-top: 1rem;
  text-align: center;
  color: $text-secondary;
}
</style>
