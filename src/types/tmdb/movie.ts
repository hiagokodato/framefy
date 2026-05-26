export type Movie = {
  id: number
  title: string
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  release_date: string
  vote_average: number
  vote_count: number
  popularity: number
  adult: boolean
  original_language: string
  original_title: string
  genre_ids: number[]
}

export type Genre = {
  id: number
  name: string
}

export type MovieDetails = Movie & {
  genres: Genre[]
  runtime: number | null
  status: string
  tagline: string | null
  budget: number
  revenue: number
  homepage: string | null
  imdb_id: string | null
}

export type MovieListParams = {
  page?: number
  region?: string
}
