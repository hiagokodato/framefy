import { useInfiniteQuery } from '@tanstack/react-query'

import { movieKeys } from '@/features/movies/queryKeys'
import { discoverMovies } from '@/services/tmdb'
import type { DiscoverFilters } from '@/types/tmdb/discover'

export type DiscoverFiltersBase = Omit<DiscoverFilters, 'page'>

export function useDiscoverMoviesInfinite(filters: DiscoverFiltersBase) {
  return useInfiniteQuery({
    queryKey: movieKeys.discoverInfinite(filters),
    queryFn: ({ pageParam }) => discoverMovies({ ...filters, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
  })
}
