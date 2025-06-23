import { InvariantError } from './invariant';

/**
 * Refinement function to check if a value is not null or undefined.
 */
export function nonNullable<T>(value: T): Exclude<T, null | undefined> {
  if (value === null || value === undefined) {
    throw new InvariantError('Value should not be null or undefined');
  }
  return value as Exclude<T, null | undefined>;
}

/**
 * Creates a refinement function to check if a value has a specific `__typename` in a union of types with `__typename`.
 */
export function expectTypename<
  T extends { __typename: string },
  Name extends T['__typename'],
>(typename: Name) {
  return (value: T): Extract<T, { __typename: Name }> => {
    if (value.__typename !== typename) {
      throw new InvariantError(
        `Expected __typename to be "${typename}", but got "${value.__typename}"`,
      );
    }
    return value as Extract<T, { __typename: Name }>;
  };
}
