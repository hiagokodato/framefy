import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'
import {
  DISCOVER_SORT_OPTIONS,
  MIN_RATING_OPTIONS,
  type DiscoverFilters,
  type DiscoverSortBy,
} from '@/types/tmdb/discover'

type ExploreFiltersBarProps = {
  filters: DiscoverFilters
  onChange: (patch: Partial<DiscoverFilters>) => void
  onClear: () => void
  className?: string
}

const currentYear = new Date().getFullYear()
const YEAR_OPTIONS = Array.from({ length: currentYear - 1969 }, (_, i) => currentYear - i)

function FilterSelect({
  label,
  value,
  onChange,
  children,
}: {
  label: string
  value: string | number
  onChange: (value: string) => void
  children: ReactNode
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-medium text-fg/60">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-10 rounded-xl bg-fg/5 px-3 text-sm text-fg ring-1 ring-border transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fg/20"
      >
        {children}
      </select>
    </label>
  )
}

export function ExploreFiltersBar({
  filters,
  onChange,
  onClear,
  className,
}: ExploreFiltersBarProps) {
  const hasActiveFilters =
    filters.genreIds.length > 0 ||
    Boolean(filters.year) ||
    Boolean(filters.minRating) ||
    filters.sortBy !== 'popularity.desc'

  return (
    <div className={cn('glass rounded-2xl p-4 md:p-5', className)}>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <FilterSelect
            label="Ano"
            value={filters.year ?? ''}
            onChange={(value) => onChange({ year: value ? Number(value) : undefined, page: 1 })}
          >
            <option value="">Qualquer ano</option>
            {YEAR_OPTIONS.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </FilterSelect>

          <FilterSelect
            label="Nota mínima"
            value={filters.minRating ?? 0}
            onChange={(value) =>
              onChange({
                minRating: Number(value) > 0 ? Number(value) : undefined,
                page: 1,
              })
            }
          >
            {MIN_RATING_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </FilterSelect>

          <FilterSelect
            label="Ordenar por"
            value={filters.sortBy}
            onChange={(value) => onChange({ sortBy: value as DiscoverSortBy, page: 1 })}
          >
            {DISCOVER_SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </FilterSelect>
        </div>

        {hasActiveFilters ? (
          <button
            type="button"
            onClick={onClear}
            className="h-10 shrink-0 rounded-xl px-4 text-sm text-fg/70 ring-1 ring-border transition hover:bg-fg/5 hover:text-fg"
          >
            Limpar filtros
          </button>
        ) : null}
      </div>
    </div>
  )
}
