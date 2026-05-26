import { motion } from 'framer-motion'

export function HomePage() {
  return (
    <div className="space-y-8">
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-glow md:p-10"
      >
        <div className="cinematic-grid pointer-events-none absolute inset-0 opacity-60" />
        <div className="pointer-events-none absolute inset-0 opacity-70">
          <div className="absolute -top-28 left-1/2 h-56 w-[42rem] -translate-x-1/2 rounded-full bg-[rgb(var(--primary))]/20 blur-3xl" />
          <div className="absolute -bottom-28 left-1/3 h-56 w-[42rem] -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />
        </div>

        <div className="relative">
          <p className="text-xs font-medium tracking-[0.18em] text-white/60">DISCOVERY MODE</p>
          <h1 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-white md:text-5xl">
            Uma experiência cinematográfica para descobrir o que assistir.
          </h1>
          <p className="mt-4 max-w-2xl text-pretty text-sm leading-relaxed text-white/70 md:text-base">
            Foundation pronta. Próximo passo: carrosséis de Trending/Top Rated/Upcoming/Now Playing
            com skeletons, animações e integração TMDB.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {['Trending', 'Top Rated', 'Upcoming', 'Now Playing'].map((label) => (
              <span
                key={label}
                className="rounded-full bg-white/5 px-3 py-1 text-xs text-white/75 ring-1 ring-white/10"
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </motion.section>

      <section className="grid gap-4 md:grid-cols-2">
        {['Arquitetura por features', 'Design system cinematográfico'].map((title) => (
          <div key={title} className="glass rounded-2xl p-6">
            <div className="text-sm font-semibold text-white">{title}</div>
            <div className="mt-1 text-sm text-white/70">
              Estrutura base pronta para evoluir com rotas, estados, loading states e animações.
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}
