import type { PromiseResult } from '@lens-protocol/shared-kernel';

import type { Authentication } from '../../../../authentication';
import type { LensConfig } from '../../../../consts/config';
import type { CredentialsExpiredError, NotAuthenticatedError } from '../../../../consts/errors';
import { FetchGraphQLClient } from '../../../../graphql/FetchGraphQLClient';
import {
  LensProfileManagerRelayErrorFragment,
  RelaySuccessFragment,
} from '../../../../graphql/fragments.generated';
import type { ActOnOpenActionRequest } from '../../../../graphql/types.generated';
import { requireAuthHeaders } from '../../../../helpers';
import {
  CreateActOnOpenActionBroadcastItemResultFragment,
  Sdk,
  getSdk,
} from './graphql/actions.generated';

/**
 * // TODO
 *
 * @group LensClient Modules
 */
export class Actions {
  private readonly authentication: Authentication | undefined;
  private readonly sdk: Sdk;

  constructor(config: LensConfig, authentication?: Authentication) {
    const client = new FetchGraphQLClient(config.environment.gqlEndpoint);

    this.sdk = getSdk(client);
    this.authentication = authentication;
  }

  async act(
    request: ActOnOpenActionRequest,
  ): PromiseResult<
    RelaySuccessFragment | LensProfileManagerRelayErrorFragment,
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return requireAuthHeaders(this.authentication, async (headers) => {
      const result = await this.sdk.ActOnOpenAction({ request }, headers);
      return result.data.result;
    });
  }

  async createTypedData(
    request: ActOnOpenActionRequest,
  ): PromiseResult<
    CreateActOnOpenActionBroadcastItemResultFragment,
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return requireAuthHeaders(this.authentication, async (headers) => {
      const result = await this.sdk.CreateActOnOpenActionTypedData({ request }, headers);
      return result.data.result;
    });
  }
}
