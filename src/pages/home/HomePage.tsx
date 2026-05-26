import { HomeHero } from '@/features/movies/components/HomeHero'
import { MovieCarouselSection } from '@/features/movies/components/MovieCarouselSection'
import { useNowPlayingMovies } from '@/hooks/useNowPlayingMovies'
import { useTopRatedMovies } from '@/hooks/useTopRatedMovies'
import { useTrendingMovies } from '@/hooks/useTrendingMovies'
import { useUpcomingMovies } from '@/hooks/useUpcomingMovies'

const CAROUSEL_LIMIT = 12

export function HomePage() {
  const trending = useTrendingMovies()
  const topRated = useTopRatedMovies()
  const upcoming = useUpcomingMovies()
  const nowPlaying = useNowPlayingMovies()

  const trendingResults = trending.data?.results ?? []
  const featured = trendingResults[0]
  const trendingRow = trendingResults.slice(1, CAROUSEL_LIMIT + 1)

  return (
    <div className="space-y-10">
      <HomeHero movie={featured} isLoading={trending.isLoading} />

      <MovieCarouselSection
        title="Em alta"
        movies={trendingRow.length > 0 ? trendingRow : trendingResults.slice(0, CAROUSEL_LIMIT)}
        isLoading={trending.isLoading}
        isError={trending.isError}
        error={trending.error}
        animationDelay={0.05}
      />

      <MovieCarouselSection
        title="Mais bem avaliados"
        movies={topRated.data?.results.slice(0, CAROUSEL_LIMIT)}
        isLoading={topRated.isLoading}
        isError={topRated.isError}
        error={topRated.error}
        animationDelay={0.1}
      />

      <MovieCarouselSection
        title="Em breve"
        movies={upcoming.data?.results.slice(0, CAROUSEL_LIMIT)}
        isLoading={upcoming.isLoading}
        isError={upcoming.isError}
        error={upcoming.error}
        animationDelay={0.15}
      />

      <MovieCarouselSection
        title="Em cartaz"
        movies={nowPlaying.data?.results.slice(0, CAROUSEL_LIMIT)}
        isLoading={nowPlaying.isLoading}
        isError={nowPlaying.isError}
        error={nowPlaying.error}
        animationDelay={0.2}
      />
    </div>
  )
}
