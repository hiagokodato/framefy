import { useQuery } from '@tanstack/react-query'

import { movieKeys } from '@/features/movies/queryKeys'
import { fetchTrendingMovies } from '@/services/tmdb'
import type { TrendingTimeWindow } from '@/types/tmdb/common'

type UseTrendingMoviesOptions = {
  timeWindow?: TrendingTimeWindow
  page?: number
  enabled?: boolean
}

export function useTrendingMovies(options: UseTrendingMoviesOptions = {}) {
  const { timeWindow = 'day', page = 1, enabled = true } = options

  return useQuery({
    queryKey: movieKeys.trending(timeWindow, page),
    queryFn: () => fetchTrendingMovies(timeWindow, page),
    enabled,
  })
}
