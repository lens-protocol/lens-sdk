import {
  WhoReactedResultFragment,
  useWhoReactedPublicationQuery,
} from '@lens-protocol/api-bindings';
import { PublicationId } from '@lens-protocol/domain/entities';

import {
  WithObserverIdOverride,
  useActiveProfileAsDefaultObserver,
  useConfigSourcesVariable,
  useLensApolloClient,
} from '../helpers/arguments';
import { PaginatedReadResult, PaginatedArgs, usePaginatedReadResult } from '../helpers/reads';

export type UseWhoReactedArgs = PaginatedArgs<
  WithObserverIdOverride<{
    publicationId: PublicationId;
  }>
>;

export function useWhoReacted(
  args: UseWhoReactedArgs,
): PaginatedReadResult<WhoReactedResultFragment[]> {
  return usePaginatedReadResult(
    useWhoReactedPublicationQuery(
      useLensApolloClient(
        useActiveProfileAsDefaultObserver({
          variables: useConfigSourcesVariable({
            publicationId: args.publicationId,
            observerId: args?.observerId,
            limit: args?.limit ?? 10,
          }),
        }),
      ),
    ),
  );
}
