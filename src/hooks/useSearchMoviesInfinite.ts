import { useInfiniteQuery } from '@tanstack/react-query'

import { movieKeys } from '@/features/movies/queryKeys'
import { searchMovies } from '@/services/tmdb'

type UseSearchMoviesInfiniteOptions = {
  query: string
  enabled?: boolean
  minLength?: number
}

export function useSearchMoviesInfinite(options: UseSearchMoviesInfiniteOptions) {
  const { query, enabled = true, minLength = 2 } = options
  const trimmed = query.trim()

  return useInfiniteQuery({
    queryKey: movieKeys.searchInfinite(trimmed),
    queryFn: ({ pageParam }) => searchMovies(trimmed, pageParam),
    initialPageParam: 1,
    enabled: enabled && trimmed.length >= minLength,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
  })
}
