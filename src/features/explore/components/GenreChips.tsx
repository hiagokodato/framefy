import { cn } from '@/lib/utils'
import type { Genre } from '@/types/tmdb/genre'

type GenreChipsProps = {
  genres: Genre[]
  selectedIds: number[]
  onToggle: (genreId: number) => void
  isLoading?: boolean
}

export function GenreChips({ genres, selectedIds, onToggle, isLoading }: GenreChipsProps) {
  if (isLoading) {
    return (
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="h-9 w-24 animate-pulse rounded-full bg-fg/10" />
        ))}
      </div>
    )
  }

  return (
    <div className="flex flex-wrap gap-2">
      {genres.map((genre) => {
        const isSelected = selectedIds.includes(genre.id)

        return (
          <button
            key={genre.id}
            type="button"
            onClick={() => onToggle(genre.id)}
            className={cn(
              'rounded-full px-4 py-2 text-xs font-medium ring-1 transition',
              isSelected
                ? 'bg-primary text-white ring-primary hover:brightness-110'
                : 'bg-fg/5 text-fg/80 ring-border hover:bg-fg/10 hover:text-fg',
            )}
          >
            {genre.name}
          </button>
        )
      })}
    </div>
  )
}
