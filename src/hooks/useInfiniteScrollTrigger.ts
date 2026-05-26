import { useEffect, type RefObject } from 'react'

type UseInfiniteScrollTriggerOptions = {
  targetRef: RefObject<HTMLElement | null>
  enabled: boolean
  isLoading: boolean
  onLoadMore: () => void
  rootMargin?: string
}

export function useInfiniteScrollTrigger({
  targetRef,
  enabled,
  isLoading,
  onLoadMore,
  rootMargin = '240px',
}: UseInfiniteScrollTriggerOptions) {
  useEffect(() => {
    const target = targetRef.current
    if (!target || !enabled) return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry?.isIntersecting && !isLoading) {
          onLoadMore()
        }
      },
      { rootMargin },
    )

    observer.observe(target)
    return () => observer.disconnect()
  }, [targetRef, enabled, isLoading, onLoadMore, rootMargin])
}
