import type { MovieVideo } from '@/types/tmdb/video'

export function getReleaseYear(releaseDate: string | undefined): string {
  if (!releaseDate) return '—'
  return releaseDate.slice(0, 4) || '—'
}

export function getYoutubeTrailerKey(videos: MovieVideo[] | undefined): string | null {
  if (!videos?.length) return null

  const youtube = videos.filter((v) => v.site === 'YouTube')
  const trailer =
    youtube.find((v) => v.type === 'Trailer' && v.official) ??
    youtube.find((v) => v.type === 'Trailer') ??
    youtube[0]

  return trailer?.key ?? null
}

export function formatRuntime(runtime: number | null | undefined): string | null {
  if (!runtime || runtime <= 0) return null
  const hours = Math.floor(runtime / 60)
  const minutes = runtime % 60
  if (hours === 0) return `${minutes}min`
  return minutes > 0 ? `${hours}h ${minutes}min` : `${hours}h`
}
