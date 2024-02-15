import { ApolloError, FetchResult, ServerError } from '@apollo/client';
import { CausedError, isObject } from '@lens-protocol/shared-kernel';

/**
 * @internal
 */
export enum ApolloServerErrorCode {
  BAD_REQUEST = 'BAD_REQUEST',
  BAD_USER_INPUT = 'BAD_USER_INPUT',
  FORBIDDEN = 'FORBIDDEN',
  GRAPHQL_PARSE_FAILED = 'GRAPHQL_PARSE_FAILED',
  GRAPHQL_VALIDATION_FAILED = 'GRAPHQL_VALIDATION_FAILED',
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  OPERATION_RESOLUTION_FAILURE = 'OPERATION_RESOLUTION_FAILURE',
  PERSISTED_QUERY_NOT_FOUND = 'PERSISTED_QUERY_NOT_FOUND',
  PERSISTED_QUERY_NOT_SUPPORTED = 'PERSISTED_QUERY_NOT_SUPPORTED',
  UNAUTHENTICATED = 'UNAUTHENTICATED',
}

/**
 * @internal
 */
export function isValidationApolloError(e: unknown): e is ApolloError {
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

/**
 * @internal
 */
export function graphQLResultHasUnauthenticatedError<T>(result: FetchResult<T>) {
  return (
    result.errors &&
    result.errors.some((e) => e.extensions?.code === ApolloServerErrorCode.UNAUTHENTICATED)
  );
}

/**
 * @internal
 */
export function isServerError(error: unknown): error is ServerError {
  return (
    isObject(error) &&
    error instanceof Error &&
    error.name === 'ServerError' &&
    `statusCode` in error
  );
}

/**
 * @internal
 */
export function isUnauthorizedServerError(error: unknown): error is ServerError {
  return isServerError(error) && error.statusCode === 401;
}

/**
 * An unexpected error, usually from an API response.
 *
 * See the error message for more details.
 */
export class UnspecifiedError extends CausedError {
  name = 'UnspecifiedError' as const;

  constructor(cause: Error) {
    super(cause.message, { cause });
  }
}

/**
 * A GraphQL validation error from the API.
 *
 * See the error message for more details.
 */
export class ValidationError extends CausedError {
  name = 'ValidationError' as const;

  constructor(cause: Error) {
    super(cause.message, { cause });
  }
}
