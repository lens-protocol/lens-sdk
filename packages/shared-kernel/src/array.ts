import { InvariantError } from './ts-helpers/invariant';
import { NonEmptyArray } from './ts-helpers/types';

export function hasAtLeastOne<T>(items: ReadonlyArray<T>): items is NonEmptyArray<T> {
  return items.length > 0;
}

export function assertNonEmptyArray<T>(items: ReadonlyArray<T>): asserts items is NonEmptyArray<T> {
  if (!hasAtLeastOne(items)) {
    throw new InvariantError(`Expected array of to have at least one item, but received 0 items`);
  }
}

export function hasJustOne<T>(items: T[]): items is [T] {
  return items.length === 1;
}

export function removeAtIndex<T>(items: T[], index: number): T[] {
  return items.slice(0, index).concat(items.slice(index + 1));
}
