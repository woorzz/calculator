export type HistoryEntry = { expression: string; result: string }

const STORAGE_KEY = 'calc-history'

export function getHistory(): HistoryEntry[] {
  if (typeof localStorage === 'undefined') return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function saveHistory(history: HistoryEntry[]) {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history))
  }
}

export function clearHistory() {
  if (typeof localStorage !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY)
  }
}
