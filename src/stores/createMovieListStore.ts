import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import type { SavedMovie } from '@/types/saved-movie'

export type MovieListState = {
  items: SavedMovie[]
  add: (movie: SavedMovie) => void
  remove: (id: number) => void
  toggle: (movie: SavedMovie) => void
  has: (id: number) => boolean
}

export function createMovieListStore(storageKey: string) {
  return create<MovieListState>()(
    persist(
      (set, get) => ({
        items: [],
        add: (movie) => {
          if (get().has(movie.id)) return
          set({ items: [movie, ...get().items] })
        },
        remove: (id) => set({ items: get().items.filter((item) => item.id !== id) }),
        toggle: (movie) => {
          if (get().has(movie.id)) {
            get().remove(movie.id)
            return
          }
          get().add(movie)
        },
        has: (id) => get().items.some((item) => item.id === id),
      }),
      { name: storageKey },
    ),
  )
}
