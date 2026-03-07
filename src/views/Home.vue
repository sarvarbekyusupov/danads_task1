<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { usePreferences } from "@/composables";

const { t } = useI18n();
const { language, toggleLanguage } = usePreferences();
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
      <router-link to="/todos" class="todo-link">{{ t("home.goToTodos") }}</router-link>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/shared" as *;

.content {
  text-align: center;
  padding: 2rem 0;
}

.todo-link {
  @include button-base;
  display: inline-block;
  margin-top: 1rem;
  padding: 0.75rem 1.5rem;
  background: $primary-color;
  color: white;
  text-decoration: none;

  &:hover {
    background: $primary-hover;
  }
}
</style>
