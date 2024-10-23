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
 *
 */
export class UnauthenticatedError extends Error {
  name = 'UnauthenticatedError' as const;

  private constructor(message: string, props: { cause: unknown }) {
    super(message, props);
  }

  asResultAsync<T>(): ResultAsync<T, UnauthenticatedError> {
    return errAsync(this);
  }

  static from(error: CombinedError): UnauthenticatedError {
    return new UnauthenticatedError(error.message, { cause: error });
  }
}

export class UnexpectedError extends Error {
  name = 'UnexpectedError' as const;

  private constructor(message: string, props: { cause: unknown }) {
    super(message, props);
  }

  static from(cause: unknown) {
    return new UnexpectedError('An unexpected error occurred', { cause });
  }
}
