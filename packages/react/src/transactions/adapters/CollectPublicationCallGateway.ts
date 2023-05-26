import {
  CreateCollectTypedDataDocument,
  CreateCollectTypedDataData,
  CreateCollectTypedDataVariables,
  SafeApolloClient,
  omitTypename,
} from '@lens-protocol/api-bindings';
import { lensHub } from '@lens-protocol/blockchain-bindings';
import { Nonce } from '@lens-protocol/domain/entities';
import { CollectRequest } from '@lens-protocol/domain/use-cases/publications';
import { IOnChainProtocolCallGateway } from '@lens-protocol/domain/use-cases/transactions';
import { invariant } from '@lens-protocol/shared-kernel';

import { UnsignedProtocolCall } from '../../wallet/adapters/ConcreteWallet';
import { Data, SelfFundedProtocolTransactionRequest } from './SelfFundedProtocolTransactionRequest';

export class CollectPublicationCallGateway implements IOnChainProtocolCallGateway<CollectRequest> {
  constructor(private apolloClient: SafeApolloClient) {}

  async createUnsignedProtocolCall(
    request: CollectRequest,
    nonce?: Nonce,
  ): Promise<UnsignedProtocolCall<CollectRequest>> {
    const { data } = await this.apolloClient.mutate<
      CreateCollectTypedDataData,
      CreateCollectTypedDataVariables
    >({
      mutation: CreateCollectTypedDataDocument,
      variables: {
        request: {
          publicationId: request.publicationId,
        },
        options: nonce ? { overrideSigNonce: nonce } : undefined,
      },
    });

    invariant(data, 'Cannot generate typed data for collect');

    return UnsignedProtocolCall.create({
      id: data.result.id,
      request,
      typedData: omitTypename(data.result.typedData),
      fallback: this.createRequestFallback(request, data),
    });
  }

  private createRequestFallback(
    request: CollectRequest,
    data: CreateCollectTypedDataData,
  ): SelfFundedProtocolTransactionRequest<CollectRequest> {
    const contract = lensHub(data.result.typedData.domain.verifyingContract);
    const encodedData = contract.interface.encodeFunctionData('collect', [
      data.result.typedData.message.profileId,
      data.result.typedData.message.pubId,
      data.result.typedData.message.data,
    ]);
    return {
      ...request,
      contractAddress: data.result.typedData.domain.verifyingContract,
      encodedData: encodedData as Data,
    };
  }
}
