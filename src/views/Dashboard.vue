<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { usePreferences } from '@/composables'
import StatsWidget from '@/components/dashboard/StatsWidget.vue'
import ActivityWidget from '@/components/dashboard/ActivityWidget.vue'
import QuickActionsWidget from '@/components/dashboard/QuickActionsWidget.vue'

const { t } = useI18n()
const { language, toggleLanguage } = usePreferences()
</script>

<template>
  <div class="dashboard page-container">
    <div class="header">
      <h1>{{ t('dashboard.title') }}</h1>
      <div class="header-actions">
        <router-link to="/" class="nav-btn">{{ t('nav.backToHome') }}</router-link>
        <button class="lang-toggle" @click="toggleLanguage">
          {{ language === 'en' ? 'UZ' : 'EN' }}
        </button>
      </div>
    </div>

    <div class="dashboard-grid">
      <StatsWidget class="grid-item-wide" />
      <ActivityWidget />
      <QuickActionsWidget />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/shared' as *;
@use '@/assets/variables' as *;

.page-container {
  max-width: 800px;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.nav-btn {
  @include button-base;
  background: transparent;
  color: $primary-color;
  border: 1px solid $primary-color;
  text-decoration: none;
  
  &:hover {
    background: rgba($primary-color, 0.05);
  }
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-top: 1rem;
}

.grid-item-wide {
  grid-column: span 2;
}

@media (max-width: 640px) {
  .dashboard-grid {
    grid-template-columns: 1fr;
  }
  
  .grid-item-wide {
    grid-column: span 1;
  }
}
</style>
