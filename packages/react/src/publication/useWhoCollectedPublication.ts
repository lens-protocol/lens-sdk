import { useWhoCollectedPublicationQuery, WalletFragment } from '@lens-protocol/api-bindings';
import { PublicationId } from '@lens-protocol/domain/entities';

import {
  SubjectiveArgs,
  useActiveProfileAsDefaultObserver,
  useConfigSourcesVariable,
  useLensApolloClient,
} from '../helpers/arguments';
import { PaginatedReadResult, PaginatedArgs, usePaginatedReadResult } from '../helpers/reads';
import { DEFAULT_PAGINATED_QUERY_LIMIT } from '../utils';

export type UseWhoCollectedPublicationArgs = PaginatedArgs<
  SubjectiveArgs<{
    publicationId: PublicationId;
  }>
>;

export function useWhoCollectedPublication({
  limit = DEFAULT_PAGINATED_QUERY_LIMIT,
  observerId,
  publicationId,
}: UseWhoCollectedPublicationArgs): PaginatedReadResult<WalletFragment[]> {
  return usePaginatedReadResult(
    useWhoCollectedPublicationQuery(
      useLensApolloClient(
        useActiveProfileAsDefaultObserver({
          variables: useConfigSourcesVariable({ limit, publicationId, observerId }),
        }),
      ),
    ),
  );
}
