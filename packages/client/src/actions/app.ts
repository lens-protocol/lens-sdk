import type {
  AddAppFeedsRequest,
  AddAppFeedsResult,
  AddAppGroupsRequest,
  AddAppGroupsResult,
  AddAppSignersRequest,
  AddAppSignersResult,
  App,
  AppFeed,
  AppFeedsRequest,
  AppGroupsRequest,
  AppRequest,
  AppSigner,
  AppSignersRequest,
  AppUser,
  AppUsersRequest,
  AppsRequest,
  CreateAppRequest,
  CreateAppResult,
  Group,
  Paginated,
  RemoveAppFeedsRequest,
  RemoveAppFeedsResult,
  RemoveAppGroupsRequest,
  RemoveAppGroupsResult,
  RemoveAppSignersRequest,
  RemoveAppSignersResult,
  SetAppGraphRequest,
  SetAppGraphResult,
  SetAppMetadataRequest,
  SetAppMetadataResult,
  SetAppSponsorshipRequest,
  SetAppSponsorshipResult,
  SetAppTreasuryRequest,
  SetAppTreasuryResult,
  SetAppUsernameNamespaceRequest,
  SetAppUsernameNamespaceResult,
  SetAppVerificationRequest,
  SetAppVerificationResult,
  SetDefaultAppFeedRequest,
  SetDefaultAppFeedResult,
} from '@lens-protocol/graphql';
import {
  AddAppFeedsMutation,
  AddAppGroupsMutation,
  AddAppSignersMutation,
  AppFeedsQuery,
  AppGroupsQuery,
  AppQuery,
  AppSignersQuery,
  AppUsersQuery,
  AppsQuery,
  CreateAppMutation,
  RemoveAppFeedsMutation,
  RemoveAppGroupsMutation,
  RemoveAppSignersMutation,
  SetAppGraphMutation,
  SetAppMetadataMutation,
  SetAppSponsorshipMutation,
  SetAppTreasuryMutation,
  SetAppUsernameNamespaceMutation,
  SetAppVerificationMutation,
  SetDefaultAppFeedMutation,
} from '@lens-protocol/graphql';
import type { ResultAsync } from '@lens-protocol/types';

import type {} from '@lens-protocol/graphql';
import type { AnyClient, SessionClient } from '../clients';
import type { UnauthenticatedError, UnexpectedError } from '../errors';

/**
 * Fetch an App.
 *
 * Using a {@link SessionClient} will yield {@link App#operations}
 *
 * ```ts
 * const result = await fetchApp(anyClient, {
 *   address: evmAddress('0xe2f2a5C287993345a840db3B0845fbc70f5935a5'),
 * });
 * ```
 *
 * @param client - Any Lens client.
 * @param request - The App query request.
 * @returns The App or `null` if it does not exist.
 */
export function fetchApp(
  client: AnyClient,
  request: AppRequest,
): ResultAsync<App | null, UnexpectedError> {
  return client.query(AppQuery, { request });
}

/**
 * Fetch Apps.
 *
 * ```ts
 * const result = await fetchApps(anyClient, {
 *   filter: {
 *     managedBy: {
 *       address: evmAddress('0xe2f2a5C287993345a840db3B0845fbc70f5935a5')
 *     }
 *   },
 * });
 * ```
 *
 * @param client - Any Lens client.
 * @param request - The query request.
 * @returns The list of Apps or empty if it does not exist.
 */
export function fetchApps(
  client: AnyClient,
  request: AppsRequest,
): ResultAsync<Paginated<App> | null, UnexpectedError> {
  return client.query(AppsQuery, { request });
}

/**
 * Fetch Groups linked to an App.
 *
 * ```ts
 * const result = await fetchAppGroups(anyClient, {
 *   app: evmAddress('0xe2f2a5C287993345a840db3B0845fbc70f5935a5')
 * });
 * ```
 *
 * @param client - Any Lens client.
 * @param request - The query request.
 * @returns The list of groups for an App or empty if it does not exist.
 */
