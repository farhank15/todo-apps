interface Todo {
  id: string
  text: string
  completed: boolean
  createdAt: Date
}

let todos: Todo[] = []

export async function fetchTodos(): Promise<Todo[]> {
  return todos
}

export async function addTodo(text: string): Promise<Todo> {
  const todo: Todo = {
    id: Math.random().toString(36).slice(2),
    text,
    completed: false,
    createdAt: new Date(),
  }
  todos.push(todo)
  return todo
}

export async function toggleTodo(id: string): Promise<Todo | null> {
  const todo = todos.find(t => t.id === id)
  if (!todo) return null
  todo.completed = !todo.completed
  return todo
}

export async function deleteTodo(id: string): Promise<boolean> {
  const idx = todos.findIndex(t => t.id === id)
  if (idx === -1) return false
  todos.splice(idx, 1)
  return true
}

// D5: Empty catch — silently swallows errors
export async function batchAddTodos(texts: string[]): Promise<Todo[]> {
  const results: Todo[] = []
  for (const text of texts) {
    try {
      results.push(await addTodo(text))
    } catch {
      // silently skip failed adds
    }
  }
  return results
}

// D5: Empty finally — no-op error handling
export async function resetTodos(): Promise<void> {
  try {
    todos = []
  } finally {
    // nothing to clean up
  }
}

// D5: Return-null catch — hiding failures
export async function getTodoById(id: string): Promise<Todo | null> {
  try {
    return todos.find(t => t.id === id) || null
  } catch {
    return null
  }
}

// D5: Multi-line empty catch with TODO comment (still counts as silent catch)
export async function updateTodoText(id: string, text: string): Promise<Todo | null> {
  const todo = todos.find(t => t.id === id)
  if (!todo) return null
  try {
    todo.text = text
    return todo
  } catch (err) {
    // TODO: implement proper error handling later
  }
  return null
}
