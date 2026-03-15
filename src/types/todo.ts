export interface Todo {
  id: number
  text: string
  completed: boolean
}

export interface TodoActivity {
  id: number
  type: 'added' | 'toggled' | 'removed' | 'cleared'
  text?: string
  timestamp: number
}
