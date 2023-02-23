import {
  UnspecifiedError,
  RevenueAggregateFragment,
  usePublicationRevenueQuery,
} from '@lens-protocol/api-bindings';

import { NotFoundError } from '../NotFoundError';
import { ReadResult, useReadResult } from '../helpers';
import { useSharedDependencies } from '../shared';

type UsePublicationRevenueArgs = {
  publicationId: string;
};

export function usePublicationRevenue({
  publicationId,
}: UsePublicationRevenueArgs): ReadResult<
  RevenueAggregateFragment,
  NotFoundError | UnspecifiedError
> {
  const { apolloClient } = useSharedDependencies();

  const { data, error, loading } = useReadResult(
    usePublicationRevenueQuery({
      variables: { request: { publicationId } },
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
      error,
      loading: false,
    };
  }

  if (data === null) {
    return {
      data: undefined,
      error: new NotFoundError(`Publication with id: ${publicationId}`),
      loading: false,
    };
  }

  return {
    data: data.revenue,
    error: undefined,
    loading: false,
  };
}
