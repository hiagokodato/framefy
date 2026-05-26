import { Link } from 'react-router-dom'

import { buttonVariants } from '@/components/ui/button-variants'
import { cn } from '@/lib/utils'

export function NotFoundPage() {
  return (
    <div className="glass rounded-2xl p-8 text-center">
      <p className="text-xs font-medium tracking-[0.2em] text-fg/50">404</p>
      <h1 className="mt-2 text-2xl font-semibold text-fg">Página não encontrada</h1>
      <p className="mx-auto mt-2 max-w-md text-sm text-fg/70">
        O link pode estar errado ou a página pode ter sido movida.
      </p>
      <div className="mt-6 flex flex-col justify-center gap-2 sm:flex-row">
        <Link to="/" className={buttonVariants({ variant: 'primary', size: 'md' })}>
          Voltar para o início
        </Link>
        <Link
          to="/explore"
          className={cn(buttonVariants({ variant: 'default', size: 'md' }), 'bg-fg/5')}
        >
          Explorar filmes
        </Link>
      </div>
    </div>
  )
}
