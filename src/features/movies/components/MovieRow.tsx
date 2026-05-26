import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

type MovieRowProps = {
  title: string
  children: ReactNode
  className?: string
}

export function MovieRow({ title, children, className }: MovieRowProps) {
  return (
    <section className={cn('space-y-3', className)}>
      <h2 className="text-lg font-semibold tracking-tight text-white">{title}</h2>
      <div className="-mx-1 flex gap-3 overflow-x-auto px-1 pb-2">{children}</div>
    </section>
  )
}
