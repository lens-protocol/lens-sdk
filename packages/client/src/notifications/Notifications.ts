import type { PromiseResult } from '@lens-protocol/shared-kernel';

import type { Authentication } from '../authentication';
import type { LensConfig } from '../consts/config';
import type { CredentialsExpiredError, NotAuthenticatedError } from '../consts/errors';
import type { NotificationRequest } from '../graphql/types.generated';
import { PaginatedResult, buildPaginatedQueryResult, requireAuthHeaders } from '../helpers';
import { FetchGraphQLClient } from '../helpers/FetchGraphQLClient';
import {
  getSdk,
  NewCollectNotificationFragment,
  NewCommentNotificationFragment,
  NewFollowerNotificationFragment,
  NewMentionNotificationFragment,
  NewMirrorNotificationFragment,
  NewReactionNotificationFragment,
  Sdk,
} from './graphql/notifications.generated';

export type NotificationFragment =
  | NewCollectNotificationFragment
  | NewCommentNotificationFragment
  | NewFollowerNotificationFragment
  | NewMentionNotificationFragment
  | NewMirrorNotificationFragment
  | NewReactionNotificationFragment;

/**
 * Notifications on activity for a profile including collects, comment, new followers, and mirrors.
 *
 * @group LensClient Modules
 */
export class Notifications {
  private readonly authentication: Authentication | undefined;
  private readonly sdk: Sdk;

  constructor(config: LensConfig, authentication: Authentication) {
    const client = new FetchGraphQLClient(config.environment.gqlEndpoint);

    this.sdk = getSdk(client);
    this.authentication = authentication;
  }

  /**
   * Fetch notifications.
   *
   * ⚠️ Requires authenticated LensClient.
   *
   * @param request - Request object for the query
   * @param observerId - Optional id of a profile that is the observer for this request
   * @returns {@link PromiseResult} with array of {@link NotificationFragment} wrapped in the {@link PaginatedResult} helper
   *
   * @example
   * ```ts
   * const result = await client.notifications.fetch({
   *  profileId: '0x0185',
   * });
   * ```
   */
  async fetch(
    request: NotificationRequest,
    observerId?: string,
  ): PromiseResult<
    PaginatedResult<NotificationFragment>,
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return requireAuthHeaders(this.authentication, async (headers) => {
      return buildPaginatedQueryResult(async (currRequest) => {
        const result = await this.sdk.Notifications(
          {
            request: currRequest,
            observerId,
          },
          headers,
        );

        return result.data.result;
      }, request);
    });
  }
}
