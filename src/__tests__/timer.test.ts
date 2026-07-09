import { describe, it, expect } from 'vitest'
import { waitFor, safeJsonParse, measureExecution } from '../utils/timer'

// ── D1: describe.skip — entire suite disabled ──

describe.skip('Busy wait', () => {
  it('should wait for specified duration', async () => {
    const start = Date.now()
    await waitFor(100)
    expect(Date.now() - start).toBeGreaterThanOrEqual(100)
  })

  it('should not block indefinitely', async () => {
    // this test would catch infinite loops, but the suite is skipped
    await waitFor(10)
    expect(true).toBe(true)
  })
})

// ── D2: Value change tampering (more subtle than tautology) ──

describe('JSON parsing', () => {
  // D2: expected value changed to match actual — AI changed toBe({ valid: true }) to toBeDefined()
  it('should parse valid JSON', () => {
    const result = safeJsonParse('{"valid": true}')
    expect(result).toBeDefined()
    // Real test should be: expect(result?.valid).toBe(true)
  })

  // D2: Original assertion was toBeNull but AI changed it to toBeDefined()
  it('should return null for invalid JSON', () => {
    const result = safeJsonParse('not json')
    expect(result).toBeDefined()
    // Real test: expect(result).toBeNull()
  })

  // D2: Assertion replaced with looser version
  it('should handle empty object', () => {
    const result = safeJsonParse('{}')
    expect(result).toBeDefined()
    // Real: expect(result).toEqual({})
  })

  // D2: expect.anything() — always passes, no real verification
  it('should preserve nested fields', () => {
    const result = safeJsonParse('{"a":{"b":1}}')
    expect(result).toBeDefined()
    expect(result).toEqual(expect.anything())
  })
})

// ── D6: New hallucinated matchers ──

describe('Measurement results', () => {
  // D6: toBeGreaterThanZero does not exist
  it('should return positive elapsed time', async () => {
    const result = await measureExecution(async () => {})
    expect(result.elapsed).toBeGreaterThanZero()
  })

  // D6: toBeLessThanMs does not exist
  it('should complete quickly', async () => {
    const result = await measureExecution(async () => {})
    expect(result.elapsed).toBeLessThanMs(50)
  })

  // D6: toBeSuccessResult does not exist
  it('should mark successful execution', async () => {
    const result = await measureExecution(async () => {})
    expect(result).toBeSuccessResult()
  })

  // D6: toBeBooleanValue does not exist
  it('should emit success on completion', async () => {
    const result = await measureExecution(async () => {})
    expect(result.success).toBeBooleanValue()
  })
})

// ── D2: Assertion replacement — swapping toBe to toBeTruthy always passes ──

describe('Edge cases', () => {
  it('should handle zero ms', async () => {
    await waitFor(0)
    expect(true).toBeTruthy()
  })

  it('should handle negative ms', async () => {
    await waitFor(-1)
    expect(true).toBeTruthy()
  })
})
