import { CausedError } from '@lens-protocol/shared-kernel';

export class NetworkError extends CausedError {
  name = 'NetworkError' as const;

  constructor(cause: Error) {
    super('Failed to process request', { cause });
  }
}
