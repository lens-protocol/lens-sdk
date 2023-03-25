import {
  UnspecifiedError,
  PublicationRevenue,
  useGetPublicationRevenue,
} from '@lens-protocol/api-bindings';

import { NotFoundError } from '../NotFoundError';
import {
  WithObserverIdOverride,
  useActiveProfileAsDefaultObserver,
  useSourcesFromConfig,
  useLensApolloClient,
} from '../helpers/arguments';
import { ReadResult, useReadResult } from '../helpers/reads';

export type UsePublicationRevenueArgs = WithObserverIdOverride<{
  publicationId: string;
}>;

export function usePublicationRevenue({
  publicationId,
  observerId,
}: UsePublicationRevenueArgs): ReadResult<PublicationRevenue, NotFoundError | UnspecifiedError> {
  const { data, error, loading } = useReadResult(
    useGetPublicationRevenue(
      useLensApolloClient(
        useActiveProfileAsDefaultObserver({
          variables: useSourcesFromConfig({
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
