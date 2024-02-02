import type { PromiseResult } from '@lens-protocol/shared-kernel';

import type { Authentication } from '../../authentication';
import { LensContext } from '../../context';
import type { CredentialsExpiredError, NotAuthenticatedError } from '../../errors';
import { FetchGraphQLClient } from '../../graphql/FetchGraphQLClient';
import type {
  CreateMomokaPublicationResultFragment,
  RelayErrorFragment,
  RelaySuccessFragment,
} from '../../graphql/fragments.generated';
import {
  LensTransactionStatusType,
  BroadcastRequest,
  LensTransactionStatusRequest,
} from '../../graphql/types.generated';
import { poll, requireAuthHeaders, sdkAuthHeaderWrapper } from '../../helpers';
import {
  getSdk,
  LensTransactionResultFragment,
  RelayQueueResultFragment,
  Sdk,
} from './graphql/transaction.generated';

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
  private readonly sdk: Sdk;

  /**
   * @internal
   */
  constructor(
    context: LensContext,
    private readonly authentication: Authentication,
  ) {
    const client = new FetchGraphQLClient(context);
    this.sdk = getSdk(client, sdkAuthHeaderWrapper(authentication));
  }

  /**
   * Get the transaction hash for a transaction id.
   *
   * @param txId - The transaction id
   * @returns The transaction hash
   *
   * @example
   * ```ts
   * const txHash = await client.transaction.txIdToTxHash(txId);
   * ```
   */
  async txIdToTxHash(txId: string): Promise<string | null> {
    const result = await this.sdk.TxIdToTxHash({ for: txId });
    return result.data.result;
  }

  /**
   * Use to see the size of relayers queue
   * if there are delays in txs being submitted onchain.
   *
   * @returns The relay queues
   *
   * @example
   * ```ts
   * const result = await client.transaction.relayQueues();
   * ```
   */
  async relayQueues(): Promise<RelayQueueResultFragment[]> {
    const result = await this.sdk.RelayQueues();
    return result.data.result;
  }

  /**
   * Generate a Lens API relay address.
   *
   * @returns The relay address
   *
   * @example
   * ```ts
   * const result = await client.transaction.generateLensAPIRelayAddress();
   * ```
   */
  async generateLensAPIRelayAddress(): Promise<string> {
    const result = await this.sdk.GenerateLensAPIRelayAddress();
    return result.data.result;
  }

  /**
   * Broadcast a signed typed data for a gasless transaction onchain.
   *
   * ⚠️ Requires authenticated LensClient.
   *
   * @param request - Request object for the mutation
   * @returns {@link PromiseResult} with {@link RelaySuccessFragment} or {@link RelayErrorFragment}
   *
   * @example
   * ```ts
   * const result = await client.transaction.broadcastOnchain({
   *   id: data.id,
   *   signature: signedTypedData,
   * });
   * ```
   */
  async broadcastOnchain(
    request: BroadcastRequest,
  ): PromiseResult<
    RelaySuccessFragment | RelayErrorFragment,
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return requireAuthHeaders(this.authentication, async (headers) => {
      const result = await this.sdk.BroadcastOnchain({ request }, headers);
      return result.data.result;
    });
  }

  /**
   * Broadcast a signed typed data for a Momoka transaction.
   *
   * ⚠️ Requires authenticated LensClient.
   *
   * @param request - Request object for the mutation
   * @returns {@link PromiseResult} with {@link CreateMomokaPublicationResultFragment} or {@link RelayErrorFragment}
   *
   * @example
   * ```ts
   * const result = await client.transaction.broadcastOnMomoka({
   *   id: data.id,
   *   signature: signedTypedData,
   * });
   * ```
   */
  async broadcastOnMomoka(
    request: BroadcastRequest,
  ): PromiseResult<
    CreateMomokaPublicationResultFragment | RelayErrorFragment,
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return requireAuthHeaders(this.authentication, async (headers) => {
      const result = await this.sdk.BroadcastOnMomoka({ request }, headers);
      return result.data.result;
    });
  }

  /**
   * Get the status of a transaction.
   *
   * @param request - Request object for the query
   * @returns The transaction status
   *
   * @example
   * ```ts
   * const result = await client.transaction.status({
   *   forTxId: txId
   * });
   * ```
   */
  async status(
    request: LensTransactionStatusRequest,
  ): Promise<LensTransactionResultFragment | null> {
    const result = await this.sdk.LensTransactionStatus({ request });
    return result.data.result;
  }

  /**
   * Poll the transaction status until it has been completed.
   *
   * @param request - Request object for the query
   * @returns The transaction status
   * @throws {@link TransactionPollingError} if the transaction is not completed within 60s
   *
   * @example
   * ```ts
   * const result = await client.transaction.waitUntilComplete({
   *   forTxId: txId
   * });
   * ```
   */
  async waitUntilComplete(
    request: LensTransactionStatusRequest,
  ): Promise<LensTransactionResultFragment | null> {
    return poll({
      fn: () => this.status(request),
      validate: (result: Awaited<ReturnType<typeof this.status>>) => {
        return result?.status === LensTransactionStatusType.Complete;
      },
      onMaxAttempts: () => new TransactionPollingError(),
    });
  }
}
