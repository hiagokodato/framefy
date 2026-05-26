import { Loader2 } from 'lucide-react'
import { useRef, type ReactNode } from 'react'

import { Button } from '@/components/ui/button'
import { MovieCard } from '@/features/movies/components/MovieCard'
import { MovieCardSkeleton } from '@/features/movies/components/MovieCardSkeleton'
import { useInfiniteScrollTrigger } from '@/hooks/useInfiniteScrollTrigger'
import { TmdbApiError } from '@/services/tmdb'
import type { Movie } from '@/types/tmdb/movie'

type MoviesInfiniteGridProps = {
  results: Movie[]
  totalResults: number
  totalPages: number
  loadedPages: number
  isLoading: boolean
  isError: boolean
  error: unknown
  hasNextPage: boolean
  isFetchingNextPage: boolean
  fetchNextPage: () => void
  emptyState: ReactNode
  countLabel?: (shown: number, total: number) => string
}

export function MoviesInfiniteGrid({
  results,
  totalResults,
  totalPages,
  loadedPages,
  isLoading,
  isError,
  error,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  emptyState,
  countLabel,
}: MoviesInfiniteGridProps) {
  const loadMoreRef = useRef<HTMLDivElement>(null)

  useInfiniteScrollTrigger({
    targetRef: loadMoreRef,
    enabled: Boolean(hasNextPage),
    isLoading: isFetchingNextPage,
    onLoadMore: fetchNextPage,
  })

  if (isLoading) {
    return (
      <div className="flex flex-wrap gap-3">
        {Array.from({ length: 12 }).map((_, i) => (
          <MovieCardSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (isError) {
    return (
      <div className="glass rounded-2xl border border-primary/30 p-4 text-sm text-fg/80">
        {error instanceof TmdbApiError
          ? error.message
          : 'Não foi possível carregar os filmes. Tente novamente.'}
      </div>
    )
  }

  if (results.length === 0) {
    return emptyState
  }

  const label =
    countLabel?.(results.length, totalResults) ??
    `Exibindo ${results.length.toLocaleString()} de ${totalResults.toLocaleString()} filme(s)${
      totalPages > 1 ? ` · página ${loadedPages} de ${totalPages}` : ''
    }`

  return (
    <div className="space-y-6">
      <p className="text-sm text-fg/65">{label}</p>

      <div className="flex flex-wrap gap-3">
        {results.map((movie, index) => (
          <MovieCard key={`${movie.id}-${index}`} movie={movie} priority={index < 8} />
        ))}
      </div>

      {isFetchingNextPage ? (
        <div className="flex flex-wrap gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <MovieCardSkeleton key={i} />
          ))}
        </div>
      ) : null}

      <div ref={loadMoreRef} className="flex flex-col items-center gap-3 py-2">
        {hasNextPage ? (
          <Button
            variant="default"
            className="min-w-[200px]"
            disabled={isFetchingNextPage}
            onClick={fetchNextPage}
          >
            {isFetchingNextPage ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Carregando…
              </>
            ) : (
              'Carregar mais filmes'
            )}
          </Button>
        ) : (
          <p className="text-xs text-fg/50">Você viu todos os resultados disponíveis.</p>
        )}
      </div>
    </div>
  )
}
