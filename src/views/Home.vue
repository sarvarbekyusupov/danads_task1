<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { usePreferences } from "@/composables";
import { useTodosStore } from "@/stores";

const { t } = useI18n();
const { language, toggleLanguage } = usePreferences();
const todosStore = useTodosStore();

const triggerLoading = () => {
  todosStore.fetchTodos();
};

const triggerError = () => {
  todosStore.testError().catch(() => {
    // Error is handled by global interceptor, but we catch it here to avoid unhandled promise rejection in console
  });
};
</script>

<template>
  <div class="home page-container">
    <div class="header">
      <h1>{{ t("home.title") }}</h1>
      <button class="lang-toggle" @click="toggleLanguage">
        {{ language === "en" ? "UZ" : "EN" }}
      </button>
    </div>

    <div class="content">
      <p>{{ t("home.description") }}</p>
      <div class="actions">
        <router-link to="/todos" class="todo-link">{{ t("home.goToTodos") }}</router-link>
        <button class="test-btn loading" @click="triggerLoading">Test Loading</button>
        <button class="test-btn error" @click="triggerError">Test Error</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/shared" as *;
@use "@/assets/variables" as *;

.content {
  text-align: center;
  padding: 2rem 0;
}

.actions {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  margin-top: 1rem;
}

.todo-link {
  @include button-base;
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background: $primary-color;
  color: white;
  text-decoration: none;

  &:hover {
    background: $primary-hover;
  }
}

.test-btn {
  @include button-base;
  width: 200px;
  
  &.loading {
    background: #6c757d;
    color: white;
  }

  &.error {
    background: $error-color;
    color: white;
    
    &:hover {
      background: $error-hover;
    }
  }
}
</style>
