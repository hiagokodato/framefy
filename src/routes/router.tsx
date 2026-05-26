import { createBrowserRouter } from 'react-router-dom'

import { RootLayout } from '@/layouts/RootLayout'
import { ExplorePage } from '@/pages/explore/ExplorePage'
import { HomePage } from '@/pages/home/HomePage'
import { MovieDetailsPage } from '@/pages/movie/MovieDetailsPage'
import { SearchPage } from '@/pages/search/SearchPage'

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
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
        path: '/movie/:id',
        element: <MovieDetailsPage />,
      },
    ],
  },
])
