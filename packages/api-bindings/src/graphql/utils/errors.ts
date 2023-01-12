import { ApolloError } from '@apollo/client';

export function isGraphqlValidationError(e: unknown): boolean {
  if (e instanceof ApolloError) {
    if (
      e.graphQLErrors[0] &&
      e.graphQLErrors[0].extensions &&
      e.graphQLErrors[0].extensions.code === 'GRAPHQL_VALIDATION_FAILED'
    ) {
      return true;
    }
  }

  return false;
}
