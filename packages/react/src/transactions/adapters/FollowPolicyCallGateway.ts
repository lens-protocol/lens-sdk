import {
  omitTypename,
  CreateSetFollowModuleTypedDataDocument,
  CreateSetFollowModuleTypedDataData,
  CreateSetFollowModuleTypedDataVariables,
  SafeApolloClient,
} from '@lens-protocol/api-bindings';
import { lensHub } from '@lens-protocol/blockchain-bindings';
import { Nonce } from '@lens-protocol/domain/entities';
import {
  FollowPolicyType,
  UpdateFollowPolicyRequest,
} from '@lens-protocol/domain/use-cases/profile';
import { IOnChainProtocolCallGateway } from '@lens-protocol/domain/use-cases/transactions';

import { UnsignedProtocolCall } from '../../wallet/adapters/ConcreteWallet';
import { Data, SelfFundedProtocolTransactionRequest } from './SelfFundedProtocolTransactionRequest';

function buildFollowModuleRequest(request: UpdateFollowPolicyRequest) {
  switch (request.policy.type) {
    case FollowPolicyType.CHARGE:
      return {
        feeFollowModule: {
          amount: {
            currency: request.policy.amount.asset.address,
            value: request.policy.amount.toSignificantDigits(),
          },
          recipient: request.policy.recipient,
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
    case FollowPolicyType.ONLY_PROFILE_OWNERS:
      return {
        profileFollowModule: true,
      };
  }
}

export class FollowPolicyCallGateway
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
          profileId: request.profileId,
          followModule: buildFollowModuleRequest(request),
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
