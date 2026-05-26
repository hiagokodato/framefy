import { useQuery } from '@tanstack/react-query'

import { movieKeys } from '@/features/movies/queryKeys'
import { discoverMovies } from '@/services/tmdb'
import type { DiscoverFilters } from '@/types/tmdb/discover'

export function useDiscoverMovies(filters: DiscoverFilters) {
  return useQuery({
    queryKey: movieKeys.discover(filters),
    queryFn: () => discoverMovies(filters),
  })
}
