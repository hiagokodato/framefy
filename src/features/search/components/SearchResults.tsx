import { useMemo } from 'react'

import { MoviesInfiniteGrid } from '@/features/movies/components/MoviesInfiniteGrid'
import { SearchEmptyState } from '@/features/search/components/SearchEmptyState'
import { useSearchMoviesInfinite } from '@/hooks/useSearchMoviesInfinite'

type SearchResultsProps = {
  query: string
}

export function SearchResults({ query }: SearchResultsProps) {
  const { data, isLoading, isError, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSearchMoviesInfinite({ query })

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
      countLabel={(shown, total) =>
        `${shown.toLocaleString()} de ${total.toLocaleString()} resultado(s) para "${query}"${
          totalPages > 1 ? ` · página ${loadedPages} de ${totalPages}` : ''
        }`
      }
      emptyState={<SearchEmptyState query={query} />}
    />
  )
}
