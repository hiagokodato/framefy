import { SavedMoviesGrid } from '@/features/library/components/SavedMoviesGrid'
import { useFavoritesStore } from '@/stores/favoritesStore'

export function FavoritesPage() {
  const movies = useFavoritesStore((state) => state.items)

  return (
    <div className="space-y-6">
      <div className="glass rounded-2xl p-6">
        <h1 className="text-xl font-semibold text-fg">Favoritos</h1>
        <p className="mt-1 text-sm text-fg/70">
          Filmes que você marcou como favoritos. Salvos neste dispositivo.
        </p>
        {movies.length > 0 ? (
          <p className="mt-2 text-xs text-fg/50">
            {movies.length} {movies.length === 1 ? 'filme' : 'filmes'}
          </p>
        ) : null}
      </div>

      <SavedMoviesGrid
        movies={movies}
        emptyTitle="Nenhum favorito ainda"
        emptyDescription="Toque no coração em um filme para adicioná-lo aqui."
      />
    </div>
  )
}
