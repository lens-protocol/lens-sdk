import {
  CreateUnfollowTypedDataDocument,
  CreateUnfollowTypedDataData,
  CreateUnfollowTypedDataVariables,
  SafeApolloClient,
  omitTypename,
} from '@lens-protocol/api-bindings';
// import { lensFollowNFT } from '@lens-protocol/blockchain-bindings';
import { UnfollowRequest } from '@lens-protocol/domain/use-cases/profile';
import { IOnChainProtocolCallGateway } from '@lens-protocol/domain/use-cases/transactions';
import { Data } from '@lens-protocol/shared-kernel';

import { UnsignedProtocolCall } from '../../wallet/adapters/ConcreteWallet';
import { SelfFundedProtocolTransactionRequest } from './SelfFundedProtocolTransactionRequest';

export class UnfollowProfileCallGateway implements IOnChainProtocolCallGateway<UnfollowRequest> {
  constructor(private apolloClient: SafeApolloClient) {}

  async createUnsignedProtocolCall(
    request: UnfollowRequest,
  ): Promise<UnsignedProtocolCall<UnfollowRequest>> {
    const { data } = await this.apolloClient.mutate<
      CreateUnfollowTypedDataData,
      CreateUnfollowTypedDataVariables
    >({
      mutation: CreateUnfollowTypedDataDocument,
      variables: {
        request: {
          unfollow: [request.profileId],
        },
      },
    });

    return UnsignedProtocolCall.create({
      id: data.result.id,
      request,
      typedData: omitTypename(data.result.typedData),
      fallback: this.createRequestFallback(request, data),
    });
  }

  // TODO: implement fallback
  private createRequestFallback(
    request: UnfollowRequest,
    data: CreateUnfollowTypedDataData,
  ): SelfFundedProtocolTransactionRequest<UnfollowRequest> {
    // const contract = lensFollowNFT(data.result.typedData.domain.verifyingContract);
    const encodedData = '';

    // contract.interface.encodeFunctionData('burn', [
    //   data.result.typedData.message.tokenId,
    // ]);
    return {
      ...request,
      contractAddress: data.result.typedData.domain.verifyingContract,
      encodedData: encodedData as Data,
    };
  }
}
