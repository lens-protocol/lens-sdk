import type { PaginatedResultInfo } from '@lens-social/graphql';

/**
 * A standardized data object.
 *
 * All GQL operations should alias their results to `value` to ensure interoperability
 * with this client interface.
 */
export type StandardData<T> = { value: T };

/**
 * A paginated list of items.
 */
export type Paginated<T> = {
  items: readonly T[];
  pageInfo: PaginatedResultInfo;
};
