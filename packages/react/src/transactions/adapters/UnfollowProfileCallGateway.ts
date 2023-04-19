import {
  CreateUnfollowTypedDataDocument,
  CreateUnfollowTypedDataData,
  CreateUnfollowTypedDataVariables,
  LensApolloClient,
  omitTypename,
} from '@lens-protocol/api-bindings';
import { lensFollowNFT } from '@lens-protocol/blockchain-bindings';
import {
  IUnfollowProfileCallGateway,
  UnfollowRequest,
} from '@lens-protocol/domain/use-cases/profile';

import { UnsignedProtocolCall } from '../../wallet/adapters/ConcreteWallet';
import { Data, SelfFundedProtocolCallRequest } from './SelfFundedProtocolCallRequest';

export class UnfollowProfileCallGateway implements IUnfollowProfileCallGateway {
  constructor(private apolloClient: LensApolloClient) {}

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
          profile: request.profileId,
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

  private createRequestFallback(
    request: UnfollowRequest,
    data: CreateUnfollowTypedDataData,
  ): SelfFundedProtocolCallRequest<UnfollowRequest> {
    const contract = lensFollowNFT(data.result.typedData.domain.verifyingContract);
    const encodedData = contract.interface.encodeFunctionData('burn', [
      data.result.typedData.value.tokenId,
    ]);
    return {
      ...request,
      contractAddress: data.result.typedData.domain.verifyingContract,
      encodedData: encodedData as Data,
    };
  }
}
