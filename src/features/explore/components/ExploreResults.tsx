import { useMemo } from 'react'

import { MoviesInfiniteGrid } from '@/features/movies/components/MoviesInfiniteGrid'
import { SearchEmptyState } from '@/features/search/components/SearchEmptyState'
import {
  useDiscoverMoviesInfinite,
  type DiscoverFiltersBase,
} from '@/hooks/useDiscoverMoviesInfinite'

type ExploreResultsProps = {
  filters: DiscoverFiltersBase
  emptyLabel: string
}

export function ExploreResults({ filters, emptyLabel }: ExploreResultsProps) {
  const { data, isLoading, isError, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useDiscoverMoviesInfinite(filters)

  const results = useMemo(() => data?.pages.flatMap((page) => page.results) ?? [], [data])

  const totalResults = data?.pages[0]?.total_results ?? 0
  const totalPages = data?.pages[0]?.total_pages ?? 0
  const loadedPages = data?.pages.length ?? 0

  return (
    <MoviesInfiniteGrid
      results={results}
      totalResults={totalResults}
      totalPages={totalPages}
      loadedPages={loadedPages}
      isLoading={isLoading}
      isError={isError}
      error={error}
      hasNextPage={Boolean(hasNextPage)}
      isFetchingNextPage={isFetchingNextPage}
      fetchNextPage={() => {
        void fetchNextPage()
      }}
      emptyState={
        <SearchEmptyState
          query={emptyLabel}
          title="Nenhum filme com esses filtros"
          description="Tente remover algum filtro ou escolher outros gêneros para ver mais resultados."
        />
      }
    />
  )
}
