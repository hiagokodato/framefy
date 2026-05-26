import { useSearchParams } from 'react-router-dom'

import { MovieCard } from '@/features/movies/components/MovieCard'
import { MovieCardSkeleton } from '@/features/movies/components/MovieCardSkeleton'
import { useSearchMovies } from '@/hooks/useSearchMovies'
import { TmdbApiError } from '@/services/tmdb'

export function SearchPage() {
  const [params] = useSearchParams()
  const q = (params.get('q') || '').trim()

  const { data, isLoading, isError, error } = useSearchMovies({ query: q })

  return (
    <div className="space-y-6">
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
        <div className="flex flex-wrap gap-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <MovieCardSkeleton key={i} />
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
        <div className="flex flex-wrap gap-3">
          {data.results.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : null}

      {data && data.results.length === 0 && !isLoading && !isError && q.length >= 2 ? (
        <p className="text-sm text-white/60">Nenhum filme encontrado.</p>
      ) : null}
    </div>
  )
}
