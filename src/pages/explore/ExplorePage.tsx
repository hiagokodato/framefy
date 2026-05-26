import { motion } from 'framer-motion'
import { Compass } from 'lucide-react'
import { useCallback, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'

import { ExploreFiltersBar } from '@/features/explore/components/ExploreFiltersBar'
import { ExploreResults } from '@/features/explore/components/ExploreResults'
import { GenreChips } from '@/features/explore/components/GenreChips'
import {
  buildExploreSearchParams,
  parseExploreSearchParams,
} from '@/features/explore/lib/exploreParams'
import type { DiscoverFiltersBase } from '@/hooks/useDiscoverMoviesInfinite'
import { useMovieGenres } from '@/hooks/useMovieGenres'
import type { DiscoverFilters } from '@/types/tmdb/discover'

const DEFAULT_FILTERS: DiscoverFilters = {
  genreIds: [],
  sortBy: 'popularity.desc',
  page: 1,
}

export function ExplorePage() {
  const [searchParams, setSearchParams] = useSearchParams()

  const filters = useMemo(() => parseExploreSearchParams(searchParams), [searchParams])

  const discoverFilters: DiscoverFiltersBase = useMemo(
    () => ({
      genreIds: filters.genreIds,
      year: filters.year,
      minRating: filters.minRating,
      sortBy: filters.sortBy,
    }),
    [filters.genreIds, filters.year, filters.minRating, filters.sortBy],
  )

  const { data: genres, isLoading: isLoadingGenres } = useMovieGenres()

  const updateFilters = useCallback(
    (patch: Partial<DiscoverFilters>) => {
      const next: DiscoverFilters = {
        ...filters,
        ...patch,
        page: 1,
      }
      setSearchParams(buildExploreSearchParams(next))
    },
    [filters, setSearchParams],
  )

  const toggleGenre = useCallback(
    (genreId: number) => {
      const exists = filters.genreIds.includes(genreId)
      const genreIds = exists
        ? filters.genreIds.filter((id) => id !== genreId)
        : [...filters.genreIds, genreId]
      updateFilters({ genreIds })
    },
    [filters.genreIds, updateFilters],
  )

  const clearFilters = useCallback(() => {
    setSearchParams(buildExploreSearchParams(DEFAULT_FILTERS))
  }, [setSearchParams])

  const emptyLabel = useMemo(() => {
    const parts: string[] = []
    if (filters.genreIds.length > 0 && genres) {
      const names = genres.filter((g) => filters.genreIds.includes(g.id)).map((g) => g.name)
      if (names.length) parts.push(names.join(', '))
    }
    if (filters.year) parts.push(String(filters.year))
    if (filters.minRating) parts.push(`nota ${filters.minRating}+`)
    return parts.join(' · ') || 'filtros selecionados'
  }, [filters, genres])

  return (
    <div className="space-y-8">
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="glass relative overflow-hidden rounded-3xl p-6 md:p-8"
      >
        <div className="cinematic-grid pointer-events-none absolute inset-0 opacity-50" />
        <div className="relative flex items-start gap-4">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/15 ring-1 ring-primary/30">
            <Compass className="size-6 text-primary" />
          </div>
          <div>
            <p className="text-xs font-medium tracking-[0.18em] text-fg/60">EXPLORE</p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight text-fg md:text-3xl">
              Explore por gênero e filtros
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-fg/70">
              Combine gêneros, ano, nota mínima e ordenação. Role para carregar mais filmes
              automaticamente.
            </p>
          </div>
        </div>
      </motion.section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-fg">Gêneros</h2>
        <GenreChips
          genres={genres ?? []}
          selectedIds={filters.genreIds}
          onToggle={toggleGenre}
          isLoading={isLoadingGenres}
        />
      </section>

      <ExploreFiltersBar filters={filters} onChange={updateFilters} onClear={clearFilters} />

      <ExploreResults filters={discoverFilters} emptyLabel={emptyLabel} />
    </div>
  )
}
