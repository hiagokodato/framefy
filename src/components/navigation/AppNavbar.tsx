import { motion } from 'framer-motion'
import { Menu, MoonStar, Sun } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { SearchAutocomplete } from '@/features/search/components/SearchAutocomplete'
import { useThemeMode } from '@/hooks/useThemeMode'
import { useThemeStore } from '@/stores/themeStore'

type AppNavbarProps = {
  onOpenMobileNav: () => void
}

export function AppNavbar({ onOpenMobileNav }: AppNavbarProps) {
  const mode = useThemeMode()
  const toggleTheme = useThemeStore((s) => s.toggle)

  return (
    <header className="sticky top-0 z-50 border-b border-border">
      <div className="container-page">
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="glass my-3 rounded-2xl px-3 py-3 shadow-glow md:px-4"
        >
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Button
                className="md:hidden"
                size="icon"
                variant="ghost"
                aria-label="Abrir menu"
                onClick={onOpenMobileNav}
              >
                <Menu className="size-5" />
              </Button>

              <Link to="/" className="flex items-center gap-3">
                <div className="size-9 rounded-xl bg-fg/10 ring-1 ring-border" />
                <div className="leading-tight">
                  <div className="text-sm font-semibold tracking-wide text-fg">Framefy</div>
                  <div className="hidden text-xs text-fg/60 sm:block">Filmes, do seu jeito</div>
                </div>
              </Link>
            </div>

            <div className="hidden w-full max-w-xl flex-1 px-4 md:block">
              <SearchAutocomplete />
            </div>

            <nav className="hidden items-center gap-2 lg:flex">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `rounded-xl px-3 py-2 text-xs ring-1 transition ${
                    isActive
                      ? 'bg-fg/10 text-fg ring-border'
                      : 'bg-transparent text-fg/70 ring-transparent hover:bg-fg/5 hover:text-fg'
                  }`
                }
              >
                Início
              </NavLink>
              <NavLink
                to="/explore"
                className={({ isActive }) =>
                  `rounded-xl px-3 py-2 text-xs ring-1 transition ${
                    isActive
                      ? 'bg-fg/10 text-fg ring-border'
                      : 'bg-transparent text-fg/70 ring-transparent hover:bg-fg/5 hover:text-fg'
                  }`
                }
              >
                Explorar
              </NavLink>
              <NavLink
                to="/mood"
                className={({ isActive }) =>
                  `rounded-xl px-3 py-2 text-xs ring-1 transition ${
                    isActive
                      ? 'bg-fg/10 text-fg ring-border'
                      : 'bg-transparent text-fg/70 ring-transparent hover:bg-fg/5 hover:text-fg'
                  }`
                }
              >
                Humor
              </NavLink>
              <NavLink
                to="/favorites"
                className={({ isActive }) =>
                  `rounded-xl px-3 py-2 text-xs ring-1 transition ${
                    isActive
                      ? 'bg-fg/10 text-fg ring-border'
                      : 'bg-transparent text-fg/70 ring-transparent hover:bg-fg/5 hover:text-fg'
                  }`
                }
              >
                Favoritos
              </NavLink>
              <NavLink
                to="/watchlist"
                className={({ isActive }) =>
                  `rounded-xl px-3 py-2 text-xs ring-1 transition ${
                    isActive
                      ? 'bg-fg/10 text-fg ring-border'
                      : 'bg-transparent text-fg/70 ring-transparent hover:bg-fg/5 hover:text-fg'
                  }`
                }
              >
                Lista
              </NavLink>
            </nav>

            <div className="flex items-center gap-2">
              <Button size="icon" variant="ghost" aria-label="Alternar tema" onClick={toggleTheme}>
                {mode === 'dark' ? <MoonStar className="size-5" /> : <Sun className="size-5" />}
              </Button>
            </div>
          </div>

          <div className="mt-3 md:hidden">
            <SearchAutocomplete />
          </div>
        </motion.div>
      </div>
    </header>
  )
}
