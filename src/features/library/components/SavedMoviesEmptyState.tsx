import { Link } from 'react-router-dom'

import { buttonVariants } from '@/components/ui/button-variants'
import { cn } from '@/lib/utils'

type SavedMoviesEmptyStateProps = {
  title: string
  description: string
}

export function SavedMoviesEmptyState({ title, description }: SavedMoviesEmptyStateProps) {
  return (
    <div className="glass rounded-2xl p-8 text-center">
      <h2 className="text-lg font-semibold text-fg">{title}</h2>
      <p className="mx-auto mt-2 max-w-md text-sm text-fg/70">{description}</p>
      <Link
        to="/explore"
        className={cn(buttonVariants({ variant: 'primary', size: 'md' }), 'mt-5')}
      >
        Explorar filmes
      </Link>
    </div>
  )
}
