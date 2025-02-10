import type { Tagged } from 'type-fest';

/**
 * A boolean that is always true.
 *
 * This is mostly used in GQL union where one item represents a success case
 * but there is no need to return any additional data.
 *
 * Since GQL type system does not allow to define an empty type, we use this
 * type to represent a success case.
 */
export type AlwaysTrue = Tagged<boolean, 'AlwaysTrue'>;
