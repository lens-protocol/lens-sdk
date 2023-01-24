import {
  ProfileFollowRevenueQuery,
  ProfileFollowRevenueQueryVariables,
  RevenueAggregateFragment,
  useProfileFollowRevenueQuery,
  ProfileFollowRevenueFragment,
} from '@lens-protocol/api-bindings';
import { ProfileId } from '@lens-protocol/domain/entities';

import { ReadResult, useReadResult } from '../helpers';
import { NetworkError } from '../publication/adapters/NetworkError';
import { useSharedDependencies } from '../shared';

type UseProfileFollowRevenueArgs = {
  profileId: ProfileId;
};

export function useProfileFollowRevenue({
  profileId,
}: UseProfileFollowRevenueArgs): ReadResult<RevenueAggregateFragment[], NetworkError> {
  const { apolloClient } = useSharedDependencies();

  const { data, error, loading } = useReadResult<
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

  if (loading) {
    return {
      data: undefined,
      error: undefined,
      loading: true,
    };
  }

  if (error) {
    return {
      data: undefined,
      error: error,
      loading: false,
    };
  }

  return {
    data: data.revenues,
    error: undefined,
    loading: false,
  };
}
