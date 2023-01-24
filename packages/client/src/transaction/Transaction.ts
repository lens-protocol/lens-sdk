import type { PromiseResult } from '@lens-protocol/shared-kernel';
import { GraphQLClient } from 'graphql-request';

import { testHeaderWrapper } from '../__helpers__/testHeaderWrapper';
import type { Authentication } from '../authentication';
import type { LensConfig } from '../consts/config';
import type { CredentialsExpiredError, NotAuthenticatedError } from '../consts/errors';
import type { RelayerResultFragment, RelayErrorFragment } from '../graphql/fragments.generated';
import type { BroadcastRequest } from '../graphql/types.generated';
import { poll, requireAuthHeaders } from '../helpers';
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

export class Transaction {
  private readonly authentication: Authentication | undefined;
  private readonly sdk: Sdk;

  constructor(config: LensConfig, authentication: Authentication) {
    const client = new GraphQLClient(config.environment.gqlEndpoint);

    this.sdk = getSdk(client, testHeaderWrapper);
    this.authentication = authentication;
  }

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
}
