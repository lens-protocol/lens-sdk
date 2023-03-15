import {
  UnspecifiedError,
  PublicationRevenueFragment,
  usePublicationRevenueQuery,
} from '@lens-protocol/api-bindings';

import { NotFoundError } from '../NotFoundError';
import {
  WithObserverIdOverride,
  useActiveProfileAsDefaultObserver,
  useConfigSourcesVariable,
  useLensApolloClient,
} from '../helpers/arguments';
import { ReadResult, useReadResult } from '../helpers/reads';

export type UsePublicationRevenueArgs = WithObserverIdOverride<{
  publicationId: string;
}>;

export function usePublicationRevenue({
  publicationId,
  observerId,
}: UsePublicationRevenueArgs): ReadResult<
  PublicationRevenueFragment,
  NotFoundError | UnspecifiedError
> {
  const { data, error, loading } = useReadResult(
    usePublicationRevenueQuery(
      useLensApolloClient(
        useActiveProfileAsDefaultObserver({
          variables: useConfigSourcesVariable({
            publicationId,
            observerId,
          }),
        }),
      ),
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
    data,
    error: undefined,
    loading: false,
  };
}
