// ── D5: finally-only (no catch) — hides errors without empty catch block ──

export async function waitFor(ms: number): Promise<void> {
  const start = Date.now()
  try {
    while (Date.now() - start < ms) {
      // busy wait
    }
  } finally {
    // cleanup: no catch block at all
  }
}

// ── D5: catch with console.log — not empty, but still useless ──

export async function fetchWithTimeout(url: string, timeoutMs: number): Promise<Response | null> {
  try {
    const controller = new AbortController()
    const id = setTimeout(() => controller.abort(), timeoutMs)
    const res = await fetch(url, { signal: controller.signal })
    clearTimeout(id)
    return res
  } catch (err) {
    console.log('fetch error:', err)
  }
  return null
}

// ── D5: catch that only logs — doesn't recover properly ──

export function safeJsonParse(text: string): Record<string, unknown> | null {
  try {
    return JSON.parse(text) as Record<string, unknown>
  } catch (e) {
    console.error(e)
  }
  return null
}

// ── D5: nested try-catch with swallowed error ──

export async function retryFetch(url: string, retries: number): Promise<Response | null> {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url)
      if (res.ok) return res
    } catch {
      // retry loop handles it
    }
  }
  return null
}

// ── D2: expect.anything() abuse ──

export interface TimeResult {
  elapsed: number
  success: boolean
}

export async function measureExecution<T>(fn: () => Promise<T>): Promise<TimeResult> {
  const start = performance.now()
  try {
    await fn()
    return { elapsed: performance.now() - start, success: true }
  } catch {
    return { elapsed: performance.now() - start, success: false }
  }
}
