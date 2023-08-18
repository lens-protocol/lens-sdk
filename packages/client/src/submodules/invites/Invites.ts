import type { PromiseResult } from '@lens-protocol/shared-kernel';

import { Authentication } from '../../authentication';
import { LensConfig } from '../../consts/config';
import { CredentialsExpiredError, NotAuthenticatedError } from '../../consts/errors';
import { FetchGraphQLClient } from '../../graphql/FetchGraphQLClient';
import { AlreadyInvitedCheckRequest, InviteRequest } from '../../graphql/types.generated';
import { buildImageTransformsFromConfig, requireAuthHeaders } from '../../helpers';
import { InvitedResultFragment, Sdk, getSdk } from './graphql/invites.generated';

/**
 * // TODO
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

  async profileAlreadyInvited(
    request: AlreadyInvitedCheckRequest,
  ): PromiseResult<boolean, CredentialsExpiredError | NotAuthenticatedError> {
    return requireAuthHeaders(this.authentication, async (headers) => {
      const result = await this.sdk.ProfileAlreadyInvited({ request }, headers);
      return result.data.result;
    });
  }

  async inviteProfile(
    request: InviteRequest,
  ): PromiseResult<void, CredentialsExpiredError | NotAuthenticatedError> {
    return requireAuthHeaders(this.authentication, async (headers) => {
      await this.sdk.InviteProfile({ request }, headers);
    });
  }
}
