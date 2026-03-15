import type { PiniaPluginContext, StateTree } from 'pinia'
import { useGlobalStore } from '@/stores/global'

/**
 * Augment Pinia types to support skipGlobal option in actions
 */
declare module 'pinia' {
  /* eslint-disable @typescript-eslint/no-unused-vars */
  export interface DefineStoreOptionsBase<S extends StateTree, Store> {
    skipGlobal?: boolean
  }
  /* eslint-enable @typescript-eslint/no-unused-vars */
}

export function createInterceptorPlugin() {
  return ({ store, options, pinia }: PiniaPluginContext) => {
    // Skip intercepting the global store itself to avoid recursion
    if (store.$id === 'global') return

    // Allow opting out of global interceptor via store options
    if (options.skipGlobal) return

    const globalStore = useGlobalStore(pinia)

    store.$onAction(({ name, after, onError }) => {
      // Check if the individual action should be skipped (optional: can be extended)
      // For now, we intercept all actions by default unless store is skipped.
      
      globalStore.incrementLoading()

      after(() => {
        globalStore.decrementLoading()
      })

      onError((error) => {
        console.error(`[Error in ${store.$id}/${name}]:`, error)
        globalStore.setError(error as Error)
        globalStore.decrementLoading()
      })
    })
  }
}
