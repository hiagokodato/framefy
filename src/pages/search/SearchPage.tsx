import { useSearchParams } from 'react-router-dom'

import { useSearchMovies } from '@/hooks/useSearchMovies'
import { TmdbApiError } from '@/services/tmdb'
import { getTmdbImageUrl } from '@/utils/tmdbImages'

export function SearchPage() {
  const [params] = useSearchParams()
  const q = (params.get('q') || '').trim()

  const { data, isLoading, isError, error } = useSearchMovies({ query: q })

  return (
    <div className="space-y-4">
      <div className="glass rounded-2xl p-6">
        <div className="text-sm font-semibold text-white">Busca</div>
        <div className="mt-1 text-sm text-white/70">
          Resultados para: <span className="text-white">{q || '(digite um termo na navbar)'}</span>
        </div>
      </div>

      {q.length < 2 ? (
        <p className="text-sm text-white/60">Digite pelo menos 2 caracteres para buscar.</p>
      ) : null}

      {isLoading ? (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-28 animate-pulse rounded-2xl bg-white/5 ring-1 ring-white/10"
            />
          ))}
        </div>
      ) : null}

      {isError ? (
        <div className="glass rounded-2xl border border-primary/30 p-4 text-sm text-white/80">
          {error instanceof TmdbApiError
            ? error.message
            : 'Não foi possível buscar filmes. Tente novamente.'}
        </div>
      ) : null}

      {data && data.results.length > 0 ? (
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {data.results.map((movie) => {
            const poster = getTmdbImageUrl(movie.poster_path, 'w342')
            return (
              <li
                key={movie.id}
                className="glass flex gap-3 rounded-2xl p-3 transition hover:bg-white/[0.07]"
              >
                <div className="size-20 shrink-0 overflow-hidden rounded-xl bg-white/5 ring-1 ring-white/10">
                  {poster ? (
                    <img src={poster} alt="" className="size-full object-cover" loading="lazy" />
                  ) : null}
                </div>
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold text-white">{movie.title}</div>
                  <div className="mt-1 text-xs text-white/60">
                    {movie.release_date?.slice(0, 4) || '—'} · ★ {movie.vote_average.toFixed(1)}
                  </div>
                  <p className="mt-2 line-clamp-2 text-xs text-white/70">{movie.overview}</p>
                </div>
              </li>
            )
          })}
        </ul>
      ) : null}

      {data && data.results.length === 0 && !isLoading && !isError && q.length >= 2 ? (
        <p className="text-sm text-white/60">Nenhum filme encontrado.</p>
      ) : null}
    </div>
  )
}
