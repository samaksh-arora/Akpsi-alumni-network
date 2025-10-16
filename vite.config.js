import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'], // exclude any packages causing star export errors
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
})