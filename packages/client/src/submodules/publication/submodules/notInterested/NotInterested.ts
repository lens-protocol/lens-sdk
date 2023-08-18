import type { PromiseResult } from '@lens-protocol/shared-kernel';

import type { Authentication } from '../../../../authentication';
import type { LensConfig } from '../../../../consts/config';
import type { CredentialsExpiredError, NotAuthenticatedError } from '../../../../consts/errors';
import { FetchGraphQLClient } from '../../../../graphql/FetchGraphQLClient';
import type { PublicationNotInterestedRequest } from '../../../../graphql/types.generated';
import { requireAuthHeaders } from '../../../../helpers';
import { Sdk, getSdk } from './graphql/notInterested.generated';

/**
 * @group LensClient Modules
 */
export class NotInterested {
  private readonly authentication: Authentication | undefined;
  private readonly sdk: Sdk;

  constructor(config: LensConfig, authentication?: Authentication) {
    const client = new FetchGraphQLClient(config.environment.gqlEndpoint);

    this.sdk = getSdk(client);
    this.authentication = authentication;
  }

  async add(
    request: PublicationNotInterestedRequest,
  ): PromiseResult<void, CredentialsExpiredError | NotAuthenticatedError> {
    return requireAuthHeaders(this.authentication, async (headers) => {
      await this.sdk.AddPublicationNotInterested({ request }, headers);
    });
  }

  async undo(
    request: PublicationNotInterestedRequest,
  ): PromiseResult<void, CredentialsExpiredError | NotAuthenticatedError> {
    return requireAuthHeaders(this.authentication, async (headers) => {
      await this.sdk.UndoPublicationNotInterested({ request }, headers);
    });
  }
}
