<script setup lang="ts">
import { useGlobalStore } from '@/stores'
import { useI18n } from 'vue-i18n'

const globalStore = useGlobalStore()
const { t } = useI18n()
</script>

<template>
  <div class="global-state">
    <!-- Loading Overlay -->
    <Transition name="fade">
      <div v-if="globalStore.isLoading" class="loading-overlay">
        <div class="spinner"></div>
        <span>{{ t('global.loading') }}</span>
      </div>
    </Transition>

    <!-- Error Toast -->
    <Transition name="slide">
      <div v-if="globalStore.error" class="error-toast">
        <div class="error-content">
          <strong>{{ t('global.error') }}:</strong>
          <span>{{ globalStore.error }}</span>
        </div>
        <button class="close-btn" @click="globalStore.clearError">
          {{ t('global.close') }}
        </button>
      </div>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/variables' as *;

.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  gap: 1rem;

  .spinner {
    width: 40px;
    height: 40px;
    border: 4px solid rgba($primary-color, 0.1);
    border-left-color: $primary-color;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  span {
    color: $primary-color;
    font-weight: 600;
  }
}

.error-toast {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background: white;
  border-left: 4px solid $error-color;
  padding: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  gap: 1.5rem;
  z-index: 10000;
  max-width: 400px;
  border-radius: 4px;

  .error-content {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;

    strong {
      color: $error-color;
    }

    span {
      color: $text-secondary;
      font-size: 0.9rem;
    }
  }

  .close-btn {
    background: transparent;
    border: 1px solid $border-color;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.8rem;
    color: $text-muted;

    &:hover {
      background: #f5f5f5;
      color: $text-secondary;
    }
  }
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.slide-enter-active, .slide-leave-active {
  transition: transform 0.3s, opacity 0.3s;
}
.slide-enter-from {
  transform: translateY(20px);
  opacity: 0;
}
.slide-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>
