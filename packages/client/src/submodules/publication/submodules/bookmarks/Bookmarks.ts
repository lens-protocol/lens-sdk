import type { PromiseResult } from '@lens-protocol/shared-kernel';

import type { Authentication } from '../../../../authentication';
import type { LensConfig } from '../../../../consts/config';
import type { CredentialsExpiredError, NotAuthenticatedError } from '../../../../consts/errors';
import { FetchGraphQLClient } from '../../../../graphql/FetchGraphQLClient';
import type { AnyPublicationFragment } from '../../../../graphql/types';
import type {
  PublicationBookmarkRequest,
  PublicationBookmarksRequest,
} from '../../../../graphql/types.generated';
import {
  buildImageTransformsFromConfig,
  buildPaginatedQueryResult,
  PaginatedResult,
  requireAuthHeaders,
  sdkAuthHeaderWrapper,
} from '../../../../helpers';
import { getSdk, Sdk } from './graphql/bookmarks.generated';

/**
 * Bookmarks are the posts, comments and mirrors saved in a dedicated list private to each profile.
 *
 * @group LensClient Modules
 */
export class Bookmarks {
  private readonly authentication: Authentication | undefined;
  private readonly sdk: Sdk;

  constructor(
    private readonly config: LensConfig,
    authentication?: Authentication,
  ) {
    const client = new FetchGraphQLClient(config.environment.gqlEndpoint);

    this.sdk = getSdk(client, sdkAuthHeaderWrapper(authentication));
    this.authentication = authentication;
  }

  /**
   * Fetch all publications bookmarked by authenticated profile.
   *
   * ⚠️ Requires authenticated LensClient.
   *
   * @param request - Request object for the query
   * @returns Publications wrapped in {@link PaginatedResult}
   *
   * @example
   * ```ts
   * const result = await client.publication.bookmarks.fetch();
   * ```
   */
  async fetch(
    request: PublicationBookmarksRequest = {},
  ): PromiseResult<
    PaginatedResult<AnyPublicationFragment>,
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return requireAuthHeaders(this.authentication, async (headers) => {
      return buildPaginatedQueryResult(async (currRequest) => {
        const result = await this.sdk.PublicationBookmarks(
          {
            request: currRequest,
            ...buildImageTransformsFromConfig(this.config.mediaTransforms),
          },
          headers,
        );

        return result.data.result;
      }, request);
    });
  }

  /**
   * Adds a publication to the profile's bookmarks.
   *
   * ⚠️ Requires authenticated LensClient.
   *
   * @param request - Request object for the mutation
   * @returns {@link PromiseResult} with void
   *
   * @example
   * ```ts
   * const result = await client.publication.bookmarks.add({
   *   on: '0x123-0x456',
   * });
   * ```
   */
  async add(
    request: PublicationBookmarkRequest,
  ): PromiseResult<void, CredentialsExpiredError | NotAuthenticatedError> {
    return requireAuthHeaders(this.authentication, async (headers) => {
      await this.sdk.AddPublicationBookmark({ request }, headers);
    });
  }

  /**
   * Removes a publication from the profile's bookmarks.
   *
   * ⚠️ Requires authenticated LensClient.
   *
   * @param request - Request object for the mutation
   * @returns {@link PromiseResult} with void
   *
   * @example
   * ```ts
   * const result = await client.publication.bookmarks.remove({
   *   on: '0x123-0x456',
   * });
   * ```
   */
  async remove(
    request: PublicationBookmarkRequest,
  ): PromiseResult<void, CredentialsExpiredError | NotAuthenticatedError> {
    return requireAuthHeaders(this.authentication, async (headers) => {
      await this.sdk.RemovePublicationBookmark({ request }, headers);
    });
  }
}
