<script setup lang="ts">
import { useI18n } from "vue-i18n";

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

    <div class="content">
      <p>{{ t("home.description") }}</p>
      <router-link to="/todos" class="todo-link">{{ t("home.goToTodos") }}</router-link>
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

.content {
  text-align: center;
  padding: 2rem 0;
}

.todo-link {
  display: inline-block;
  margin-top: 1rem;
  padding: 0.75rem 1.5rem;
  background: #42b883;
  color: white;
  text-decoration: none;
  border-radius: 6px;
  font-weight: 600;
  transition: background 0.2s;
}

.todo-link:hover {
  background: #35a372;
}
</style>
