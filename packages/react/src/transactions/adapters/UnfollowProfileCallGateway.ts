import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import {
  CreateUnfollowTypedDataDocument,
  CreateUnfollowTypedDataMutation,
  CreateUnfollowTypedDataMutationVariables,
  omitTypename,
} from '@lens-protocol/api-bindings';
import {
  IUnfollowProfileCallGateway,
  UnfollowRequest,
} from '@lens-protocol/domain/use-cases/profile';
import { invariant } from '@lens-protocol/shared-kernel';

import { UnsignedLensProtocolCall } from '../../wallet/adapters/ConcreteWallet';
import { TypedData } from './TypedData';

class UnsignedUnfollowCall<T extends UnfollowRequest> extends UnsignedLensProtocolCall<T> {
  constructor(data: { id: string; request: T; typedData: TypedData }) {
    super(data.id, data.request, data.typedData);
  }
}

export class UnfollowProfileCallGateway implements IUnfollowProfileCallGateway {
  constructor(private apolloClient: ApolloClient<NormalizedCacheObject>) {}

  async createUnsignedProtocolCall<T extends UnfollowRequest>(
    request: T,
  ): Promise<UnsignedLensProtocolCall<T>> {
    const { data } = await this.apolloClient.mutate<
      CreateUnfollowTypedDataMutation,
      CreateUnfollowTypedDataMutationVariables
    >({
      mutation: CreateUnfollowTypedDataDocument,
      variables: {
        request: {
          profile: request.profileId,
        },
      },
    });

    invariant(data, 'Cannot generate typed data for unfollow');

    return new UnsignedUnfollowCall({
      id: data.result.id,
      request,
      typedData: omitTypename(data.result.typedData),
    });
  }
}
