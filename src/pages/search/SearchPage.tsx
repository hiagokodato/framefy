import { useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'

import { MovieCard } from '@/features/movies/components/MovieCard'
import { MovieCardSkeleton } from '@/features/movies/components/MovieCardSkeleton'
import { SearchAutocomplete } from '@/features/search/components/SearchAutocomplete'
import { SearchEmptyState } from '@/features/search/components/SearchEmptyState'
import { useSearchMovies } from '@/hooks/useSearchMovies'
import { TmdbApiError } from '@/services/tmdb'

export function SearchPage() {
  const [params, setSearchParams] = useSearchParams()
  const urlQuery = (params.get('q') || '').trim()

  const handleQueryChange = useCallback(
    (query: string) => {
      if (!query) {
        setSearchParams({})
        return
      }
      setSearchParams({ q: query })
    },
    [setSearchParams],
  )

  const { data, isLoading, isFetching, isError, error } = useSearchMovies({
    query: urlQuery,
  })

  const isSearching = urlQuery.length >= 2 && (isLoading || isFetching)
  const hasResults = (data?.results.length ?? 0) > 0

  return (
    <div className="space-y-6">
      <div className="glass rounded-2xl p-6">
        <div className="text-sm font-semibold text-fg">Busca</div>
        <p className="mt-1 text-sm text-fg/70">
          Encontre filmes com sugestões em tempo real enquanto você digita.
        </p>
        <div className="mt-4">
          <SearchAutocomplete initialQuery={urlQuery} onQueryChange={handleQueryChange} />
        </div>
      </div>

      {urlQuery.length < 2 ? (
        <p className="text-sm text-fg/60">Digite pelo menos 2 caracteres para buscar.</p>
      ) : null}

      {isSearching ? (
        <div className="flex flex-wrap gap-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <MovieCardSkeleton key={i} />
          ))}
        </div>
      ) : null}

      {isError && urlQuery.length >= 2 ? (
        <div className="glass rounded-2xl border border-primary/30 p-4 text-sm text-fg/80">
          {error instanceof TmdbApiError
            ? error.message
            : 'Não foi possível buscar filmes. Tente novamente.'}
        </div>
      ) : null}

      {!isSearching && !isError && hasResults ? (
        <div className="space-y-4">
          <p className="text-sm text-fg/65">
            {data?.total_results ?? 0} resultado(s) para{' '}
            <span className="font-medium text-fg">"{urlQuery}"</span>
          </p>
          <div className="flex flex-wrap gap-3">
            {data?.results.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      ) : null}

      {!isSearching && !isError && urlQuery.length >= 2 && !hasResults ? (
        <SearchEmptyState query={urlQuery} />
      ) : null}
    </div>
  )
}
