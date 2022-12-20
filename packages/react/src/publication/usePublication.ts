import {
  CommentFragment,
  MirrorFragment,
  PostFragment,
  usePublicationQuery,
} from '@lens-protocol/api';

import { ReadResult, useReadResult } from '../helpers';
import { useSharedDependencies } from '../shared';

type UsePublicationArgs = {
  publicationId: string;
  observerId?: string;
};

export function usePublication({
  publicationId,
  observerId,
}: UsePublicationArgs): ReadResult<CommentFragment | MirrorFragment | PostFragment> {
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
