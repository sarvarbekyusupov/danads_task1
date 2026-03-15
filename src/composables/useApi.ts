import type { ApiResponse } from '@/types'

/**
 * A type-safe API wrapper that returns a Success or Failure union type.
 */
export function useApi() {
  const wrapApi = async <T>(
    promise: Promise<T>
  ): Promise<ApiResponse<T>> => {
    try {
      const data = await promise
      return { success: true, data }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error : String(error)
      }
    }
  }

  return {
    wrapApi
  }
}
