import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

import { MOODS, type MoodId } from '../lib/moods'

type MoodPickerProps = {
  selectedId: MoodId
  onSelect: (id: MoodId) => void
}

export function MoodPicker({ selectedId, onSelect }: MoodPickerProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {MOODS.map((mood) => {
        const Icon = mood.icon
        const active = mood.id === selectedId

        return (
          <motion.button
            key={mood.id}
            type="button"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(mood.id)}
            className={cn(
              'rounded-2xl p-4 text-left ring-1 transition',
              active
                ? 'bg-primary/15 ring-primary/40 shadow-glow'
                : 'bg-fg/5 ring-border hover:bg-fg/10',
            )}
            aria-pressed={active}
          >
            <div className="flex items-start gap-3">
              <span
                className={cn(
                  'flex size-10 shrink-0 items-center justify-center rounded-xl ring-1',
                  active
                    ? 'bg-primary/20 ring-primary/30 text-primary'
                    : 'bg-fg/10 ring-border text-fg/80',
                )}
              >
                <Icon className="size-5" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold text-fg">{mood.label}</span>
                <span className="mt-1 block text-xs leading-relaxed text-fg/65">
                  {mood.description}
                </span>
              </span>
            </div>
          </motion.button>
        )
      })}
    </div>
  )
}
