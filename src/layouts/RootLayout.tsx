import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
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
      <AppNavbar onOpenMobileNav={() => setMobileNavOpen(true)} />
      <MobileNavDrawer open={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />

      <div className="container-page py-10">
        <AnimatePresence mode="wait">
          <motion.main
            key={location.pathname + location.search}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
          >
            <Outlet />
          </motion.main>
        </AnimatePresence>
      </div>
    </div>
  )
}
