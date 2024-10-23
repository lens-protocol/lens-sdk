import type { UnknownRecord } from 'type-fest';

function isObject(value: unknown): value is UnknownRecord {
  const type = typeof value;
  return value != null && (type === 'object' || type === 'function');
}

export function assertError(error: unknown): asserts error is Error {
  // why not `error instanceof Error`? see https://github.com/microsoft/TypeScript-DOM-lib-generator/issues/1099
  // biome-ignore lint/suspicious/noPrototypeBuiltins: <explanation>
  if (!isObject(error) || !Error.prototype.isPrototypeOf(error)) {
    throw error;
  }
}

import type { Ok, Result } from 'neverthrow';
/**
 * Exhaustiveness checking for union and enum types
 * see https://www.typescriptlang.org/docs/handbook/2/narrowing.html#exhaustiveness-checking
 */
import { InvariantError, invariant } from './invariant';

export function assertNever(x: never, message = `Unexpected object: ${String(x)}`): never {
  throw new InvariantError(message);
}

/**
 * Asserts that the given result is an `Ok` variant.
 */
export function assertOk<T, E>(result: Result<T, E>): asserts result is Ok<T, E> {
  invariant(result.isOk(), 'Expected result to be Ok');
}

/**
 * Asserts that the given result is an `Err` variant.
 */
export function assertErr<T, E>(result: Result<T, E>): asserts result is Result<T, E> {
  invariant(result.isErr(), 'Expected result to be Err');
}