export function fetchAppGroups(
  client: AnyClient,
  request: AppGroupsRequest,
): ResultAsync<Paginated<Group> | null, UnexpectedError> {
  return client.query(AppGroupsQuery, { request });
}

/**
 * Fetch Feeds linked to an App.
 *
 * ```ts
 * const result = await fetchAppFeeds(anyClient, {
 *   app: evmAddress('0xe2f2a5C287993345a840db3B0845fbc70f5935a5')
 * });
 * ```
 *
 * @param client - Any Lens client.
 * @param request - The query request.
 * @returns The list of feeds for an App or empty if it does not exist.
 */
export function fetchAppFeeds(
  client: AnyClient,
  request: AppFeedsRequest,
): ResultAsync<Paginated<AppFeed> | null, UnexpectedError> {
  return client.query(AppFeedsQuery, { request });
}

/**
 * Fetch Signers linked to an App.
 *
 * ```ts
 * const result = await fetchAppSigners(anyClient, {
 *   app: evmAddress('0xe2f2a5C287993345a840db3B0845fbc70f5935a5')
 * });
 * ```
 *
 * @param client - Any Lens client.
 * @param request - The query request.
 * @returns The list of signers for an App or empty if it does not exist.
 */
export function fetchAppSigners(
  client: AnyClient,
  request: AppSignersRequest,
): ResultAsync<Paginated<AppSigner> | null, UnexpectedError> {
  return client.query(AppSignersQuery, { request });
}

/**
 * Fetch users using an App.
 *
 * ```ts
 * const result = await fetchAppUsers(anyClient, {
 *   app: evmAddress('0xe2f2a5C287993345a840db3B0845fbc70f5935a5')
 * });
 * ```
 *
 * @param client - Any Lens client.
 * @param request - The query request.
 * @returns The list of users for an App or empty if it does not exist.
 */
export function fetchAppUsers(
  client: AnyClient,
  request: AppUsersRequest,
): ResultAsync<Paginated<AppUser> | null, UnexpectedError> {
  return client.query(AppUsersQuery, { request });
}

/**
 * Create an App
 *
 * ```ts
 * const result = await createApp(sessionClient, {
 *   verification: true
 * });
 * ```
 *
 * @param client - The session client logged as a builder.
 * @param request - The mutation request.
 * @returns Tiered transaction result.
 */
export function createApp(
  client: SessionClient,
  request: CreateAppRequest,
): ResultAsync<CreateAppResult, UnexpectedError | UnauthenticatedError> {
  return client.mutation(CreateAppMutation, { request });
}

/**
 * Add feeds to an App
 *
 * ```ts
 * const result = await addAppFeeds(sessionClient, {
 *   feeds: [evmAddress('0xe2f2a5C287993345a840db3B0845fbc70f5935a5')],
 *   app: evmAddress('0xe2f2a5C287993345a840db3B0845fbc70f5935a5'),
 * });
 * ```
 *
 * @param client - The session client logged as a builder.
 * @param request - The mutation request.
 * @returns Tiered transaction result.
 */
export function addAppFeeds(
  client: SessionClient,
  request: AddAppFeedsRequest,
): ResultAsync<AddAppFeedsResult, UnexpectedError | UnauthenticatedError> {
  return client.mutation(AddAppFeedsMutation, { request });
}

/**
 * Add groups to an App
 *
 * ```ts
 * const result = await addAppGroups(sessionClient, {
 *   groups: [evmAddress('0xe2f2a5C287993345a840db3B0845fbc70f5935a5')],
 *   app: evmAddress('0xe2f2a5C287993345a840db3B0845fbc70f5935a5'),
 * });
 * ```
 *
 * @param client - The session client logged as a builder.
 * @param request - The mutation request.
 * @returns Tiered transaction result.
 */
export function addAppGroups(
  client: SessionClient,
  request: AddAppGroupsRequest,
): ResultAsync<AddAppGroupsResult, UnexpectedError | UnauthenticatedError> {
  return client.mutation(AddAppGroupsMutation, { request });
}

