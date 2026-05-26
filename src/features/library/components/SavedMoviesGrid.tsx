import { MovieCard } from '@/features/movies/components/MovieCard'
import { savedMovieToCardMovie, type SavedMovie } from '@/types/saved-movie'

import { SavedMoviesEmptyState } from './SavedMoviesEmptyState'

type SavedMoviesGridProps = {
  movies: SavedMovie[]
  emptyTitle: string
  emptyDescription: string
}

export function SavedMoviesGrid({ movies, emptyTitle, emptyDescription }: SavedMoviesGridProps) {
  if (movies.length === 0) {
    return <SavedMoviesEmptyState title={emptyTitle} description={emptyDescription} />
  }

  return (
    <div className="flex flex-wrap gap-3">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={savedMovieToCardMovie(movie)} />
      ))}
    </div>
  )
}
