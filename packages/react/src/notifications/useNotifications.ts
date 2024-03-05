import {
  ActedNotification,
  CommentNotification,
  FollowNotification,
  MentionNotification,
  MirrorNotification,
  NotificationRequest,
  QuoteNotification,
  ReactionNotification,
  useNotifications as useUnderlyingQuery,
} from '@lens-protocol/api-bindings';

import { useLensApolloClient } from '../helpers/arguments';
import { PaginatedArgs, PaginatedReadResult, usePaginatedReadResult } from '../helpers/reads';
import { useFragmentVariables } from '../helpers/variables';

export type UseNotificationsArgs = PaginatedArgs<NotificationRequest>;

export type Notification =
  | ActedNotification
  | CommentNotification
  | FollowNotification
  | MentionNotification
  | MirrorNotification
  | QuoteNotification
  | ReactionNotification;

/**
 * Fetch a paginated list of notifications for the authenticated profile matching given criteria.
 *
 * @category Notifications
 * @group Hooks
 * @param args - {@link UseNotificationsArgs}
 *
 * @example
 * Fetch all notifications.
 * ```tsx
 * const { data, error, loading } = useNotifications();
 * ```
 *
 * @example
 * Fetch all follow notifications from a specific app.
 * ```tsx
 * import { useNotifications, NotificationType, appId } from '@lens-protocol/react';
 *
 * const { data, error, loading } = useNotifications({
 *  where: {
 *    publishedOn: [appId('any-app-id')],
 *    notificationTypes: [NotificationType.Followed],
 *  },
 * });
 *
 * ```
 * @example
 * Fetch all quotes notifications from high-signal accounts.
 * ```tsx
 * import { useNotifications, NotificationType, appId } from '@lens-protocol/react';
 *
 * const { data, error, loading } = useNotifications({
 *  where: {
 *    notificationTypes: [NotificationType.Quote],
 *    highSignal: true,
 *  },
 * });
 * ```
 */
export function useNotifications({ where }: UseNotificationsArgs = {}): PaginatedReadResult<
  Notification[]
> {
  return usePaginatedReadResult(
    useUnderlyingQuery(
      useLensApolloClient({
        variables: useFragmentVariables({
          where,
          statsFor: where?.publishedOn,
        }),
      }),
    ),
  );
}
