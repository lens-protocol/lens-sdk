import {
  ProfileFragment,
  useGetAllProfilesByWhoMirroredPublicationQuery,
} from '@lens-protocol/api-bindings';
import { PublicationId } from '@lens-protocol/domain/entities';

import {
  SubjectiveArgs,
  useActiveProfileAsDefaultObserver,
  useConfigSourcesVariable,
  useLensApolloClient,
} from '../helpers/arguments';
import { PaginatedArgs, PaginatedReadResult, usePaginatedReadResult } from '../helpers/reads';
import { DEFAULT_PAGINATED_QUERY_LIMIT } from '../utils';

export type UseWhoMirroredPublicationArgs = PaginatedArgs<
  SubjectiveArgs<{
    limit?: number;
    publicationId: PublicationId;
  }>
>;

export function useWhoMirroredPublication({
  limit = DEFAULT_PAGINATED_QUERY_LIMIT,
  publicationId,
  observerId,
}: UseWhoMirroredPublicationArgs): PaginatedReadResult<ProfileFragment[]> {
  return usePaginatedReadResult(
    useGetAllProfilesByWhoMirroredPublicationQuery(
      useLensApolloClient(
        useActiveProfileAsDefaultObserver({
          variables: useConfigSourcesVariable({
            publicationId,
            observerId,
            limit,
          }),
        }),
      ),
    ),
  );
}
