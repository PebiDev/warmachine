import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'

// dev server
export default defineConfig({
  plugins: [TanStackRouterVite(),
    react()
  ],
  server: {proxy : {'/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },}}
})
