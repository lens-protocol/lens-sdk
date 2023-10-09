import { CausedError } from '@lens-protocol/shared-kernel';

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
    super('A validation error occurred', { cause });
  }
}
