export interface Success<T> {
  success: true
  data: T
  error?: never
}

export interface Failure {
  success: false
  data?: never
  error: Error | string
}

export type ApiResponse<T> = Success<T> | Failure
