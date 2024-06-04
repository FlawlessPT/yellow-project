import { sentryVitePlugin } from '@sentry/vite-plugin';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // sentryVitePlugin({
    //   org: process.env.SENTRY_ORG,
    //   project: process.env.SENTRY_PROJECT,
    // }),
  ],

  resolve: {
    alias: {
      '@configs': `${path.resolve(__dirname, './src/configs/')}`,
      '@types': `${path.resolve(__dirname, './src/types/')}`,
      '@components': `${path.resolve(__dirname, './src/components/')}`,
      '@pages': `${path.resolve(__dirname, './src/pages/')}`,
      '@utils': `${path.resolve(__dirname, './src/utils/')}`,
    },
  },

  build: {
    sourcemap: true,
  },
});
