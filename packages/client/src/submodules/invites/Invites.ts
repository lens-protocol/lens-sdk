import type { PromiseResult } from '@lens-protocol/shared-kernel';

import { Authentication } from '../../authentication';
import { LensContext } from '../../context';
import { CredentialsExpiredError, NotAuthenticatedError } from '../../errors';
import { FetchGraphQLClient } from '../../graphql/FetchGraphQLClient';
import { AlreadyInvitedCheckRequest, InviteRequest } from '../../graphql/types.generated';
import { buildRequestFromConfig, requireAuthHeaders, sdkAuthHeaderWrapper } from '../../helpers';
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
    private readonly context: LensContext,
    authentication?: Authentication,
  ) {
    const client = new FetchGraphQLClient(context.environment.gqlEndpoint);

    this.sdk = getSdk(client, sdkAuthHeaderWrapper(authentication));
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
      const result = await this.sdk.InvitedProfiles(buildRequestFromConfig(this.context), headers);

      return result.data.invitedProfiles;
    });
  }

  /**
   * Check if a profile is already invited.
   *
   * @param request - Request object for the query
   * @returns boolean
   *
   * @example
   * ```
   * const result = await client.invites.profileAlreadyInvited({
   *   address: '0x1234567890123456789012345678901234567890',
   * });
   * ```
   */
  async profileAlreadyInvited(request: AlreadyInvitedCheckRequest): Promise<boolean> {
    const result = await this.sdk.ProfileAlreadyInvited({ request });
    return result.data.result;
  }

  /**
   * Invite one or many wallet addresses to join Lens Protocol.
   *
   * ⚠️ Requires authenticated LensClient.
   *
   * @param request - Request object for the mutation
   * @returns {@link PromiseResult} with void
   *
   * @example
   * ```ts
   * const result = await client.invites.inviteProfile({
   *   invites: ['0x1234567890123456789012345678901234567890'],
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
