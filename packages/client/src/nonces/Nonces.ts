import { PromiseResult } from '@lens-protocol/shared-kernel';
import { GraphQLClient } from 'graphql-request';

import { Authentication } from '../authentication';
import { LensConfig } from '../consts/config';
import { CredentialsExpiredError, NotAuthenticatedError } from '../consts/errors';
import { InferResultType } from '../consts/types';
import { execute } from '../helpers/execute';
import { getSdk, Sdk, UserSigNoncesQuery } from './graphql/nonces.generated';

export class Nonces {
  private readonly authentication: Authentication | undefined;
  private readonly sdk: Sdk;

  constructor(config: LensConfig, authentication: Authentication) {
    const client = new GraphQLClient(config.environment.gqlEndpoint);

    this.sdk = getSdk(client);
    this.authentication = authentication;
  }

  async fetch(): PromiseResult<
    InferResultType<UserSigNoncesQuery>,
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return execute(this.authentication, async (headers) => {
      const result = await this.sdk.UserSigNonces({}, headers);

      return result.data.result;
    });
  }
}
