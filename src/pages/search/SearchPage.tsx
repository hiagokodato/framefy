import { useSearchParams } from 'react-router-dom'

export function SearchPage() {
  const [params] = useSearchParams()
  const q = (params.get('q') || '').trim()

  return (
    <div className="space-y-4">
      <div className="glass rounded-2xl p-6">
        <div className="text-sm font-semibold text-white">Busca</div>
        <div className="mt-1 text-sm text-white/70">
          Query atual: <span className="text-white">{q || '(vazia)'}</span>
        </div>
      </div>
    </div>
  )
}
