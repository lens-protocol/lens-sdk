import {
  RevenueAggregateFragment,
  useProfileFollowRevenueQuery,
} from '@lens-protocol/api-bindings';
import { ProfileId } from '@lens-protocol/domain/entities';

import { ReadResult, useReadResult } from '../helpers/reads';
import { useSharedDependencies } from '../shared';

type UseProfileFollowRevenueArgs = {
  profileId: ProfileId;
};

export function useProfileFollowRevenue({
  profileId,
}: UseProfileFollowRevenueArgs): ReadResult<RevenueAggregateFragment[]> {
  const { apolloClient } = useSharedDependencies();

  const { data, error, loading } = useReadResult(
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
