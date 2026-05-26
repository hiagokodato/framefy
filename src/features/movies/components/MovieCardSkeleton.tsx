import { cn } from '@/lib/utils'

type MovieCardSkeletonProps = {
  className?: string
}

export function MovieCardSkeleton({ className }: MovieCardSkeletonProps) {
  return (
    <div
      className={cn(
        'aspect-[2/3] w-[140px] shrink-0 animate-pulse rounded-2xl bg-white/5 ring-1 ring-white/10 sm:w-[160px]',
        className,
      )}
    />
  )
}
