import type { PromiseResult } from '@lens-protocol/shared-kernel';

import { Authentication } from '../../authentication';
import { LensConfig } from '../../consts/config';
import { CredentialsExpiredError, NotAuthenticatedError } from '../../consts/errors';
import { FetchGraphQLClient } from '../../graphql/FetchGraphQLClient';
import { AlreadyInvitedCheckRequest, InviteRequest } from '../../graphql/types.generated';
import { buildImageTransformsFromConfig, requireAuthHeaders } from '../../helpers';
import { InvitedResultFragment, Sdk, getSdk } from './graphql/invites.generated';

/**
 * Invite new users to join Lens Protocol.
 *
 * @group LensClient Modules
 */
export class Invites {
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

  /**
   * Get all invited profiles.
   *
   * ⚠️ Requires authenticated LensClient.
   *
   * @returns {@link PromiseResult} with array of {@link InvitedResultFragment}
   *
   * @example
   * ```ts
   * const result = await client.invites.invitedProfiles();
   * ```
   */
  async invitedProfiles(): PromiseResult<
    InvitedResultFragment[],
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return requireAuthHeaders(this.authentication, async (headers) => {
      const result = await this.sdk.InvitedProfiles(
        {
          ...buildImageTransformsFromConfig(this.config.mediaTransforms),
        },
        headers,
      );

      return result.data.invitedProfiles;
    });
  }

  /**
   * Check if a profile is already invited.
   *
   * @param request - {@link AlreadyInvitedCheckRequest}
   * @returns boolean
   *
   * @example
   * ```
   * const result = await client.invites.profileAlreadyInvited({
   *    address: '0x1234567890123456789012345678901234567890',
   *  });
   * ```
   */
  async profileAlreadyInvited(
    request: AlreadyInvitedCheckRequest,
  ): PromiseResult<boolean, CredentialsExpiredError | NotAuthenticatedError> {
    return requireAuthHeaders(this.authentication, async (headers) => {
      const result = await this.sdk.ProfileAlreadyInvited({ request }, headers);
      return result.data.result;
    });
  }

  /**
   * Invite one or many wallet addresses to join Lens Protocol.
   *
   * @param request - {@link InviteRequest}
   * @returns {@link PromiseResult} with void
   *
   * @example
   * ```ts
   * const result = await client.invites.inviteProfile({
   *   addresses: ['0x1234567890123456789012345678901234567890'],
   *   secret: 'secret',
   * });
   * ```
   */
  async inviteProfile(
    request: InviteRequest,
  ): PromiseResult<void, CredentialsExpiredError | NotAuthenticatedError> {
    return requireAuthHeaders(this.authentication, async (headers) => {
      await this.sdk.InviteProfile({ request }, headers);
    });
  }
}
