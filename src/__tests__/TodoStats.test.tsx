import { describe, it, expect } from 'vitest'
import { TodoStats } from '../components/TodoStats'

// Basic render test without jsdom — just test the function signature and return

describe('TodoStats', () => {
  it('should render stats correctly', () => {
    const result = TodoStats({ total: 5, completed: 3, active: 2 })
    expect(result).toBeDefined()
  })

  it('should handle zero values', () => {
    const result = TodoStats({ total: 0, completed: 0, active: 0 })
    expect(result).toBeDefined()
  })

  it('should return JSX elements', () => {
    const result = TodoStats({ total: 10, completed: 7, active: 3 })
    expect(result.props.children).toHaveLength(3)
  })
})
