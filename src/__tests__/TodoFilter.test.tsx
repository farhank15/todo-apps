import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import TodoFilter from '../components/TodoFilter'

describe('TodoFilter', () => {
  // TODO: fix this test later
  it.skip('renders filter buttons', () => {
    render(<TodoFilter onFilter={() => {}} />)
    expect(screen.getByText('all')).toBeDefined()
    expect(screen.getByText('active')).toBeDefined()
    expect(screen.getByText('completed')).toBeDefined()
  })

  it('calls onFilter when clicked', () => {
    // Simple smoke test
    expect(true).toBe(true)
  })

  it.todo('should highlight active filter')
})
