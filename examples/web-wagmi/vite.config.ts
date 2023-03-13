/* eslint-disable import/no-default-export */
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig, PluginOption } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), nodePolyfills({ protocolImports: true }), visualizer() as PluginOption],

  build: {
    target: 'esnext',
    minify: 'esbuild',

    rollupOptions: {
      treeshake: {
        preset: 'safest',
      },
    },
  },

  define: {
    'process.env': {},
  },
});
