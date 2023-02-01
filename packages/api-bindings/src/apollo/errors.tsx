import { CausedError } from '@lens-protocol/shared-kernel';

export class UnspecifiedError extends CausedError {
  name = 'UnspecifiedError' as const;

  constructor(cause: Error) {
    super('An unspecified error occurred', { cause });
  }
}

export class ValidationError extends CausedError {
  name = 'ValidationError' as const;

  constructor(cause: Error) {
    super('A validation error occurred', { cause });
  }
}