/**
 * Add signers to an App
 *
 * ```ts
 * const result = await addAppSigners(sessionClient, {
 *   signers: [evmAddress('0xe2f2a5C287993345a840db3B0845fbc70f5935a5')],
 *   app: evmAddress('0xe2f2a5C287993345a840db3B0845fbc70f5935a5'),
 * });
 * ```
 *
 * @param client - The session client logged as a builder.
 * @param request - The mutation request.
 * @returns Tiered transaction result.
 */
export function addAppSigners(
  client: SessionClient,
  request: AddAppSignersRequest,
): ResultAsync<AddAppSignersResult, UnexpectedError | UnauthenticatedError> {
  return client.mutation(AddAppSignersMutation, { request });
}

/**
 * Remove feeds from an App
 *
 * ```ts
 * const result = await removeAppFeeds(sessionClient, {
 *   feeds: [evmAddress('0xe2f2a5C287993345a840db3B0845fbc70f5935a5')],
 *   app: evmAddress('0xe2f2a5C287993345a840db3B0845fbc70f5935a5'),
 * });
 * ```
 *
 * @param client - The session client logged as a builder.
 * @param request - The mutation request.
 * @returns Tiered transaction result.
 */
export function removeAppFeeds(
  client: SessionClient,
  request: RemoveAppFeedsRequest,
): ResultAsync<RemoveAppFeedsResult, UnexpectedError | UnauthenticatedError> {
  return client.mutation(RemoveAppFeedsMutation, { request });
}

/**
 * Remove groups from an App
 *
 * ```ts
 * const result = await removeAppGroups(sessionClient, {
 *   groups: [evmAddress('0xe2f2a5C287993345a840db3B0845fbc70f5935a5')],
 *   app: evmAddress('0xe2f2a5C287993345a840db3B0845fbc70f5935a5'),
 * });
 * ```
 *
 * @param client - The session client logged as a builder.
 * @param request - The mutation request.
 * @returns Tiered transaction result.
 */
export function removeAppGroups(
  client: SessionClient,
  request: RemoveAppGroupsRequest,
): ResultAsync<RemoveAppGroupsResult, UnexpectedError | UnauthenticatedError> {
  return client.mutation(RemoveAppGroupsMutation, { request });
}

/**
 * Remove signers from an App
 *
 * ```ts
 * const result = await removeAppSigners(sessionClient, {
 *   signers: [evmAddress('0xe2f2a5C287993345a840db3B0845fbc70f5935a5')],
 *   app: evmAddress('0xe2f2a5C287993345a840db3B0845fbc70f5935a5'),
 * });
 * ```
 *
 * @param client - The session client logged as a builder.
 * @param request - The mutation request.
 * @returns Tiered transaction result.
 */
export function removeAppSigners(
  client: SessionClient,
  request: RemoveAppSignersRequest,
): ResultAsync<RemoveAppSignersResult, UnexpectedError | UnauthenticatedError> {
  return client.mutation(RemoveAppSignersMutation, { request });
}

/**
 * Set app Graph
 *
 * ```ts
 * const result = await setAppGraph(sessionClient, {
 *   graph: evmAddress('0xe2f2a5C287993345a840db3B0845fbc70f5935a5'),
 *   app: evmAddress('0xe2f2a5C287993345a840db3B0845fbc70f5935a5'),
 * });
 * ```
 *
 * @param client - The session client logged as a builder.
 * @param request - The mutation request.
 * @returns Tiered transaction result.
 */
export function setAppGraph(
  client: SessionClient,
  request: SetAppGraphRequest,
): ResultAsync<SetAppGraphResult, UnexpectedError | UnauthenticatedError> {
  return client.mutation(SetAppGraphMutation, { request });
}

/**
 * Set default Feed for app
 *
 * ```ts
 * const result = await setDefaultAppFeed(sessionClient, {
 *   feed: evmAddress('0xe2f2a5C287993345a840db3B0845fbc70f5935a5'),
 *   app: evmAddress('0xe2f2a5C287993345a840db3B0845fbc70f5935a5'),
 * });
 * ```
 *
 * @param client - The session client logged as a builder.
 * @param request - The mutation request.
 * @returns Tiered transaction result.
 */
