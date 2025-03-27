/**
 * The identity function returns the input value unchanged.
 *
 * @typeParam T - The type of the input and output.
 * @param value - The value to return.
 * @returns The same value that was passed in.
 */
export function identity<T>(value: T): T {
  return value;
}

/**
 * Alias for the {@link identity} function.
 */
export const passthrough = identity;
