import { AnimatePresence, motion } from 'framer-motion'
import { Home, X } from 'lucide-react'
import { NavLink } from 'react-router-dom'

import { Button } from '@/components/ui/button'

type MobileNavDrawerProps = {
  open: boolean
  onClose: () => void
}

export function MobileNavDrawer({ open, onClose }: MobileNavDrawerProps) {
  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.button
            type="button"
            aria-label="Fechar menu"
            className="fixed inset-0 z-50 bg-black/50"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.aside
            className="fixed left-0 top-0 z-50 h-dvh w-[86%] max-w-sm border-r border-white/10 bg-bg p-4 shadow-2xl"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', stiffness: 260, damping: 28 }}
          >
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold text-white">Navegação</div>
              <Button size="icon" variant="ghost" aria-label="Fechar" onClick={onClose}>
                <X className="size-5" />
              </Button>
            </div>

            <div className="mt-4 space-y-2">
              <NavLink
                to="/"
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-2xl px-3 py-3 text-sm ring-1 transition ${
                    isActive
                      ? 'bg-white/10 text-white ring-white/15'
                      : 'bg-transparent text-white/80 ring-white/10 hover:bg-white/5'
                  }`
                }
              >
                <Home className="size-5 text-white/70" />
                Início
              </NavLink>
            </div>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  )
}
