import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { applyThemeClass, resolveTheme, type ThemeMode, type ThemePreference } from '@/utils/theme'

export type { ThemeMode, ThemePreference }

type ThemeState = {
  preference: ThemePreference
  setPreference: (preference: ThemePreference) => void
  toggle: () => void
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      preference: 'system',
      setPreference: (preference) => set({ preference }),
      toggle: () => {
        const resolved = resolveTheme(get().preference)
        set({ preference: resolved === 'dark' ? 'light' : 'dark' })
      },
    }),
    {
      name: 'framefy.theme',
      version: 2,
      migrate: (persisted) => {
        const state = persisted as { preference?: ThemePreference; mode?: ThemeMode }
        if (state?.preference) return { preference: state.preference }
        if (state?.mode) return { preference: state.mode }
        return { preference: 'system' }
      },
      onRehydrateStorage: () => (state) => {
        if (!state) return
        applyThemeClass(resolveTheme(state.preference))
      },
    },
  ),
)
