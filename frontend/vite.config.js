import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'style-import',
      transform: (code, id) => {
        if (id.includes('node_modules') && id.endsWith('.css')) {
          return code.replace(/\/style\/?'/g, "/style/css'");
        }
      },
    },
  ],
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
