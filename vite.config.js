// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const isProduction = command === 'build';
  
  return {
    plugins: [react()],
    // GitHub Pages deployment configuration - only for production
    base: isProduction ? '/3d-portfolio/' : '/',
    assetsInclude: ['**/*.glb', '**/*.gltf'], // Include both .glb and .gltf as assets
  };
});