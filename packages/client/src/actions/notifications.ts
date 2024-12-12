import type { Notification, NotificationsRequest } from '@lens-protocol/graphql';
import { NotificationsQuery } from '@lens-protocol/graphql';
import type { ResultAsync } from '@lens-protocol/types';

import type { SessionClient } from '../clients';
import type { UnexpectedError } from '../errors';
import type { Paginated } from '../types';

/**
 * Fetch notifications for the authenticated Account.
 *
 * ```ts
 * const result = await fetchNotifications(sessionClient);
 * ```
 *
 * @param client - The session client for the authenticated Account.
 * @param request - The query request.
 * @returns Paginated notifications.
 */
export function fetchNotifications(
  client: SessionClient,
  request: NotificationsRequest = {},
): ResultAsync<Paginated<Notification>, UnexpectedError> {
  return client.query(NotificationsQuery, { request });
}
