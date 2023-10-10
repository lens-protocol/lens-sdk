import { AddReactionDocument, AddReactionVariables } from '../../graphql/generated';

export function mockAddReactionResponse({ variables }: { variables: AddReactionVariables }) {
  return {
    request: {
      query: AddReactionDocument,
      variables,
    },
    result: {
      data: { addReaction: null },
    },
  };
}
