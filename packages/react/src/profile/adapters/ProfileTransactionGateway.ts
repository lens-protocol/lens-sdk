import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import {
  CreateProfileDocument,
  CreateProfileMutation,
  CreateProfileMutationVariables,
  RelayErrorReasons,
} from '@lens-protocol/api';
import {
  Transaction,
  TransactionError,
  TransactionErrorReason,
} from '@lens-protocol/domain/entities';
import {
  CreateProfileRequest,
  DuplicatedHandleError,
  IProfileTransactionGateway,
} from '@lens-protocol/domain/use-cases/profile';
import { SupportedTransactionRequest } from '@lens-protocol/domain/use-cases/transactions';
import {
  ChainType,
  failure,
  invariant,
  PromiseResult,
  success,
} from '@lens-protocol/shared-kernel';
import { v4 } from 'uuid';

import {
  AsyncRelayReceipt,
  ITransactionFactory,
} from '../../transactions/adapters/ITransactionFactory';

async function asyncRelayReceipt(data: CreateProfileMutation): AsyncRelayReceipt {
  if (data.result.__typename === 'RelayError') {
    return failure(new TransactionError(TransactionErrorReason.REJECTED));
  }
  return success({
    indexingId: data.result.txId,
    txHash: data.result.txHash,
  });
}

export class ProfileTransactionGateway implements IProfileTransactionGateway {
  constructor(
    private apolloClient: ApolloClient<NormalizedCacheObject>,
    private factory: ITransactionFactory<SupportedTransactionRequest>,
  ) {}

  async createProfileTransaction<T extends CreateProfileRequest>(
    request: T,
  ): PromiseResult<Transaction<T>, DuplicatedHandleError> {
    const { data } = await this.apolloClient.mutate<
      CreateProfileMutation,
      CreateProfileMutationVariables
    >({
      mutation: CreateProfileDocument,
      variables: {
        request: {
          handle: request.handle,
        },
      },
    });

    invariant(data, 'Cannot create profile');

    if (data.result.__typename === 'RelayError') {
      if (data.result.reason === RelayErrorReasons.HandleTaken) {
        return failure(new DuplicatedHandleError(request.handle));
      }
    }

    const transaction = this.factory.createNativeTransaction({
      chainType: ChainType.POLYGON,
      request,
      id: v4(),
      asyncRelayReceipt: asyncRelayReceipt(data),
    });
    return success(transaction);
  }
}
