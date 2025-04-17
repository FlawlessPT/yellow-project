import { sentryVitePlugin } from '@sentry/vite-plugin';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    sentryVitePlugin({
      org: process.env.SENTRY_ORG,
      project: process.env.SENTRY_PROJECT,
    }),
  ],
  resolve: {
    alias: {
      '@components': `${path.resolve(__dirname, './src/components/')}`,
      '@configs': `${path.resolve(__dirname, './src/configs/')}`,
      '@hooks': `${path.resolve(__dirname, './src/hooks/')}`,
      '@pages': `${path.resolve(__dirname, './src/pages/')}`,
      '@types': `${path.resolve(__dirname, './src/types/')}`,
      '@utils': `${path.resolve(__dirname, './src/utils/')}`,
      '@contexts': `${path.resolve(__dirname, './src/contexts/')}`,
    },
  },
  build: {
    sourcemap: true,
  },
});
