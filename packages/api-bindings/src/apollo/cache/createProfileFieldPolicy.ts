import { FieldFunctionOptions, FieldPolicy, Reference, StoreObject } from '@apollo/client';
import { never } from '@lens-protocol/shared-kernel';

import { Profile, SingleProfileQueryRequest } from '../../graphql';

function isProfile(value: StoreObject | undefined): value is Profile {
  return value?.__typename === 'Profile';
}

export function createProfileFieldPolicy(): FieldPolicy<
  Profile,
  Profile,
  Reference,
  FieldFunctionOptions<{ request: SingleProfileQueryRequest }>
> {
  return {
    keyArgs: [['request', ['profileId', 'handle']], '$observerId', '$sources'],

    read(_, { args, toReference, cache }) {
      if (args?.request.profileId) {
        return toReference({
          __typename: 'Profile',
          id: args?.request.profileId ?? never(),
        });
      }

      const identifierPattern =
        cache.identify({ __typename: 'Profile', id: '0x[a-fA-F0-9]{2,}' }) ?? never();
      const identifierMatcher = new RegExp(`^${identifierPattern}$`);

      const normalizedCacheObject = cache.extract(true) as Record<string, StoreObject>;

      for (const key in normalizedCacheObject) {
        const value = normalizedCacheObject[key];

        if (
          identifierMatcher.test(key) &&
          isProfile(value) &&
          value.handle === args?.request.handle
        ) {
          return toReference(value);
        }
      }
      return;
    },
  };
}
