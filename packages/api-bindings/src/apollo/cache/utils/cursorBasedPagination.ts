import { FieldPolicy, StoreValue } from '@apollo/client/core';

import { CommonPaginatedResultInfo } from '../../../graphql';

type CursorBasedPagination<T = StoreValue> = {
  items: T[];
  pageInfo: CommonPaginatedResultInfo;
};

// Note: Copied from apollo given it's not exposed publicly
// eslint-disable-next-line @typescript-eslint/ban-types
type SafeReadonly<T> = T extends object ? Readonly<T> : T;

export function cursorBasedPagination<T extends CursorBasedPagination>(
  keyArgs: FieldPolicy['keyArgs'],
): FieldPolicy<T> {
  return {
    keyArgs,

    read(existing: SafeReadonly<T> | undefined, { canRead }) {
      if (!existing) {
        return existing;
      }

      const { items, pageInfo } = existing;

      // items that are not in the cache anymore (for .e.g deleted publication)
      const danglingItems = items.filter((item) => !canRead(item));
      const readRes = {
        ...existing,
        items,
        pageInfo: {
          ...pageInfo,
          // reduce total count by excluding dangling items so it won't cause a new page query
          // after item was removed from the cache (for .e.g deleted publication)
          totalCount:
            pageInfo.totalCount !== null ? pageInfo.totalCount - danglingItems.length : null,
        },
      } as SafeReadonly<T>;

      return readRes;
    },

    merge(existing: Readonly<T> | undefined, incoming: SafeReadonly<T>) {
      if (!existing) {
        return incoming;
      }

      const existingItems = existing.items;
      const incomingItems = incoming.items;

      return {
        ...incoming,
        items: existingItems.concat(incomingItems),
        pageInfo: incoming.pageInfo,
      } as SafeReadonly<T>;
    },
  };
}
