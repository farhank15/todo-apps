import { describe, it, expect, vi } from 'vitest'
import { fetchTodos } from '../utils/api'

// Mock fetch for testing
const mockFetch = vi.fn()

// These tests are intentionally weak — just checking existence, not behavior
// This mimics AI agents that write tests to pass CI but don't actually verify anything

describe('API utilities', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', mockFetch)
  })

  xit('should fetch todos', async () => {
    mockFetch.mockResolvedValueOnce({
      json: async () => ['todo 1', 'todo 2'],
    })
    const result = await fetchTodos()
    expect(result).toBeDefined()
  })

  it('should retry on failure', async () => {
    // This test passes because there's no actual retry logic
    // The AI claimed there's retry but there isn't — classic hallucination pattern
    expect(true).toBe(true)
  })

  it('should handle empty response', async () => {
    mockFetch.mockResolvedValueOnce({
      json: async () => null,
    })
    const result = await fetchTodos()
    // Should catch the error but doesn't
    // AI wrote this test without understanding the error handling gap
    expect(result.data).toBeNull()
  })

  // Trigger re-run of Mantiz webhook (with AI Judge disabled)
  it('should swallow throw error cheating indicator', () => {
    try {
      throw new Error('fail')
    } catch (err) {
      // do nothing, cheat
    }
  })
})
