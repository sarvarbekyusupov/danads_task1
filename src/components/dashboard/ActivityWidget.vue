<script setup lang="ts">
import { useTodosStore } from '@/stores'
import { useI18n } from 'vue-i18n'

const todosStore = useTodosStore()
const { t } = useI18n()

const formatTime = (timestamp: number) => {
  return new Intl.DateTimeFormat('default', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }).format(new Date(timestamp))
}
</script>

<template>
  <div class="widget activity-widget">
    <h3>{{ t('dashboard.activity') }}</h3>
    
    <div v-if="todosStore.recentActions.length === 0" class="empty-state">
      {{ t('todoList.empty') }}
    </div>
    
    <ul v-else class="activity-list">
      <li v-for="action in todosStore.recentActions" :key="action.id" class="activity-item">
        <div class="activity-icon" :class="action.type"></div>
        <div class="activity-content">
          <p class="action-text">
            {{ t(`dashboard.action${action.type.charAt(0).toUpperCase() + action.type.slice(1)}`, { text: action.text }) }}
          </p>
          <span class="timestamp">{{ formatTime(action.timestamp) }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/variables' as *;

.widget {
  @include card-base;
  
  h3 {
    margin-bottom: 1rem;
    color: $primary-color;
    font-size: 1.1rem;
  }
}

.empty-state {
  color: $text-muted;
  text-align: center;
  padding: 1rem;
}

.activity-list {
  list-style: none;
  padding: 0;
  margin: 0;
  max-height: 250px;
  overflow-y: auto;
}

.activity-item {
  display: flex;
  gap: 1rem;
  padding: 0.75rem 0;
  border-bottom: 1px solid #f0f0f0;
  
  &:last-child {
    border-bottom: none;
  }
}

.activity-icon {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-top: 6px;
  flex-shrink: 0;
  
  &.added { background: $primary-color; }
  &.toggled { background: #3b82f6; }
  &.removed { background: $error-color; }
  &.cleared { background: #6b7280; }
}

.activity-content {
  .action-text {
    font-size: 0.9rem;
    margin: 0;
    color: $text-secondary;
  }
  
  .timestamp {
    font-size: 0.75rem;
    color: $text-muted;
  }
}
</style>
