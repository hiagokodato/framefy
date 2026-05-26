import { useQuery } from '@tanstack/react-query'

import { movieKeys } from '@/features/movies/queryKeys'
import { searchMovies } from '@/services/tmdb'

type UseSearchMoviesOptions = {
  query: string
  page?: number
  enabled?: boolean
  minLength?: number
}

export function useSearchMovies(options: UseSearchMoviesOptions) {
  const { query, page = 1, enabled = true, minLength = 2 } = options
  const trimmed = query.trim()

  return useQuery({
    queryKey: movieKeys.search(trimmed, page),
    queryFn: () => searchMovies(trimmed, page),
    enabled: enabled && trimmed.length >= minLength,
  })
}
