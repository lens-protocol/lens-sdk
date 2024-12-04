import type {
  CreateFollowRequest,
  CreateUnfollowRequest,
  FollowResult,
  UnfollowResult,
} from '@lens-protocol/graphql';
import {
  FollowMutation,
  FollowStatusQuery,
  FollowersQuery,
  FollowersYouKnowQuery,
  FollowingQuery,
  UnfollowMutation,
} from '@lens-protocol/graphql';
import type { ResultAsync } from '@lens-protocol/types';

import type { FollowersRequest } from '@lens-protocol/graphql';
import type { Follower } from '@lens-protocol/graphql';
import type { FollowingRequest } from '@lens-protocol/graphql';
import type { Following } from '@lens-protocol/graphql';
import type { FollowersYouKnowRequest } from '@lens-protocol/graphql';
import type { FollowStatusRequest } from '@lens-protocol/graphql';
import type { FollowStatusResult } from '@lens-protocol/graphql';
import type { AnyClient, SessionClient } from '../clients';
import type { UnauthenticatedError, UnexpectedError } from '../errors';
import type { Paginated } from '../types';

/**
 * Follow an Account
 *
 * ```ts
 * const result = await follow(sessionClient, {
 *  account: evmAddress('0x90c8c68d0Abfb40D4fCD72316A65e42161520BC3')
 * });
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
 * const result = await unfollow(sessionClient, {
 *  account: evmAddress('0x90c8c68d0Abfb40D4fCD72316A65e42161520BC3')
 * });
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

/**
 * Fetch followers accounts.
 *
 * ```ts
 * const result = await fetchFollowers(anyClient, {
 *   account: evmAddress('0xe2f2a5C287993345a840db3B0845fbc70f5935a5'),
 * });
 * ```
 *
 * @param client - Any Lens client.
 * @param request - The query request.
 * @returns List of followers accounts.
 */
export function fetchFollowers(
  client: AnyClient,
  request: FollowersRequest,
): ResultAsync<Paginated<Follower>, UnexpectedError> {
  return client.query(FollowersQuery, { request });
}

/**
 * Fetch accounts following.
 *
 * ```ts
 * const result = await fetchFollowing(anyClient, {
 *   account: evmAddress('0xe2f2a5C287993345a840db3B0845fbc70f5935a5'),
 * });
 * ```
 *
 * @param client - Any Lens client.
 * @param request - The query request.
 * @returns List of accounts following.
 */
export function fetchFollowing(
  client: AnyClient,
  request: FollowingRequest,
): ResultAsync<Paginated<Following>, UnexpectedError> {
  return client.query(FollowingQuery, { request });
}

/**
 * Fetch accounts following.
 *
 * ```ts
 * const result = await fetchFollowersYouKnow(sessionClient, {
 *   observer: evmAddress('0xe2f2a5C287993345a840db3B0845fbc70f5935a5'),
 *   target: evmAddress('0xe5439696f4057aF073c0FB2dc6e5e755392922e1'),
 * });
 * ```
 *
 * @param client - The session client for the authenticated Account.
 * @param request - The query request.
 * @returns List of accounts following.
 */
export function fetchFollowersYouKnow(
  client: SessionClient,
  request: FollowersYouKnowRequest,
): ResultAsync<Paginated<Follower>, UnexpectedError> {
  return client.query(FollowersYouKnowQuery, { request });
}

/**
 * Fetch follow status.
 *
 * ```ts
 * const result = await fetchFollowStatus(anyClient, {
 *   account: evmAddress('0xe2f2a5C287993345a840db3B0845fbc70f5935a5'),
 *   follower: evmAddress('0xe5439696f4057aF073c0FB2dc6e5e755392922e1'),
 * });
 * ```
 *
 * @param client - Any Lens client.
 * @param request - The query request.
 * @returns Status of the follow action.
 */
export function fetchFollowStatus(
  client: AnyClient,
  request: FollowStatusRequest,
): ResultAsync<FollowStatusResult[], UnexpectedError> {
  return client.query(FollowStatusQuery, { request });
}
