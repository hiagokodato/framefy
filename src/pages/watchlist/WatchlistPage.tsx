import { SavedMoviesGrid } from '@/features/library/components/SavedMoviesGrid'
import { useWatchlistStore } from '@/stores/watchlistStore'

export function WatchlistPage() {
  const movies = useWatchlistStore((state) => state.items)

  return (
    <div className="space-y-6">
      <div className="glass rounded-2xl p-6">
        <h1 className="text-xl font-semibold text-fg">Minha lista</h1>
        <p className="mt-1 text-sm text-fg/70">
          Filmes que você quer assistir depois. Salvos neste dispositivo.
        </p>
        {movies.length > 0 ? (
          <p className="mt-2 text-xs text-fg/50">
            {movies.length} {movies.length === 1 ? 'filme' : 'filmes'}
          </p>
        ) : null}
      </div>

      <SavedMoviesGrid
        movies={movies}
        emptyTitle="Sua lista está vazia"
        emptyDescription="Use o ícone de marcador em um filme para montar sua watchlist."
      />
    </div>
  )
}
