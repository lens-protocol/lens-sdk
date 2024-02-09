import type { PromiseResult } from '@lens-protocol/shared-kernel';

import { Authentication } from '../../authentication';
import { LensContext } from '../../context';
import { CredentialsExpiredError, NotAuthenticatedError } from '../../errors';
import { FetchGraphQLClient } from '../../graphql/FetchGraphQLClient';
import { AlreadyInvitedCheckRequest, InviteRequest } from '../../graphql/types.generated';
import { commonQueryVariables, requireAuthHeaders, sdkAuthHeaderWrapper } from '../../helpers';
import { InvitedResultFragment, Sdk, getSdk } from './graphql/invites.generated';

/**
 * Invite new users to join Lens Protocol.
 *
 * @group LensClient Modules
 */
export class Invites {
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
   * Fetch all invited profiles.
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
      const result = await this.sdk.InvitedProfiles(commonQueryVariables(this.context), headers);

      return result.data.result;
    });
  }

  /**
   * Check if a wallet was already invited.
   *
   * @param request - Request object for the query
   * @returns boolean
   *
   * @example
   * ```
   * const result = await client.invites.profileAlreadyInvited({
   *   for: '0x1234567890123456789012345678901234567890',
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
   * });
   * ```
   */
  async inviteProfile(
    request: InviteRequest,
  ): PromiseResult<void, CredentialsExpiredError | NotAuthenticatedError> {
    return requireAuthHeaders(this.authentication, async (headers) => {
      await this.sdk.Invite({ request }, headers);
    });
  }
}
