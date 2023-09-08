import { CausedError, IEquatableError } from '@lens-protocol/shared-kernel';

export class CannotDecryptError extends CausedError implements IEquatableError {
  name = 'CannotDecryptError' as const;
}
