import type { PromiseResult } from '@lens-protocol/shared-kernel';

import type { Authentication } from '../../../../authentication';
import type { LensConfig } from '../../../../consts/config';
import type { CredentialsExpiredError, NotAuthenticatedError } from '../../../../consts/errors';
import { FetchGraphQLClient } from '../../../../graphql/FetchGraphQLClient';
import type {
  ReactionRequest,
  WhoReactedPublicationRequest,
} from '../../../../graphql/types.generated';
import {
  buildImageTransformsFromConfig,
  buildPaginatedQueryResult,
  PaginatedResult,
  requireAuthHeaders,
  sdkAuthHeaderWrapper,
} from '../../../../helpers';
import { getSdk, ProfileReactedResultFragment, Sdk } from './graphql/reactions.generated';

/**
 * React to publications off-chain.
 *
 * @group LensClient Modules
 */
export class Reactions {
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
   * Add a reaction to a publication.
   *
   * ⚠️ Requires authenticated LensClient.
   *
   * @param request - Request object for the mutation
   * @returns {@link PromiseResult} with void
   *
   * @example
   * ```ts
   * import { ReactionTypes } from '@lens-protocol/client';
   *
   * await client.publication.reactions.add({
   *   for: '0x02-0x01',
   *   reaction: ReactionTypes.Upvote,
   * });
   * ```
   */
  async add(
    request: ReactionRequest,
  ): PromiseResult<void, CredentialsExpiredError | NotAuthenticatedError> {
    return requireAuthHeaders(this.authentication, async (headers) => {
      await this.sdk.AddReaction({ request }, headers);
    });
  }

  /**
   * Remove a reaction from a publication.
   * If the reaction does not exist, this will return an error.
   *
   * ⚠️ Requires authenticated LensClient.
   *
   * @param request - Request object for the mutation
   * @returns {@link PromiseResult} with void
   *
   * @example
   * ```ts
   * import { ReactionTypes } from '@lens-protocol/client';
   *
   * await client.publication.reactions.remove({
   *   for: '0x02-0x01',
   *   reaction: ReactionTypes.Upvote,
   * });
   * ```
   */
  async remove(
    request: ReactionRequest,
  ): PromiseResult<void, CredentialsExpiredError | NotAuthenticatedError> {
    return requireAuthHeaders(this.authentication, async (headers) => {
      await this.sdk.RemoveReaction({ request }, headers);
    });
  }

  /**
   * Fetch who reacted to a publication.
   *
   * @param request - Request object for the query
   * @returns Array of {@link ProfileReactedResultFragment} wrapped in {@link PaginatedResult}
   *
   * @example
   * ```ts
   * const result = await client.publication.reactions.fetch({
   *   for: '0x01-0x02',
   * });
   * ```
   */
  async fetch(
    request: WhoReactedPublicationRequest,
  ): Promise<PaginatedResult<ProfileReactedResultFragment>> {
    return buildPaginatedQueryResult(async (currRequest) => {
      const result = await this.sdk.WhoReactedPublication({
        request: currRequest,
        ...buildImageTransformsFromConfig(this.config.mediaTransforms),
      });

      return result.data.result;
    }, request);
  }
}
