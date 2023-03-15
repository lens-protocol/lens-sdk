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
import { ProfileId } from '@lens-protocol/domain/entities';

import { useSourcesFromConfig, useLensApolloClient } from '../helpers/arguments';
import { PaginatedArgs, PaginatedReadResult, usePaginatedReadResult } from '../helpers/reads';

export type UseNotificationsArgs = PaginatedArgs<{
  profileId: ProfileId;
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
  return usePaginatedReadResult(
    useNotificationsQuery(
      useLensApolloClient({
        variables: useSourcesFromConfig({
          observerId: profileId,
          limit: limit ?? 10,
          notificationTypes,
        }),
      }),
    ),
  );
}
