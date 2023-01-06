import { Erc20AmountFragment, useProfileFollowRevenueQuery } from '@lens-protocol/api-bindings';
import { ProfileId } from '@lens-protocol/domain/entities';

import { ReadResult, useReadResult } from '../helpers';
import { useSharedDependencies } from '../shared';

type UseProfileFollowRevenueArgs = {
  profileId: ProfileId;
};

export function useProfileFollowRevenue({
  profileId,
}: UseProfileFollowRevenueArgs): ReadResult<{ revenues: { total: Erc20AmountFragment }[] }> {
  const { apolloClient } = useSharedDependencies();

  const newLocal = useProfileFollowRevenueQuery({
    variables: {
      profileId,
    },
    client: apolloClient,
  });
  console.log({ newLocal: JSON.stringify(newLocal.data, null, 2) });
  return useReadResult(newLocal);
}
