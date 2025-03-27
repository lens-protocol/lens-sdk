import type { Tagged, UnwrapTagged } from 'type-fest';

type AnyTagged = Tagged<unknown, PropertyKey>;

/**
 * A generic function that, when given some tagged type, can take a value with
 * the base type of the branded type, and assert that value to the tagged type.
 *
 * @param value - The value to assert to the tagged type.
 * @returns The tagged value.
 */
export function tag<T extends AnyTagged>(value: UnwrapTagged<T>): T {
  return value as T;
}
