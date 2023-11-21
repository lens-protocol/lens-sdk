import { PromiseResult } from '@lens-protocol/shared-kernel';

import type { Authentication } from '../../authentication';
import { LensContext } from '../../context';
import { CredentialsExpiredError, NotAuthenticatedError } from '../../errors';
import { FetchGraphQLClient } from '../../graphql/FetchGraphQLClient';
import type {
  HandleInfoFragment,
  ProfileFragment,
  RelaySuccessFragment,
} from '../../graphql/fragments.generated';
import type {
  ClaimProfileWithHandleRequest,
  CreateProfileWithHandleRequest,
  OwnedHandlesRequest,
  ProfilesManagedRequest,
} from '../../graphql/types.generated';
import {
  PaginatedResult,
  buildRequestFromConfig,
  buildPaginatedQueryResult,
  requireAuthHeaders,
  sdkAuthHeaderWrapper,
} from '../../helpers';
import {
  ClaimableProfilesResultFragment,
  ClaimProfileWithHandleErrorResultFragment,
  CreateProfileWithHandleErrorResultFragment,
  getSdk,
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
    const client = new FetchGraphQLClient(context);

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
  async ownedHandles(request: OwnedHandlesRequest): Promise<PaginatedResult<HandleInfoFragment>> {
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

  /**
   * Fetch claimable profiles result for currently authenticated wallet.
   * Use it to know if the wallet can claim a new profile.
   *
   * ⚠️ Requires LensClient authenticated with a wallet only.
   *
   * @returns {@link PromiseResult} with {@link ClaimableProfilesResultFragment}
   */
  async claimableProfiles(): PromiseResult<
    ClaimableProfilesResultFragment,
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return requireAuthHeaders(this.authentication, async (headers) => {
      const result = await this.sdk.ClaimableProfiles({}, headers);

      return result.data.result;
    });
  }

  /**
   * Claim a profile. Use result of {@link claimableProfiles} query to claim a handle for a wallet.
   *
   * ⚠️ Requires LensClient authenticated with a wallet only.
   *
   * @param request - Request object for the mutation
   * @returns Status of the transaction
   */
  async claimProfile(
    request: ClaimProfileWithHandleRequest,
  ): PromiseResult<
    RelaySuccessFragment | ClaimProfileWithHandleErrorResultFragment,
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return requireAuthHeaders(this.authentication, async (headers) => {
      const result = await this.sdk.ClaimProfileWithHandle({ request }, headers);

      return result.data.result;
    });
  }

  /**
   * Create a new profile.
   *
   * ⚠️ Only available in development environment.
   *
   * @param request - Request object for the mutation
   * @returns Status of the transaction
   *
   * @example
   * ```ts
   * const result = await client.wallet.createProfile({
   *   handle: 'handle',
   *   to: '0x1234567890123456789012345678901234567890',
   * });
   * ```
   */
  async createProfile(
    request: CreateProfileWithHandleRequest,
  ): Promise<RelaySuccessFragment | CreateProfileWithHandleErrorResultFragment> {
    if (this.context.environment.name === 'production') {
      throw new Error('Cannot create profile in production environment');
    }
    const result = await this.sdk.CreateProfileWithHandle({ request });
    return result.data.result;
  }
}
