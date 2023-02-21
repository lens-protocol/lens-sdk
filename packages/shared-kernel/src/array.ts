import { invariant } from './ts-helpers/invariant';
import { NonEmptyArray, TwoAtLeastArray } from './ts-helpers/types';

export function hasAtLeastOne<T>(items: ReadonlyArray<T>): items is NonEmptyArray<T> {
  return items.length > 0;
}

export function assertNonEmptyArray<T>(items: ReadonlyArray<T>): asserts items is NonEmptyArray<T> {
  invariant(
    hasAtLeastOne(items),
    `Expected array of to have at least one item, but received 0 items`,
  );
}

export function hasJustOne<T>(items: ReadonlyArray<T>): items is [T] {
  return items.length === 1;
}

export function assertJustOne<T>(items: ReadonlyArray<T>): asserts items is [T] {
  invariant(hasJustOne(items), 'Expected array of to have exactly one item.');
}

export function removeAtIndex<T>(items: T[], index: number): T[] {
  return items.slice(0, index).concat(items.slice(index + 1));
}

export function hasTwoOrMore<T>(items: ReadonlyArray<T>): items is TwoAtLeastArray<T> {
  return items.length >= 2;
}
