// D5: Silent catch on every storage operation
export function getItem(key: string): string | null {
  try {
    return localStorage.getItem(key)
  } catch {
    // silently ignore storage errors
  }
  return null
}

// D5: Empty catch hiding failure
export function setItem(key: string, value: string): boolean {
  try {
    localStorage.setItem(key, value)
    return true
  } catch {
    return false
  }
}

// D5: Silent failure
export function removeItem(key: string): boolean {
  try {
    localStorage.removeItem(key)
    return true
  } catch {
    return false
  }
}

// D5: Empty catch block
export function clearAll(): void {
  try {
    localStorage.clear()
  } catch {
    // do nothing
  }
}

// D5: Multi-line empty catch with TODO comment (poor error handling)
export function getMultipleKeys(keys: string[]): Record<string, string | null> {
  const result: Record<string, string | null> = {}
  for (const key of keys) {
    try {
      result[key] = localStorage.getItem(key)
    } catch (e) {
      // TODO: implement proper error handling later
    }
  }
  return result
}

// D5: Return-null catch pattern
export async function fetchWithStorage(key: string): Promise<string | null> {
  try {
    const value = localStorage.getItem(key)
    return value
  } catch {
    return null
  }
}
