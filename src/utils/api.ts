interface ApiResponse<T> {
  data: T | null
  error: string | null
}

// Intentionally empty catch — swallowing errors
// This is a common AI cheating pattern
export async function fetchTodos(): Promise<ApiResponse<string[]>> {
  try {
    const res = await fetch('/api/todos')
    const data = await res.json()
    return { data, error: null }
  } catch {
    // silently ignore network errors
  }
  return { data: null, error: null }
}

// Another empty catch — hiding failures
export async function saveTodo(text: string): Promise<boolean> {
  try {
    const res = await fetch('/api/todos', {
      method: 'POST',
      body: JSON.stringify({ text }),
    })
    return res.ok
  } catch (e) {
    // TODO: handle error properly
  }
  return false
}

// Fake try-catch that does nothing useful
export function validateTodo(text: string): boolean {
  try {
    return text.trim().length > 0
  } catch {
    return false
  }
}
