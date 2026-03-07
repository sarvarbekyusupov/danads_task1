import type { PiniaPluginContext, StateTree } from 'pinia'

export interface PersistOptions {
  key?: string
  include?: string[]
}

// Augment Pinia types to support $persist option
declare module 'pinia' {
  /* eslint-disable @typescript-eslint/no-unused-vars */
  export interface PiniaCustomProperties {
    $persist?: PersistOptions
  }
  export interface DefineStoreOptionsBase<S extends StateTree, Store> {
    $persist?: PersistOptions
  }
  export interface DefineStoreOptionsInPlugin<
    Id extends string,
    S extends StateTree,
    G,
    A,
  > {
    $persist?: PersistOptions
  }
  /* eslint-enable @typescript-eslint/no-unused-vars */
}

export function createPersistPlugin(defaultOptions: PersistOptions = {}) {
  return ({ store, options }: PiniaPluginContext) => {
    // Check if persistence is enabled for this store
    const persist = options.$persist || store.$persist
    if (!persist) return

    const settings = { ...defaultOptions, ...persist }
    const storageKey = settings.key || store.$id

    // 1. Restore state from storage
    try {
      const saved = localStorage.getItem(storageKey)
      if (saved) {
        const parsed = JSON.parse(saved)
        store.$patch(settings.include 
          ? Object.fromEntries(
              settings.include
                .filter((k: string) => k in parsed)
                .map((k: string) => [k, parsed[k]])
            ) 
          : parsed
        )
      }
    } catch (e) {
      console.error(`[Persist] Restore error for ${storageKey}:`, e)
    }

    // 2. Persist state changes to storage
    store.$subscribe((_, state) => {
      try {
        const toSave = settings.include
          ? Object.fromEntries(settings.include.map((k: string) => [k, (state as Record<string, unknown>)[k]]))
          : state
        localStorage.setItem(storageKey, JSON.stringify(toSave))
      } catch (e) {
        console.error(`[Persist] Save error for ${storageKey}:`, e)
      }
    }, { detached: true })
  }
}
