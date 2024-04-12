import { FieldFunctionOptions, FieldPolicy, Reference } from '@apollo/client';

import { ProfileRequest } from '../../../lens';

export function createProfileFieldPolicy(): FieldPolicy<
  Reference,
  Reference,
  Reference,
  FieldFunctionOptions<{ request: ProfileRequest }>
> {
  return {
    read(existing, { args, toReference, canRead }) {
      if (existing) {
        return existing;
      }

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
