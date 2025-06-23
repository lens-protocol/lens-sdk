import type {
  Notification,
  NotificationsRequest,
  Paginated,
} from '@lens-protocol/graphql';
import { NotificationsQuery } from '@lens-protocol/graphql';

import type {
  ReadResult,
  Suspendable,
  SuspendableResult,
  SuspenseResult,
} from '../helpers';
import { useSuspendableQuery } from '../helpers';

export type NotificationsArgs = NotificationsRequest;

/**
 * Fetch notifications for the authenticated Account.
 *
 * This signature supports React Suspense:
 *
 * ```tsx
 * const { data } = useNotifications({ suspense: true });
 * ```
 */
export function useNotifications(
  args: NotificationsArgs & Suspendable,
): SuspenseResult<Paginated<Notification>>;

/**
 * Fetch notifications for the authenticated Account.
 *
 * ```tsx
 * const { data, loading } = useNotifications();
 * ```
 */
export function useNotifications(
  args?: NotificationsArgs,
): ReadResult<Paginated<Notification>>;

export function useNotifications({
  suspense = false,
  ...request
}: NotificationsArgs & { suspense?: boolean } = {}): SuspendableResult<
  Paginated<Notification>
> {
  return useSuspendableQuery({
    document: NotificationsQuery,
    variables: { request },
    suspense: suspense,
  });
}
