/**
 * Exhaustiveness checking for union and enum types
 * see https://www.typescriptlang.org/docs/handbook/2/narrowing.html#exhaustiveness-checking
 */
import { InvariantError } from './invariant';

export function assertNever(x: never, message = `Unexpected object: ${String(x)}`): never {
  throw new InvariantError(message);
}
