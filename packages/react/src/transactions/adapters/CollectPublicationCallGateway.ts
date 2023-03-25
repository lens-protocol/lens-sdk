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

import { UnsignedLensProtocolCall } from '../../wallet/adapters/ConcreteWallet';

export class CollectPublicationCallGateway implements ICollectPublicationCallGateway {
  constructor(private apolloClient: LensApolloClient) {}

  async createUnsignedProtocolCall<T extends CollectRequest>(
    request: T,
    nonce?: Nonce,
  ): Promise<UnsignedLensProtocolCall<T>> {
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

    return new UnsignedLensProtocolCall(
      data.result.id,
      request,
      omitTypename(data.result.typedData),
    );
  }
}
