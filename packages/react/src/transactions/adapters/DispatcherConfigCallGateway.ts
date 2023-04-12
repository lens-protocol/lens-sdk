import {
  CreateSetDispatcherTypedDataDocument,
  CreateSetDispatcherTypedDataData,
  CreateSetDispatcherTypedDataVariables,
  LensApolloClient,
  omitTypename,
} from '@lens-protocol/api-bindings';
import { Nonce } from '@lens-protocol/domain/entities';
import {
  IDispatcherConfigCallGateway,
  UpdateDispatcherConfigRequest,
} from '@lens-protocol/domain/use-cases/profile';

import { UnsignedProtocolCall } from '../../wallet/adapters/ConcreteWallet';

export class DispatcherConfigCallGateway implements IDispatcherConfigCallGateway {
  constructor(private apolloClient: LensApolloClient) {}

  async createUnsignedProtocolCall<T extends UpdateDispatcherConfigRequest>(
    request: T,
    nonce?: Nonce,
  ): Promise<UnsignedProtocolCall<T>> {
    const { data } = await this.apolloClient.mutate<
      CreateSetDispatcherTypedDataData,
      CreateSetDispatcherTypedDataVariables
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

    return UnsignedProtocolCall.create({
      contractAddress: data.result.typedData.domain.verifyingContract,
      functionName: 'setDispatcherWithSig',
      id: data.result.id,
      request,
      typedData: omitTypename(data.result.typedData),
    });
  }
}
