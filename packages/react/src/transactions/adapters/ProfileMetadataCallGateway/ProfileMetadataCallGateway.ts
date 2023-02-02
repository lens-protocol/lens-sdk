import {
  CreateSetProfileMetadataTypedDataDocument,
  CreateSetProfileMetadataTypedDataMutation,
  CreateSetProfileMetadataTypedDataMutationVariables,
  CreateSetProfileMetadataViaDispatcherDocument,
  CreateSetProfileMetadataViaDispatcherMutation,
  CreateSetProfileMetadataViaDispatcherMutationVariables,
  GetProfileDocument,
  GetProfileQuery,
  GetProfileQueryVariables,
  omitTypename,
  ProfileFragment,
  CreatePublicSetProfileMetadataUriRequest,
  LensApolloClient,
} from '@lens-protocol/api-bindings';
import {
  NativeTransaction,
  Nonce,
  TransactionError,
  TransactionErrorReason,
} from '@lens-protocol/domain/entities';
import {
  IProfileDetailsCallGateway,
  UpdateProfileDetailsRequest,
} from '@lens-protocol/domain/use-cases/profile';
import {
  IUnsignedProtocolCallGateway,
  SupportedTransactionRequest,
} from '@lens-protocol/domain/use-cases/transactions';
import { ChainType, failure, invariant, never, success } from '@lens-protocol/shared-kernel';
import { v4 } from 'uuid';

import { UnsignedLensProtocolCall } from '../../../wallet/adapters/ConcreteWallet';
import { AsyncRelayReceipt, ITransactionFactory } from '../ITransactionFactory';
import { MetadataUploadAdapter } from '../MetadataUploadAdapter';
import { createProfileMetadata } from './createProfileMetadata';

export class ProfileMetadataCallGateway
  implements IProfileDetailsCallGateway, IUnsignedProtocolCallGateway<UpdateProfileDetailsRequest>
{
  constructor(
    private readonly apolloClient: LensApolloClient,
    private readonly transactionFactory: ITransactionFactory<SupportedTransactionRequest>,
    private readonly uploadAdapter: MetadataUploadAdapter,
  ) {}

  async createDelegatedTransaction<T extends UpdateProfileDetailsRequest>(
    request: T,
  ): Promise<NativeTransaction<T>> {
    return this.transactionFactory.createNativeTransaction({
      chainType: ChainType.POLYGON,
      id: v4(),
      request,
      asyncRelayReceipt: this.initiateProfileUpdate(
        await this.resolveCreateSetProfileMetadataUriRequest(request),
      ),
    });
  }

  async createUnsignedProtocolCall<T extends UpdateProfileDetailsRequest>(
    request: T,
    nonce?: Nonce,
  ): Promise<UnsignedLensProtocolCall<T>> {
    const result = await this.createSetProfileMetadataTypedData(
      await this.resolveCreateSetProfileMetadataUriRequest(request),
      nonce,
    );

    return new UnsignedLensProtocolCall(result.id, request, omitTypename(result.typedData));
  }

  private async createSetProfileMetadataTypedData(
    request: CreatePublicSetProfileMetadataUriRequest,
    nonce?: Nonce,
  ) {
    const { data } = await this.apolloClient.mutate<
      CreateSetProfileMetadataTypedDataMutation,
      CreateSetProfileMetadataTypedDataMutationVariables
    >({
      mutation: CreateSetProfileMetadataTypedDataDocument,
      variables: {
        request,
        options: nonce ? { overrideSigNonce: nonce } : undefined,
      },
    });

    invariant(data, 'Cannot generate typed data for setting profile metadata call');

    return data.result;
  }

  private async initiateProfileUpdate(
    request: CreatePublicSetProfileMetadataUriRequest,
  ): AsyncRelayReceipt {
    const { data } = await this.apolloClient.mutate<
      CreateSetProfileMetadataViaDispatcherMutation,
      CreateSetProfileMetadataViaDispatcherMutationVariables
    >({
      mutation: CreateSetProfileMetadataViaDispatcherDocument,
      variables: { request },
    });

    invariant(data, 'Cannot create update profile request via dispatcher');

    if (data.result.__typename === 'RelayError') {
      return failure(new TransactionError(TransactionErrorReason.REJECTED));
    }

    return success({
      indexingId: data.result.txId,
      txHash: data.result.txHash,
    });
  }

  private async resolveCreateSetProfileMetadataUriRequest(
    request: UpdateProfileDetailsRequest,
  ): Promise<CreatePublicSetProfileMetadataUriRequest> {
    const existingProfile = await this.retrieveProfileDetails(request.profileId);
    const metadataURI = await this.uploadAdapter.upload(
      createProfileMetadata(existingProfile, request),
    );

    return {
      profileId: request.profileId,
      metadata: metadataURI,
    };
  }

  private async retrieveProfileDetails(profileId: string): Promise<ProfileFragment> {
    const { data } = await this.apolloClient.query<GetProfileQuery, GetProfileQueryVariables>({
      fetchPolicy: 'cache-first',
      query: GetProfileDocument,
      variables: {
        request: { profileId },
        observerId: profileId,
      },
    });

    return data.result ?? never(`Cannot update profile "${profileId}: profile not found`);
  }
}
