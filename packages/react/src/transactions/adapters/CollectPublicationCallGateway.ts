import {
  CreateCollectTypedDataDocument,
  CreateCollectTypedDataData,
  CreateCollectTypedDataVariables,
  LensApolloClient,
  omitTypename,
} from '@lens-protocol/api-bindings';
import { Nonce } from '@lens-protocol/domain/entities';
import {
  CollectRequest,
  ICollectPublicationCallGateway,
} from '@lens-protocol/domain/use-cases/publications';
import { invariant } from '@lens-protocol/shared-kernel';

import { UnsignedProtocolCall } from '../../wallet/adapters/ConcreteWallet';

export class CollectPublicationCallGateway implements ICollectPublicationCallGateway {
  constructor(private apolloClient: LensApolloClient) {}

  async createUnsignedProtocolCall<T extends CollectRequest>(
    request: T,
    nonce?: Nonce,
  ): Promise<UnsignedProtocolCall<T>> {
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
      contractAddress: data.result.typedData.domain.verifyingContract,
      functionName: 'collectWithSig',
      id: data.result.id,
      request,
      typedData: omitTypename(data.result.typedData),
    });
  }
}
