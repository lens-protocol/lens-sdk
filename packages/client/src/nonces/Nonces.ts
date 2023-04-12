import type { PromiseResult } from '@lens-protocol/shared-kernel';

import type { Authentication } from '../authentication';
import type { LensConfig } from '../consts/config';
import type { CredentialsExpiredError, NotAuthenticatedError } from '../consts/errors';
import type { InferResultType } from '../consts/types';
import { FetchGraphQLClient } from '../graphql/FetchGraphQLClient';
import { requireAuthHeaders } from '../helpers';
import { getSdk, Sdk, UserSigNoncesQuery } from './graphql/nonces.generated';

export class Nonces {
  private readonly authentication: Authentication | undefined;
  private readonly sdk: Sdk;

  constructor(config: LensConfig, authentication: Authentication) {
    const client = new FetchGraphQLClient(config.environment.gqlEndpoint);

    this.sdk = getSdk(client);
    this.authentication = authentication;
  }

  async fetch(): PromiseResult<
    InferResultType<UserSigNoncesQuery>,
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return requireAuthHeaders(this.authentication, async (headers) => {
      const result = await this.sdk.UserSigNonces({}, headers);

      return result.data.result;
    });
  }
}
