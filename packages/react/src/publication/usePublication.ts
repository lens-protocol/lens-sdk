import { usePublicationQuery } from '@lens-protocol/api-bindings';

import { useReadResult } from '../helpers';
import { useSharedDependencies } from '../shared';

type UsePublicationArgs = {
  publicationId: string;
  observerId?: string;
};

export function usePublication({ publicationId, observerId }: UsePublicationArgs) {
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
