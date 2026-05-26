import { useCallback, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'

import { MoodPicker } from '@/features/mood/components/MoodPicker'
import { DEFAULT_MOOD_ID, getMoodById, isMoodId, type MoodId } from '@/features/mood/lib/moods'
import { MoviesInfiniteGrid } from '@/features/movies/components/MoviesInfiniteGrid'
import { SearchEmptyState } from '@/features/search/components/SearchEmptyState'
import { useDiscoverMoviesInfinite } from '@/hooks/useDiscoverMoviesInfinite'

export function MoodPage() {
  const [params, setSearchParams] = useSearchParams()
  const moodParam = params.get('mood')
  const selectedId: MoodId = moodParam && isMoodId(moodParam) ? moodParam : DEFAULT_MOOD_ID
  const mood = getMoodById(selectedId) ?? getMoodById(DEFAULT_MOOD_ID)!

  const handleSelect = useCallback(
    (id: MoodId) => {
      setSearchParams({ mood: id })
    },
    [setSearchParams],
  )

  const { data, isLoading, isError, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useDiscoverMoviesInfinite(mood.filters)

  const results = useMemo(() => data?.pages.flatMap((page) => page.results) ?? [], [data])

  const totalResults = data?.pages[0]?.total_results ?? 0
  const totalPages = data?.pages[0]?.total_pages ?? 0
  const loadedPages = data?.pages.length ?? 0

  return (
    <div className="space-y-8">
      <div className="glass rounded-2xl p-6">
        <p className="text-xs font-medium tracking-[0.2em] text-fg/50">RECOMENDAÇÕES</p>
        <h1 className="mt-2 text-2xl font-semibold text-fg">Como você está hoje?</h1>
        <p className="mt-2 max-w-2xl text-sm text-fg/70">
          Escolha um humor e o Framefy monta uma seleção com base em gêneros e avaliações da TMDB.
        </p>
      </div>

      <MoodPicker selectedId={selectedId} onSelect={handleSelect} />

      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-fg">Para o humor “{mood.label}”</h2>
          <p className="mt-1 text-sm text-fg/65">{mood.description}</p>
        </div>

        <MoviesInfiniteGrid
          results={results}
          totalResults={totalResults}
          totalPages={totalPages}
          loadedPages={loadedPages}
          isLoading={isLoading}
          isError={isError}
          error={error}
          hasNextPage={Boolean(hasNextPage)}
          isFetchingNextPage={isFetchingNextPage}
          fetchNextPage={() => {
            void fetchNextPage()
          }}
          emptyState={
            <SearchEmptyState
              query={mood.label}
              title="Nenhum filme para este humor"
              description="Tente outro humor ou volte mais tarde — o catálogo da TMDB muda com frequência."
            />
          }
        />
      </section>
    </div>
  )
}
