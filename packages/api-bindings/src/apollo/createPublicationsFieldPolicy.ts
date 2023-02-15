import { invariant } from '@lens-protocol/shared-kernel';

import { cursorBasedPagination } from './utils/cursorBasedPagination';
import { QueryPublicationsArgs, PublicationsQueryRequest } from '../graphql';

function assertQueryPublicationsArgs(
  args: Record<string, unknown> | null,
): asserts args is QueryPublicationsArgs {
  invariant(args?.request, 'Is not a query of publication args');
}

export function getPublicationsFieldName(
  request: Pick<
    PublicationsQueryRequest,
    'profileId' | 'publicationTypes' | 'commentsOf' | 'collectedBy' | 'metadata'
  >,
) {
  // TODO: Find a way so we can generate field name using apollo methods
  return `publications:${getPublicationsId(request)}`;
}

function getPublicationsId(
  request: Pick<
    PublicationsQueryRequest,
    'profileId' | 'publicationTypes' | 'commentsOf' | 'collectedBy' | 'metadata'
  >,
) {
  return JSON.stringify({
    profileId: request.profileId,
    publicationTypes: request.publicationTypes,
    commentsOf: request.commentsOf,
    collectedBy: request.collectedBy,
    metadata: request.metadata,
  });
}

export function createPublicationsFieldPolicy() {
  return cursorBasedPagination((args: Record<string, unknown> | null) => {
    assertQueryPublicationsArgs(args);

    const { request } = args;
    return getPublicationsId(request);
  });
}
