import { FieldPolicy } from './TypePolicy';

export function noCachedField<T>(): FieldPolicy<T, unknown> {
  return {
    // no arguments involved in caching this edge
    keyArgs: false,
  };
}
