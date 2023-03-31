import type { PromiseResult } from '@lens-protocol/shared-kernel';
import { GraphQLClient } from 'graphql-request';

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

/**
 * ProxyAction enables signless follow and collect actions.
 *
 * @remarks
 *
 * ProxyAction enables actions like follow and collect
 * to be signless. This only works if the modules assigned
 * to those actions are free and have no cost to them.
 *
 * @group LensClient Modules
 */
export class ProxyAction {
  private readonly authentication: Authentication | undefined;
  private readonly sdk: Sdk;

  constructor(config: LensConfig, authentication: Authentication) {
    const client = new GraphQLClient(config.environment.gqlEndpoint);

    this.sdk = getSdk(client);
    this.authentication = authentication;
  }

  /**
   * Follow a profile.
   *
   * ⚠️ Requires authenticated LensClient.
   *
   * @param profileId - profile id to follow
   * @returns {@link PromiseResult} with a proxyActionId
   *
   * @example
   * ```ts
   * const result = await client.proxyAction.freeFollow('0x123');
   * ```
   */
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

  /**
   * Collect a publication.
   *
   * ⚠️ Requires authenticated LensClient.
   *
   * @param publicationId - publication id to collect
   * @returns {@link PromiseResult} with a proxyActionId
   *
   * @example
   * ```ts
   * const result = await client.proxyAction.freeCollect('0x123-0x456');
   * ```
   */
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

  /**
   * Check the status of a proxy action.
   *
   * ⚠️ Requires authenticated LensClient.
   *
   * @param proxyActionId - proxy action id to check
   * @returns {@link PromiseResult} with a {@link ProxyActionStatusResultFragment} or {@link ProxyActionErrorFragment} or {@link ProxyActionQueuedFragment}
   *
   * @example
   * ```ts
   * const result = await client.proxyAction.checkStatus(proxyActionId);
   * ```
   */
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

  /**
   * Wait for a proxy action to complete.
   *
   * ⚠️ Requires authenticated LensClient.
   *
   * @param proxyActionId - proxy action id to wait for
   * @returns {@link PromiseResult} with a {@link ProxyActionStatusResultFragment} or {@link ProxyActionErrorFragment} or {@link ProxyActionQueuedFragment}
   *
   * @example
   * ```ts
   * const result = await client.proxyAction.waitForStatusComplete(proxyActionId);
   * ```
   */
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
