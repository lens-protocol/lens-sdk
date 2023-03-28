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
  /**
   * The profile id you want to retrieve notifications for
   */
  profileId: ProfileId;

  /**
   * The types of notifications you want to retrieve
   *
   * @defaultValue `undefined` - will retrieve all types of notifications
   */
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
 * `useNotifications` is a paginated hook that lets you retrieve notifications for a given profile
 *
 * @category Notifications
 * @group Hooks
 * @param props - {@link UseNotificationsArgs}
 *
 * @example
 * ```tsx
 * import { useNotifications, ProfileId } from '@lens-protocol/react-web';
 *
 * function Notifications({ profileId }: { profileId: ProfileId }}) {
 *   const { data, error, loading } = useNotifications({ profileId });
 *
 *   if (loading) return <p>Loading...</p>;
 *
 *   if (error) return <p>Error: {error.message}</p>;
 *
 *   return (
 *     <ul>
 *       {data.map((notification) => (
 *         <li key={notification.notificationId}>{notification.type}</li>
 *       ))}
 *     </ul>
 *   );
 * }
 * ```
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
