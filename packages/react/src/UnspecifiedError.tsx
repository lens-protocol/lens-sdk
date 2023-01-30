import { CausedError } from '@lens-protocol/shared-kernel';

export class UnspecifiedError extends CausedError {
  name = 'UnspecifiedError' as const;

  constructor(cause: Error) {
    super('An unspecified error occurred', { cause });
  }
}
