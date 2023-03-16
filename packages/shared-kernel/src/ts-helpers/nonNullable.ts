import { InvariantError } from './invariant';

/**
 *  Cast a `value` to exclude `null` and `undefined`.
 *  Throws if either `null` or `undefined` was passed
 */
export function nonNullable<T>(value: T, message: string): NonNullable<T> {
  if (value !== undefined && value !== null) {
    return value as NonNullable<T>;
  }

  throw new InvariantError(
    `Non nullable values expected, received ${String(value)} with message: ${message}`,
  );
}

export function isNonNullable<T>(value: T): value is NonNullable<T> {
  return value !== null && value !== undefined;
}
