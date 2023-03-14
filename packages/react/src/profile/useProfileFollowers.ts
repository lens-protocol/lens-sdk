import { FollowerFragment, useProfileFollowersQuery } from '@lens-protocol/api-bindings';
import { ProfileId } from '@lens-protocol/domain/entities';

import {
  SubjectiveArgs,
  useActiveProfileAsDefaultObserver,
  useConfigSourcesVariable,
  useLensApolloClient,
} from '../helpers/arguments';
import { PaginatedArgs, PaginatedReadResult, usePaginatedReadResult } from '../helpers/reads';

type UseProfileFollowersArgs = PaginatedArgs<
  SubjectiveArgs<{
    profileId: ProfileId;
  }>
>;

export function useProfileFollowers({
  profileId,
  limit,
  observerId,
}: UseProfileFollowersArgs): PaginatedReadResult<FollowerFragment[]> {
  return usePaginatedReadResult(
    useProfileFollowersQuery(
      useLensApolloClient(
        useActiveProfileAsDefaultObserver({
          variables: useConfigSourcesVariable({
            profileId,
            limit: limit ?? 10,
            observerId,
          }),
        }),
      ),
    ),
  );
}
