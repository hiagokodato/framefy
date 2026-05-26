import { cn } from '@/lib/utils'

type MovieCardSkeletonProps = {
  className?: string
}

export function MovieCardSkeleton({ className }: MovieCardSkeletonProps) {
  return (
    <div
      className={cn(
        'aspect-[2/3] w-[140px] shrink-0 animate-pulse rounded-2xl bg-fg/5 ring-1 ring-border sm:w-[160px]',
        className,
      )}
    />
  )
}
