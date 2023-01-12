import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.tsx', 'src/web/index.ts'],
  format: ['esm'],
  dts: true,
});
