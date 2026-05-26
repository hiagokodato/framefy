import { useQuery } from '@tanstack/react-query'

import { movieKeys } from '@/features/movies/queryKeys'
import { fetchNowPlayingMovies } from '@/services/tmdb'

type UseNowPlayingMoviesOptions = {
  page?: number
  enabled?: boolean
}

export function useNowPlayingMovies(options: UseNowPlayingMoviesOptions = {}) {
  const { page = 1, enabled = true } = options

  return useQuery({
    queryKey: movieKeys.nowPlaying(page),
    queryFn: () => fetchNowPlayingMovies({ page }),
    enabled,
  })
}
