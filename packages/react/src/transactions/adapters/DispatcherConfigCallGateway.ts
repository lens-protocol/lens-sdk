import {
  CreateSetDispatcherTypedDataDocument,
  CreateSetDispatcherTypedDataData,
  CreateSetDispatcherTypedDataVariables,
  LensApolloClient,
  omitTypename,
} from '@lens-protocol/api-bindings';
import { lensHub } from '@lens-protocol/blockchain-bindings';
import { Nonce } from '@lens-protocol/domain/entities';
import {
  IDispatcherConfigCallGateway,
  UpdateDispatcherConfigRequest,
} from '@lens-protocol/domain/use-cases/profile';
import { Data, RequestFallback } from '@lens-protocol/domain/use-cases/transactions';

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
      id: data.result.id,
      request,
      typedData: omitTypename(data.result.typedData),
      fallback: this.createRequestFallback(data),
    });
  }

  private createRequestFallback(data: CreateSetDispatcherTypedDataData): RequestFallback {
    const contract = lensHub(data.result.typedData.domain.verifyingContract);
    const encodedData = contract.interface.encodeFunctionData('setDispatcher', [
      data.result.typedData.value.profileId,
      data.result.typedData.value.dispatcher,
    ]);
    return {
      contractAddress: data.result.typedData.domain.verifyingContract,
      encodedData: encodedData as Data,
    };
  }
}
