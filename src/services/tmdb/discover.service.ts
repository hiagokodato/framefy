import { getTmdbClient } from '@/services/tmdb/client'
import type { PaginatedResponse } from '@/types/tmdb/common'
import type { DiscoverFilters } from '@/types/tmdb/discover'
import type { Genre, GenreListResponse } from '@/types/tmdb/genre'
import type { Movie } from '@/types/tmdb/movie'

const client = () => getTmdbClient()

export async function fetchMovieGenres(): Promise<Genre[]> {
  const { data } = await client().get<GenreListResponse>('/genre/movie/list')
  return data.genres
}

export async function discoverMovies(filters: DiscoverFilters): Promise<PaginatedResponse<Movie>> {
  const params: Record<string, string | number | boolean> = {
    page: filters.page ?? 1,
    sort_by: filters.sortBy,
    include_adult: false,
  }

  if (filters.genreIds.length > 0) {
    params.with_genres = filters.genreIds.join(',')
  }

  if (filters.year) {
    params.primary_release_year = filters.year
  }

  if (filters.minRating && filters.minRating > 0) {
    params['vote_average.gte'] = filters.minRating
  }

  const { data } = await client().get<PaginatedResponse<Movie>>('/discover/movie', {
    params,
  })

  return data
}
