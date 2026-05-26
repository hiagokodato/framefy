import { SearchX } from 'lucide-react'

type SearchEmptyStateProps = {
  query: string
  title?: string
  description?: string
}

export function SearchEmptyState({
  query,
  title = 'Nenhum filme encontrado',
  description,
}: SearchEmptyStateProps) {
  return (
    <div className="glass flex flex-col items-center justify-center rounded-2xl px-6 py-14 text-center">
      <div className="flex size-14 items-center justify-center rounded-2xl bg-fg/5 ring-1 ring-border">
        <SearchX className="size-7 text-fg/50" />
      </div>
      <h3 className="mt-4 text-base font-semibold text-fg">{title}</h3>
      <p className="mt-2 max-w-md text-sm text-fg/65">
        {description ?? (
          <>
            Não encontramos resultados para <span className="font-medium text-fg">"{query}"</span>.
            Tente outro título ou verifique a ortografia.
          </>
        )}
      </p>
    </div>
  )
}
