import {
  CreateFollowTypedDataData,
  CreateFollowTypedDataDocument,
  CreateFollowTypedDataVariables,
  Follow,
  SafeApolloClient,
  omitTypename,
} from '@lens-protocol/api-bindings';
import { Nonce } from '@lens-protocol/domain/entities';
import { FollowRequest, isPaidFollowRequest } from '@lens-protocol/domain/use-cases/profile';
import { IOnChainProtocolCallGateway } from '@lens-protocol/domain/use-cases/transactions';
import { Data } from '@lens-protocol/shared-kernel';

import { UnsignedProtocolCall } from '../../wallet/adapters/ConcreteWallet';
import { SelfFundedProtocolTransactionRequest } from './SelfFundedProtocolTransactionRequest';

function resolveProfileFollow(request: FollowRequest): Follow[] {
  if (isPaidFollowRequest(request)) {
    return [
      {
        profileId: request.profileId,
        followModule: {
          feeFollowModule: true,
        },
      },
    ];
  }

  return [{ profileId: request.profileId }];
}

export class FollowProfileCallGateway implements IOnChainProtocolCallGateway<FollowRequest> {
  constructor(private apolloClient: SafeApolloClient) {}

  async createUnsignedProtocolCall(
    request: FollowRequest,
    nonce?: Nonce,
  ): Promise<UnsignedProtocolCall<FollowRequest>> {
    const data = await this.createFollowTypedData(request, nonce);

    return UnsignedProtocolCall.create({
      id: data.result.id,
      request,
      typedData: omitTypename(data.result.typedData),
      fallback: this.createRequestFallback(request, data),
    });
  }

  private async createFollowTypedData(
    request: FollowRequest,
    nonce?: Nonce,
  ): Promise<CreateFollowTypedDataData> {
    const { data } = await this.apolloClient.mutate<
      CreateFollowTypedDataData,
      CreateFollowTypedDataVariables
    >({
      mutation: CreateFollowTypedDataDocument,
      variables: {
        request: {
          follow: resolveProfileFollow(request),
        },
        options: nonce ? { overrideSigNonce: nonce } : undefined,
      },
    });

    return data;
  }

  // TODO: implement fallback
  private createRequestFallback(
    request: FollowRequest,
    data: CreateFollowTypedDataData,
  ): SelfFundedProtocolTransactionRequest<FollowRequest> {
    // const contract = lensHub(data.result.typedData.domain.verifyingContract);
    const encodedData = '';
    // const encodedData = contract.interface.encodeFunctionData('follow', [
    //   data.result.typedData.message.profileIds,
    //   data.result.typedData.message.datas,
    // ]);
    return {
      ...request,
      contractAddress: data.result.typedData.domain.verifyingContract,
      encodedData: encodedData as Data,
    };
  }
}
