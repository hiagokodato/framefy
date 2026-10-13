import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Lido só no Node (dev server): sem prefixo VITE_, o token nunca entra no bundle.
  const env = loadEnv(mode, process.cwd(), '')
  const readToken = env.TMDB_READ_TOKEN?.trim()
  const apiKey = env.TMDB_API_KEY?.trim()

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      // No dev, faz o papel da Vercel Function api/tmdb: injeta o token no servidor.
      proxy: {
        '/api/tmdb': {
          target: 'https://api.themoviedb.org',
          changeOrigin: true,
          rewrite: (requestPath) => {
            const url = new URL(requestPath.replace(/^\/api\/tmdb/, '/3'), 'http://localhost')
            if (!readToken && apiKey) url.searchParams.set('api_key', apiKey)
            return url.pathname + url.search
          },
          headers: readToken ? { Authorization: `Bearer ${readToken}` } : {},
        },
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            if (!id.includes('node_modules')) return undefined
            if (id.includes('/react/') || id.includes('/react-dom/')) return 'react'
            if (id.includes('/react-router-dom/')) return 'router'
            if (id.includes('/@tanstack/react-query/')) return 'query'
            if (id.includes('/framer-motion/')) return 'motion'
            if (
              id.includes('/lucide-react/') ||
              id.includes('/class-variance-authority/') ||
              id.includes('/clsx/') ||
              id.includes('/tailwind-merge/')
            ) {
              return 'ui'
            }
            return 'vendor'
          },
        },
      },
    },
  }
})
