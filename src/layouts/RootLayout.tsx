import { AnimatePresence, motion } from 'framer-motion'
import { Suspense, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

import { AppNavbar } from '@/components/navigation/AppNavbar'
import { MobileNavDrawer } from '@/components/navigation/MobileNavDrawer'
import { useThemeMode } from '@/hooks/useThemeMode'

export function RootLayout() {
  useThemeMode()
  const location = useLocation()
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  return (
    <div className="min-h-dvh">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-xl focus:bg-bg focus:px-3 focus:py-2 focus:text-sm focus:text-fg focus:ring-1 focus:ring-border"
      >
        Pular para o conteúdo
      </a>
      <AppNavbar onOpenMobileNav={() => setMobileNavOpen(true)} />
      <MobileNavDrawer open={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />

      <div className="container-page py-10">
        <AnimatePresence mode="wait">
          <motion.main
            id="main"
            key={location.pathname + location.search}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
          >
            <Suspense
              fallback={
                <div className="flex min-h-[40vh] items-center justify-center text-sm text-fg/60">
                  Carregando…
                </div>
              }
            >
              <Outlet />
            </Suspense>
          </motion.main>
        </AnimatePresence>
      </div>
    </div>
  )
}
