import type { Err, Ok, Result } from 'neverthrow';
import type { UnknownRecord } from 'type-fest';
import { InvariantError } from './invariant';

function isObject(value: unknown): value is UnknownRecord {
  const type = typeof value;
  return value != null && (type === 'object' || type === 'function');
}

export function assertError(error: unknown): asserts error is Error {
  // why not `error instanceof Error`? see https://github.com/microsoft/TypeScript-DOM-lib-generator/issues/1099
  // biome-ignore lint/suspicious/noPrototypeBuiltins: safe
  if (!isObject(error) || !Error.prototype.isPrototypeOf(error)) {
    throw error;
  }
}

/**
 * Exhaustiveness checking for union and enum types
 * see https://www.typescriptlang.org/docs/handbook/2/narrowing.html#exhaustiveness-checking
 */
export function assertNever(
  x: never,
  message = `Unexpected object: ${String(x)}`,
): never {
  throw new InvariantError(message);
}

/**
 * Asserts that the given `Result<T, E>` is an `Ok<T, never>` variant.
 */
export function assertOk<T, E extends Error>(
  result: Result<T, E>,
): asserts result is Ok<T, E> {
  if (result.isErr()) {
    throw new InvariantError(
      `Expected result to be Ok: ${result.error.message}`,
    );
  }
}

/**
 * Asserts that the given `Result<T, E>` is an `Err<never, E>` variant.
 */
export function assertErr<T, E extends Error>(
  result: Result<T, E>,
): asserts result is Err<T, E> {
  if (result.isOk()) {
    throw new InvariantError(`Expected result to be Err: ${result.value}`);
  }
}

/**
 * Asserts that the given value is not `null`.
 */
export function assertNotNull<T>(value: T): asserts value is Exclude<T, null> {
  if (value === null) {
    throw new InvariantError('Expected value to be not null');
  }
}
