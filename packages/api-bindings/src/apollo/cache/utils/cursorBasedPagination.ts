import { FieldFunctionOptions, KeySpecifier } from '@apollo/client/cache/inmemory/policies';
import { FieldPolicy } from '@apollo/client/core';
import { InvariantError } from '@lens-protocol/shared-kernel';

import { CursorBasedPaginatedResult, isCursor } from '../../../graphql';

// Note: Copied from apollo given it's not exposed publicly
// eslint-disable-next-line @typescript-eslint/ban-types
type SafeReadonly<T> = T extends object ? Readonly<T> : T;

export function cursorBasedPagination<TResult extends CursorBasedPaginatedResult>(
  keyArgs: KeySpecifier,
): FieldPolicy<TResult> {
  return {
    keyArgs,

    read(existing: SafeReadonly<TResult> | undefined, { canRead }) {
      if (!existing) {
        return existing;
      }

      const { items, pageInfo } = existing;

      // items that are not in the cache anymore (for .e.g deleted publication)
      const danglingItems = items.filter((item) => !canRead(item));
      const readRes: SafeReadonly<TResult> = {
        ...existing,
        items,
        pageInfo: {
          ...pageInfo,
          beforeCount: existing.pageInfo.beforeCount ?? 0,
          moreAfter: existing.pageInfo.moreAfter ?? existing.pageInfo.next !== null,
          // reduce total count by excluding dangling items so it won't cause a new page query
          // after item was removed from the cache (for .e.g deleted publication)
          totalCount:
            pageInfo.totalCount !== null ? pageInfo.totalCount - danglingItems.length : null,
        },
      };

      return readRes;
    },

    merge(
      existing: Readonly<TResult> | undefined,
      incoming: SafeReadonly<TResult>,
      { variables = {} }: FieldFunctionOptions,
    ) {
      if (!isCursor(variables.cursor) || !existing) {
        return {
          ...incoming,
          pageInfo: {
            ...incoming.pageInfo, // future-proofing in case we add more fields to pageInfo
            beforeCount: 0, // assume there is no newer results than the provided
            moreAfter: incoming.pageInfo.next !== null,
          },
        };
      }

      const existingItems = existing.items;
      const incomingItems = incoming.items;

      if (variables.cursor === existing.pageInfo.prev) {
        return {
          ...incoming,
          items: incomingItems.concat(existingItems),
          pageInfo: {
            ...incoming.pageInfo, // future-proofing in case we add more fields to pageInfo
            beforeCount: incoming.pageInfo.beforeCount,
            moreAfter: existing.pageInfo.next !== null,
            next: existing.pageInfo.next,
            prev: incoming.pageInfo.prev ?? existing.pageInfo.prev,
          },
        };
      }

      if (variables.cursor === existing.pageInfo.next) {
        return {
          ...incoming,
          items: existingItems.concat(incomingItems),
          pageInfo: {
            ...incoming.pageInfo, // future-proofing in case we add more fields to pageInfo
            beforeCount: incoming.pageInfo.beforeCount,
            moreAfter: incoming.pageInfo.next !== null,
            next: incoming.pageInfo.next ?? existing.pageInfo.next,
            prev: existing.pageInfo.prev,
          },
        };
      }

      throw new InvariantError('Unable to merge incoming cursor-based pagination result');
    },
  };
}
