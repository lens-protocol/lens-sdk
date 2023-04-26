import {
  CreateProfileDocument,
  CreateProfileData,
  CreateProfileVariables,
  LensApolloClient,
  RelayErrorReasons,
} from '@lens-protocol/api-bindings';
import { Transaction } from '@lens-protocol/domain/entities';
import {
  CreateProfileRequest,
  DuplicatedHandleError,
  IProfileTransactionGateway,
} from '@lens-protocol/domain/use-cases/profile';
import { BroadcastingError } from '@lens-protocol/domain/use-cases/transactions';
import { ChainType, failure, PromiseResult, success } from '@lens-protocol/shared-kernel';
import { v4 } from 'uuid';

import { ITransactionFactory } from '../../transactions/adapters/ITransactionFactory';
import { handleRelayError } from '../../transactions/adapters/relayer';

export class ProfileTransactionGateway implements IProfileTransactionGateway {
  constructor(
    private apolloClient: LensApolloClient,
    private factory: ITransactionFactory<CreateProfileRequest>,
  ) {}

  async createProfileTransaction<T extends CreateProfileRequest>(
    request: T,
  ): PromiseResult<Transaction<T>, DuplicatedHandleError | BroadcastingError> {
    const { data } = await this.apolloClient.mutate<CreateProfileData, CreateProfileVariables>({
      mutation: CreateProfileDocument,
      variables: {
        request: {
          handle: request.handle,
        },
      },
    });

    if (data.result.__typename === 'RelayError') {
      switch (data.result.reason) {
        case RelayErrorReasons.HandleTaken:
          return failure(new DuplicatedHandleError(request.handle));

        default:
          return handleRelayError(data.result);
      }
    }

    const transaction = this.factory.createNativeTransaction({
      chainType: ChainType.POLYGON,
      request,
      id: v4(),
      indexingId: data.result.txId,
      txHash: data.result.txHash,
    });

    return success(transaction);
  }
}
