import {
  CreateSetProfileMetadataTypedDataDocument,
  CreateSetProfileMetadataTypedDataData,
  CreateSetProfileMetadataTypedDataVariables,
  CreateSetProfileMetadataViaDispatcherDocument,
  CreateSetProfileMetadataViaDispatcherData,
  CreateSetProfileMetadataViaDispatcherVariables,
  GetProfileDocument,
  GetProfileData,
  GetProfileVariables,
  omitTypename,
  Profile,
  CreatePublicSetProfileMetadataUriRequest,
  LensApolloClient,
  ProfileMetadata,
} from '@lens-protocol/api-bindings';
import {
  NativeTransaction,
  Nonce,
  ProfileId,
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
import { ChainType, failure, never, success } from '@lens-protocol/shared-kernel';
import { v4 } from 'uuid';

import { UnsignedLensProtocolCall } from '../../../wallet/adapters/ConcreteWallet';
import { IMetadataUploader } from '../IMetadataUploader';
import { AsyncRelayReceipt, ITransactionFactory } from '../ITransactionFactory';
import { createProfileMetadata } from './createProfileMetadata';

export class ProfileMetadataCallGateway
  implements IProfileDetailsCallGateway, IUnsignedProtocolCallGateway<UpdateProfileDetailsRequest>
{
  constructor(
    private readonly apolloClient: LensApolloClient,
    private readonly transactionFactory: ITransactionFactory<SupportedTransactionRequest>,
    private readonly uploader: IMetadataUploader<ProfileMetadata>,
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
      CreateSetProfileMetadataTypedDataData,
      CreateSetProfileMetadataTypedDataVariables
    >({
      mutation: CreateSetProfileMetadataTypedDataDocument,
      variables: {
        request,
        options: nonce ? { overrideSigNonce: nonce } : undefined,
      },
    });

    return data.result;
  }

  private async initiateProfileUpdate(
    request: CreatePublicSetProfileMetadataUriRequest,
  ): AsyncRelayReceipt {
    const { data } = await this.apolloClient.mutate<
      CreateSetProfileMetadataViaDispatcherData,
      CreateSetProfileMetadataViaDispatcherVariables
    >({
      mutation: CreateSetProfileMetadataViaDispatcherDocument,
      variables: { request },
    });

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
    const metadataURI = await this.uploader.upload(createProfileMetadata(existingProfile, request));

    return {
      profileId: request.profileId,
      metadata: metadataURI,
    };
  }

  private async retrieveProfileDetails(profileId: ProfileId): Promise<Profile> {
    const { data } = await this.apolloClient.query<GetProfileData, GetProfileVariables>({
      fetchPolicy: 'cache-first',
      query: GetProfileDocument,
      variables: {
        // 'sources' and 'observerId' is not need as profile metadata is independent from observer profile and sources
        request: { profileId },
      },
    });

    return data.result ?? never(`Cannot update profile "${profileId}: profile not found`);
  }
}
