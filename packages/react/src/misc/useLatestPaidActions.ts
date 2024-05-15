import {
  AnyPaidAction,
  LatestPaidActionsFilter,
  LatestPaidActionsWhere,
  useLatestPaidActions as useLatestPaidActionsBase,
} from '@lens-protocol/api-bindings';

import { useLensApolloClient } from '../helpers/arguments';
import { PaginatedArgs, PaginatedReadResult, usePaginatedReadResult } from '../helpers/reads';
import { useFragmentVariables } from '../helpers/variables';

export type {
  OpenActionPaidAction,
  FollowPaidAction,
  LatestActed,
} from '@lens-protocol/api-bindings';

export type LatestPaidActionRequest = {
  filter?: LatestPaidActionsFilter;
  where?: LatestPaidActionsWhere;
};

export type { AnyPaidAction };

/**
 * {@link useLatestPaidActions} hook arguments
 */
export type UseLatestPaidActionsArgs = PaginatedArgs<LatestPaidActionRequest>;

/**
 * Fetch a paginated result of paid actions (e.g. follows and collects with fee) for the authenticated profile.
 *
 * The results are sorted by the latest action first.
 *
 * @example
 * ```tsx
 * const { data, loading, error } = useLatestPaidActions();
 * ```
 * @category Discovery
 * @group Hooks
 * @param args - {@link UseLatestPaidActionsArgs}
 */
export function useLatestPaidActions({
  filter,
  where,
}: UseLatestPaidActionsArgs = {}): PaginatedReadResult<AnyPaidAction[]> {
  return usePaginatedReadResult(
    useLatestPaidActionsBase(
      useLensApolloClient({
        variables: useFragmentVariables({
          filter,
          where,
        }),
      }),
    ),
  );
}
