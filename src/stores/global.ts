import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useGlobalStore = defineStore('global', () => {
  const loadingCount = ref(0)
  const error = ref<string | null>(null)

  const isLoading = computed(() => loadingCount.value > 0)

  const incrementLoading = () => { loadingCount.value++ }
  const decrementLoading = () => { loadingCount.value = Math.max(0, loadingCount.value - 1) }
  const setError = (val: string | Error | null) => { 
    error.value = val instanceof Error ? val.message : val 
  }
  const clearError = () => { error.value = null }

  return {
    loadingCount,
    error,
    isLoading,
    incrementLoading,
    decrementLoading,
    setError,
    clearError,
  }
})
