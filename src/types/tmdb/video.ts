export type MovieVideo = {
  id: string
  key: string
  name: string
  site: string
  type: string
  official: boolean
  published_at?: string
}

export type MovieVideosResponse = {
  results: MovieVideo[]
}
