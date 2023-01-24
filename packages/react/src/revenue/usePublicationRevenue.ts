import {
  PublicationRevenueQuery,
  PublicationRevenueQueryVariables,
  RevenueAggregateFragment,
  RevenueFragment,
  usePublicationRevenueQuery,
} from '@lens-protocol/api-bindings';

import { ReadResult, useReadResult } from '../helpers';
import { NetworkError } from '../publication/adapters/NetworkError';
import { useSharedDependencies } from '../shared';

type UsePublicationRevenueArgs = {
  publicationId: string;
};

export function usePublicationRevenue({
  publicationId,
}: UsePublicationRevenueArgs): ReadResult<RevenueAggregateFragment, NetworkError> {
  const { apolloClient } = useSharedDependencies();

  const { data, error, loading } = useReadResult<
    RevenueFragment,
    PublicationRevenueQuery,
    PublicationRevenueQueryVariables
  >(
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
    data: data.revenue,
    error: undefined,
    loading: false,
  };
}
