import type { PromiseResult } from '@lens-protocol/shared-kernel';

import type { Authentication } from '../authentication';
import type { LensConfig } from '../consts/config';
import type { CredentialsExpiredError, NotAuthenticatedError } from '../consts/errors';
import { FetchGraphQLClient } from '../graphql/FetchGraphQLClient';
import type { NotificationRequest } from '../graphql/types.generated';
import {
  PaginatedResult,
  buildImageTransformsFromConfig,
  buildPaginatedQueryResult,
  requireAuthHeaders,
} from '../helpers';
import {
  ActedNotificationFragment,
  CommentNotificationFragment,
  FollowNotificationFragment,
  FutureProofNotificationFragment,
  getSdk,
  MentionNotificationFragment,
  MirrorNotificationFragment,
  QuoteNotificationFragment,
  ReactionNotificationFragment,
  Sdk,
} from './graphql/notifications.generated';

export type NotificationFragment =
  | ActedNotificationFragment
  | CommentNotificationFragment
  | FollowNotificationFragment
  | FutureProofNotificationFragment
  | MentionNotificationFragment
  | MirrorNotificationFragment
  | QuoteNotificationFragment
  | ReactionNotificationFragment;

/**
 * Notifications on activity for a profile including collects, comment, new followers, and mirrors.
 *
 * @group LensClient Modules
 */
export class Notifications {
  private readonly authentication: Authentication | undefined;
  private readonly sdk: Sdk;

  constructor(
    private readonly config: LensConfig,
    authentication: Authentication,
  ) {
    const client = new FetchGraphQLClient(config.environment.gqlEndpoint);

    this.sdk = getSdk(client);
    this.authentication = authentication;
  }

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
            ...buildImageTransformsFromConfig(this.config.mediaTransforms),
          },
          headers,
        );

        return result.data.result;
      }, request);
    });
  }
}
