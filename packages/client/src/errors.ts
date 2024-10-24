import { type ResultAsync, errAsync } from '@lens-social/types';
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

class ResultAwareError extends Error {
  asResultAsync<T>(): ResultAsync<T, typeof this> {
    return errAsync(this);
  }
}

/**
 * Error indicating a user is not authenticated.
 */
export class UnauthenticatedError extends ResultAwareError {
  name = 'UnauthenticatedError' as const;

  private constructor(message: string, props: { cause: unknown }) {
    super(message, props);
  }

  static from(error: CombinedError): UnauthenticatedError {
    return new UnauthenticatedError(error.message, { cause: error });
  }
}

/**
 * Error indicating an unexpected condition occurred.
 */
export class UnexpectedError extends ResultAwareError {
  name = 'UnexpectedError' as const;

  private constructor(message: string, props: { cause: unknown }) {
    super(message, props);
  }

  static from(cause: unknown) {
    return new UnexpectedError('An unexpected error occurred', { cause });
  }
}

export class AuthenticationError extends ResultAwareError {
  name = 'AuthenticationError' as const;

  static from(message: string) {
    return new AuthenticationError(message);
  }
}

/**
 * Error indicating an error occurred while signing.
 */
export class SigningError extends ResultAwareError {
  name = 'SigningError' as const;

  static from(cause: unknown) {
    return new SigningError('An error occurred while signing', { cause });
  }
}
