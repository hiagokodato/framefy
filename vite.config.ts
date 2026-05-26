import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
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
})
