/* eslint-disable import/no-default-export */
import { defineConfig } from 'tsup';

export default defineConfig(() => ({
  entry: ['src/index.ts', 'src/ethers.ts', 'src/viem.ts'],
  outDir: 'dist',
  splitting: false,
  sourcemap: true,
  treeshake: false,
  clean: true,
  tsconfig: 'tsconfig.build.json',
  bundle: true,
  minify: true,
  dts: true,
  platform: 'neutral',
  format: ['esm', 'cjs'],
}));
