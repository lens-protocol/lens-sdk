import {
  NewCollectNotification,
  NewCommentNotification,
  NewFollowerNotification,
  NewMentionNotification,
  NewMirrorNotification,
  NewReactionNotification,
  NotificationTypes,
  useNotifications as useUnderlyingQuery,
} from '@lens-protocol/api-bindings';
import { ProfileId } from '@lens-protocol/domain/entities';

import { useSourcesFromConfig, useLensApolloClient } from '../helpers/arguments';
import { PaginatedArgs, PaginatedReadResult, usePaginatedReadResult } from '../helpers/reads';

export type UseNotificationsArgs = PaginatedArgs<{
  profileId: ProfileId;
  notificationTypes?: NotificationTypes[];
}>;

export type Notification =
  | NewFollowerNotification
  | NewCollectNotification
  | NewCommentNotification
  | NewMirrorNotification
  | NewMentionNotification
  | NewReactionNotification;

/**
 * @category Notifications
 * @group Hooks
 * @param props - {@link UseNotificationsArgs}
 */
export function useNotifications({
  notificationTypes,
  profileId,
  limit,
}: UseNotificationsArgs): PaginatedReadResult<Notification[]> {
  return usePaginatedReadResult(
    useUnderlyingQuery(
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
