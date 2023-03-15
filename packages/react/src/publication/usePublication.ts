import {
  AnyPublicationFragment,
  UnspecifiedError,
  usePublicationQuery,
} from '@lens-protocol/api-bindings';
import { PublicationId } from '@lens-protocol/domain/entities';

import { NotFoundError } from '../NotFoundError';
import {
  WithObserverIdOverride,
  useActiveProfileAsDefaultObserver,
  useConfigSourcesVariable,
  useLensApolloClient,
} from '../helpers/arguments';
import { ReadResult, useReadResult } from '../helpers/reads';

export type UsePublicationArgs = WithObserverIdOverride<{
  publicationId: PublicationId;
}>;

export function usePublication({
  publicationId,
  observerId,
}: UsePublicationArgs): ReadResult<AnyPublicationFragment, NotFoundError | UnspecifiedError> {
  const { data, error, loading } = useReadResult(
    usePublicationQuery(
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
