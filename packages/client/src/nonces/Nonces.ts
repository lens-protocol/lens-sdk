import type { PromiseResult } from '@lens-protocol/shared-kernel';

import type { Authentication } from '../authentication';
import type { LensConfig } from '../consts/config';
import type { CredentialsExpiredError, NotAuthenticatedError } from '../consts/errors';
import { FetchGraphQLClient } from '../graphql/FetchGraphQLClient';
import { requireAuthHeaders } from '../helpers';
import { getSdk, Sdk, UserSigNoncesFragment } from './graphql/nonces.generated';

/**
 * Query the current nonces of the `lensHub` and the `periphery` of the authenticated user.
 *
 * - `periphery` includes profile metadata and approval follow.
 * - `lensHub` includes everything else minus unfollow which is a nonce on the `followNftAddress` contract.
 *
 * @group LensClient Modules
 */
export class Nonces {
  private readonly authentication: Authentication | undefined;
  private readonly sdk: Sdk;

  constructor(config: LensConfig, authentication: Authentication) {
    const client = new FetchGraphQLClient(config.environment.gqlEndpoint);

    this.sdk = getSdk(client);
    this.authentication = authentication;
  }

  /**
   * Fetch user nonces.
   *
   * ⚠️ Requires authenticated LensClient.
   *
   * @returns {@link PromiseResult} with {@link UserSigNoncesFragment}
   *
   * @example
   * ```ts
   * const result = await client.nonces.fetch();
   * ```
   */
  async fetch(): PromiseResult<
    UserSigNoncesFragment,
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return requireAuthHeaders(this.authentication, async (headers) => {
      const result = await this.sdk.UserSigNonces({}, headers);

      return result.data.result;
    });
  }
}
