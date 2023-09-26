import { Profile, useGetAllProfiles } from '@lens-protocol/api-bindings';
import { PublicationId } from '@lens-protocol/domain/entities';

import {
  useActiveProfileAsDefaultObserver,
  useLensApolloClient,
  useMediaTransformFromConfig,
  useSourcesFromConfig,
  WithObserverIdOverride,
} from '../helpers/arguments';
import { PaginatedArgs, PaginatedReadResult, usePaginatedReadResult } from '../helpers/reads';
import { DEFAULT_PAGINATED_QUERY_LIMIT } from '../utils';

export type UseWhoMirroredPublicationArgs = PaginatedArgs<
  WithObserverIdOverride<{
    limit?: number;
    publicationId: PublicationId;
  }>
>;

/**
 * @category Publications
 * @group Hooks
 */
export function useWhoMirroredPublication({
  limit = DEFAULT_PAGINATED_QUERY_LIMIT,
  publicationId,
  observerId,
}: UseWhoMirroredPublicationArgs): PaginatedReadResult<Profile[]> {
  return usePaginatedReadResult(
    useGetAllProfiles(
      useLensApolloClient(
        useActiveProfileAsDefaultObserver({
          variables: useMediaTransformFromConfig(
            useSourcesFromConfig({
              byWhoMirroredPublicationId: publicationId,
              observerId,
              limit,
            }),
          ),
        }),
      ),
    ),
  );
}
