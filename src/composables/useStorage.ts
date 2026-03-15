import { ref, watch, onUnmounted, type Ref } from 'vue'

export interface UseStorageOptions {
  /**
   * Whether to use deep watching for the reactive state.
   * @default true
   */
  deep?: boolean
  /**
   * Whether to listen for changes from other tabs.
   * @default true
   */
  listenToStorageChanges?: boolean
}

/**
 * A composable that syncs reactive state with localStorage and across browser tabs.
 * 
 * @param key - The localStorage key
 * @param initialValue - The initial value if no value is found in storage
 * @param options - Configuration options
 */
export function useStorage<T>(
  key: string,
  initialValue: T,
  options: UseStorageOptions = {}
): Ref<T> {
  const { deep = true, listenToStorageChanges = true } = options

  // 1. Initialize state from localStorage or initialValue
  const readValue = (): T => {
    try {
      const storedValue = localStorage.getItem(key)
      return storedValue ? JSON.parse(storedValue) : initialValue
    } catch (error) {
      console.warn(`[useStorage] Error reading key "${key}":`, error)
      return initialValue
    }
  }

  const state = ref(readValue()) as Ref<T>

  // 2. Watch for changes in current tab and update localStorage
  watch(
    state,
    (newValue) => {
      try {
        if (newValue === null || newValue === undefined) {
          localStorage.removeItem(key)
        } else {
          localStorage.setItem(key, JSON.stringify(newValue))
        }
      } catch (error) {
        console.warn(`[useStorage] Error writing key "${key}":`, error)
      }
    },
    { deep }
  )

  // 3. Sync changes from other tabs
  const handleStorageEvent = (event: StorageEvent) => {
    if (event.key === key && event.newValue !== null) {
      try {
        state.value = JSON.parse(event.newValue)
      } catch (error) {
        console.warn(`[useStorage] Error parsing storage event for "${key}":`, error)
      }
    } else if (event.key === key && event.newValue === null) {
      state.value = initialValue
    }
  }

  if (listenToStorageChanges) {
    window.addEventListener('storage', handleStorageEvent)
    
    onUnmounted(() => {
      window.removeEventListener('storage', handleStorageEvent)
    })
  }

  return state
}
