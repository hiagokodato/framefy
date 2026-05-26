import { motion } from 'framer-motion'

import { MovieCard } from '@/features/movies/components/MovieCard'
import { MovieCardSkeleton } from '@/features/movies/components/MovieCardSkeleton'
import { MovieRow } from '@/features/movies/components/MovieRow'
import { TmdbApiError } from '@/services/tmdb'
import type { Movie } from '@/types/tmdb/movie'

type MovieCarouselSectionProps = {
  title: string
  movies?: Movie[]
  isLoading: boolean
  isError: boolean
  error?: Error | null
  animationDelay?: number
}

export function MovieCarouselSection({
  title,
  movies,
  isLoading,
  isError,
  error,
  animationDelay = 0,
}: MovieCarouselSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: animationDelay, ease: 'easeOut' }}
    >
      <MovieRow title={title}>
        {isLoading ? Array.from({ length: 8 }).map((_, i) => <MovieCardSkeleton key={i} />) : null}

        {!isLoading && isError ? (
          <p className="py-6 text-sm text-fg/60">
            {error instanceof TmdbApiError
              ? error.message
              : 'Não foi possível carregar esta seção.'}
          </p>
        ) : null}

        {!isLoading && !isError && movies?.length
          ? movies.map((movie, index) => (
              <MovieCard key={movie.id} movie={movie} priority={index < 2} />
            ))
          : null}

        {!isLoading && !isError && movies?.length === 0 ? (
          <p className="py-6 text-sm text-fg/60">Nenhum filme disponível.</p>
        ) : null}
      </MovieRow>
    </motion.div>
  )
}
