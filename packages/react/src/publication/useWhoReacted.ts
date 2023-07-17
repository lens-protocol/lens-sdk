import { WhoReactedResult, useWhoReactedPublication } from '@lens-protocol/api-bindings';
import { PublicationId } from '@lens-protocol/domain/entities';

import {
  useActiveProfileAsDefaultObserver,
  useLensApolloClient,
  useMediaTransformFromConfig,
  useSourcesFromConfig,
  WithObserverIdOverride,
} from '../helpers/arguments';
import { PaginatedReadResult, PaginatedArgs, usePaginatedReadResult } from '../helpers/reads';

export type UseWhoReactedArgs = PaginatedArgs<
  WithObserverIdOverride<{
    publicationId: PublicationId;
  }>
>;

/**
 * @category Publications
 * @group Hooks
 */
export function useWhoReacted(args: UseWhoReactedArgs): PaginatedReadResult<WhoReactedResult[]> {
  return usePaginatedReadResult(
    useWhoReactedPublication(
      useLensApolloClient(
        useActiveProfileAsDefaultObserver({
          variables: useMediaTransformFromConfig(
            useSourcesFromConfig({
              publicationId: args.publicationId,
              observerId: args?.observerId,
              limit: args?.limit ?? 10,
            }),
          ),
        }),
      ),
    ),
  );
}
