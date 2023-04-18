import {
  CreateUnfollowTypedDataDocument,
  CreateUnfollowTypedDataData,
  CreateUnfollowTypedDataVariables,
  LensApolloClient,
  omitTypename,
} from '@lens-protocol/api-bindings';
import {
  IUnfollowProfileCallGateway,
  UnfollowRequest,
} from '@lens-protocol/domain/use-cases/profile';

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
      contractAddress: data.result.typedData.domain.verifyingContract,
      functionName: 'burnWithSig',
      id: data.result.id,
      request,
      typedData: omitTypename(data.result.typedData),
    });
  }
}
