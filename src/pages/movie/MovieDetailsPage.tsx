import { motion } from 'framer-motion'
import { ArrowLeft, Star } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'

import { MovieSaveActions } from '@/features/library/components/MovieSaveActions'
import { MovieCard } from '@/features/movies/components/MovieCard'
import { MovieRow } from '@/features/movies/components/MovieRow'
import { useMovieDetails } from '@/hooks/useMovieDetails'
import { TmdbApiError } from '@/services/tmdb'
import { formatRuntime, getReleaseYear, getYoutubeTrailerKey } from '@/utils/movie'
import { getTmdbImageUrl } from '@/utils/tmdbImages'

import { MovieDetailsSkeleton } from './MovieDetailsSkeleton'

export function MovieDetailsPage() {
  const { id } = useParams()
  const movieId = Number(id)
  const { data, isLoading, isError, error } = useMovieDetails({
    movieId,
    enabled: Number.isFinite(movieId) && movieId > 0,
  })

  if (!Number.isFinite(movieId) || movieId <= 0) {
    return <div className="glass rounded-2xl p-6 text-sm text-white/80">Filme inválido.</div>
  }

  if (isLoading) return <MovieDetailsSkeleton />

  if (isError || !data) {
    return (
      <div className="space-y-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-white/70 transition hover:text-white"
        >
          <ArrowLeft className="size-4" />
          Voltar
        </Link>
        <div className="glass rounded-2xl border border-primary/30 p-6 text-sm text-white/80">
          {error instanceof TmdbApiError
            ? error.message
            : 'Não foi possível carregar os detalhes do filme.'}
        </div>
      </div>
    )
  }

  const backdrop = getTmdbImageUrl(data.backdrop_path, 'w1280')
  const poster = getTmdbImageUrl(data.poster_path, 'w500')
  const year = getReleaseYear(data.release_date)
  const runtime = formatRuntime(data.runtime)
  const trailerKey = getYoutubeTrailerKey(data.videos?.results)
  const cast = (data.credits?.cast ?? []).slice(0, 12)
  const recommendations = data.recommendations?.results?.slice(0, 12) ?? []

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="space-y-10"
    >
      <div className="relative -mx-4 overflow-hidden sm:-mx-6 lg:-mx-8">
        <div className="relative h-[46vh] min-h-[300px] w-full">
          {backdrop ? (
            <img src={backdrop} alt="" className="size-full object-cover" />
          ) : (
            <div className="size-full bg-white/5" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/70 to-bg/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-bg/80 via-transparent to-transparent" />

          <div className="absolute left-4 top-4 sm:left-6 lg:left-8">
            <Link
              to="/"
              className="glass inline-flex items-center gap-2 rounded-xl px-3 py-2 text-xs text-white/90 transition hover:bg-white/10"
            >
              <ArrowLeft className="size-4" />
              Voltar
            </Link>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end">
              {poster ? (
                <img
                  src={poster}
                  alt={data.title}
                  className="hidden w-36 shrink-0 rounded-2xl shadow-glow ring-1 ring-white/15 sm:block md:w-44"
                />
              ) : null}

              <div className="min-w-0 space-y-3">
                <p className="text-xs font-medium tracking-[0.2em] text-white/60">FILME</p>
                <h1 className="text-balance text-3xl font-semibold tracking-tight text-white md:text-5xl">
                  {data.title}
                </h1>
                {data.tagline ? (
                  <p className="text-sm italic text-white/70 md:text-base">{data.tagline}</p>
                ) : null}

                <div className="flex flex-wrap items-center gap-2 text-sm text-white/75">
                  <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-1 ring-1 ring-white/10">
                    <Star className="size-3.5 fill-primary text-primary" />
                    {data.vote_average.toFixed(1)}
                    <span className="text-white/50">({data.vote_count.toLocaleString()})</span>
                  </span>
                  <span>{year}</span>
                  {runtime ? <span>· {runtime}</span> : null}
                  {data.status ? <span>· {data.status}</span> : null}
                </div>

                <div className="flex flex-wrap gap-2">
                  {data.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="rounded-full bg-white/5 px-3 py-1 text-xs text-white/80 ring-1 ring-white/10"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>

                <MovieSaveActions movie={data} showLabel className="pt-1" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {trailerKey ? (
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-white">Trailer</h2>
          <div className="aspect-video overflow-hidden rounded-2xl ring-1 ring-white/10 shadow-glow">
            <iframe
              title={`Trailer — ${data.title}`}
              src={`https://www.youtube.com/embed/${trailerKey}?rel=0`}
              className="size-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </section>
      ) : null}

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-white">Sinopse</h2>
        <p className="max-w-3xl text-pretty text-sm leading-relaxed text-white/75 md:text-base">
          {data.overview || 'Sinopse indisponível.'}
        </p>
      </section>

      {cast.length > 0 ? (
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-white">Elenco</h2>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {cast.map((person) => {
              const profile = getTmdbImageUrl(person.profile_path, 'w185')
              return (
                <div
                  key={person.id}
                  className="w-28 shrink-0 rounded-2xl bg-white/[0.03] p-2 ring-1 ring-white/10"
                >
                  <div className="aspect-[2/3] overflow-hidden rounded-xl bg-white/5">
                    {profile ? (
                      <img
                        src={profile}
                        alt={person.name}
                        className="size-full object-cover"
                        loading="lazy"
                      />
                    ) : null}
                  </div>
                  <p className="mt-2 truncate text-xs font-medium text-white">{person.name}</p>
                  <p className="truncate text-[11px] text-white/60">{person.character}</p>
                </div>
              )
            })}
          </div>
        </section>
      ) : null}

      {recommendations.length > 0 ? (
        <MovieRow title="Recomendações">
          {recommendations.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </MovieRow>
      ) : null}
    </motion.div>
  )
}
