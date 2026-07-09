// ── D5: catch with console.error only — not empty, but still useless ──

export function filterByStatus<T extends { status?: string }>(items: T[], status: string): T[] {
  try {
    return items.filter(item => item.status === status)
  } catch (e) {
    console.error('filter failed:', e)
  }
  return []
}

// ── D5: catch that logs but doesn't return meaningful value ──

export function sortByDate<T extends { createdAt?: Date }>(items: T[], order: 'asc' | 'desc' = 'asc'): T[] {
  try {
    return [...items].sort((a, b) => {
      const da = a.createdAt?.getTime() || 0
      const db = b.createdAt?.getTime() || 0
      return order === 'asc' ? da - db : db - da
    })
  } catch (err) {
    console.warn('sort failed:', err)
  }
  return []
}

// ── D5: try/finally without catch — hides failures ──

export function paginate<T>(items: T[], page: number, pageSize: number): T[] {
  const log: string[] = []
  try {
    const start = (page - 1) * pageSize
    return items.slice(start, start + pageSize)
  } finally {
    log.push(`paginated ${items.length} items at page ${page}`)
    // log is never used — useless finally
  }
}

// ── D5: empty catch wrapping a sync operation that can't throw ──

export function deduplicate<T>(items: T[]): T[] {
  try {
    return [...new Set(items)]
  } catch {
    // Set operations can't throw
  }
  return []
}

// ── D3: exposes function for excessive mocking ──

export interface FilterOptions {
  status?: string
  search?: string
  sortBy?: 'date' | 'name'
  page?: number
}

export async function fetchFilteredItems(options: FilterOptions): Promise<string[]> {
  const params = new URLSearchParams()
  if (options.status) params.set('status', options.status)
  if (options.search) params.set('q', options.search)
  if (options.sortBy) params.set('sort', options.sortBy)
  if (options.page) params.set('page', String(options.page))

  const res = await fetch(`/api/items?${params}`)
  return res.json()
}
