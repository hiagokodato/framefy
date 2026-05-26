export function MovieDetailsSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      <div className="relative -mx-4 h-[42vh] min-h-[280px] overflow-hidden rounded-none bg-white/5 sm:-mx-6 lg:-mx-8" />

      <div className="space-y-3">
        <div className="h-8 w-2/3 max-w-md rounded-lg bg-white/10" />
        <div className="h-4 w-1/2 max-w-sm rounded-lg bg-white/5" />
        <div className="flex gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-7 w-16 rounded-full bg-white/5" />
          ))}
        </div>
      </div>

      <div className="aspect-video w-full max-w-3xl rounded-2xl bg-white/5" />

      <div className="space-y-2">
        <div className="h-5 w-32 rounded bg-white/10" />
        <div className="h-4 w-full rounded bg-white/5" />
        <div className="h-4 w-full rounded bg-white/5" />
        <div className="h-4 w-3/4 rounded bg-white/5" />
      </div>

      <div className="flex gap-3 overflow-hidden">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-36 w-24 shrink-0 rounded-2xl bg-white/5" />
        ))}
      </div>
    </div>
  )
}
