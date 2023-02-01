import { RevenueAggregateFragment, usePublicationRevenueQuery } from '@lens-protocol/api-bindings';

import { ReadResult, useReadResult } from '../helpers';
import { useSharedDependencies } from '../shared';

type UsePublicationRevenueArgs = {
  publicationId: string;
};

export function usePublicationRevenue({
  publicationId,
}: UsePublicationRevenueArgs): ReadResult<RevenueAggregateFragment | null> {
  const { apolloClient } = useSharedDependencies();

  const { data, error, loading } = useReadResult(
    usePublicationRevenueQuery({ variables: { request: { publicationId } }, client: apolloClient }),
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
    data: data?.revenue ?? null,
    error: undefined,
    loading: false,
  };
}
