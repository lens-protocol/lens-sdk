import { ProfileFragment, useGetAllProfilesByOwnerAddressQuery } from '@lens-protocol/api-bindings';
import { EthereumAddress } from '@lens-protocol/shared-kernel';

import {
  WithObserverIdOverride,
  useActiveProfileAsDefaultObserver,
  useSourcesFromConfig,
  useLensApolloClient,
} from '../helpers/arguments';
import { PaginatedArgs, PaginatedReadResult, usePaginatedReadResult } from '../helpers/reads';
import { DEFAULT_PAGINATED_QUERY_LIMIT } from '../utils';

export type UseProfilesOwnedByArgs = PaginatedArgs<
  WithObserverIdOverride<{
    address: EthereumAddress;
  }>
>;

export function useProfilesOwnedBy({
  address,
  observerId,
  limit = DEFAULT_PAGINATED_QUERY_LIMIT,
}: UseProfilesOwnedByArgs): PaginatedReadResult<ProfileFragment[]> {
  return usePaginatedReadResult(
    useGetAllProfilesByOwnerAddressQuery(
      useLensApolloClient(
        useActiveProfileAsDefaultObserver({
          variables: useSourcesFromConfig({
            address,
            observerId,
            limit,
          }),
        }),
      ),
    ),
  );
}
