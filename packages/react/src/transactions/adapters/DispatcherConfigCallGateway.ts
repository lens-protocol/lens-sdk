import {
  CreateSetDispatcherTypedDataDocument,
  CreateSetDispatcherTypedDataData,
  CreateSetDispatcherTypedDataVariables,
  SafeApolloClient,
  omitTypename,
} from '@lens-protocol/api-bindings';
import { lensHub } from '@lens-protocol/blockchain-bindings';
import { Nonce } from '@lens-protocol/domain/entities';
import { UpdateDispatcherConfigRequest } from '@lens-protocol/domain/use-cases/profile';
import { IOnChainProtocolCallGateway } from '@lens-protocol/domain/use-cases/transactions';

import { UnsignedProtocolCall } from '../../wallet/adapters/ConcreteWallet';
import { Data, SelfFundedProtocolTransactionRequest } from './SelfFundedProtocolTransactionRequest';

export class DispatcherConfigCallGateway
  implements IOnChainProtocolCallGateway<UpdateDispatcherConfigRequest>
{
  constructor(private apolloClient: SafeApolloClient) {}

  async createUnsignedProtocolCall(
    request: UpdateDispatcherConfigRequest,
    nonce?: Nonce,
  ): Promise<UnsignedProtocolCall<UpdateDispatcherConfigRequest>> {
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
      fallback: this.createRequestFallback(request, data),
    });
  }

  private createRequestFallback(
    request: UpdateDispatcherConfigRequest,
    data: CreateSetDispatcherTypedDataData,
  ): SelfFundedProtocolTransactionRequest<UpdateDispatcherConfigRequest> {
    const contract = lensHub(data.result.typedData.domain.verifyingContract);
    const encodedData = contract.interface.encodeFunctionData('setDispatcher', [
      data.result.typedData.value.profileId,
      data.result.typedData.value.dispatcher,
    ]);
    return {
      ...request,
      contractAddress: data.result.typedData.domain.verifyingContract,
      encodedData: encodedData as Data,
    };
  }
}
