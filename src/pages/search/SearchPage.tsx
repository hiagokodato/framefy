import { useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'

import { SearchAutocomplete } from '@/features/search/components/SearchAutocomplete'
import { SearchResults } from '@/features/search/components/SearchResults'

export function SearchPage() {
  const [params, setSearchParams] = useSearchParams()
  const urlQuery = (params.get('q') || '').trim()

  const handleQueryChange = useCallback(
    (query: string) => {
      if (!query) {
        setSearchParams({})
        return
      }
      setSearchParams({ q: query })
    },
    [setSearchParams],
  )

  return (
    <div className="space-y-6">
      <div className="glass rounded-2xl p-6">
        <div className="text-sm font-semibold text-fg">Busca</div>
        <p className="mt-1 text-sm text-fg/70">
          Encontre filmes com sugestões em tempo real enquanto você digita.
        </p>
        <div className="mt-4">
          <SearchAutocomplete initialQuery={urlQuery} onQueryChange={handleQueryChange} />
        </div>
      </div>

      {urlQuery.length < 2 ? (
        <p className="text-sm text-fg/60">Digite pelo menos 2 caracteres para buscar.</p>
      ) : (
        <SearchResults query={urlQuery} />
      )}
    </div>
  )
}
