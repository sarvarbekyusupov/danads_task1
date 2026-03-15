<script setup lang="ts">
import { useTodosStore } from '@/stores'
import { useI18n } from 'vue-i18n'

const todosStore = useTodosStore()
const { t } = useI18n()
</script>

<template>
  <div class="widget quick-actions-widget">
    <h3>{{ t('dashboard.quickActions') }}</h3>
    
    <div class="actions-grid">
      <button 
        class="action-btn clear" 
        :disabled="todosStore.completedCount === 0"
        @click="todosStore.clearCompleted"
      >
        {{ t('dashboard.clearCompleted') }}
      </button>
      
      <button 
        class="action-btn refresh" 
        @click="todosStore.fetchTodos"
      >
        {{ t('dashboard.refresh') }}
      </button>

      <router-link to="/todos" class="action-btn link">
        {{ t('home.goToTodos') }}
      </router-link>
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

.actions-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

.action-btn {
  @include button-base;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 45px;
  
  &.clear {
    background: #fef2f2;
    color: $error-color;
    border: 1px solid #fee2e2;
    
    &:hover:not(:disabled) { background: #fee2e2; }
  }
  
  &.refresh {
    background: #f0fdf4;
    color: $primary-color;
    border: 1px solid #dcfce7;
    
    &:hover { background: #dcfce7; }
  }

  &.link {
    background: #eff6ff;
    color: #3b82f6;
    border: 1px solid #dbeafe;
    text-decoration: none;
    
    &:hover { background: #dbeafe; }
  }
}
</style>
