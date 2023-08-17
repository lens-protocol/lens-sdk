import { PromiseResult } from '@lens-protocol/shared-kernel';

import type { Authentication } from '../../authentication';
import type { LensConfig } from '../../consts/config';
import { CredentialsExpiredError, NotAuthenticatedError } from '../../consts/errors';
import { FetchGraphQLClient } from '../../graphql/FetchGraphQLClient';
import type { ProfileFragment } from '../../graphql/fragments.generated';
import type { OwnedHandlesRequest, ProfilesManagedRequest } from '../../graphql/types.generated';
import {
  PaginatedResult,
  buildImageTransformsFromConfig,
  buildPaginatedQueryResult,
  provideAuthHeaders,
  requireAuthHeaders,
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
    private readonly config: LensConfig,
    authentication?: Authentication,
  ) {
    const client = new FetchGraphQLClient(config.environment.gqlEndpoint);

    this.sdk = getSdk(client);
    this.authentication = authentication;
  }

  async ownedHandles(request: OwnedHandlesRequest): Promise<PaginatedResult<HandleResultFragment>> {
    return provideAuthHeaders(this.authentication, async (headers) => {
      return buildPaginatedQueryResult(async (currRequest) => {
        const result = await this.sdk.OwnedHandles(
          {
            request: currRequest,
          },
          headers,
        );

        return result.data.result;
      }, request);
    });
  }

  async profilesManaged(
    request: ProfilesManagedRequest,
  ): Promise<PaginatedResult<ProfileFragment>> {
    return provideAuthHeaders(this.authentication, async (headers) => {
      return buildPaginatedQueryResult(async (currRequest) => {
        const result = await this.sdk.ProfilesManaged(
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
