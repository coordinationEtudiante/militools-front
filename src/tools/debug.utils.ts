import { getActivePinia, type Store } from 'pinia'
import { isRef, toRaw } from 'vue'

/**
 * Loose type for the stores used by the inspector.
 * A Pinia store exposes its id ($id), its state ($state) and all its
 * properties (state, getters, actions). We index by [key: string] so any
 * entry can be read/detected dynamically.
 */
export type DebugStore = Store & {
  $id: string
  $state: Record<string, unknown>
  [key: string]: unknown
}

/**
 * Result of a store inspection: state, getters and actions are separated
 * to feed three distinct tabs.
 */
export type StoreInspection = {
  state: Array<{ key: string; value: unknown }>
  getters: Array<{ key: string; value: unknown }>
  actions: Array<{ key: string; signature: string }>
}

// Keys reserved by Pinia ('$...') or implementation-related ('_...').
// They carry nothing displayable, so they are skipped during inspection.
const INTERNAL_KEYS = new Set([
  '$id',
  '$state',
  '$pinia',
  '$getters',
  '$isOptionsStore',
  '$onAction',
  '$patch',
  '$reset',
  '$subscribe',
  '$dispose',
  '_getters',
  '_hmrPayload',
  '_customProperties',
  '_mutations',
])

/**
 * Converts any value (reactive proxy, refs, Maps, Sets...) into a
 * JSON-serializable "plain" structure for display. A budget (nodes + depth)
 * bounds the work so a very large value (e.g. the actions array after a
 * reload) can never freeze the UI.
 */
export type PlainOptions = {
  maxDepth?: number
  maxNodes?: number
}

// Internal counters of the serialization budget
type PlainBudget = {
  depth: number
  nodes: number
  maxDepth: number
  maxNodes: number
}

function createBudget(options?: PlainOptions): PlainBudget {
  return {
    depth: 0,
    nodes: 0,
    maxDepth: options?.maxDepth ?? 12,
    maxNodes: options?.maxNodes ?? 5000,
  }
}

// Is the budget exceeded? Stop descending.
function overBudget(budget: PlainBudget): boolean {
  return budget.nodes >= budget.maxNodes || budget.depth >= budget.maxDepth
}

export function toPlain(
  value: unknown,
  seen = new WeakSet<object>(),
  budget: PlainBudget = createBudget(),
): unknown {
  // Guard rails: never exceed the budget, otherwise truncate cleanly.
  if (overBudget(budget)) {
    return '[…]'
  }
  budget.nodes++

  if (value === null || value === undefined) {
    return value
  }

  // A ref is unwrapped so its real value is displayed.
  if (isRef(value)) {
    return toPlain(value.value, seen, budget)
  }

  // Functions are rendered as text, never executed.
  if (typeof value === 'function') {
    return `[function ${value.name || 'anonymous'}]`
  }

  if (typeof value === 'bigint') {
    return `${value.toString()}n`
  }

  if (typeof value === 'symbol') {
    return String(value)
  }

  // Primitive values: return them as-is.
  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
    return value
  }

  if (value instanceof Date) {
    return value.toISOString()
  }

  if (value instanceof RegExp) {
    return value.toString()
  }

  // Work on the raw version: the reactive proxy is unwrapped.
  const raw = toRaw(value)

  if (raw instanceof Map) {
    budget.depth++
    const out = Array.from(raw.entries()).map(([key, entry]) => [
      toPlain(key, seen, budget),
      toPlain(entry, seen, budget),
    ])
    budget.depth--
    return out
  }

  if (raw instanceof Set) {
    budget.depth++
    const out = Array.from(raw.values()).map((entry) => toPlain(entry, seen, budget))
    budget.depth--
    return out
  }

  if (Array.isArray(raw)) {
    // Circular reference: cut it off to avoid an infinite loop.
    if (seen.has(raw)) {
      return '[Circular]'
    }
    seen.add(raw)
    budget.depth++
    const out = raw.map((item) => toPlain(item, seen, budget))
    budget.depth--
    return out
  }

  if (typeof raw === 'object') {
    if (seen.has(raw)) {
      return '[Circular]'
    }
    seen.add(raw)
    const result: Record<string, unknown> = {}
    budget.depth++
    for (const key of Object.keys(raw)) {
      result[key] = toPlain((raw as Record<string, unknown>)[key], seen, budget)
    }
    budget.depth--
    return result
  }

  return raw
}

// Maximum size of the text rendered in the tab (avoids a giant <pre>)
const MAX_SERIALIZED_CHARS = 20_000

/**
 * Serializes a value as indented JSON for display.
 * Never throws: every error falls back to a placeholder string.
 */
export function serializeValue(value: unknown): string {
  let plain: unknown
  try {
    plain = toPlain(value)
  } catch {
    plain = String(value)
  }

  let serialized: string
  try {
    serialized = JSON.stringify(plain, null, 2)
  } catch {
    try {
      serialized = String(plain)
    } catch {
      serialized = '[serialization failed]'
    }
  }

  // Explicit truncation for very large values.
  if (serialized.length > MAX_SERIALIZED_CHARS) {
    serialized = `${serialized.slice(0, MAX_SERIALIZED_CHARS)}\n[…\n→ (truncated)]`
  }

  return serialized
}

// Reserved/'private' keys that must not be displayed
function isInternalKey(key: string): boolean {
  return key.startsWith('$') || key.startsWith('_') || INTERNAL_KEYS.has(key)
}

/**
 * Extracts the "(param1, param2)" signature of a function for a concise
 * display without any side effect (it is never executed).
 */
function describeFunction(fn: () => unknown): string {
  const source = fn.toString()
  const match = source.match(/^(?:async\s+)?(?:function\s*\*?\s*)?\(?([^)]*)\)?\s*=>?/)
  if (!match) {
    return '(...)'
  }
  const params = match[1].trim()
  return params ? `(${params})` : '()'
}

/**
 * Inspects a store: each exported property is classified as state, getter
 * or action. State keys are derived from $state.
 */
export function inspectStore(storeValue: DebugStore): StoreInspection {
  const state = new Set<string>(Object.keys(storeValue.$state ?? {}))

  const stateValues: Array<{ key: string; value: unknown }> = []
  const getters: Array<{ key: string; value: unknown }> = []
  const actions: Array<{ key: string; signature: string }> = []

  for (const key of Object.keys(storeValue)) {
    if (isInternalKey(key)) {
      continue
    }

    const prop = (storeValue as Record<string, unknown>)[key]

    // A function is an action (by convention, never a getter).
    if (typeof prop === 'function') {
      actions.push({ key, signature: describeFunction(prop as () => unknown) })
      continue
    }

    if (state.has(key)) {
      stateValues.push({ key, value: prop })
    } else {
      getters.push({ key, value: prop })
    }
  }

  return { state: stateValues, getters, actions }
}

// Conventional "reload" actions detected by their name
const RELOAD_ACTION = /^(hydrate|reload|refresh|fetch|sync)/i

export function isLikelyReloadAction(key: string): boolean {
  return RELOAD_ACTION.test(key)
}

/**
 * Returns every store registered on the active Pinia instance.
 * This also shows stores not referenced in the STORE_DEBUG_CATALOG.
 */
export function getAllRegisteredStores(): DebugStore[] {
  const pinia = getActivePinia()
  if (!pinia) {
    return []
  }

  return Array.from((pinia as unknown as PiniaWithStores)._s.values()).map(
    (store) => store as unknown as DebugStore,
  )
}

// Typed access to the internal Pinia property holding the stores
type PiniaWithStores = {
  _s: Map<string, Store>
}
