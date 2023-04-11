import type { PromiseResult } from '@lens-protocol/shared-kernel';

import type { Authentication } from '../authentication';
import type { LensConfig } from '../consts/config';
import type { CredentialsExpiredError, NotAuthenticatedError } from '../consts/errors';
import type {
  CreateDataAvailabilityPublicationResultFragment,
  RelayerResultFragment,
  RelayErrorFragment,
} from '../graphql/fragments.generated';
import type { BroadcastRequest } from '../graphql/types.generated';
import { poll, requireAuthHeaders } from '../helpers';
import { FetchGraphQLClient } from '../helpers/FetchGraphQLClient';
import {
  getSdk,
  Sdk,
  TransactionErrorFragment,
  TransactionIndexedResultFragment,
} from './graphql/transaction.generated';
import { isTransactionIndexedResult } from './helpers';

export class TransactionPollingError extends Error {
  name = 'TransactionPollingError' as const;
  message = 'Max attempts exceeded';
}

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
   * @returns {@link PromiseResult} with {@link RelayerResultFragment} or {@link RelayErrorFragment}
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
    RelayerResultFragment | RelayErrorFragment,
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return requireAuthHeaders(this.authentication, async (headers) => {
      const result = await this.sdk.BroadcastProtocolCall({ request }, headers);
      return result.data.result;
    });
  }

  /**
   * Check if a transaction has been indexed.
   *
   * ⚠️ Requires authenticated LensClient.
   *
   * @param txId - transaction id
   * @returns {@link PromiseResult} with {@link TransactionIndexedResultFragment} or {@link TransactionErrorFragment}
   *
   * @example
   * ```ts
   * const result = await client.transaction.wasIndexed(txId);
   * ```
   */
  async wasIndexed(
    txId: string,
  ): PromiseResult<
    TransactionIndexedResultFragment | TransactionErrorFragment,
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return requireAuthHeaders(this.authentication, async (headers) => {
      const result = await this.sdk.HasTxHashBeenIndexed({ request: { txId } }, headers);
      return result.data.result;
    });
  }

  /**
   * Poll the transaction status until it has been indexed.
   *
   * ⚠️ Requires authenticated LensClient.
   *
   * @param txId - transaction id
   * @returns {@link PromiseResult} with {@link TransactionIndexedResultFragment} or {@link TransactionErrorFragment}
   *
   * @example
   * ```ts
   * const result = await client.transaction.waitForIsIndexed(txId);
   * ```
   */
  async waitForIsIndexed(
    txId: string,
  ): PromiseResult<
    TransactionIndexedResultFragment | TransactionErrorFragment,
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return poll({
      fn: () => this.wasIndexed(txId),
      validate: (result: Awaited<ReturnType<typeof this.wasIndexed>>) => {
        if (result.isSuccess()) {
          const value = result.value;

          if (isTransactionIndexedResult(value)) {
            return value.indexed;
          }
        }
        // in any not positive scenario, return true to resolve the polling with the Result
        return true;
      },
      onMaxAttempts: () => new TransactionPollingError(),
    });
  }

  /**
   * Broadcast a signed typed data for a data availability publication.
   *
   * ⚠️ Requires authenticated LensClient.
   *
   * @param request - Request object for the mutation
   * @returns {@link PromiseResult} with {@link CreateDataAvailabilityPublicationResultFragment} or {@link RelayErrorFragment}
   *
   * @example
   * ```ts
   * const result = await client.transaction.broadcastDataAvailability({
   *   id: data.id,
   *   signature: signedTypedData,
   * });
   * ```
   */
  async broadcastDataAvailability(
    request: BroadcastRequest,
  ): PromiseResult<
    CreateDataAvailabilityPublicationResultFragment | RelayErrorFragment,
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return requireAuthHeaders(this.authentication, async (headers) => {
      const result = await this.sdk.BroadcastDataAvailability({ request }, headers);
      return result.data.result;
    });
  }
}
