export type TmdbEnvConfig = {
  baseURL: string
  language: string
  imageBaseURL: string
  readToken?: string
  apiKey?: string
}

function requireAuth(): Pick<TmdbEnvConfig, 'readToken' | 'apiKey'> {
  const readToken = import.meta.env.VITE_TMDB_READ_TOKEN?.trim()
  const apiKey = import.meta.env.VITE_TMDB_API_KEY?.trim()

  if (!readToken && !apiKey) {
    throw new Error(
      'Missing TMDB credentials. Set VITE_TMDB_READ_TOKEN (recommended) or VITE_TMDB_API_KEY in your .env file.',
    )
  }

  return { readToken, apiKey }
}

export function getTmdbEnv(): TmdbEnvConfig {
  const auth = requireAuth()

  return {
    baseURL: import.meta.env.VITE_TMDB_BASE_URL?.trim() || 'https://api.themoviedb.org/3',
    language: import.meta.env.VITE_TMDB_LANGUAGE?.trim() || 'pt-BR',
    imageBaseURL: import.meta.env.VITE_TMDB_IMAGE_BASE_URL?.trim() || 'https://image.tmdb.org/t/p',
    ...auth,
  }
}
