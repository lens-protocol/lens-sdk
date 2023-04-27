import {
  CreateFollowTypedDataDocument,
  CreateFollowTypedDataData,
  CreateFollowTypedDataVariables,
  Follow,
  LensApolloClient,
  moduleFeeAmountParams,
  omitTypename,
} from '@lens-protocol/api-bindings';
import { lensHub } from '@lens-protocol/blockchain-bindings';
import { Nonce } from '@lens-protocol/domain/entities';
import {
  FollowRequest,
  isPaidFollowRequest,
  isProfileOwnerFollowRequest,
} from '@lens-protocol/domain/use-cases/profile';
import { IUnsignedProtocolCallGateway } from '@lens-protocol/domain/use-cases/transactions';

import { UnsignedProtocolCall } from '../../wallet/adapters/ConcreteWallet';
import { Data, SelfFundedProtocolTransactionRequest } from './SelfFundedProtocolTransactionRequest';

function resolveProfileFollow(request: FollowRequest): Follow[] {
  if (isPaidFollowRequest(request)) {
    return [
      {
        profile: request.profileId,
        followModule: {
          feeFollowModule: {
            amount: moduleFeeAmountParams({ from: request.fee.amount }),
          },
        },
      },
    ];
  }
  if (isProfileOwnerFollowRequest(request)) {
    return [
      {
        profile: request.profileId,
        followModule: {
          profileFollowModule: {
            profileId: request.followerProfileId,
          },
        },
      },
    ];
  }
  return [{ profile: request.profileId }];
}

export class FollowProfilesCallGateway implements IUnsignedProtocolCallGateway<FollowRequest> {
  constructor(private apolloClient: LensApolloClient) {}

  async createUnsignedProtocolCall(
    request: FollowRequest,
    nonce?: Nonce,
  ): Promise<UnsignedProtocolCall<FollowRequest>> {
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

    return UnsignedProtocolCall.create({
      id: data.result.id,
      request,
      typedData: omitTypename(data.result.typedData),
      fallback: this.createRequestFallback(request, data),
    });
  }

  private createRequestFallback(
    request: FollowRequest,
    data: CreateFollowTypedDataData,
  ): SelfFundedProtocolTransactionRequest<FollowRequest> {
    const contract = lensHub(data.result.typedData.domain.verifyingContract);
    const encodedData = contract.interface.encodeFunctionData('follow', [
      data.result.typedData.value.profileIds,
      data.result.typedData.value.datas,
    ]);
    return {
      ...request,
      contractAddress: data.result.typedData.domain.verifyingContract,
      encodedData: encodedData as Data,
    };
  }
}
