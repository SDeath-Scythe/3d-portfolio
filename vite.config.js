// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages deployment configuration
  base: '/3D-Portfolio/',
  assetsInclude: ['**/*.glb', '**/*.gltf'], // Include both .glb and .gltf as assets
});