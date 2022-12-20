import {
  NewCollectNotificationFieldsFragment,
  NewCommentNotificationFieldsFragment,
  NewFollowerNotificationFieldsFragment,
  NewMentionNotificationFieldsFragment,
  NewMirrorNotificationFieldsFragment,
  NewReactionNotificationFieldsFragment,
  useNotificationsQuery,
} from '@lens-protocol/api';

import { PaginatedReadResult, PaginatedArgs, usePaginatedReadResult } from '../helpers';
import { useActiveProfile } from '../profile';
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

@Authenticated()
export function useNotifications({
  profileId,
  limit,
  cursor,
}: UseNotificationsArgs): PaginatedReadResult<Notification[]> {
  isAuthenticated();
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

function isAuthenticated() {
  const { profile  } = useActiveProfile()
}
