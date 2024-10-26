import type { Err, Ok, Result } from 'neverthrow';
import type { UnknownRecord } from 'type-fest';
import { InvariantError, invariant } from './invariant';

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

/**
 * Exhaustiveness checking for union and enum types
 * see https://www.typescriptlang.org/docs/handbook/2/narrowing.html#exhaustiveness-checking
 */
export function assertNever(x: never, message = `Unexpected object: ${String(x)}`): never {
  throw new InvariantError(message);
}

/**
 * Asserts that the given `Result<T, E>` is an `Ok<T, never>` variant.
 */
export function assertOk<T, E extends Error>(result: Result<T, E>): asserts result is Ok<T, E> {
  invariant(result.isOk(), `Expected result to be Ok: ${result._unsafeUnwrapErr().message}`);
}

/**
 * Asserts that the given `Result<T, E>` is an `Err<never, E>` variant.
 */
export function assertErr<T, E extends Error>(result: Result<T, E>): asserts result is Err<T, E> {
  invariant(result.isErr(), 'Expected result to be Err');
}
