import type { DiscoverFilters, DiscoverSortBy } from '@/types/tmdb/discover'

const DEFAULT_SORT: DiscoverSortBy = 'popularity.desc'

export function parseExploreSearchParams(params: URLSearchParams): DiscoverFilters {
  const genreIds =
    params
      .get('genres')
      ?.split(',')
      .map((id) => Number(id))
      .filter((id) => Number.isFinite(id) && id > 0) ?? []

  const yearRaw = params.get('year')
  const year = yearRaw ? Number(yearRaw) : undefined

  const minRatingRaw = params.get('minRating')
  const minRating = minRatingRaw ? Number(minRatingRaw) : undefined

  const sortBy = (params.get('sort') as DiscoverSortBy | null) ?? DEFAULT_SORT

  const pageRaw = params.get('page')
  const page = pageRaw ? Number(pageRaw) : 1

  return {
    genreIds,
    year: Number.isFinite(year) && year! > 0 ? year : undefined,
    minRating: Number.isFinite(minRating) && minRating! > 0 ? minRating : undefined,
    sortBy,
    page: Number.isFinite(page) && page! > 0 ? page : 1,
  }
}

export function buildExploreSearchParams(filters: DiscoverFilters): URLSearchParams {
  const params = new URLSearchParams()

  if (filters.genreIds.length > 0) {
    params.set('genres', filters.genreIds.join(','))
  }

  if (filters.year) {
    params.set('year', String(filters.year))
  }

  if (filters.minRating && filters.minRating > 0) {
    params.set('minRating', String(filters.minRating))
  }

  if (filters.sortBy !== DEFAULT_SORT) {
    params.set('sort', filters.sortBy)
  }

  if (filters.page && filters.page > 1) {
    params.set('page', String(filters.page))
  }

  return params
}
