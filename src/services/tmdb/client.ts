import axios, { type AxiosInstance } from 'axios'

import { getTmdbEnv } from '@/utils/env'

import { toTmdbApiError } from './errors'

let instance: AxiosInstance | null = null

export function getTmdbClient(): AxiosInstance {
  if (instance) return instance

  const env = getTmdbEnv()

  instance = axios.create({
    baseURL: env.baseURL,
    headers: { Accept: 'application/json' },
    params: { language: env.language },
  })

  instance.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(toTmdbApiError(error)),
  )

  return instance
}
