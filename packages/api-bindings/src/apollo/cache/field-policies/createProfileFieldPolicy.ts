import { FieldFunctionOptions, FieldPolicy, Reference } from '@apollo/client';

import { Profile, ProfileRequest } from '../../../lens';

// this function is not in use
// TODO: investigate correct usage of cache redirect
export function createProfileFieldPolicy(): FieldPolicy<
  Profile,
  Profile,
  Reference,
  FieldFunctionOptions<{ request: ProfileRequest }>
> {
  return {
    read(_, { args, toReference, canRead }) {
      if (!args) {
        return undefined;
      }

      if (args.request?.forProfileId) {
        const ref = toReference({
          __typename: 'Profile',
          id: args.request.forProfileId,
        });

        if (canRead(ref)) {
          return ref;
        }
      }

      return undefined;
    },
  };
}
