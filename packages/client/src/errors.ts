import { ResultAwareError } from '@lens-protocol/types';
import type { CombinedError } from '@urql/core';
import type { ErrorResponse } from './types';

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

/**
 * Error indicating a user is not authorized.
 */
export class AuthenticationError extends ResultAwareError {
  name = 'AuthenticationError' as const;
}

/**
 * Error indicating an error occurred while signing.
 */
export class SigningError extends ResultAwareError {
  name = 'SigningError' as const;
}

/**
 * Error indicating a transaction failed.
 */
export class TransactionError extends ResultAwareError {
  name = 'TransactionError' as const;
}

/**
 * Error indicating a transaction failed to index.
 */
export class TransactionIndexingError extends ResultAwareError {
  name = 'TransactionIndexingError' as const;
}

/**
 * Error indicating metadata failed to index.
 */
export class MetadataIndexingError extends ResultAwareError {
  name = 'MetadataIndexingError' as const;
}

/**
 * Error indicating an operation was not executed due to a validation error.
 * See the `cause` property for more information.
 */
export class ValidationError<T extends string> extends ResultAwareError {
  name = 'ValidationError' as const;

  constructor(public readonly cause: ErrorResponse<T>) {
    super(cause.reason);
  }

  static fromErrorResponse<T extends string>(error: ErrorResponse<T>): ValidationError<T> {
    return new ValidationError(error);
  }
}
