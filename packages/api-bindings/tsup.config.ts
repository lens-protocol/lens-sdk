import { defineConfig } from 'tsup';

import { dependencies, devDependencies } from './package.json';

export default defineConfig({
  entry: ['src/index.ts', 'src/mocks.ts'],
  format: ['esm'],
  dts: true,
  external: [
    ...Object.keys(dependencies),
    // required to not bundle `jest` into exported mocks
    ...Object.keys(devDependencies),
  ],
});
