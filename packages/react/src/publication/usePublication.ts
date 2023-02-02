import {
  PublicationFragment,
  UnspecifiedError,
  usePublicationQuery,
} from '@lens-protocol/api-bindings';

import { NotFoundError } from '../NotFoundError';
import { ReadResult, useReadResult } from '../helpers';
import { useSharedDependencies } from '../shared';

type UsePublicationArgs = {
  publicationId: string;
  observerId?: string;
};

export function usePublication({
  publicationId,
  observerId,
}: UsePublicationArgs): ReadResult<PublicationFragment, NotFoundError | UnspecifiedError> {
  const { apolloClient } = useSharedDependencies();

  const { data, error, loading } = useReadResult(
    usePublicationQuery({
      variables: {
        publicationId,
        observerId,
      },
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
    data,
    error: undefined,
    loading: false,
  };
}
