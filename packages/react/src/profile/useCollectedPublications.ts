import { AnyPublication, PublicationTypes, useGetPublications } from '@lens-protocol/api-bindings';
import { EthereumAddress } from '@lens-protocol/shared-kernel';

import {
  useActiveProfileAsDefaultObserver,
  useLensApolloClient,
  useMediaTransformFromConfig,
  useSourcesFromConfig,
  WithObserverIdOverride,
} from '../helpers/arguments';
import { PaginatedArgs, PaginatedReadResult, usePaginatedReadResult } from '../helpers/reads';
import { DEFAULT_PAGINATED_QUERY_LIMIT } from '../utils';

type UseCollectablesArgs = PaginatedArgs<
  WithObserverIdOverride<{
    walletAddress: EthereumAddress;
  }>
>;

/**
 * @category Publications
 * @group Hooks
 */
export function useCollectedPublications({
  walletAddress,
  observerId,
  limit = DEFAULT_PAGINATED_QUERY_LIMIT,
}: UseCollectablesArgs): PaginatedReadResult<AnyPublication[]> {
  return usePaginatedReadResult(
    useGetPublications(
      useLensApolloClient(
        useActiveProfileAsDefaultObserver({
          variables: useMediaTransformFromConfig(
            useSourcesFromConfig({
              walletAddress,
              publicationTypes: [
                PublicationTypes.Comment,
                PublicationTypes.Mirror,
                PublicationTypes.Post,
              ],
              limit: limit,
              observerId,
            }),
          ),
        }),
      ),
    ),
  );
}
