import {
  ProfileFollowRevenueQuery,
  ProfileFollowRevenueQueryVariables,
  RevenueAggregateFragment,
  useProfileFollowRevenueQuery,
  ProfileFollowRevenueFragment,
} from '@lens-protocol/api-bindings';
import { ProfileId } from '@lens-protocol/domain/entities';

import { ReadResult, useReadResult } from '../helpers';
import { useSharedDependencies } from '../shared';

type UseProfileFollowRevenueArgs = {
  profileId: ProfileId;
};

export function useProfileFollowRevenue({
  profileId,
}: UseProfileFollowRevenueArgs): ReadResult<RevenueAggregateFragment[]> {
  const { apolloClient } = useSharedDependencies();

  const { data, loading } = useReadResult<
    ProfileFollowRevenueFragment,
    ProfileFollowRevenueQuery,
    ProfileFollowRevenueQueryVariables
  >(
    useProfileFollowRevenueQuery({
      variables: {
        profileId,
      },
      client: apolloClient,
    }),
  );

  if (loading)
    return {
      loading: true,
      data: undefined,
    };

  return {
    data: data.revenues,
    loading: false,
  };
}
