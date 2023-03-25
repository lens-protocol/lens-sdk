import { FieldPolicy } from '@apollo/client';

export function noCachedField(): FieldPolicy {
  return {
    // no arguments involved in caching this edge
    keyArgs: false,
  };
}
