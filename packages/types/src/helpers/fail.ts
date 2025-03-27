/**
 * Throws the provided value and marks the function as never returning.
 *
 * Useful as a utility in functions that are expected to halt execution,
 * such as in unreachable code paths, error boundaries, or exhaustive checks.
 *
 * @param value - The value to throw, typically an Error or string.
 * @throws Always throws the provided value.
 * @experimental This function is not yet stable and may change in the future.
 */
export function fail(value: unknown): never {
  throw value;
}
