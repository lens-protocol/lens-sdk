import {
  SafeApolloClient,
  ClaimProfileWithHandleData,
  ClaimProfileWithHandleVariables,
  ClaimProfileWithHandleDocument,
  ClaimProfileWithHandleErrorReasonType,
  ClaimProfileWithHandleRequest,
  resolveFollowModuleInput,
} from '@lens-protocol/api-bindings';
import { NativeTransaction } from '@lens-protocol/domain/entities';
import {
  ClaimHandleError,
  ClaimHandleRequest,
  IClaimHandleGateway,
  isClaimReservedHandleRequest,
} from '@lens-protocol/domain/use-cases/profile';
import { ChainType, failure, PromiseResult, success } from '@lens-protocol/shared-kernel';
import { v4 } from 'uuid';

import { ITransactionFactory } from '../ITransactionFactory';

function resolveClaimProfileWithHandleRequest(
  request: ClaimHandleRequest,
): ClaimProfileWithHandleRequest {
  if (isClaimReservedHandleRequest(request)) {
    return {
      id: request.id,
      followModule: request.followPolicy ? resolveFollowModuleInput(request.followPolicy) : null,
    };
  }
  return {
    freeTextHandle: request.localName,
    followModule: request.followPolicy ? resolveFollowModuleInput(request.followPolicy) : null,
  };
}

export class ClaimProfileGateway
  implements IClaimHandleGateway<ClaimProfileWithHandleErrorReasonType>
{
  constructor(
    private apolloClient: SafeApolloClient,
    private transactionFactory: ITransactionFactory<ClaimHandleRequest>,
  ) {}

  async claimHandleTransaction<T extends ClaimHandleRequest>(
    request: T,
  ): PromiseResult<NativeTransaction<T>, ClaimHandleError<ClaimProfileWithHandleErrorReasonType>> {
    const { data } = await this.apolloClient.mutate<
      ClaimProfileWithHandleData,
      ClaimProfileWithHandleVariables
    >({
      mutation: ClaimProfileWithHandleDocument,
      variables: {
        request: resolveClaimProfileWithHandleRequest(request),
      },
    });

    if (data.result.__typename === 'ClaimProfileWithHandleErrorResult') {
      return failure(
        new ClaimHandleError(
          isClaimReservedHandleRequest(request) ? request.handle : request.localName,
          data.result.reason,
        ),
      );
    }

    const transaction = this.transactionFactory.createNativeTransaction({
      chainType: ChainType.POLYGON,
      id: v4(),
      request,
      relayerTxId: data.result.txId,
      txHash: data.result.txHash,
    });

    return success(transaction);
  }
}
