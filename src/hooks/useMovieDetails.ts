import { useQuery } from '@tanstack/react-query'

import { movieKeys } from '@/features/movies/queryKeys'
import { fetchMovieDetails } from '@/services/tmdb'

type UseMovieDetailsOptions = {
  movieId: number
  enabled?: boolean
}

export function useMovieDetails({ movieId, enabled = true }: UseMovieDetailsOptions) {
  return useQuery({
    queryKey: movieKeys.details(movieId),
    queryFn: () => fetchMovieDetails(movieId),
    enabled: enabled && movieId > 0,
  })
}
