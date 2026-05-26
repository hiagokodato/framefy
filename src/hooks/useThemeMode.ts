import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect'
import { useThemeStore } from '@/stores/themeStore'

export function useThemeMode() {
  const mode = useThemeStore((s) => s.mode)

  useIsomorphicLayoutEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', mode === 'dark')
    root.classList.toggle('light', mode === 'light')
  }, [mode])

  return mode
}
