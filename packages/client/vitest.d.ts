import 'vitest';

declare module 'vitest' {
  interface AsymmetricMatchersContaining extends JestExtendedMatchers {}
}
