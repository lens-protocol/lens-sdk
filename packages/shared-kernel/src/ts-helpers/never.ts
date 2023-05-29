import { InvariantError } from './invariant';

export function never(message = 'Unexpected call to never()'): never {
  throw new InvariantError(message);
}
