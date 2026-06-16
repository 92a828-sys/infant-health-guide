import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // 本機開發時代理 Notion API，解決 CORS 問題
      '/notion-proxy': {
        target: 'https://api.notion.com',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/notion-proxy/, ''),
      },
    },
  },
})
