import type { PromiseResult } from '@lens-protocol/shared-kernel';

import type { Authentication } from '../authentication';
import type { LensConfig } from '../consts/config';
import type { CredentialsExpiredError, NotAuthenticatedError } from '../consts/errors';
import { FetchGraphQLClient } from '../graphql/FetchGraphQLClient';
import type { RelayErrorFragment, RelaySuccessFragment } from '../graphql/fragments.generated';
import type { BroadcastRequest, LensTransactionStatusRequest } from '../graphql/types.generated';
import { requireAuthHeaders } from '../helpers';
import {
  getSdk,
  LensMetadataTransactionFragment,
  LensTransactionFragment,
  Sdk,
} from './graphql/transaction.generated';

/**
 * Broadcast signed typed data for a gasless transaction.
 *
 * @remarks
 *
 * Typed data is a way to try to show the users what they are signing
 * in a more readable format. You should only call transaction broadcast
 * if you are using the typed data logic.
 *
 * @group LensClient Modules
 */
export class Transaction {
  private readonly authentication: Authentication | undefined;
  private readonly sdk: Sdk;

  constructor(config: LensConfig, authentication: Authentication) {
    const client = new FetchGraphQLClient(config.environment.gqlEndpoint);

    this.sdk = getSdk(client);
    this.authentication = authentication;
  }

  /**
   * Broadcast a signed typed data for a gasless transaction.
   *
   * ⚠️ Requires authenticated LensClient.
   *
   * @param request - Request object for the mutation
   * @returns {@link PromiseResult} with {@link RelaySuccessFragment} or {@link RelayErrorFragment}
   *
   * @example
   * ```ts
   * const result = await client.transaction.broadcast({
   *   id: data.id,
   *   signature: signedTypedData,
   * });
   * ```
   */
  async broadcast(
    request: BroadcastRequest,
  ): PromiseResult<
    RelaySuccessFragment | RelayErrorFragment,
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return requireAuthHeaders(this.authentication, async (headers) => {
      const result = await this.sdk.BroadcastOnChain({ request }, headers);
      return result.data.result;
    });
  }

  async status(
    request: LensTransactionStatusRequest,
  ): PromiseResult<
    LensMetadataTransactionFragment | LensTransactionFragment,
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return requireAuthHeaders(this.authentication, async (headers) => {
      const result = await this.sdk.LensTransactionStatus({ request }, headers);
      return result.data.result;
    });
  }

  async txIdToTxHash(txId: string): Promise<string> {
    const result = await this.sdk.TxIdToTxHash({ txId });
    return result.data.result;
  }
}
