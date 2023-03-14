import {
  NewCollectNotificationFragment,
  NewCommentNotificationFragment,
  NewFollowerNotificationFragment,
  NewMentionNotificationFragment,
  NewMirrorNotificationFragment,
  NewReactionNotificationFragment,
  NotificationTypes,
  useNotificationsQuery,
} from '@lens-protocol/api-bindings';

import { PaginatedArgs, PaginatedReadResult, usePaginatedReadResult } from '../helpers/reads';
import { useSharedDependencies } from '../shared';

type UseNotificationsArgs = PaginatedArgs<{
  profileId: string;
  notificationTypes?: NotificationTypes[];
}>;

export type Notification =
  | NewFollowerNotificationFragment
  | NewCollectNotificationFragment
  | NewCommentNotificationFragment
  | NewMirrorNotificationFragment
  | NewMentionNotificationFragment
  | NewReactionNotificationFragment;

export function useNotifications({
  notificationTypes,
  profileId,
  limit,
}: UseNotificationsArgs): PaginatedReadResult<Notification[]> {
  const { apolloClient, sources } = useSharedDependencies();

  return usePaginatedReadResult(
    useNotificationsQuery({
      variables: {
        observerId: profileId,
        limit: limit ?? 10,
        notificationTypes,
        sources,
      },
      client: apolloClient,
    }),
  );
}
