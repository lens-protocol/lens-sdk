import {
  FieldFunctionOptions,
  KeyArgsFunction,
  KeySpecifier,
} from '@apollo/client/cache/inmemory/policies';
import { FieldPolicy } from '@apollo/client/core';
import { never } from '@lens-protocol/shared-kernel';

import { CursorBasedPaginatedResult, isCursor } from '../../../lens';

// Note: Copied from apollo given it's not exposed publicly
// eslint-disable-next-line @typescript-eslint/ban-types
type SafeReadonly<T> = T extends object ? Readonly<T> : T;

function isEndOfTheRoad<TResult extends CursorBasedPaginatedResult>(result: TResult) {
  return (
    result.pageInfo.next === null && result.pageInfo.prev === null && result.items.length === 0
  );
}
export function cursorBasedPagination<TResult extends CursorBasedPaginatedResult>(
  keyArgs: KeySpecifier | KeyArgsFunction | false,
): FieldPolicy<TResult> {
  return {
    keyArgs,

    merge(
      existing: SafeReadonly<TResult> | undefined,
      incoming: SafeReadonly<TResult>,
      { variables = {} }: FieldFunctionOptions,
    ) {
      if (!isCursor(variables.cursor) || !existing) {
        return incoming;
      }

      const existingItems = existing.items;
      const incomingItems = incoming.items;
      if (variables.cursor === existing.pageInfo.prev) {
        if (isEndOfTheRoad(incoming)) {
          return {
            ...incoming,
            items: existingItems,
            pageInfo: {
              ...incoming.pageInfo, // future-proofing in case we add more fields to pageInfo
              next: existing.pageInfo.next,
              prev: existing.pageInfo.prev,
            },
          };
        }

        return {
          ...incoming,
          items: incomingItems.concat(existingItems),
          pageInfo: {
            ...incoming.pageInfo, // future-proofing in case we add more fields to pageInfo
            next: existing.pageInfo.next,
            prev: incoming.pageInfo.prev ?? existing.pageInfo.prev,
          },
        };
      }

      if (variables.cursor === existing.pageInfo.next) {
        if (isEndOfTheRoad(incoming)) {
          return {
            ...incoming,
            items: existingItems,
            pageInfo: {
              ...incoming.pageInfo, // future-proofing in case we add more fields to pageInfo
              next: existing.pageInfo.next,
              prev: existing.pageInfo.prev,
            },
          };
        }

        return {
          ...incoming,
          items: existingItems.concat(incomingItems),
          pageInfo: {
            ...incoming.pageInfo, // future-proofing in case we add more fields to pageInfo
            next: incoming.pageInfo.next,
            prev: existing.pageInfo.prev,
          },
        };
      }

      never('Unable to merge incoming cursor-based pagination result');
    },
  };
}
