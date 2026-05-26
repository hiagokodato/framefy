import { AnimatePresence, motion } from 'framer-motion'
import { Loader2, Search } from 'lucide-react'
import { useCallback, useEffect, useId, useRef, useState, type KeyboardEvent } from 'react'
import { useNavigate } from 'react-router-dom'

import { Input } from '@/components/ui/input'
import { useDebounce } from '@/hooks/useDebounce'
import { useSearchMovies } from '@/hooks/useSearchMovies'
import { cn } from '@/lib/utils'
import { TmdbApiError } from '@/services/tmdb'
import type { Movie } from '@/types/tmdb/movie'
import { getReleaseYear } from '@/utils/movie'
import { getTmdbImageUrl } from '@/utils/tmdbImages'

const MIN_QUERY_LENGTH = 2
const MAX_SUGGESTIONS = 6

type SearchAutocompleteProps = {
  className?: string
  inputClassName?: string
  placeholder?: string
  initialQuery?: string
  onSubmit?: (query: string) => void
  onQueryChange?: (query: string) => void
}

export function SearchAutocomplete({
  className,
  inputClassName,
  placeholder = 'Buscar filmes…',
  initialQuery = '',
  onSubmit,
  onQueryChange,
}: SearchAutocompleteProps) {
  const listboxId = useId()
  const navigate = useNavigate()
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const [query, setQuery] = useState(initialQuery)
  const [isOpen, setIsOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)

  const debouncedQuery = useDebounce(query.trim(), 350)
  const canSearch = debouncedQuery.length >= MIN_QUERY_LENGTH

  const { data, isLoading, isFetching, isError, error } = useSearchMovies({
    query: debouncedQuery,
    enabled: isOpen && canSearch,
  })

  const results = (data?.results ?? []).slice(0, MAX_SUGGESTIONS)
  const showDropdown = isOpen && query.trim().length > 0
  const isSearching = canSearch && (isLoading || isFetching)

  const goToSearchPage = useCallback(
    (value: string) => {
      const trimmed = value.trim()
      if (trimmed.length < MIN_QUERY_LENGTH) return
      setIsOpen(false)
      setActiveIndex(-1)
      onSubmit?.(trimmed)
      navigate(`/search?q=${encodeURIComponent(trimmed)}`)
    },
    [navigate, onSubmit],
  )

  const goToMovie = useCallback(
    (movie: Movie) => {
      setIsOpen(false)
      setActiveIndex(-1)
      setQuery(movie.title)
      navigate(`/movie/${movie.id}`)
    },
    [navigate],
  )

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false)
        setActiveIndex(-1)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    onQueryChange?.(debouncedQuery)
  }, [debouncedQuery, onQueryChange])

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setIsOpen(false)
      setActiveIndex(-1)
      inputRef.current?.blur()
      return
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault()
      if (!showDropdown) {
        setIsOpen(true)
        return
      }
      const maxIndex = results.length
      setActiveIndex((prev) => (prev < maxIndex ? prev + 1 : 0))
      return
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault()
      const maxIndex = results.length
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : maxIndex))
      return
    }

    if (event.key !== 'Enter') return
    event.preventDefault()

    if (activeIndex >= 0 && activeIndex < results.length) {
      goToMovie(results[activeIndex])
      return
    }

    if (activeIndex === results.length && results.length > 0) {
      goToSearchPage(query)
      return
    }

    goToSearchPage(query)
  }

  return (
    <div ref={containerRef} className={cn('relative w-full', className)}>
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-fg/40" />
        <Input
          ref={inputRef}
          value={query}
          role="combobox"
          aria-expanded={showDropdown}
          aria-controls={listboxId}
          aria-autocomplete="list"
          aria-activedescendant={
            activeIndex >= 0 && activeIndex < results.length
              ? `${listboxId}-option-${activeIndex}`
              : undefined
          }
          placeholder={placeholder}
          className={cn('pl-9 pr-10', inputClassName)}
          onChange={(e) => {
            setQuery(e.target.value)
            setActiveIndex(-1)
            setIsOpen(true)
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
        />
        {isSearching ? (
          <Loader2 className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 animate-spin text-fg/50" />
        ) : null}
      </div>

      <AnimatePresence>
        {showDropdown ? (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-50 overflow-hidden rounded-2xl border border-border bg-card shadow-glow"
          >
            {query.trim().length < MIN_QUERY_LENGTH ? (
              <p className="px-4 py-3 text-sm text-fg/60">
                Digite pelo menos {MIN_QUERY_LENGTH} caracteres…
              </p>
            ) : null}

            {canSearch && isSearching ? (
              <ul className="divide-y divide-border p-2" aria-label="Carregando sugestões">
                {Array.from({ length: 4 }).map((_, i) => (
                  <li
                    key={i}
                    className="flex animate-pulse items-center gap-3 rounded-xl px-2 py-2"
                  >
                    <div className="size-12 rounded-lg bg-fg/10" />
                    <div className="flex-1 space-y-2">
                      <div className="h-3 w-3/4 rounded bg-fg/10" />
                      <div className="h-2 w-1/3 rounded bg-fg/5" />
                    </div>
                  </li>
                ))}
              </ul>
            ) : null}

            {canSearch && isError ? (
              <p className="px-4 py-3 text-sm text-fg/70">
                {error instanceof TmdbApiError ? error.message : 'Erro ao buscar. Tente novamente.'}
              </p>
            ) : null}

            {canSearch && !isSearching && !isError && results.length === 0 ? (
              <p className="px-4 py-3 text-sm text-fg/60">Nenhum filme encontrado.</p>
            ) : null}

            {canSearch && !isSearching && !isError && results.length > 0 ? (
              <ul
                id={listboxId}
                role="listbox"
                className="max-h-[min(24rem,60vh)] overflow-y-auto p-2"
              >
                {results.map((movie, index) => {
                  const poster = getTmdbImageUrl(movie.poster_path, 'w92')
                  const isActive = activeIndex === index

                  return (
                    <li key={movie.id} role="option" aria-selected={isActive}>
                      <button
                        id={`${listboxId}-option-${index}`}
                        type="button"
                        className={cn(
                          'flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left transition',
                          isActive ? 'bg-fg/10' : 'hover:bg-fg/5',
                        )}
                        onMouseEnter={() => setActiveIndex(index)}
                        onClick={() => goToMovie(movie)}
                      >
                        <div className="size-12 shrink-0 overflow-hidden rounded-lg bg-fg/5 ring-1 ring-border">
                          {poster ? (
                            <img
                              src={poster}
                              alt=""
                              className="size-full object-cover"
                              loading="lazy"
                            />
                          ) : null}
                        </div>
                        <div className="min-w-0">
                          <div className="truncate text-sm font-medium text-fg">{movie.title}</div>
                          <div className="text-xs text-fg/60">
                            {getReleaseYear(movie.release_date)} · ★ {movie.vote_average.toFixed(1)}
                          </div>
                        </div>
                      </button>
                    </li>
                  )
                })}
                <li role="option" aria-selected={activeIndex === results.length}>
                  <button
                    type="button"
                    className={cn(
                      'mt-1 w-full rounded-xl px-3 py-2.5 text-center text-sm font-medium transition',
                      activeIndex === results.length
                        ? 'bg-primary text-white'
                        : 'bg-fg/5 text-fg hover:bg-fg/10',
                    )}
                    onMouseEnter={() => setActiveIndex(results.length)}
                    onClick={() => goToSearchPage(query)}
                  >
                    Ver todos os resultados
                  </button>
                </li>
              </ul>
            ) : null}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
