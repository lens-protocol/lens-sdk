import { usePublicationQuery } from '@lens-protocol/api';

import { useLensResponse } from '../helpers';
import { useSharedDependencies } from '../shared';

type UsePublicationArgs = {
  publicationId: string;
  observerId?: string;
};

export function usePublication({ publicationId, observerId }: UsePublicationArgs) {
  const { apolloClient } = useSharedDependencies();

  const response = useLensResponse(
    usePublicationQuery({
      variables: {
        publicationId,
        observerId,
      },
      client: apolloClient,
    }),
  );

  return {
    ...response,
    data: response.data?.result ?? null,
  };
}
