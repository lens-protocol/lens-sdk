import type { PromiseResult } from '@lens-protocol/shared-kernel';

import type { Authentication } from '../../../../authentication';
import { LensContext } from '../../../../context';
import type { CredentialsExpiredError, NotAuthenticatedError } from '../../../../errors';
import { FetchGraphQLClient } from '../../../../graphql/FetchGraphQLClient';
import type {
  ReactionRequest,
  WhoReactedPublicationRequest,
} from '../../../../graphql/types.generated';
import {
  commonQueryVariables,
  buildPaginatedQueryResult,
  PaginatedResult,
  requireAuthHeaders,
  sdkAuthHeaderWrapper,
} from '../../../../helpers';
import { getSdk, ProfileWhoReactedResultFragment, Sdk } from './graphql/reactions.generated';

/**
 * React to publications off-chain.
 *
 * @group LensClient Modules
 */
export class Reactions {
  private readonly sdk: Sdk;

  /**
   * @internal
   */
  constructor(
    private readonly context: LensContext,
    private readonly authentication: Authentication,
  ) {
    const client = new FetchGraphQLClient(context);
    this.sdk = getSdk(client, sdkAuthHeaderWrapper(authentication));
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
   * import { PublicationReactionType } from '@lens-protocol/client';
   *
   * await client.publication.reactions.add({
   *   for: '0x02-0x01',
   *   reaction: PublicationReactionType.Upvote,
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
   * import { PublicationReactionType } from '@lens-protocol/client';
   *
   * await client.publication.reactions.remove({
   *   for: '0x02-0x01',
   *   reaction: PublicationReactionType.Upvote,
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
   * @returns Array of {@link ProfileFragment} wrapped in {@link PaginatedResult}
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
  ): Promise<PaginatedResult<ProfileWhoReactedResultFragment>> {
    return buildPaginatedQueryResult(async (currRequest) => {
      const result = await this.sdk.WhoReactedPublication({
        request: currRequest,
        ...commonQueryVariables(this.context),
      });

      return result.data.result;
    }, request);
  }
}
