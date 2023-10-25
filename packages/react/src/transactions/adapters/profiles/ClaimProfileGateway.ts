import {
  SafeApolloClient,
  ClaimProfileWithHandleData,
  ClaimProfileWithHandleVariables,
  ClaimProfileWithHandleDocument,
  FollowModuleInput,
  ClaimProfileWithHandleErrorReasonType,
} from '@lens-protocol/api-bindings';
import { NativeTransaction } from '@lens-protocol/domain/entities';
import {
  ClaimHandleError,
  ClaimHandleRequest,
  FollowPolicyConfig,
  FollowPolicyType,
  IClaimHandleGateway,
} from '@lens-protocol/domain/use-cases/profile';
import { ChainType, failure, PromiseResult, success } from '@lens-protocol/shared-kernel';
import { v4 } from 'uuid';

import { ITransactionFactory } from '../ITransactionFactory';

// TODO: duplicated from UpdateFollowPolicyGateway but I dunno where is the best place to put it
export function resolveFollowModuleParams(policy: FollowPolicyConfig): FollowModuleInput {
  switch (policy.type) {
    case FollowPolicyType.CHARGE:
      return {
        feeFollowModule: {
          amount: {
            currency: policy.amount.asset.address,
            value: policy.amount.toSignificantDigits(),
          },
          recipient: policy.recipient,
        },
      };
    case FollowPolicyType.ANYONE:
      return {
        freeFollowModule: true,
      };
    case FollowPolicyType.NO_ONE:
      return {
        revertFollowModule: true,
      };
  }
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
        request: {
          id: request.id,
          freeTextHandle: request.localName,
          followModule: request.followPolicy
            ? resolveFollowModuleParams(request.followPolicy)
            : null,
        },
      },
    });

    if (data.result.__typename === 'ClaimProfileWithHandleErrorResult') {
      return failure(new ClaimHandleError(request.localName, data.result.reason));
    }

    const transaction = this.transactionFactory.createNativeTransaction({
      chainType: ChainType.POLYGON,
      id: v4(),
      request,
      indexingId: data.result.txId,
      txHash: data.result.txHash,
    });

    return success(transaction);
  }
}
