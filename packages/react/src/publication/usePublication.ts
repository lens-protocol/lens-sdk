import { AnyPublication, UnspecifiedError, useGetPublication } from '@lens-protocol/api-bindings';
import { PublicationId } from '@lens-protocol/domain/entities';

import { NotFoundError } from '../NotFoundError';
import {
  useActiveProfileAsDefaultObserver,
  useLensApolloClient,
  useMediaTransformFromConfig,
  useSourcesFromConfig,
  WithObserverIdOverride,
} from '../helpers/arguments';
import { ReadResult, useReadResult } from '../helpers/reads';

export type UsePublicationArgs = WithObserverIdOverride<{
  publicationId: PublicationId;
}>;

/**
 * @category Publications
 * @group Hooks
 */
export function usePublication({
  publicationId,
  observerId,
}: UsePublicationArgs): ReadResult<AnyPublication, NotFoundError | UnspecifiedError> {
  const { data, error, loading } = useReadResult(
    useGetPublication(
      useLensApolloClient(
        useActiveProfileAsDefaultObserver({
          variables: useMediaTransformFromConfig(
            useSourcesFromConfig({
              request: {
                publicationId,
              },
              observerId,
            }),
          ),
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
