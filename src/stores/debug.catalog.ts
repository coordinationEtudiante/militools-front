import { useActionStore } from '@/stores/action.store'
import { useAreaStore } from '@/stores/area.store'
import { usePermStore } from '@/stores/perm.store'
import { useSearchCreditStore } from '@/stores/searchCredit.store'
import { useServerStore } from '@/stores/server.store'
import { useStatsStore } from '@/stores/stats.store'
import { useUserStore } from '@/stores/user.store'
import type { DebugStore } from '@/tools/debug.utils'

/**
 * A "reload unit" = one individual button.
 * - key: name of the action (function) to invoke on the store;
 * - label: i18n key of the displayed text;
 * - args: arguments passed to the action (e.g. hydrate(true)).
 */
export type DebugReloadUnit = {
  key: string
  label: string
  args?: unknown[]
}

/**
 * Description of a store for the debug page: how to access it and which
 * reload actions to propose.
 */
export type DebugStoreEntry = {
  storeId: string
  label: string
  getStore: () => DebugStore
  reloads: DebugReloadUnit[]
}

/**
 * Declarative catalog of the stores to display/reload.
 * The debug page consumes it as-is (nothing hard-coded elsewhere): adding
 * an entry here is enough to make the store and its buttons appear.
 */
export const STORE_DEBUG_CATALOG: DebugStoreEntry[] = [
  {
    storeId: 'user',
    label: 'debug.store.user',
    getStore: () => useUserStore() as unknown as DebugStore,
    // No dedicated reload action: the state is the display itself.
    reloads: [],
  },
  {
    storeId: 'server',
    label: 'debug.store.server',
    getStore: () => useServerStore() as unknown as DebugStore,
    reloads: [],
  },
  {
    storeId: 'perm',
    label: 'debug.store.perm',
    getStore: () => usePermStore() as unknown as DebugStore,
    reloads: [
      {
        key: 'hydrate',
        label: 'reload.permissions',
        args: [true], // force = true => re-fetch even if already hydrated
      },
    ],
  },
  {
    storeId: 'area',
    label: 'debug.store.area',
    getStore: () => useAreaStore() as unknown as DebugStore,
    reloads: [
      {
        key: 'hydrate',
        label: 'reload.area-info',
        args: [true],
      },
      {
        key: 'hydrate',
        label: 'reload.fields',
        args: [true],
      },
    ],
  },
  {
    storeId: 'action',
    label: 'debug.store.action',
    getStore: () => useActionStore() as unknown as DebugStore,
    reloads: [
      {
        key: 'reloadActions',
        label: 'reload.actions',
      },
    ],
  },
  {
    storeId: 'earchCreditStore',
    label: 'debug.store.search-credit',
    getStore: () => useSearchCreditStore() as unknown as DebugStore,
    reloads: [
      {
        key: 'fetchCredit',
        label: 'reload.credit',
      },
    ],
  },
  {
    storeId: 'StatsStore',
    label: 'debug.store.stats',
    getStore: () => useStatsStore() as unknown as DebugStore,
    reloads: [
      {
        key: 'fetchStats',
        label: 'reload.stats',
      },
    ],
  },
]
