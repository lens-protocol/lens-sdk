import type { PromiseResult } from '@lens-protocol/shared-kernel';

import type { Authentication } from '../authentication';
import type { LensConfig } from '../consts/config';
import { defaultMediaTransformParams } from '../consts/defaults';
import type { CredentialsExpiredError, NotAuthenticatedError } from '../consts/errors';
import { FetchGraphQLClient } from '../graphql/FetchGraphQLClient';
import type {
  MediaTransformParams,
  ReactionRequest,
  WhoReactedPublicationRequest,
} from '../graphql/types.generated';
import {
  buildPaginatedQueryResult,
  PaginatedResult,
  provideAuthHeaders,
  requireAuthHeaders,
} from '../helpers';
import { getSdk, Sdk, WhoReactedResultFragment } from './graphql/reactions.generated';

/**
 * React to publications off-chain.
 *
 * @group LensClient Modules
 */
export class Reactions {
  private readonly authentication: Authentication | undefined;
  private readonly sdk: Sdk;

  constructor(config: LensConfig, authentication?: Authentication) {
    const client = new FetchGraphQLClient(config.environment.gqlEndpoint);

    this.sdk = getSdk(client);
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
   * await client.reactions.add({
   *   profileId: '0x01',
   *   publicationId: '0x02-0x01',
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
   * await client.reactions.remove({
   *   profileId: '0x01',
   *   publicationId: '0x02-0x01',
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
   * @param observerId - Optional id of a profile that is the observer for this request
   * @param mediaTransformParams - Optional media transform params if you want to optimize media in the response
   * @returns Array of {@link WhoReactedResultFragment} wrapped in {@link PaginatedResult}
   *
   * @example
   * ```ts
   * const result = await client.reactions.toPublication({
   *   publicationId: '0x01-0x02',
   * });
   * ```
   */
  async toPublication(
    request: WhoReactedPublicationRequest,
    observerId?: string,
    mediaTransformParams: MediaTransformParams = defaultMediaTransformParams,
  ): Promise<PaginatedResult<WhoReactedResultFragment>> {
    return provideAuthHeaders(this.authentication, async (headers) => {
      return buildPaginatedQueryResult(async (currRequest) => {
        const result = await this.sdk.WhoReactedPublication(
          {
            request: currRequest,
            observerId,
            mediaTransformParams,
          },
          headers,
        );

        return result.data.result;
      }, request);
    });
  }
}
