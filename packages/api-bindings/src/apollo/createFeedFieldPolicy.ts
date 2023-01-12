import { invariant } from '@lens-protocol/shared-kernel';

import { FeedRequest, QueryFeedArgs } from '../graphql';
import { cursorBasedPagination } from './utils/cursorBasedPagination';

function assertQueryFeedArgs(args: Record<string, unknown> | null): asserts args is QueryFeedArgs {
  invariant(args?.request, 'Is not a query of publication args');
}

function resolveFeedKeyArgs({ profileId }: Pick<FeedRequest, 'profileId'>) {
  return JSON.stringify({ profileId });
}

export function resolveFeedQueryCacheKey(request: Pick<FeedRequest, 'profileId'>) {
  return `feed:${resolveFeedKeyArgs(request)}`;
}

export function createFeedFieldPolicy() {
  return cursorBasedPagination((args: Record<string, unknown> | null) => {
    assertQueryFeedArgs(args);

    const { request } = args;
    return resolveFeedKeyArgs(request);
  });
}
