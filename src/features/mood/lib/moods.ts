import type { LucideIcon } from 'lucide-react'
import { Brain, Coffee, Ghost, Heart, Smile, Zap } from 'lucide-react'

import type { DiscoverFilters } from '@/types/tmdb/discover'

export type MoodId = 'happy' | 'relaxed' | 'thrill' | 'romantic' | 'scary' | 'mindful'

export type MoodDefinition = {
  id: MoodId
  label: string
  description: string
  icon: LucideIcon
  filters: Omit<DiscoverFilters, 'page'>
}

export const MOODS: MoodDefinition[] = [
  {
    id: 'happy',
    label: 'Animado',
    description: 'Comédias leves e filmes da família para levantar o astral.',
    icon: Smile,
    filters: {
      genreIds: [35, 10751, 16],
      minRating: 6,
      sortBy: 'popularity.desc',
    },
  },
  {
    id: 'relaxed',
    label: 'Relaxado',
    description: 'Histórias calmas e bem avaliadas para desacelerar.',
    icon: Coffee,
    filters: {
      genreIds: [18, 99, 10751],
      minRating: 7,
      sortBy: 'vote_average.desc',
    },
  },
  {
    id: 'thrill',
    label: 'Adrenalina',
    description: 'Ação, aventura e suspense em alta octanagem.',
    icon: Zap,
    filters: {
      genreIds: [28, 12, 53],
      sortBy: 'popularity.desc',
    },
  },
  {
    id: 'romantic',
    label: 'Romântico',
    description: 'Romances e dramas afetivos com boa recepção.',
    icon: Heart,
    filters: {
      genreIds: [10749, 18],
      minRating: 6.5,
      sortBy: 'vote_average.desc',
    },
  },
  {
    id: 'scary',
    label: 'Tensão',
    description: 'Terror, thriller e mistério para quem gosta de frio na espinha.',
    icon: Ghost,
    filters: {
      genreIds: [27, 53, 9648],
      sortBy: 'popularity.desc',
    },
  },
  {
    id: 'mindful',
    label: 'Reflexivo',
    description: 'Dramas e histórias profundas para assistir com atenção.',
    icon: Brain,
    filters: {
      genreIds: [18, 36, 878],
      minRating: 7,
      sortBy: 'vote_average.desc',
    },
  },
]

export const DEFAULT_MOOD_ID: MoodId = 'happy'

const moodById = new Map(MOODS.map((mood) => [mood.id, mood]))

export function getMoodById(id: string | null | undefined): MoodDefinition | undefined {
  if (!id) return undefined
  return moodById.get(id as MoodId)
}

export function isMoodId(value: string): value is MoodId {
  return moodById.has(value as MoodId)
}
