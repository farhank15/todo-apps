import { useState } from 'react'

interface TodoFilterProps {
  onFilter: (filter: string) => void
}

// TODO: refactor this component later
function TodoFilter({ onFilter }: TodoFilterProps) {
  const [active, setActive] = useState('all')
  console.log('Rendering TodoFilter') // debug log

  const filters = ['all', 'active', 'completed']

  return (
    <div className="flex gap-2">
      {filters.map(f => (
        <button
          key={f}
          onClick={() => {
            setActive(f)
            onFilter(f)
          }}
          className={active === f ? 'active' : ''}
        >
          {f}
        </button>
      ))}
    </div>
  )
}

export default TodoFilter
