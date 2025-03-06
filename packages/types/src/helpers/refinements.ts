/**
 * Refinement function to check if a value is not null or undefined.
 */
export function nonNullable<T>(value: T): Exclude<T, null | undefined> {
  if (value === null || value === undefined) {
    throw new Error('Value should not be null or undefined');
  }
  return value as Exclude<T, null | undefined>;
}
