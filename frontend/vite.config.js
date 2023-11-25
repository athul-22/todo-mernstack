import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
      },
      fs: {
        allow: ['./'], // Adjust this to allow access to the required directories
      },
    },
  },
  optimizeDeps: {
    include: ['moment', 'lodash'], // Add the external dependencies here
  },
});
