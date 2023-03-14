import { ProfileFragment, useExploreProfilesQuery } from '@lens-protocol/api-bindings';

import {
  SubjectiveArgs,
  useActiveProfileAsDefaultObserver,
  useConfigSourcesVariable,
  useLensApolloClient,
} from '../helpers/arguments';
import { PaginatedReadResult, PaginatedArgs, usePaginatedReadResult } from '../helpers/reads';
import { DEFAULT_PAGINATED_QUERY_LIMIT } from '../utils';

export type UseFeedArgs = PaginatedArgs<SubjectiveArgs>;

export function useExploreProfiles({
  observerId,
  limit = DEFAULT_PAGINATED_QUERY_LIMIT,
}: UseFeedArgs = {}): PaginatedReadResult<ProfileFragment[]> {
  return usePaginatedReadResult(
    useExploreProfilesQuery(
      useLensApolloClient(
        useActiveProfileAsDefaultObserver({
          variables: useConfigSourcesVariable({ limit, observerId }),
        }),
      ),
    ),
  );
}
