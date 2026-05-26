import { createBrowserRouter } from 'react-router-dom'

import { RootLayout } from '@/layouts/RootLayout'
import {
  ExplorePage,
  FavoritesPage,
  HomePage,
  MoodPage,
  MovieDetailsPage,
  NotFoundPage,
  RootErrorPage,
  SearchPage,
  WatchlistPage,
} from '@/routes/lazyPages'

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: <RootErrorPage />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/search',
        element: <SearchPage />,
      },
      {
        path: '/explore',
        element: <ExplorePage />,
      },
      {
        path: '/mood',
        element: <MoodPage />,
      },
      {
        path: '/favorites',
        element: <FavoritesPage />,
      },
      {
        path: '/watchlist',
        element: <WatchlistPage />,
      },
      {
        path: '/movie/:id',
        element: <MovieDetailsPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
])
