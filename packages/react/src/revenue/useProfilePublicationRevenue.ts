import {
  PublicationRevenueFragment,
  PublicationTypes,
  useProfilePublicationRevenueQuery,
} from '@lens-protocol/api-bindings';
import { ProfileId } from '@lens-protocol/domain/entities';

import {
  SubjectiveArgs,
  useActiveProfileAsDefaultObserver,
  useConfigSourcesVariable,
  useLensApolloClient,
} from '../helpers/arguments';
import { PaginatedArgs, PaginatedReadResult, usePaginatedReadResult } from '../helpers/reads';
import { DEFAULT_PAGINATED_QUERY_LIMIT } from '../utils';

export type UseProfilePublicationRevenueArgs = PaginatedArgs<
  SubjectiveArgs<{
    profileId: ProfileId;
    publicationTypes?: PublicationTypes[];
  }>
>;

export function useProfilePublicationRevenue({
  profileId,
  observerId,
  limit = DEFAULT_PAGINATED_QUERY_LIMIT,
  publicationTypes,
}: UseProfilePublicationRevenueArgs): PaginatedReadResult<PublicationRevenueFragment[]> {
  return usePaginatedReadResult(
    useProfilePublicationRevenueQuery(
      useLensApolloClient(
        useActiveProfileAsDefaultObserver({
          variables: useConfigSourcesVariable({
            limit,
            publicationTypes,
            observerId,
            profileId,
          }),
        }),
      ),
    ),
  );
}
