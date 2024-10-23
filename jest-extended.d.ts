import type CustomMatchers from 'jest-extended';
import 'vitest';

declare module 'vitest' {
  interface Assertion<T = unknown> extends CustomMatchers<T> {}
  interface AsymmetricMatchersContaining<T = unknown> extends CustomMatchers<T> {}
  interface ExpectStatic extends CustomMatchers<T> {}
}
