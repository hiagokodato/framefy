import { motion } from 'framer-motion'
import { Menu, MoonStar, Search, Sun } from 'lucide-react'
import { Link, NavLink, useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useThemeMode } from '@/hooks/useThemeMode'
import { useThemeStore } from '@/stores/themeStore'

type AppNavbarProps = {
  onOpenMobileNav: () => void
}

export function AppNavbar({ onOpenMobileNav }: AppNavbarProps) {
  const mode = useThemeMode()
  const toggleTheme = useThemeStore((s) => s.toggle)
  const navigate = useNavigate()

  return (
    <header className="sticky top-0 z-50 border-b border-border">
      <div className="container-page">
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="glass my-3 flex items-center justify-between gap-3 rounded-2xl px-3 py-3 shadow-glow md:px-4"
        >
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
                <div className="text-xs text-fg/60">Filmes, do seu jeito</div>
              </div>
            </Link>
          </div>

          <div className="hidden w-full max-w-xl px-4 md:block">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-fg/40" />
              <Input
                placeholder="Buscar filmes…"
                className="pl-9"
                onKeyDown={(e) => {
                  if (e.key !== 'Enter') return
                  const q = (e.currentTarget.value || '').trim()
                  if (!q) return
                  navigate(`/search?q=${encodeURIComponent(q)}`)
                }}
              />
            </div>
          </div>

          <nav className="hidden items-center gap-2 md:flex">
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
          </nav>

          <div className="flex items-center gap-2">
            <Button size="icon" variant="ghost" aria-label="Alternar tema" onClick={toggleTheme}>
              {mode === 'dark' ? <MoonStar className="size-5" /> : <Sun className="size-5" />}
            </Button>
            <Button className="hidden sm:inline-flex" variant="default">
              Entrar
            </Button>
          </div>
        </motion.div>
      </div>
    </header>
  )
}
