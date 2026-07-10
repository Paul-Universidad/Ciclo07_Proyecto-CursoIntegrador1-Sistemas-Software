import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const buildForBackend = env.VITE_BUILD_TARGET === 'backend';

  return {
    plugins: [react()],
    build: {
      outDir: buildForBackend
        ? '../backend-springboot/src/main/resources/static'
        : 'dist',
      emptyOutDir: true,
    },
    server: {
      port: 5173,
      proxy: {
        '/api': { target: 'http://localhost:8080', changeOrigin: true },
        '/h2-console': { target: 'http://localhost:8080', changeOrigin: true },
      },
    },
  };
});
