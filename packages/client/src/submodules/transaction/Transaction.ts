import type { PromiseResult } from '@lens-protocol/shared-kernel';

import type { Authentication } from '../../authentication';
import type { LensConfig } from '../../consts/config';
import type { CredentialsExpiredError, NotAuthenticatedError } from '../../consts/errors';
import { FetchGraphQLClient } from '../../graphql/FetchGraphQLClient';
import type {
  CreateMomokaPublicationResultFragment,
  RelayErrorFragment,
  RelaySuccessFragment,
} from '../../graphql/fragments.generated';
import {
  LensTransactionStatusType,
  type BroadcastRequest,
  type LensTransactionStatusRequest,
} from '../../graphql/types.generated';
import { poll, requireAuthHeaders, sdkAuthHeaderWrapper } from '../../helpers';
import { getSdk, LensTransactionResultFragment, Sdk } from './graphql/transaction.generated';

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

    this.sdk = getSdk(client, sdkAuthHeaderWrapper(authentication));
    this.authentication = authentication;
  }

  async status(
    request: LensTransactionStatusRequest,
  ): Promise<LensTransactionResultFragment | null> {
    const result = await this.sdk.LensTransactionStatus({ request });
    return result.data.result;
  }

  async txIdToTxHash(txId: string): Promise<string | null> {
    const result = await this.sdk.TxIdToTxHash({ for: txId });
    return result.data.result;
  }

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

  async waitUntilComplete({
    txId,
  }: {
    txId: string;
  }): Promise<LensTransactionResultFragment | null> {
    return poll({
      fn: () => this.status({ forTxId: txId }),
      validate: (result: Awaited<ReturnType<typeof this.status>>) => {
        return result?.status === LensTransactionStatusType.Complete;
      },
      onMaxAttempts: () => new TransactionPollingError(),
    });
  }
}
