export type TmdbEnvConfig = {
  /** Proxy próprio (api/tmdb): o token do TMDB fica no servidor, fora do bundle. */
  baseURL: string
  language: string
  imageBaseURL: string
}

export function getTmdbEnv(): TmdbEnvConfig {
  return {
    baseURL: '/api/tmdb',
    language: import.meta.env.VITE_TMDB_LANGUAGE?.trim() || 'pt-BR',
    imageBaseURL: import.meta.env.VITE_TMDB_IMAGE_BASE_URL?.trim() || 'https://image.tmdb.org/t/p',
  }
}
