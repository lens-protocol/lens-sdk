import type { Notification, NotificationsRequest } from '@lens-protocol/graphql';
import { notificationsQuery } from '@lens-protocol/graphql';
import type { ResultAsync } from '@lens-protocol/types';

import type { Account } from '@lens-protocol/graphql';
import type { SessionClient } from '../clients';
import type { Context } from '../context';
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
export function fetchNotifications<TAccount extends Account>(
  client: SessionClient<Context<TAccount>>,
  request: NotificationsRequest = {},
): ResultAsync<Paginated<Notification<TAccount>>, UnexpectedError> {
  const document = notificationsQuery(client.context.accountFragment);
  return client.query(document, { request });
}
