import { motion } from 'framer-motion'
import { Play, Star } from 'lucide-react'
import { Link } from 'react-router-dom'

import { buttonVariants } from '@/components/ui/button-variants'
import { cn } from '@/lib/utils'
import type { Movie } from '@/types/tmdb/movie'
import { getReleaseYear } from '@/utils/movie'
import { getTmdbImageUrl } from '@/utils/tmdbImages'

type HomeHeroProps = {
  movie?: Movie
  isLoading?: boolean
}

export function HomeHero({ movie, isLoading }: HomeHeroProps) {
  if (isLoading) {
    return (
      <div className="relative -mx-4 h-[52vh] min-h-[320px] animate-pulse overflow-hidden rounded-none bg-white/5 sm:-mx-6 lg:-mx-8" />
    )
  }

  if (!movie) return null

  const backdrop = getTmdbImageUrl(movie.backdrop_path, 'w1280')
  const year = getReleaseYear(movie.release_date)

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="relative -mx-4 overflow-hidden sm:-mx-6 lg:-mx-8"
    >
      <div className="relative h-[52vh] min-h-[320px] w-full">
        {backdrop ? (
          <img src={backdrop} alt="" className="size-full object-cover object-top" />
        ) : (
          <div className="size-full bg-white/5" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/75 to-bg/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-bg/90 via-bg/40 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8">
          <p className="text-xs font-medium tracking-[0.2em] text-primary">EM DESTAQUE</p>
          <h1 className="mt-2 max-w-3xl text-balance text-3xl font-semibold tracking-tight text-white md:text-5xl">
            {movie.title}
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-white/75">
            <span className="inline-flex items-center gap-1">
              <Star className="size-4 fill-primary text-primary" />
              {movie.vote_average.toFixed(1)}
            </span>
            <span>{year}</span>
          </div>
          <p className="mt-4 line-clamp-3 max-w-2xl text-sm leading-relaxed text-white/70 md:text-base">
            {movie.overview}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to={`/movie/${movie.id}`}
              className={cn(buttonVariants({ variant: 'primary', size: 'md' }))}
            >
              <Play className="size-4" />
              Ver detalhes
            </Link>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
