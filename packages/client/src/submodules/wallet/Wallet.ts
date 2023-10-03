import { PromiseResult } from '@lens-protocol/shared-kernel';

import type { Authentication } from '../../authentication';
import { LensContext } from '../../context';
import { CredentialsExpiredError, NotAuthenticatedError } from '../../errors';
import { FetchGraphQLClient } from '../../graphql/FetchGraphQLClient';
import type { ProfileFragment } from '../../graphql/fragments.generated';
import type { OwnedHandlesRequest, ProfilesManagedRequest } from '../../graphql/types.generated';
import {
  PaginatedResult,
  buildRequestFromConfig,
  buildPaginatedQueryResult,
  requireAuthHeaders,
  sdkAuthHeaderWrapper,
} from '../../helpers';
import {
  getSdk,
  HandleResultFragment,
  Sdk,
  UserSigNoncesFragment,
} from './graphql/wallet.generated';

/**
 * @group LensClient Modules
 */
export class Wallet {
  private readonly authentication: Authentication | undefined;
  private readonly sdk: Sdk;

  constructor(
    private readonly context: LensContext,
    authentication?: Authentication,
  ) {
    const client = new FetchGraphQLClient(context.environment.gqlEndpoint);

    this.sdk = getSdk(client, sdkAuthHeaderWrapper(authentication));
    this.authentication = authentication;
  }

  /**
   * Get all owned handles by a wallet address.
   *
   * @param request - Request object for the query
   * @returns Handles wrapped with {@link PaginatedResult}
   *
   * @example
   * ```ts
   * const result = await client.wallet.ownedHandles({
   *   for: '0xa5653e88D9c352387deDdC79bcf99f0ada62e9c6',
   * });
   * ```
   */
  async ownedHandles(request: OwnedHandlesRequest): Promise<PaginatedResult<HandleResultFragment>> {
    return buildPaginatedQueryResult(async (currRequest) => {
      const result = await this.sdk.OwnedHandles({
        request: currRequest,
      });

      return result.data.result;
    }, request);
  }

  /**
   * Get all profiles managed by a wallet address.
   *
   * @param request - Request object for the query
   * @returns Profiles wrapped with {@link PaginatedResult}
   *
   * @example
   * ```ts
   * const result = await client.wallet.profilesManaged({
   *   for: '0xa5653e88D9c352387deDdC79bcf99f0ada62e9c6',
   * });
   * ```
   */
  async profilesManaged(
    request: ProfilesManagedRequest,
  ): Promise<PaginatedResult<ProfileFragment>> {
    return buildPaginatedQueryResult(async (currRequest) => {
      const result = await this.sdk.ProfilesManaged({
        request: currRequest,
        ...buildRequestFromConfig(this.context),
      });

      return result.data.result;
    }, request);
  }

  /**
   * Fetch user nonces.
   *
   * ⚠️ Requires authenticated LensClient.
   *
   * @returns {@link PromiseResult} with {@link UserSigNoncesFragment}
   *
   * @example
   * ```ts
   * const result = await client.wallet.sigNonces();
   * ```
   */
  async sigNonces(): PromiseResult<
    UserSigNoncesFragment,
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return requireAuthHeaders(this.authentication, async (headers) => {
      const result = await this.sdk.UserSigNonces({}, headers);

      return result.data.result;
    });
  }
}
