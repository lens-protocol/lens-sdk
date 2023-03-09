import { PromiseResult } from '@lens-protocol/shared-kernel';
import { GraphQLClient } from 'graphql-request';

import { Authentication } from '../authentication';
import { LensConfig } from '../consts/config';
import { CredentialsExpiredError, NotAuthenticatedError } from '../consts/errors';
import { execute } from '../helpers/execute';
import {
  getSdk,
  ProxyActionErrorFragment,
  ProxyActionQueuedFragment,
  ProxyActionStatusResultFragment,
  Sdk,
} from './graphql/proxy-action.generated';

export class ProxyAction {
  private readonly authentication: Authentication | undefined;
  private readonly sdk: Sdk;

  constructor(config: LensConfig, authentication: Authentication) {
    const client = new GraphQLClient(config.environment.gqlEndpoint);

    this.sdk = getSdk(client);
    this.authentication = authentication;
  }

  async freeFollow(
    profileId: string,
  ): PromiseResult<string, CredentialsExpiredError | NotAuthenticatedError> {
    return execute(this.authentication, async (headers) => {
      const result = await this.sdk.ProxyAction(
        {
          request: {
            follow: {
              freeFollow: {
                profileId,
              },
            },
          },
        },
        headers,
      );

      return result.data.result;
    });
  }

  async freeCollect(
    publicationId: string,
  ): PromiseResult<string, CredentialsExpiredError | NotAuthenticatedError> {
    return execute(this.authentication, async (headers) => {
      const result = await this.sdk.ProxyAction(
        {
          request: {
            collect: {
              freeCollect: {
                publicationId,
              },
            },
          },
        },
        headers,
      );

      return result.data.result;
    });
  }

  async checkStatus(
    proxyActionId: string,
  ): PromiseResult<
    ProxyActionStatusResultFragment | ProxyActionErrorFragment | ProxyActionQueuedFragment,
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return execute(this.authentication, async (headers) => {
      const result = await this.sdk.ProxyActionStatus(
        {
          proxyActionId,
        },
        headers,
      );

      return result.data.result;
    });
  }
}
