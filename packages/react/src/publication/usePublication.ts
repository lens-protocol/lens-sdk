import { usePublicationQuery } from '@lens-protocol/api-bindings';

import { ReadResult, useReadResult } from '../helpers';
import { useSharedDependencies } from '../shared';
import { NetworkError } from './adapters/NetworkError';
import { Publication } from './types';

type UsePublicationArgs = {
  publicationId: string;
  observerId?: string;
};

export function usePublication({
  publicationId,
  observerId,
}: UsePublicationArgs): ReadResult<Publication, NetworkError> {
  const { apolloClient } = useSharedDependencies();

  return useReadResult(
    usePublicationQuery({
      variables: {
        publicationId,
        observerId,
      },
      client: apolloClient,
    }),
  );
}
