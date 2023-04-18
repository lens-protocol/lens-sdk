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
import { Data, RequestFallback } from '@lens-protocol/domain/use-cases/transactions';

import { UnsignedProtocolCall } from '../../wallet/adapters/ConcreteWallet';

export class UnfollowProfileCallGateway implements IUnfollowProfileCallGateway {
  constructor(private apolloClient: LensApolloClient) {}

  async createUnsignedProtocolCall<T extends UnfollowRequest>(
    request: T,
  ): Promise<UnsignedProtocolCall<T>> {
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
      fallback: this.createRequestFallback(data),
    });
  }

  private createRequestFallback(data: CreateUnfollowTypedDataData): RequestFallback {
    const contract = lensFollowNFT(data.result.typedData.domain.verifyingContract);
    const encodedData = contract.interface.encodeFunctionData('burn', [
      data.result.typedData.value.tokenId,
    ]);
    return {
      contractAddress: data.result.typedData.domain.verifyingContract,
      encodedData: encodedData as Data,
    };
  }
}
