import { FieldPolicy } from '@apollo/client/core';

export function createPublicationFieldPolicy(): FieldPolicy<unknown> {
  return {
    read(_, { args, toReference }) {
      console.log(args);

      // @ts-ignore
      return toReference({
        __typename: 'Comment',
        id: args.request.publicationId,
      });
    },
  };
}
