import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': 'http://localhost:3000'
    }
  },
  preview: {
    host: '0.0.0.0',
    port: parseInt(process.env.PORT || '4173') // Railway даёт PORT, иначе 4173 по умолчанию
  }
});
