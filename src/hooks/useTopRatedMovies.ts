import { useQuery } from '@tanstack/react-query'

import { movieKeys } from '@/features/movies/queryKeys'
import { fetchTopRatedMovies } from '@/services/tmdb'

type UseTopRatedMoviesOptions = {
  page?: number
  enabled?: boolean
}

export function useTopRatedMovies(options: UseTopRatedMoviesOptions = {}) {
  const { page = 1, enabled = true } = options

  return useQuery({
    queryKey: movieKeys.topRated(page),
    queryFn: () => fetchTopRatedMovies({ page }),
    enabled,
  })
}
