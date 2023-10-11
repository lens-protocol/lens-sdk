import { FieldFunctionOptions, FieldPolicy, Reference } from '@apollo/client';

import { AnyPublication, PublicationRequest } from '../../../lens';
import { PUBLICATION_TYPENAME } from '../type-policies';

export function createPublicationFieldPolicy(): FieldPolicy<
  AnyPublication,
  AnyPublication,
  Reference,
  FieldFunctionOptions<{ request: PublicationRequest }>
> {
  return {
    read(_, { args, toReference }) {
      return toReference({
        __typename: PUBLICATION_TYPENAME,
        id: args?.request.forId,
      });
    },
  };
}
