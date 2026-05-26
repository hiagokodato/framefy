import { useQuery } from '@tanstack/react-query'

import { movieKeys } from '@/features/movies/queryKeys'
import { fetchMovieGenres } from '@/services/tmdb'

export function useMovieGenres() {
  return useQuery({
    queryKey: movieKeys.genres(),
    queryFn: fetchMovieGenres,
    staleTime: 1000 * 60 * 60 * 24,
  })
}
