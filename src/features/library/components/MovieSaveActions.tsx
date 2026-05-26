import { cn } from '@/lib/utils'
import type { SaveableMovie } from '@/types/saved-movie'

import { FavoriteButton } from './FavoriteButton'
import { WatchlistButton } from './WatchlistButton'

type MovieSaveActionsProps = {
  movie: SaveableMovie
  showLabel?: boolean
  className?: string
}

export function MovieSaveActions({ movie, showLabel = false, className }: MovieSaveActionsProps) {
  return (
    <div className={cn('flex flex-wrap items-center gap-2', className)}>
      <FavoriteButton movie={movie} showLabel={showLabel} />
      <WatchlistButton movie={movie} showLabel={showLabel} />
    </div>
  )
}
