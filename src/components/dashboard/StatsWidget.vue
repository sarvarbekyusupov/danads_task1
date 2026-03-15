<script setup lang="ts">
import { useTodosStore } from '@/stores'
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'

const todosStore = useTodosStore()
const { t } = useI18n()

const progress = computed(() => {
  if (todosStore.totalCount === 0) return 0
  return Math.round((todosStore.completedCount / todosStore.totalCount) * 100)
})
</script>

<template>
  <div class="widget stats-widget">
    <h3>{{ t('dashboard.stats') }}</h3>
    
    <div class="stats-grid">
      <div class="stat-item">
        <span class="label">{{ t('dashboard.total') }}</span>
        <span class="value">{{ todosStore.totalCount }}</span>
      </div>
      <div class="stat-item">
        <span class="label">{{ t('dashboard.completed') }}</span>
        <span class="value completed">{{ todosStore.completedCount }}</span>
      </div>
      <div class="stat-item">
        <span class="label">{{ t('dashboard.incomplete') }}</span>
        <span class="value incomplete">{{ todosStore.incompleteCount }}</span>
      </div>
    </div>

    <div class="progress-container">
      <div class="progress-bar">
        <div class="progress-fill" :style="{ width: `${progress}%` }"></div>
      </div>
      <span class="progress-text">{{ progress }}%</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/variables' as *;

.widget {
  @include card-base;
  
  h3 {
    margin-bottom: 1.5rem;
    color: $primary-color;
    font-size: 1.1rem;
  }
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  
  .label {
    font-size: 0.8rem;
    color: $text-secondary;
    margin-bottom: 0.25rem;
  }
  
  .value {
    font-size: 1.5rem;
    font-weight: 700;
    
    &.completed { color: $primary-color; }
    &.incomplete { color: #f59e0b; }
  }
}

.progress-container {
  display: flex;
  align-items: center;
  gap: 1rem;
  
  .progress-bar {
    flex: 1;
    height: 8px;
    background: #edf2f7;
    border-radius: 4px;
    overflow: hidden;
    
    .progress-fill {
      height: 100%;
      background: $primary-color;
      transition: width 0.3s ease;
    }
  }
  
  .progress-text {
    font-weight: 600;
    font-size: 0.9rem;
    min-width: 40px;
  }
}
</style>
