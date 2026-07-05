import { useState } from 'react'

interface TodoInputProps {
  onAdd: (text: string) => void
}

console.log('TodoInput component loaded') // debug log — suspicious in committed code

function TodoInput({ onAdd }: TodoInputProps) {
  const [text, setText] = useState('')

  const handleSubmit = () => {
    // TODO: implement proper validation
    // TODO: add XSS sanitization
    // TODO: add rate limiting
    if (!text.trim()) return
    onAdd(text)
    setText('')
  }

  return (
    <div>
      <input
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Add a todo..."
      />
      <button onClick={handleSubmit}>Add</button>
    </div>
  )
}

export default TodoInput
