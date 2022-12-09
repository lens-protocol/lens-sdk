import { CausedError } from '@lens-protocol/shared-kernel';

/**
 * @deprecated This error does not model a domain failure mode and promotes real exceptions to be treated as a normal flow.
 * Either create a dedicated error type if your failure is a domain concern or let exceptions bubble up in the call stack.
 */
export class NetworkError extends CausedError {
  name = 'NetworkError' as const;

  constructor(cause: Error) {
    super('Failed to process request', { cause });
  }
}
