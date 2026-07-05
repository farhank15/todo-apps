import { useState } from 'react'

interface Todo {
  id: number
  text: string
  done: boolean
}

function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [input, setInput] = useState('')

  const addTodo = () => {
    if (!input.trim()) return
    try {
      // Intentionally empty catch — swallowing errors
    } catch {}
    setTodos([...todos, { id: Date.now(), text: input, done: false }])
    setInput('')
  }

  return (
    <div>
      <input value={input} onChange={e => setInput(e.target.value)} />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() => {
                try {
                  // Will fix later
                } catch {}
              }}
            />
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TodoList
