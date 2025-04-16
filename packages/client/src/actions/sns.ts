import type {
  CreateSnsSubscriptionRequest,
  DeleteSnsSubscriptionRequest,
  GetSnsSubscriptionsRequest,
  SnsSubscription,
} from '@lens-protocol/graphql';
import {
  CreateSnsSubscriptionsMutation,
  DeleteSnsSubscriptionMutation,
  GetSnsSubscriptionsQuery,
} from '@lens-protocol/graphql';
import type { ResultAsync } from '@lens-protocol/types';

import type { SessionClient } from '../clients';
import type { UnauthenticatedError, UnexpectedError } from '../errors';

/**
 * Fetch a SNS subscription.
 *
 * ```ts
 * const result = await fetchSnsSubscription(sessionClient, {
 *   account: evmAddress('0xe2f2a5C287993345a840db3B0845fbc70f5935a5'),
 * });
 * ```
 *
 * @param client - The session client logged as a builder.
 * @param request - The query request.
 * @returns The details of the SNS subscription.
 */
export function fetchSnsSubscription(
  client: SessionClient,
  request: GetSnsSubscriptionsRequest,
): ResultAsync<Array<SnsSubscription> | [], UnexpectedError> {
  return client.query(GetSnsSubscriptionsQuery, { request });
}

/**
 * Create SNS subscriptions.
 *
 * ```ts
 * const result = await createSnsSubscription(sessionClient, {
 *   topics: [
 *     { accountMentioned: evmAddress('0x1234…') },
 *     { accountFollowed: evmAddress('0x90ab…') },
 *   ],
 *   webhook: uri('https://example.com'),
 * });
 * ```
 *
 * @param client - The session client logged as a builder.
 * @param request - The mutation request.
 * @returns List of SNS subscriptions created.
 */
export function createSnsSubscriptions(
  client: SessionClient,
  request: CreateSnsSubscriptionRequest,
): ResultAsync<Array<SnsSubscription>, UnexpectedError | UnauthenticatedError> {
  return client.mutation(CreateSnsSubscriptionsMutation, { request });
}

/**
 * Delete a SNS subscription.
 *
 * ```ts
 * const result = await deleteSnsSubscription(sessionClient, {
 *   id: "1234-dasdf-...",
 * });
 * ```
 *
 * @param client - The session client logged as a builder.
 * @param request - The mutation request.
 * @returns Void
 */
export function deleteSnsSubscription(
  client: SessionClient,
  request: DeleteSnsSubscriptionRequest,
): ResultAsync<void, UnexpectedError | UnauthenticatedError> {
  return client.mutation(DeleteSnsSubscriptionMutation, { request });
}
