import type { Movie } from '@/types/tmdb/movie'

export type SavedMovie = {
  id: number
  title: string
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  release_date: string
  vote_average: number
}

export type SaveableMovie = Pick<
  Movie,
  'id' | 'title' | 'overview' | 'poster_path' | 'backdrop_path' | 'release_date' | 'vote_average'
>

export function toSavedMovie(movie: SaveableMovie): SavedMovie {
  return {
    id: movie.id,
    title: movie.title,
    overview: movie.overview,
    poster_path: movie.poster_path,
    backdrop_path: movie.backdrop_path,
    release_date: movie.release_date,
    vote_average: movie.vote_average,
  }
}

export function savedMovieToCardMovie(saved: SavedMovie): Movie {
  return {
    ...saved,
    vote_count: 0,
    popularity: 0,
    adult: false,
    original_language: '',
    original_title: saved.title,
    genre_ids: [],
  }
}
