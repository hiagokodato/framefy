import { useQuery } from '@tanstack/react-query'

import { movieKeys } from '@/features/movies/queryKeys'
import { fetchUpcomingMovies } from '@/services/tmdb'

type UseUpcomingMoviesOptions = {
  page?: number
  enabled?: boolean
}

export function useUpcomingMovies(options: UseUpcomingMoviesOptions = {}) {
  const { page = 1, enabled = true } = options

  return useQuery({
    queryKey: movieKeys.upcoming(page),
    queryFn: () => fetchUpcomingMovies({ page }),
    enabled,
  })
}
