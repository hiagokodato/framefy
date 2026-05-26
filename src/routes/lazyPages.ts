import { lazy } from 'react'

export const HomePage = lazy(() =>
  import('@/pages/home/HomePage').then((module) => ({ default: module.HomePage })),
)
export const SearchPage = lazy(() =>
  import('@/pages/search/SearchPage').then((module) => ({ default: module.SearchPage })),
)
export const ExplorePage = lazy(() =>
  import('@/pages/explore/ExplorePage').then((module) => ({ default: module.ExplorePage })),
)
export const MoodPage = lazy(() =>
  import('@/pages/mood/MoodPage').then((module) => ({ default: module.MoodPage })),
)
export const FavoritesPage = lazy(() =>
  import('@/pages/favorites/FavoritesPage').then((module) => ({ default: module.FavoritesPage })),
)
export const WatchlistPage = lazy(() =>
  import('@/pages/watchlist/WatchlistPage').then((module) => ({ default: module.WatchlistPage })),
)
export const MovieDetailsPage = lazy(() =>
  import('@/pages/movie/MovieDetailsPage').then((module) => ({ default: module.MovieDetailsPage })),
)

export const NotFoundPage = lazy(() =>
  import('@/pages/errors/NotFoundPage').then((module) => ({ default: module.NotFoundPage })),
)
export const RootErrorPage = lazy(() =>
  import('@/pages/errors/RootErrorPage').then((module) => ({ default: module.RootErrorPage })),
)
