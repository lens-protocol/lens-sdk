import {
  RevenueAggregate,
  useProfileFollowRevenue as useUnderlyingQuery,
} from '@lens-protocol/api-bindings';
import { ProfileId } from '@lens-protocol/domain/entities';

import { useLensApolloClient } from '../helpers/arguments';
import { ReadResult, useReadResult } from '../helpers/reads';

export type UseProfileFollowRevenueArgs = {
  profileId: ProfileId;
};

export function useProfileFollowRevenue({
  profileId,
}: UseProfileFollowRevenueArgs): ReadResult<RevenueAggregate[]> {
  const { data, error, loading } = useReadResult(
    useUnderlyingQuery(
      useLensApolloClient({
        variables: {
          profileId,
        },
      }),
    ),
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
