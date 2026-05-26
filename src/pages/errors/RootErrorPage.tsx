import { isRouteErrorResponse, Link, useRouteError } from 'react-router-dom'

import { buttonVariants } from '@/components/ui/button-variants'

export function RootErrorPage() {
  const error = useRouteError()

  const title = isRouteErrorResponse(error)
    ? `${error.status} — ${error.statusText}`
    : 'Algo deu errado'
  const description = isRouteErrorResponse(error)
    ? (error.data?.message ?? 'Não foi possível carregar esta página.')
    : error instanceof Error
      ? error.message
      : 'Tente novamente em instantes.'

  return (
    <div className="glass rounded-2xl p-8">
      <p className="text-xs font-medium tracking-[0.2em] text-fg/50">ERRO</p>
      <h1 className="mt-2 text-2xl font-semibold text-fg">{title}</h1>
      <p className="mt-2 max-w-2xl text-sm text-fg/70">{description}</p>

      <div className="mt-6 flex flex-wrap gap-2">
        <Link to="/" className={buttonVariants({ variant: 'primary', size: 'md' })}>
          Ir para o início
        </Link>
        <Link to="/explore" className={buttonVariants({ variant: 'default', size: 'md' })}>
          Explorar
        </Link>
      </div>
    </div>
  )
}
