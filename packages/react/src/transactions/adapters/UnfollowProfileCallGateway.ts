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

import { UnsignedLensProtocolCall } from '../../wallet/adapters/ConcreteWallet';
import { TypedData } from './TypedData';

class UnsignedUnfollowCall<T extends UnfollowRequest> extends UnsignedLensProtocolCall<T> {
  constructor(data: { id: string; request: T; typedData: TypedData }) {
    super(data.id, data.request, data.typedData);
  }
}

export class UnfollowProfileCallGateway implements IUnfollowProfileCallGateway {
  constructor(private apolloClient: LensApolloClient) {}

  async createUnsignedProtocolCall<T extends UnfollowRequest>(
    request: T,
  ): Promise<UnsignedLensProtocolCall<T>> {
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

    return new UnsignedUnfollowCall({
      id: data.result.id,
      request,
      typedData: omitTypename(data.result.typedData),
    });
  }
}
