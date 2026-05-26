import { Loader2 } from 'lucide-react'
import { useMemo, useRef } from 'react'

import { Button } from '@/components/ui/button'
import { MovieCard } from '@/features/movies/components/MovieCard'
import { MovieCardSkeleton } from '@/features/movies/components/MovieCardSkeleton'
import { SearchEmptyState } from '@/features/search/components/SearchEmptyState'
import {
  useDiscoverMoviesInfinite,
  type DiscoverFiltersBase,
} from '@/hooks/useDiscoverMoviesInfinite'
import { useInfiniteScrollTrigger } from '@/hooks/useInfiniteScrollTrigger'
import { TmdbApiError } from '@/services/tmdb'

type ExploreResultsProps = {
  filters: DiscoverFiltersBase
  emptyLabel: string
}

export function ExploreResults({ filters, emptyLabel }: ExploreResultsProps) {
  const loadMoreRef = useRef<HTMLDivElement>(null)

  const { data, isLoading, isError, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useDiscoverMoviesInfinite(filters)

  const results = useMemo(() => data?.pages.flatMap((page) => page.results) ?? [], [data])

  const totalResults = data?.pages[0]?.total_results ?? 0
  const totalPages = data?.pages[0]?.total_pages ?? 0
  const loadedPages = data?.pages.length ?? 0

  useInfiniteScrollTrigger({
    targetRef: loadMoreRef,
    enabled: Boolean(hasNextPage),
    isLoading: isFetchingNextPage,
    onLoadMore: () => {
      void fetchNextPage()
    },
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
    return (
      <SearchEmptyState
        query={emptyLabel}
        title="Nenhum filme com esses filtros"
        description="Tente remover algum filtro ou escolher outros gêneros para ver mais resultados."
      />
    )
  }

  return (
    <div className="space-y-6">
      <p className="text-sm text-fg/65">
        Exibindo {results.length.toLocaleString()} de {totalResults.toLocaleString()} filme(s)
        {totalPages > 1 ? ` · página ${loadedPages} de ${totalPages}` : ''}
      </p>

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
            onClick={() => void fetchNextPage()}
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
