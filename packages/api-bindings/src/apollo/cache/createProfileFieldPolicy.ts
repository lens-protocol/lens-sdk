import {
  defaultDataIdFromObject,
  FieldFunctionOptions,
  FieldPolicy,
  Reference,
  StoreObject,
} from '@apollo/client';
import { never } from '@lens-protocol/shared-kernel';

import { Profile, SingleProfileQueryRequest } from '../../lens';

function isProfile(value: StoreObject | undefined): value is Profile {
  return value?.__typename === 'Profile';
}

const identifierPattern =
  defaultDataIdFromObject({ __typename: 'Profile', id: '0x[a-fA-F0-9]{2,}' }) ?? never();
const identifierMatcher = new RegExp(`^${identifierPattern}$`);

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
          id: args.request.profileId,
        });
      }

      const normalizedCacheObject = cache.extract(true);

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
