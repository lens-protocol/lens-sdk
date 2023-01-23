import {
  NewCollectNotificationFragment,
  NewCommentNotificationFragment,
  NewFollowerNotificationFragment,
  NewMentionNotificationFragment,
  NewMirrorNotificationFragment,
  NewReactionNotificationFragment,
  useNotificationsQuery,
} from '@lens-protocol/api-bindings';

import { PaginatedArgs, PaginatedReadResult, usePaginatedReadResult } from '../helpers';
import { useSharedDependencies } from '../shared';

type UseNotificationsArgs = PaginatedArgs<{
  profileId: string;
}>;

export type Notification =
  | NewFollowerNotificationFragment
  | NewCollectNotificationFragment
  | NewCommentNotificationFragment
  | NewMirrorNotificationFragment
  | NewMentionNotificationFragment
  | NewReactionNotificationFragment;

export function useNotifications({
  profileId,
  limit,
}: UseNotificationsArgs): PaginatedReadResult<Notification[]> {
  const { apolloClient, sources } = useSharedDependencies();

  return usePaginatedReadResult(
    useNotificationsQuery({
      variables: {
        observerId: profileId,
        limit: limit ?? 10,
        sources,
      },
      client: apolloClient,
    }),
  );
}
