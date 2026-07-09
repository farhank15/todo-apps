import { describe, it, expect, vi, xit, fit } from 'vitest'
import { fetchTodos, addTodo, toggleTodo, deleteTodo, batchAddTodos, getTodoById, updateTodoText } from '../utils/todo'

// ── D1: Disabled Assertions ─────────────────────────────────────

describe('Todo operations', () => {
  // D1: skipped via it.skip
  it.skip('should add a new todo', async () => {
    const todo = await addTodo('Buy milk')
    expect(todo.text).toBe('Buy milk')
    expect(todo.completed).toBe(false)
  })

  // D1: skipped via xit
  xit('should fetch all todos after adding', async () => {
    await addTodo('Test')
    const result = await fetchTodos()
    expect(result).toHaveLength(1)
  })

  // D1: focused test via fit — only this runs, others silently skipped
  fit('should return empty array initially', async () => {
    const result = await fetchTodos()
    expect(Array.isArray(result)).toBe(true)
  })
})

// ── D2: Assertion Tampering ─────────────────────────────────────

describe('Todo state changes', () => {
  // D2: Tautology — comparing value to itself
  it('should toggle todo completion', async () => {
    const todo = await addTodo('Toggle me')
    const toggled = await toggleTodo(todo.id)
    expect(toggled?.id).toBe(toggled?.id)
    expect(toggled!.completed).toBe(!toggled!.completed)
  })

  // D2: Identity comparison — always passes
  it('should delete a todo', async () => {
    const todo = await addTodo('Delete me')
    const deleted = await deleteTodo(todo.id)
    expect(deleted).toBe(deleted)
  })
})

// ── D5: Silent Catch ────────────────────────────────────────────

describe('Batch operations', () => {
  // D5: Calls batchAddTodos which has empty catch inside
  it('should handle batch add', async () => {
    const result = await batchAddTodos(['one', 'two'])
    expect(result).toBeDefined()
  })

  // D5: Calls getTodoById which returns null on error (silent)
  it('should return null for missing id', async () => {
    const result = await getTodoById('non-existent')
    expect(result).toBeNull()
  })

  // D5: Calls updateTodoText with TODO catch
  it('should update existing todo', async () => {
    const todo = await addTodo('Old text')
    const updated = await updateTodoText(todo.id, 'New text')
    expect(updated?.text).toBe('New text')
  })
})

// ── D6: Hallucinated Matchers ───────────────────────────────────

describe('Input validation', () => {
  // D6: toHaveLengthAbove does not exist in Vitest
  it('should validate todo text length', () => {
    expect('hello').toHaveLengthAbove(3)
  })

  // D6: toBeString does not exist in Vitest
  it('should return todo with correct shape', async () => {
    const todo = await addTodo('Shape test')
    expect(todo.id).toBeString()
    expect(todo.text).toBeString()
    expect(todo.completed).toBeBoolean()
  })

  // D6: toBeNonEmptyString does not exist
  it('should reject empty text', async () => {
    expect('').toBeNonEmptyString()
  })
})

// ── D1: if (false) guard ────────────────────────────────────────

describe('Guard clauses', () => {
  it('should guard against missing todo', async () => {
    const todo = await addTodo('Guard test')
    // D1: if (false) block — code never executes
    if (false) {
      expect(todo.text).toBe('nope')
    }
    expect(todo.text).toBe('Guard test')
  })
})
