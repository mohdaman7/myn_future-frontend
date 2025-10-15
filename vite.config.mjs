import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import jsconfigPaths from 'vite-jsconfig-paths';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const API_URL = `${env.VITE_APP_BASE_NAME || '/'}`;
  const PORT = env.PORT || 4040;

  return {
    server: {
      open: true,
      host: '0.0.0.0', // allow external access
      port: PORT,
      allowedHosts: ['dashboard.mynfuture.com'], // ✅ add your domain
      proxy: {
        '/public': {
          target: 'https://api.mynfuture.com', // ✅ point to your real backend
          changeOrigin: true,
          rewrite: (path) => path,
        },
        '/countries': {
          target: 'https://api.mynfuture.com',
          changeOrigin: true,
          rewrite: (path) => path,
        },
      },
    },
    preview: {
      open: true,
      host: '0.0.0.0',
      allowedHosts: ['dashboard.mynfuture.com'],
    },
    define: {
      global: 'window',
    },
    resolve: {
      alias: [],
    },
    base: API_URL,
    plugins: [react(), jsconfigPaths()],
  };
});
