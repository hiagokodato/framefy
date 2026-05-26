import { Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'

import { buttonVariants } from '@/components/ui/button-variants'
import { cn } from '@/lib/utils'

import { DEFAULT_MOOD_ID } from '../lib/moods'

export function MoodHomeTeaser() {
  return (
    <section className="glass rounded-2xl p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <p className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.2em] text-primary">
            <Sparkles className="size-4" />
            NOVIDADE
          </p>
          <h2 className="text-xl font-semibold text-fg">Não sabe o que assistir?</h2>
          <p className="max-w-xl text-sm text-fg/70">
            Diga como você está e receba recomendações por humor — sem precisar de conta.
          </p>
        </div>
        <Link
          to={`/mood?mood=${DEFAULT_MOOD_ID}`}
          className={cn(buttonVariants({ variant: 'primary', size: 'md' }), 'shrink-0')}
        >
          Escolher humor
        </Link>
      </div>
    </section>
  )
}
