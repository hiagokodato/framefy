import type { DiscoverFilters } from '@/types/tmdb/discover'
import type { TrendingTimeWindow } from '@/types/tmdb/common'

export const movieKeys = {
  all: ['movies'] as const,
  lists: () => [...movieKeys.all, 'list'] as const,
  trending: (timeWindow: TrendingTimeWindow = 'day', page = 1) =>
    [...movieKeys.lists(), 'trending', timeWindow, page] as const,
  topRated: (page = 1) => [...movieKeys.lists(), 'top-rated', page] as const,
  upcoming: (page = 1) => [...movieKeys.lists(), 'upcoming', page] as const,
  nowPlaying: (page = 1) => [...movieKeys.lists(), 'now-playing', page] as const,
  details: (id: number) => [...movieKeys.all, 'details', id] as const,
  search: (query: string, page = 1) => [...movieKeys.all, 'search', query, page] as const,
  searchInfinite: (query: string) => [...movieKeys.all, 'search-infinite', query] as const,
  genres: () => [...movieKeys.all, 'genres'] as const,
  discover: (filters: DiscoverFilters) =>
    [
      ...movieKeys.all,
      'discover',
      filters.genreIds.join(','),
      filters.year ?? '',
      filters.minRating ?? '',
      filters.sortBy,
      filters.page ?? 1,
    ] as const,
  discoverInfinite: (filters: Omit<DiscoverFilters, 'page'>) =>
    [
      ...movieKeys.all,
      'discover-infinite',
      filters.genreIds.join(','),
      filters.year ?? '',
      filters.minRating ?? '',
      filters.sortBy,
    ] as const,
}
