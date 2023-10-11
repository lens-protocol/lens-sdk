import {
  omitTypename,
  CreateSetFollowModuleTypedDataDocument,
  CreateSetFollowModuleTypedDataData,
  CreateSetFollowModuleTypedDataVariables,
  SafeApolloClient,
  FollowModuleInput,
} from '@lens-protocol/api-bindings';
import { lensHub } from '@lens-protocol/blockchain-bindings';
import { Nonce } from '@lens-protocol/domain/entities';
import {
  FollowPolicyConfig,
  FollowPolicyType,
  UpdateFollowPolicyRequest,
} from '@lens-protocol/domain/use-cases/profile';
import { IOnChainProtocolCallGateway } from '@lens-protocol/domain/use-cases/transactions';
import { Data } from '@lens-protocol/shared-kernel';

import { UnsignedProtocolCall } from '../../wallet/adapters/ConcreteWallet';
import { SelfFundedProtocolTransactionRequest } from './SelfFundedProtocolTransactionRequest';

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

export class UpdateFollowPolicyCallGateway
  implements IOnChainProtocolCallGateway<UpdateFollowPolicyRequest>
{
  constructor(private apolloClient: SafeApolloClient) {}

  async createUnsignedProtocolCall(
    request: UpdateFollowPolicyRequest,
    nonce?: Nonce,
  ): Promise<UnsignedProtocolCall<UpdateFollowPolicyRequest>> {
    const { data } = await this.apolloClient.mutate<
      CreateSetFollowModuleTypedDataData,
      CreateSetFollowModuleTypedDataVariables
    >({
      mutation: CreateSetFollowModuleTypedDataDocument,
      variables: {
        request: {
          followModule: resolveFollowModuleParams(request.policy),
        },
        options: nonce ? { overrideSigNonce: nonce } : undefined,
      },
    });

    return UnsignedProtocolCall.create({
      id: data.result.id,
      request,
      typedData: omitTypename(data.result.typedData),
      fallback: this.createRequestFallback(request, data),
    });
  }

  private createRequestFallback(
    request: UpdateFollowPolicyRequest,
    data: CreateSetFollowModuleTypedDataData,
  ): SelfFundedProtocolTransactionRequest<UpdateFollowPolicyRequest> {
    const contract = lensHub(data.result.typedData.domain.verifyingContract);
    const encodedData = contract.interface.encodeFunctionData('setFollowModule', [
      data.result.typedData.message.profileId,
      data.result.typedData.message.followModule,
      data.result.typedData.message.followModuleInitData,
    ]);
    return {
      ...request,
      contractAddress: data.result.typedData.domain.verifyingContract,
      encodedData: encodedData as Data,
    };
  }
}
