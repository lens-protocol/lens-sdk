import type {
  CreateFollowRequest,
  CreateUnfollowRequest,
  FollowResult,
  UnfollowResult,
} from '@lens-protocol/graphql';
import { FollowMutation, UnfollowMutation } from '@lens-protocol/graphql';
import type { ResultAsync } from '@lens-protocol/types';

import type { SessionClient } from '../clients';
import type { UnauthenticatedError, UnexpectedError } from '../errors';

/**
 * Follow an Account
 *
 * ```ts
 * const result = await follow(sessionClient,
 *  { account: evmAddress('0x90c8c68d0Abfb40D4fCD72316A65e42161520BC3') }
 * );
 * ```
 *
 * @param client - The session client for the authenticated Account.
 * @param request - The mutation request.
 * @returns Tiered transaction result.
 */
export function follow(
  client: SessionClient,
  request: CreateFollowRequest,
): ResultAsync<FollowResult, UnexpectedError | UnauthenticatedError> {
  return client.mutation(FollowMutation, { request });
}

/**
 * Unfollow an Account
 *
 * ```ts
 * const result = await unfollow(sessionClient,
 *  { account: EvmAddress('0x90c8c68d0Abfb40D4fCD72316A65e42161520BC3') }
 * );
 * ```
 *
 * @param client - The session client for the authenticated Account.
 * @param request - The mutation request.
 * @returns Tiered transaction result.
 */
export function unfollow(
  client: SessionClient,
  request: CreateUnfollowRequest,
): ResultAsync<UnfollowResult, UnexpectedError | UnauthenticatedError> {
  return client.mutation(UnfollowMutation, { request });
}