export function setDefaultAppFeed(
  client: SessionClient,
  request: SetDefaultAppFeedRequest,
): ResultAsync<SetDefaultAppFeedResult, UnexpectedError | UnauthenticatedError> {
  return client.mutation(SetDefaultAppFeedMutation, { request });
}

/**
 * Set metadata for app
 *
 * ```ts
 * const result = await setAppMetadata(sessionClient, {
 *   metadataUri: 'https://example.com/metadata.json',
 *   app: evmAddress('0xe2f2a5C287993345a840db3B0845fbc70f5935a5'),
 * });
 * ```
 *
 * @param client - The session client logged as a builder.
 * @param request - The mutation request.
 * @returns Tiered transaction result.
 */
export function setAppMetadata(
  client: SessionClient,
  request: SetAppMetadataRequest,
): ResultAsync<SetAppMetadataResult, UnexpectedError | UnauthenticatedError> {
  return client.mutation(SetAppMetadataMutation, { request });
}

/**
 * Set verification status for app
 *
 * ```ts
 * const result = await setAppVerification(sessionClient, {
 *   enabled: true,
 *   app: evmAddress('0xe2f2a5C287993345a840db3B0845fbc70f5935a5'),
 * });
 * ```
 *
 * @param client - The session client logged as a builder.
 * @param request - The mutation request.
 * @returns Tiered transaction result.
 */
export function setAppVerification(
  client: SessionClient,
  request: SetAppVerificationRequest,
): ResultAsync<SetAppVerificationResult, UnexpectedError | UnauthenticatedError> {
  return client.mutation(SetAppVerificationMutation, { request });
}

/**
 * Set sponsorship for app
 *
 * ```ts
 * const result = await setAppSponsorship(sessionClient, {
 *   sponsorship: evmAddress('0xe2f2a5C287993345a840db3B0845fbc70f5935a5'),
 *   app: evmAddress('0xe2f2a5C287993345a840db3B0845fbc70f5935a5'),
 * });
 * ```
 *
 * @param client - The session client logged as a builder.
 * @param request - The mutation request.
 * @returns Tiered transaction result.
 */
export function setAppSponsorship(
  client: SessionClient,
  request: SetAppSponsorshipRequest,
): ResultAsync<SetAppSponsorshipResult, UnexpectedError | UnauthenticatedError> {
  return client.mutation(SetAppSponsorshipMutation, { request });
}

/**
 * Set treasury for app
 *
 * ```ts
 * const result = await setAppTreasury(sessionClient, {
 *   treasury: evmAddress('0xe2f2a5C287993345a840db3B0845fbc70f5935a5'),
 *   app: evmAddress('0xe2f2a5C287993345a840db3B0845fbc70f5935a5'),
 * });
 * ```
 *
 * @param client - The session client logged as a builder.
 * @param request - The mutation request.
 * @returns Tiered transaction result.
 */
export function setAppTreasury(
  client: SessionClient,
  request: SetAppTreasuryRequest,
): ResultAsync<SetAppTreasuryResult, UnexpectedError | UnauthenticatedError> {
  return client.mutation(SetAppTreasuryMutation, { request });
}

/**
 * Set username namespace for app
 *
 * ```ts
 * const result = await setAppUsernameNamespace(sessionClient, {
 *   usernameNamespace: evmAddress('0xe2f2a5C287993345a840db3B0845fbc70f5935a5'),
 *   app: evmAddress('0xe2f2a5C287993345a840db3B0845fbc70f5935a5'),
 * });
 * ```
 *
 * @param client - The session client logged as a builder.
 * @param request - The mutation request.
 * @returns Tiered transaction result.
 */
export function setAppUsernameNamespace(
  client: SessionClient,
  request: SetAppUsernameNamespaceRequest,
): ResultAsync<SetAppUsernameNamespaceResult, UnexpectedError | UnauthenticatedError> {
  return client.mutation(SetAppUsernameNamespaceMutation, { request });
}
