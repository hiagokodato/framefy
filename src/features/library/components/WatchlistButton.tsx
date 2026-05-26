import { Bookmark } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useWatchlistStore } from '@/stores/watchlistStore'
import { toSavedMovie, type SaveableMovie } from '@/types/saved-movie'

type WatchlistButtonProps = {
  movie: SaveableMovie
  showLabel?: boolean
  className?: string
}

export function WatchlistButton({ movie, showLabel = false, className }: WatchlistButtonProps) {
  const active = useWatchlistStore((state) => state.has(movie.id))
  const toggle = useWatchlistStore((state) => state.toggle)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    event.stopPropagation()
    toggle(toSavedMovie(movie))
  }

  return (
    <Button
      type="button"
      size={showLabel ? 'sm' : 'icon'}
      variant={active ? 'primary' : 'ghost'}
      className={cn(
        !showLabel && 'bg-black/60 text-white ring-1 ring-white/10 backdrop-blur-sm hover:bg-black/70',
        className,
      )}
      aria-label={active ? 'Remover da lista' : 'Adicionar à lista'}
      aria-pressed={active}
      onClick={handleClick}
    >
      <Bookmark className={cn('size-4', active && 'fill-current')} />
      {showLabel ? (active ? 'Na lista' : 'Quero ver') : null}
    </Button>
  )
}
