import { FieldFunctionOptions, FieldPolicy, Reference } from '@apollo/client';
import { never } from '@lens-protocol/shared-kernel';

import { Profile, SingleProfileQueryRequest } from '../../graphql';

export function createProfileFieldPolicy(): FieldPolicy<
  Profile,
  Profile,
  Reference,
  FieldFunctionOptions<{ request: SingleProfileQueryRequest }>
> {
  return {
    read(_, { args, toReference }) {
      return toReference({
        __typename: 'Profile',
        id: args?.request.profileId ?? never(),
      });
    },
  };
}
