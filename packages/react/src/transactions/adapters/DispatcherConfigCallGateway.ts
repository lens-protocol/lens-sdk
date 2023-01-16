import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import {
  CreateSetDispatcherTypedDataDocument,
  CreateSetDispatcherTypedDataMutation,
  CreateSetDispatcherTypedDataMutationVariables,
  omitTypename,
} from '@lens-protocol/api-bindings';
import { Nonce } from '@lens-protocol/domain/entities';

import {
  IDispatcherConfigCallGateway,
  UpdateDispatcherConfigRequest,
} from '@lens-protocol/domain/use-cases/profile';
import { invariant } from '@lens-protocol/shared-kernel';
import { UnsignedLensProtocolCall } from '../../wallet/adapters/ConcreteWallet';

export class DispatcherConfigCallGateway implements IDispatcherConfigCallGateway {
  constructor(private apolloClient: ApolloClient<NormalizedCacheObject>) {}

  async createUnsignedProtocolCall<T extends UpdateDispatcherConfigRequest>(
    request: T,
    nonce?: Nonce,
  ): Promise<UnsignedLensProtocolCall<T>> {
    const { data } = await this.apolloClient.mutate<
      CreateSetDispatcherTypedDataMutation,
      CreateSetDispatcherTypedDataMutationVariables
    >({
      mutation: CreateSetDispatcherTypedDataDocument,
      variables: {
        request: {
          profileId: request.profileId,
          enable: request.enabled,
        },
        options: nonce ? { overrideSigNonce: nonce } : undefined,
      },
    });

    invariant(data, 'Cannot generate typed data for setting dispatcher config');

    return new UnsignedLensProtocolCall(
      data.result.id,
      request,
      omitTypename(data.result.typedData),
    );
  }
}
