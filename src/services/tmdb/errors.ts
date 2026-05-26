import axios from 'axios'

export class TmdbApiError extends Error {
  readonly status?: number
  readonly code?: string

  constructor(message: string, options?: { status?: number; code?: string; cause?: unknown }) {
    super(message)
    this.name = 'TmdbApiError'
    this.status = options?.status
    this.code = options?.code
    if (options?.cause) {
      this.cause = options.cause
    }
  }
}

export function toTmdbApiError(error: unknown): TmdbApiError {
  if (error instanceof TmdbApiError) return error

  if (axios.isAxiosError(error)) {
    const status = error.response?.status
    const apiMessage =
      typeof error.response?.data === 'object' &&
      error.response?.data !== null &&
      'status_message' in error.response.data
        ? String((error.response.data as { status_message: string }).status_message)
        : undefined

    if (status === 401) {
      return new TmdbApiError('Invalid TMDB credentials. Check your API token or API key.', {
        status,
        cause: error,
      })
    }

    if (status === 404) {
      return new TmdbApiError('Resource not found on TMDB.', { status, cause: error })
    }

    if (status && status >= 500) {
      return new TmdbApiError('TMDB service is temporarily unavailable. Try again later.', {
        status,
        cause: error,
      })
    }

    return new TmdbApiError(apiMessage || error.message || 'Failed to fetch data from TMDB.', {
      status,
      cause: error,
    })
  }

  if (error instanceof Error) {
    return new TmdbApiError(error.message, { cause: error })
  }

  return new TmdbApiError('An unexpected error occurred while calling TMDB.')
}
