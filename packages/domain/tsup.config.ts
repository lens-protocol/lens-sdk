import { defineConfig } from 'tsup';

import { dependencies, devDependencies } from './package.json';

export default defineConfig({
  entry: [
    'src/index.ts',
    'src/mocks.ts',
    'src/entities/index.ts',
    'src/use-cases/index.ts',
    'src/use-cases/**/index.ts',
  ],

  format: ['esm', 'cjs'],
  dts: true,
  external: [
    ...Object.keys(dependencies),
    // required to not bundle `jest` into exported mocks
    ...Object.keys(devDependencies),
  ],
});
