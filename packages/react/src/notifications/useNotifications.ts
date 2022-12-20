import {
  NewCollectNotificationFieldsFragment,
  NewCommentNotificationFieldsFragment,
  NewFollowerNotificationFieldsFragment,
  NewMentionNotificationFieldsFragment,
  NewMirrorNotificationFieldsFragment,
  NewReactionNotificationFieldsFragment,
  useNotificationsQuery,
} from '@lens-protocol/api';

import { PaginatedArgs, PaginatedReadResult, usePaginatedReadResult } from '../helpers';
import { useSharedDependencies } from '../shared';

type UseNotificationsArgs = PaginatedArgs<{
  profileId: string;
}>;

export type Notification =
  | NewFollowerNotificationFieldsFragment
  | NewCollectNotificationFieldsFragment
  | NewCommentNotificationFieldsFragment
  | NewMirrorNotificationFieldsFragment
  | NewMentionNotificationFieldsFragment
  | NewReactionNotificationFieldsFragment;

export function useNotifications({
  profileId,
  limit,
  cursor,
}: UseNotificationsArgs): PaginatedReadResult<Notification[]> {
  const { apolloClient, sources } = useSharedDependencies();

  return usePaginatedReadResult(
    useNotificationsQuery({
      variables: {
        observerId: profileId,
        limit: limit ?? 10,
        cursor,
        sources,
      },
      client: apolloClient,
    }),
  );
}
