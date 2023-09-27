import { TypePolicy } from '@apollo/client';

/**
 * Use this to declare a type policy for an object that should not be normalized.
 * Non-normalized objects are embedded within their parent object in the cache.
 *
 * See https://www.apollographql.com/docs/react/caching/cache-configuration/#disabling-normalization
 *
 * @returns a TypePolicy that does not cache the result of the field
 */
export function notNormalizedType(others?: Omit<TypePolicy, 'keyFields'>) {
  return {
    keyFields: false,

    ...others,
  } as const;
}
