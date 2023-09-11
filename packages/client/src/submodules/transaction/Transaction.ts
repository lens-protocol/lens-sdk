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
import { poll, requireAuthHeaders } from '../../helpers';
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

    this.sdk = getSdk(client);
    this.authentication = authentication;
  }

  async status(
    request: LensTransactionStatusRequest,
  ): PromiseResult<
    LensTransactionResultFragment | null,
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return requireAuthHeaders(this.authentication, async (headers) => {
      const result = await this.sdk.LensTransactionStatus({ request }, headers);
      return result.data.result;
    });
  }

  async txIdToTxHash(txId: string): Promise<string | null> {
    const result = await this.sdk.TxIdToTxHash({ txId });
    return result.data.result;
  }

  async broadcastOnChain(
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
  }): PromiseResult<
    LensTransactionResultFragment | null,
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return poll({
      fn: () => this.status({ txId }),
      validate: (result: Awaited<ReturnType<typeof this.status>>) => {
        if (result.isSuccess()) {
          const value = result.value;

          return value?.status === LensTransactionStatusType.Complete;
        }
        // in any not positive scenario, return true to resolve the polling with the Result
        return true;
      },
      onMaxAttempts: () => new TransactionPollingError(),
    });
  }
}
