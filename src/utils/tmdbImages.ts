export type TmdbImageSize =
  | 'w92'
  | 'w154'
  | 'w185'
  | 'w342'
  | 'w500'
  | 'w780'
  | 'w1280'
  | 'original'

const IMAGE_BASE = import.meta.env.VITE_TMDB_IMAGE_BASE_URL?.trim() || 'https://image.tmdb.org/t/p'

export function getTmdbImageUrl(
  path: string | null | undefined,
  size: TmdbImageSize = 'w500',
): string | null {
  if (!path) return null
  return `${IMAGE_BASE}/${size}${path}`
}
