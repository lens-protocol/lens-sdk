import { defineConfig } from 'tsup';

import { dependencies, devDependencies, peerDependencies } from './package.json';

export default defineConfig({
  entry: ['src/index.ts', 'src/mocks.ts'],
  format: ['esm'],
  dts: true,
  external: [
    ...Object.keys(dependencies),
    ...Object.keys(peerDependencies),
    // required to not bundle `jest` into exported mocks
    ...Object.keys(devDependencies),
  ],
});
