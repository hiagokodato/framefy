import { getTmdbClient } from '@/services/tmdb/client'
import type { PaginatedResponse, TrendingTimeWindow } from '@/types/tmdb/common'
import type { Movie, MovieDetails, MovieListParams } from '@/types/tmdb/movie'

const client = () => getTmdbClient()

export async function fetchTrendingMovies(
  timeWindow: TrendingTimeWindow = 'day',
  page = 1,
): Promise<PaginatedResponse<Movie>> {
  const { data } = await client().get<PaginatedResponse<Movie>>(`/trending/movie/${timeWindow}`, {
    params: { page },
  })
  return data
}

export async function fetchTopRatedMovies(
  params: MovieListParams = {},
): Promise<PaginatedResponse<Movie>> {
  const { data } = await client().get<PaginatedResponse<Movie>>('/movie/top_rated', {
    params,
  })
  return data
}

export async function fetchUpcomingMovies(
  params: MovieListParams = {},
): Promise<PaginatedResponse<Movie>> {
  const { data } = await client().get<PaginatedResponse<Movie>>('/movie/upcoming', {
    params,
  })
  return data
}

export async function fetchNowPlayingMovies(
  params: MovieListParams = {},
): Promise<PaginatedResponse<Movie>> {
  const { data } = await client().get<PaginatedResponse<Movie>>('/movie/now_playing', {
    params,
  })
  return data
}

export async function fetchMovieDetails(movieId: number): Promise<MovieDetails> {
  const { data } = await client().get<MovieDetails>(`/movie/${movieId}`)
  return data
}

export async function searchMovies(query: string, page = 1): Promise<PaginatedResponse<Movie>> {
  const { data } = await client().get<PaginatedResponse<Movie>>('/search/movie', {
    params: { query, page, include_adult: false },
  })
  return data
}
