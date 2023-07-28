import type { PromiseResult } from '@lens-protocol/shared-kernel';

import type { Authentication } from '../authentication';
import type { LensConfig } from '../consts/config';
import type { CredentialsExpiredError, NotAuthenticatedError } from '../consts/errors';
import { FetchGraphQLClient } from '../graphql/FetchGraphQLClient';
import type { PublicationFragment } from '../graphql/types';
import type {
  PublicationProfileBookmarkRequest,
  PublicationsProfileBookmarkedQueryRequest,
} from '../graphql/types.generated';
import {
  buildPaginatedQueryResult,
  PaginatedResult,
  provideAuthHeaders,
  requireAuthHeaders,
} from '../helpers';
import { getSdk, Sdk } from './graphql/bookmarks.generated';

/**
 * Bookmarks are the posts, comments and mirrors saved in a dedicated list private to each profile.
 *
 * @group LensClient Modules
 */
export class Bookmarks {
  private readonly authentication: Authentication | undefined;
  private readonly sdk: Sdk;

  constructor(config: LensConfig, authentication?: Authentication) {
    const client = new FetchGraphQLClient(config.environment.gqlEndpoint);

    this.sdk = getSdk(client);
    this.authentication = authentication;
  }

  /**
   * Fetch all publications bookmarked by a profile
   *
   * ⚠️ Requires authenticated LensClient.
   *
   * @param request - Request object for the query
   * @param observerId - The optional observer Profile ID
   * @returns Publications wrapped in {@link PaginatedResult}
   *
   * @example
   * ```ts
   * const result = await client.bookmarks.fetch({
   *   profileId: '0x123',
   * });
   * ```
   */
  async fetch(
    request: PublicationsProfileBookmarkedQueryRequest,
    observerId?: string,
  ): Promise<PaginatedResult<PublicationFragment>> {
    return provideAuthHeaders(this.authentication, async (headers) => {
      return buildPaginatedQueryResult(async (currRequest) => {
        const result = await this.sdk.PublicationsProfileBookmarks(
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

  /**
   * Adds a publication to the profile's bookmarks.
   * The profile must be owned by the authenticated wallet.
   *
   * ⚠️ Requires authenticated LensClient.
   *
   * @param request - Request object for the mutation
   * @returns void
   *
   * @example
   * ```ts
   * const result = await client.publication.add({
   *   profileId: '0x123',
   *   publicationId: '0x123-0x456',
   * });
   * ```
   */
  async add(
    request: PublicationProfileBookmarkRequest,
  ): PromiseResult<void, CredentialsExpiredError | NotAuthenticatedError> {
    return requireAuthHeaders(this.authentication, async (headers) => {
      await this.sdk.AddPublicationProfileBookmark({ request }, headers);
    });
  }

  /**
   * Removes a publication to the profile's bookmarks.
   * The profile must be owned by the authenticated wallet.
   *
   * ⚠️ Requires authenticated LensClient.
   *
   * @param request - Request object for the mutation
   * @returns void
   *
   * @example
   * ```ts
   * const result = await client.publication.remove({
   *   profileId: '0x123',
   *   publicationId: '0x123-0x456',
   * });
   * ```
   */
  async remove(
    request: PublicationProfileBookmarkRequest,
  ): PromiseResult<void, CredentialsExpiredError | NotAuthenticatedError> {
    return requireAuthHeaders(this.authentication, async (headers) => {
      await this.sdk.RemovePublicationProfileBookmark({ request }, headers);
    });
  }
}
