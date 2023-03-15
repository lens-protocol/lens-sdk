import {
  ProfileOwnedByMeFragment,
  useGetAllProfilesByOwnerAddressQuery,
} from '@lens-protocol/api-bindings';
import { never } from '@lens-protocol/shared-kernel';
import { constants } from 'ethers';

import {
  WithObserverIdOverride,
  useActiveProfileAsDefaultObserver,
  useSourcesFromConfig,
  useLensApolloClient,
} from '../helpers/arguments';
import { PaginatedArgs, PaginatedReadResult, usePaginatedReadResult } from '../helpers/reads';
import { useRecentProfiles } from '../transactions/adapters/responders/CreateProfileResponder';
import { DEFAULT_PAGINATED_QUERY_LIMIT } from '../utils';
import { useActiveWallet } from '../wallet';

export type UseProfilesOwnedByMeArgs = PaginatedArgs<WithObserverIdOverride>;

export function useProfilesOwnedByMe({
  observerId,
  limit = DEFAULT_PAGINATED_QUERY_LIMIT,
}: UseProfilesOwnedByMeArgs = {}): PaginatedReadResult<ProfileOwnedByMeFragment[]> {
  const { data: activeWallet, loading: bootstrapping } = useActiveWallet();
  const recentProfiles = useRecentProfiles();

  const result = usePaginatedReadResult(
    useGetAllProfilesByOwnerAddressQuery(
      useLensApolloClient(
        useActiveProfileAsDefaultObserver({
          variables: useSourcesFromConfig({
            address: bootstrapping
              ? constants.AddressZero
              : activeWallet?.address ??
                never(
                  `Cannot use 'useProfilesOwnedByMe' without being logged in. Use 'useWalletLogin' to log in first.`,
                ),
            observerId,
            limit,
          }),
          skip: bootstrapping && activeWallet === null,
        }),
      ),
    ),
  );

  return {
    ...result,
    data: result.data ? [...result.data, ...recentProfiles] : result.data,
  } as PaginatedReadResult<ProfileOwnedByMeFragment[]>;
}
