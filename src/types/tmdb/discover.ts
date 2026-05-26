export type DiscoverSortBy =
  | 'popularity.desc'
  | 'popularity.asc'
  | 'release_date.desc'
  | 'release_date.asc'
  | 'vote_average.desc'
  | 'vote_average.asc'

export type DiscoverFilters = {
  genreIds: number[]
  year?: number
  minRating?: number
  sortBy: DiscoverSortBy
  page?: number
}

export const DISCOVER_SORT_OPTIONS: { value: DiscoverSortBy; label: string }[] = [
  { value: 'popularity.desc', label: 'Mais populares' },
  { value: 'vote_average.desc', label: 'Melhor avaliados' },
  { value: 'release_date.desc', label: 'Mais recentes' },
  { value: 'release_date.asc', label: 'Mais antigos' },
]

export const MIN_RATING_OPTIONS = [
  { value: 0, label: 'Qualquer nota' },
  { value: 6, label: '6+' },
  { value: 7, label: '7+' },
  { value: 8, label: '8+' },
]
