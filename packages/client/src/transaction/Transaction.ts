import { PromiseResult } from '@lens-protocol/shared-kernel';
import { GraphQLClient } from 'graphql-request';

import { Authentication } from '../authentication';
import { LensConfig } from '../consts/config';
import { CredentialsExpiredError, NotAuthenticatedError } from '../consts/errors';
import { RelayerResultFragment, RelayErrorFragment } from '../graphql/fragments.generated';
import { BroadcastRequest } from '../graphql/types.generated';
import { execute } from '../helpers/execute';
import {
  getSdk,
  Sdk,
  TransactionErrorFragment,
  TransactionIndexedResultFragment,
} from './graphql/transaction.generated';

export class Transaction {
  private readonly authentication: Authentication | undefined;
  private readonly sdk: Sdk;

  constructor(config: LensConfig, authentication: Authentication) {
    const client = new GraphQLClient(config.environment.gqlEndpoint);

    this.sdk = getSdk(client);
    this.authentication = authentication;
  }

  async broadcast(
    request: BroadcastRequest,
  ): PromiseResult<
    RelayerResultFragment | RelayErrorFragment,
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return execute(this.authentication, async (headers) => {
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
    return execute(this.authentication, async (headers) => {
      const result = await this.sdk.HasTxHashBeenIndexed({ request: { txId } }, headers);
      return result.data.result;
    });
  }
}
