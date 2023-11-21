import { FieldPolicy } from '@apollo/client';

export function oneToOneRelationship(others?: Omit<FieldPolicy, 'keyArgs'>): FieldPolicy {
  return {
    // no arguments involved in caching this edge
    keyArgs: false,
    ...others,
  };
}
