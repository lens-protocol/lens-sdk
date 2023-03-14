import {
  AnyPublicationFragment,
  useWalletCollectedPublicationsQuery,
} from '@lens-protocol/api-bindings';
import { Prettify } from '@lens-protocol/shared-kernel';

import {
  SubjectiveArgs,
  useActiveProfileAsDefaultObserver,
  useConfigSourcesVariable,
  useLensApolloClient,
} from '../helpers/arguments';
import { PaginatedArgs, PaginatedReadResult, usePaginatedReadResult } from '../helpers/reads';
import { DEFAULT_PAGINATED_QUERY_LIMIT } from '../utils';

type UseCollectablesArgs = Prettify<
  PaginatedArgs<
    SubjectiveArgs<{
      walletAddress: string;
    }>
  >
>;

export function useCollectedPublications({
  walletAddress,
  observerId,
  limit = DEFAULT_PAGINATED_QUERY_LIMIT,
}: UseCollectablesArgs): PaginatedReadResult<AnyPublicationFragment[]> {
  return usePaginatedReadResult(
    useWalletCollectedPublicationsQuery(
      useLensApolloClient(
        useActiveProfileAsDefaultObserver({
          variables: useConfigSourcesVariable({
            walletAddress,
            limit: limit,
            observerId,
          }),
        }),
      ),
    ),
  );
}
