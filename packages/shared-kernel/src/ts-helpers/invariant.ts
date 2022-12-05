export class InvariantError extends Error {
  constructor(message: string) {
    super(`InvariantError: ${message}`);
  }
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
