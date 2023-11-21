import { ApolloError } from '@apollo/client';

export enum ApolloServerErrorCode {
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  GRAPHQL_PARSE_FAILED = 'GRAPHQL_PARSE_FAILED',
  GRAPHQL_VALIDATION_FAILED = 'GRAPHQL_VALIDATION_FAILED',
  PERSISTED_QUERY_NOT_FOUND = 'PERSISTED_QUERY_NOT_FOUND',
  PERSISTED_QUERY_NOT_SUPPORTED = 'PERSISTED_QUERY_NOT_SUPPORTED',
  BAD_USER_INPUT = 'BAD_USER_INPUT',
  OPERATION_RESOLUTION_FAILURE = 'OPERATION_RESOLUTION_FAILURE',
  BAD_REQUEST = 'BAD_REQUEST',
}

export function isGraphQLValidationError(e: unknown): boolean {
  if (e instanceof ApolloError) {
    if (
      e.graphQLErrors[0] &&
      e.graphQLErrors[0].extensions &&
      e.graphQLErrors[0].extensions.code === ApolloServerErrorCode.GRAPHQL_VALIDATION_FAILED
    ) {
      return true;
    }
  }

  return false;
}
