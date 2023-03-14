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

import { useConfigSources, useLensApolloClient } from '../helpers/arguments';
import { PaginatedArgs, PaginatedReadResult, usePaginatedReadResult } from '../helpers/reads';

type UseNotificationsArgs = PaginatedArgs<{
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
      useLensApolloClient(
        useConfigSources({
          variables: {
            observerId: profileId,
            limit: limit ?? 10,
            notificationTypes,
          },
        }),
      ),
    ),
  );
}
