import {
  PublicationRevenueQuery,
  PublicationRevenueQueryVariables,
  RevenueAggregateFragment,
  RevenueFragment,
  usePublicationRevenueQuery,
} from '@lens-protocol/api-bindings';

import { ReadResult, useReadResult } from '../helpers';
import { useSharedDependencies } from '../shared';

type UsePublicationRevenueArgs = {
  publicationId: string;
};

export function usePublicationRevenue({
  publicationId,
}: UsePublicationRevenueArgs): ReadResult<RevenueAggregateFragment> {
  const { apolloClient } = useSharedDependencies();

  const { data, loading } = useReadResult<
    RevenueFragment,
    PublicationRevenueQuery,
    PublicationRevenueQueryVariables
  >(
    usePublicationRevenueQuery({ variables: { request: { publicationId } }, client: apolloClient }),
  );

  if (loading)
    return {
      loading: true,
      data: undefined,
    };

  return {
    data: data.revenue,
    loading: false,
  };
}
