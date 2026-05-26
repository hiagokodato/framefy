import { motion } from 'framer-motion'
import { Outlet } from 'react-router-dom'

export function RootLayout() {
  return (
    <div className="min-h-dvh">
      <header className="sticky top-0 z-50 border-b border-white/10">
        <div className="container-page">
          <div className="glass my-3 flex items-center justify-between rounded-2xl px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="size-9 rounded-xl bg-white/10 ring-1 ring-white/10" />
              <div className="leading-tight">
                <div className="text-sm font-semibold tracking-wide text-white">Framefy</div>
                <div className="text-xs text-white/60">Filmes, do seu jeito</div>
              </div>
            </div>

            <div className="hidden w-full max-w-md px-6 md:block">
              <div className="flex h-10 items-center rounded-xl bg-white/5 px-3 ring-1 ring-white/10">
                <div className="text-xs text-white/50">Buscar (em breve)</div>
              </div>
            </div>

            <nav className="flex items-center gap-2">
              <button
                type="button"
                className="rounded-xl bg-white/5 px-3 py-2 text-xs text-white/80 ring-1 ring-white/10 transition hover:bg-white/10"
              >
                Entrar
              </button>
            </nav>
          </div>
        </div>
      </header>

      <motion.main
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="container-page py-10"
      >
        <Outlet />
      </motion.main>
    </div>
  )
}
