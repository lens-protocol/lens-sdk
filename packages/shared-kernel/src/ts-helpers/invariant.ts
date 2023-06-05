/**
 * An error that occurs when a task violates a logical condition that is assumed to be true at all times.
 */
export class InvariantError extends Error {
  name = 'InvariantError' as const;
}

/**
 * Asserts that the given condition is truthy
 *
 * @param condition - Either truthy or falsy value
 * @param message - An error message
 */
export function invariant(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new InvariantError(message);
  }
}
