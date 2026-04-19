import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig(() => {
  return {
    server: {
        proxy: {
            '/api': {
                target: 'https://localhost:44343',
                changeOrigin: true,
                secure: false
            }
        }
    },
    build: {
      outDir: 'build',
    },
    plugins: [
        react(),
        svgr({ svgrOptions: { icon: true } })
    ],
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './tests/setup.js'
    }
  };
});