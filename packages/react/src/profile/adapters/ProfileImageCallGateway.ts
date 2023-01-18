import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import {
  CreateSetProfileImageUriTypedDataDocument,
  CreateSetProfileImageUriTypedDataMutation,
  CreateSetProfileImageUriTypedDataMutationVariables,
  omitTypename,
} from '@lens-protocol/api-bindings';
import { Nonce } from '@lens-protocol/domain/entities';
import {
  IProfileImageCallGateway,
  UpdateProfileImageRequest,
} from '@lens-protocol/domain/use-cases/profile';
import { invariant } from '@lens-protocol/shared-kernel';

import { UnsignedLensProtocolCall } from '../../wallet/adapters/ConcreteWallet';

export class ProfileImageCallGateway implements IProfileImageCallGateway {
  constructor(private apolloClient: ApolloClient<NormalizedCacheObject>) {}

  async createUnsignedProtocolCall<T extends UpdateProfileImageRequest>(
    request: T,
    nonce?: Nonce,
  ): Promise<UnsignedLensProtocolCall<T>> {
    const { data } = await this.apolloClient.mutate<
      CreateSetProfileImageUriTypedDataMutation,
      CreateSetProfileImageUriTypedDataMutationVariables
    >({
      mutation: CreateSetProfileImageUriTypedDataDocument,
      variables: {
        request: this.resolveMutationRequest(request),
        options: nonce ? { overrideSigNonce: nonce } : undefined,
      },
    });

    invariant(data, 'Cannot set profile image uri');

    return new UnsignedLensProtocolCall(
      data.result.id,
      request,
      omitTypename(data.result.typedData),
    );
  }

  private resolveMutationRequest(request: UpdateProfileImageRequest) {
    if ('signature' in request) {
      return {
        profileId: request.profileId,
        nftData: {
          id: request.signature.id,
          signature: request.signature.signature,
        },
      };
    }
    return {
      profileId: request.profileId,
      url: request.url,
    };
  }
}
