import { Heart } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useFavoritesStore } from '@/stores/favoritesStore'
import { toSavedMovie, type SaveableMovie } from '@/types/saved-movie'

type FavoriteButtonProps = {
  movie: SaveableMovie
  showLabel?: boolean
  className?: string
}

export function FavoriteButton({ movie, showLabel = false, className }: FavoriteButtonProps) {
  const active = useFavoritesStore((state) => state.has(movie.id))
  const toggle = useFavoritesStore((state) => state.toggle)

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
      aria-label={active ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
      aria-pressed={active}
      onClick={handleClick}
    >
      <Heart className={cn('size-4', active && 'fill-current')} />
      {showLabel ? (active ? 'Nos favoritos' : 'Favoritar') : null}
    </Button>
  )
}
