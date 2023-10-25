import type { Authentication } from '../../authentication';
import { LensContext } from '../../context';
import { FetchGraphQLClient } from '../../graphql/FetchGraphQLClient';
import { ProfileFragment } from '../../graphql/fragments.generated';
import type {
  MutualPoapsQueryRequest,
  PoapEventQueryRequest,
  PoapHoldersQueryRequest,
  UserPoapsQueryRequest,
} from '../../graphql/types.generated';
import {
  PaginatedResult,
  buildRequestFromConfig,
  buildPaginatedQueryResult,
  sdkAuthHeaderWrapper,
} from '../../helpers';
import { PoapEventFragment, PoapTokenFragment, Sdk, getSdk } from './graphql/poap.generated';

/**
 * POAP is a protocol for the preservation of memories as digital records.
 *
 * @group LensClient Modules
 */
export class Poaps {
  private readonly sdk: Sdk;

  constructor(
    private readonly context: LensContext,
    authentication: Authentication,
  ) {
    const client = new FetchGraphQLClient(context);

    this.sdk = getSdk(client, sdkAuthHeaderWrapper(authentication));
  }

  /**
   * Get profile POAP tokens.
   *
   * @param request - The request object.
   * @returns POAP tokens wrapped in {@link PaginatedResult}
   *
   * @example
   * ```ts
   * const result = await client.poaps.fetch({
   *   for: '0x04',
   * });
   * ```
   */
  async fetch(request: UserPoapsQueryRequest): Promise<PaginatedResult<PoapTokenFragment>> {
    return buildPaginatedQueryResult(async (currRequest) => {
      const result = await this.sdk.Poaps({
        request: currRequest,
      });

      return result.data.result;
    }, request);
  }

  /**
   * Get profiles holding a POAP token from a specific event.
   *
   * @param request - The request object.
   * @returns Profiles wrapped in {@link PaginatedResult}
   *
   * @example
   * ```ts
   * const result = await client.poaps.holders({
   *   eventId: '0x04',
   * });
   * ```
   */
  async holders(request: PoapHoldersQueryRequest): Promise<PaginatedResult<ProfileFragment>> {
    return buildPaginatedQueryResult(async (currRequest) => {
      const result = await this.sdk.PoapHolders({
        request: currRequest,
        ...buildRequestFromConfig(this.context),
      });

      return result.data.result;
    }, request);
  }

  /**
   * Fetch mutual POAP events between two profiles.
   *
   * @param request - The request object.
   * @returns POAP events wrapped in {@link PaginatedResult}
   *
   * @example
   * ```ts
   * const result = await client.poaps.mutualEvents({
   *   observer: '0x04',
   *   viewing: '0x01',
   * });
   * ```
   */
  async mutualEvents(
    request: MutualPoapsQueryRequest,
  ): Promise<PaginatedResult<PoapEventFragment>> {
    return buildPaginatedQueryResult(async (currRequest) => {
      const result = await this.sdk.MutualPoaps({
        request: currRequest,
      });

      return result.data.result;
    }, request);
  }

  /**
   * Fetch a POAP event.
   *
   * @param request - The request object.
   * @returns POAP event.
   *
   * @example
   * ```ts
   * const result = await client.poaps.event({
   *   eventId: '0x04',
   * });
   * ```
   */
  async event(request: PoapEventQueryRequest): Promise<PoapEventFragment | null> {
    const result = await this.sdk.PoapEvent({
      request,
    });

    return result.data.result;
  }
}
