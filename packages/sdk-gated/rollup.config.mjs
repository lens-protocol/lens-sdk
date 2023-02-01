import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import nodeGlobals from 'rollup-plugin-node-globals';
import nodePolyfills from 'rollup-plugin-polyfill-node';
import terser from '@rollup/plugin-terser';
import bundleSize from 'rollup-plugin-bundle-size';

const isProduction = process.env.NODE_ENV === 'production';

export default [
  {
    input: 'src/index.ts',
    external: ['crypto'],
    output: [
      {
        sourcemap: true,
        file: 'dist/index.js',
        format: 'cjs',
      },
      {
        sourcemap: true,
        file: 'dist/index.mjs',
        format: 'es',
      },
    ],
    plugins: [
      typescript(),
      commonjs({
        exclude: ['crypto'],
      }),
      resolve({
        mainFields: ['module', 'main'],
        dedupe: ['bn.js', '@ethersproject/*'],
        preferBuiltins: true,
      }),
      json(),
      nodeGlobals(),
      nodePolyfills(),
      isProduction && terser({sourceMap: true}),
      bundleSize(),
    ],
  },
  {
    input: 'src/index.ts',
    external: ['crypto'],
    output: [
      {
        sourcemap: false,
        file: 'dist/browser.js',
        format: 'umd',
        name: 'LensGatedSDK',
        globals: {
          fetch: 'fetch',
          crypto: 'crypto',
        },
      },
    ],
    plugins: [
      typescript(),
      commonjs({
        exclude: ['crypto'],
      }),
      resolve({
        mainFields: ['browser'],
        dedupe: ['bn.js', '@ethersproject/*'],
        preferBuiltins: true,
      }),
      json(),
      nodeGlobals(),
      nodePolyfills({
        exclude: ['crypto'],
      }),
      isProduction && terser({
        sourceMap: true,
      }),
      bundleSize(),
    ],
  },
];
