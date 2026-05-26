import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import { Link } from 'react-router-dom'

import { MovieSaveActions } from '@/features/library/components/MovieSaveActions'
import { cn } from '@/lib/utils'
import type { Movie } from '@/types/tmdb/movie'
import { getReleaseYear } from '@/utils/movie'
import { getTmdbImageUrl } from '@/utils/tmdbImages'

type MovieCardProps = {
  movie: Movie
  className?: string
  priority?: boolean
}

export function MovieCard({ movie, className, priority = false }: MovieCardProps) {
  const poster = getTmdbImageUrl(movie.poster_path, 'w500')
  const year = getReleaseYear(movie.release_date)

  return (
    <div className={cn('group relative shrink-0', className)}>
      <div className="absolute left-2 top-2 z-20 flex flex-col gap-1 opacity-100 transition sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100">
        <MovieSaveActions movie={movie} />
      </div>

      <Link to={`/movie/${movie.id}`} className="block">
      <motion.article
        whileHover={{ y: -6 }}
        transition={{ type: 'spring', stiffness: 320, damping: 26 }}
        className="relative aspect-[2/3] w-[140px] overflow-hidden rounded-2xl bg-white/5 ring-1 ring-white/10 shadow-glow sm:w-[160px]"
      >
        {poster ? (
          <img
            src={poster}
            alt={movie.title}
            loading={priority ? 'eager' : 'lazy'}
            className="size-full object-cover transition duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex size-full items-center justify-center bg-white/5 text-xs text-white/40">
            Sem poster
          </div>
        )}

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-90" />

        <div className="absolute right-2 top-2 flex items-center gap-1 rounded-full bg-black/60 px-2 py-1 text-[11px] font-medium text-white ring-1 ring-white/10 backdrop-blur-sm">
          <Star className="size-3 fill-primary text-primary" />
          {movie.vote_average.toFixed(1)}
        </div>

        <div className="absolute inset-x-0 bottom-0 p-3">
          <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-white">
            {movie.title}
          </h3>
          <p className="mt-1 text-xs text-white/65">{year}</p>
        </div>

        <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/0 transition group-hover:ring-white/20" />
      </motion.article>
      </Link>
    </div>
  )
}
