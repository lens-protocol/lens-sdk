import type { PromiseResult } from '@lens-protocol/shared-kernel';
import { GraphQLClient } from 'graphql-request';

import { testHeaderWrapper } from '../__helpers__/testHeaderWrapper';
import type { Authentication } from '../authentication';
import type { LensConfig } from '../consts/config';
import type { CredentialsExpiredError, NotAuthenticatedError } from '../consts/errors';
import { ProxyActionStatusTypes } from '../graphql/types.generated';
import { poll, requireAuthHeaders } from '../helpers';
import {
  getSdk,
  ProxyActionErrorFragment,
  ProxyActionQueuedFragment,
  ProxyActionStatusResultFragment,
  Sdk,
} from './graphql/proxy-action.generated';
import { isProxyActionStatusResult } from './helpers';

export class StatusPollingError extends Error {
  name = 'StatusPollingError' as const;
  message = 'Max attempts exceeded';
}

export class ProxyAction {
  private readonly authentication: Authentication | undefined;
  private readonly sdk: Sdk;

  constructor(config: LensConfig, authentication: Authentication) {
    const client = new GraphQLClient(config.environment.gqlEndpoint);

    this.sdk = getSdk(client, testHeaderWrapper);
    this.authentication = authentication;
  }

  async freeFollow(
    profileId: string,
  ): PromiseResult<string, CredentialsExpiredError | NotAuthenticatedError> {
    return requireAuthHeaders(this.authentication, async (headers) => {
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
    return requireAuthHeaders(this.authentication, async (headers) => {
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
    return requireAuthHeaders(this.authentication, async (headers) => {
      const result = await this.sdk.ProxyActionStatus(
        {
          proxyActionId,
        },
        headers,
      );

      return result.data.result;
    });
  }

  async waitForStatusComplete(
    proxyActionId: string,
  ): PromiseResult<
    ProxyActionStatusResultFragment | ProxyActionErrorFragment | ProxyActionQueuedFragment,
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return poll({
      fn: () => this.checkStatus(proxyActionId),
      validate: (result: Awaited<ReturnType<typeof this.checkStatus>>) => {
        if (result.isSuccess()) {
          const value = result.value;

          if (isProxyActionStatusResult(value)) {
            return value.status === ProxyActionStatusTypes.Complete;
          }
        }
        // in any not positive scenario, return true to resolve the polling with the Result
        return true;
      },
      onMaxAttempts: () => new StatusPollingError(),
    });
  }
}
