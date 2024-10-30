import { ResultAwareError } from '@lens-social/types';
import type { CombinedError } from '@urql/core';

/**
 * @internal
 */
export enum GraphQLErrorCode {
  UNAUTHENTICATED = 'UNAUTHENTICATED',
  FORBIDDEN = 'FORBIDDEN',
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  BAD_USER_INPUT = 'BAD_USER_INPUT',
  BAD_REQUEST = 'BAD_REQUEST',
}
/**
 * @internal
 */
export function hasExtensionCode(error: CombinedError, code: GraphQLErrorCode): boolean {
  return error.graphQLErrors.some((gqlError) => {
    return gqlError.extensions?.code === code;
  });
}

/**
 * Error indicating a user is not authenticated.
 */
export class UnauthenticatedError extends ResultAwareError {
  name = 'UnauthenticatedError' as const;

  static fromCombinedError(error: CombinedError): UnauthenticatedError {
    return new UnauthenticatedError(error.message, { cause: error });
  }
}

/**
 * Error indicating an unexpected condition occurred.
 */
export class UnexpectedError extends ResultAwareError {
  name = 'UnexpectedError' as const;
}

export class AuthenticationError extends ResultAwareError {
  name = 'AuthenticationError' as const;
}

/**
 * Error indicating an error occurred while signing.
 */
export class SigningError extends ResultAwareError {
  name = 'SigningError' as const;
}
