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
  RelayErrorReasons,
} from '@lens-protocol/api-bindings';
import { NativeTransaction, Nonce, ProfileId } from '@lens-protocol/domain/entities';
import {
  IProfileDetailsCallGateway,
  UpdateProfileDetailsRequest,
} from '@lens-protocol/domain/use-cases/profile';
import {
  IUnsignedProtocolCallGateway,
  RelayError,
  RelayErrorReason,
  SupportedTransactionRequest,
} from '@lens-protocol/domain/use-cases/transactions';
import { ChainType, failure, never, PromiseResult, success } from '@lens-protocol/shared-kernel';
import { v4 } from 'uuid';

import { UnsignedLensProtocolCall } from '../../../wallet/adapters/ConcreteWallet';
import { IMetadataUploader } from '../IMetadataUploader';
import { ITransactionFactory } from '../ITransactionFactory';
import { RelayReceipt } from '../RelayReceipt';
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
  ): PromiseResult<NativeTransaction<T>, RelayError> {
    const result = await this.broadcast(
      await this.resolveCreateSetProfileMetadataUriRequest(request),
    );

    if (result.isFailure()) return failure(result.error);

    const receipt = result.value;

    const transaction = this.transactionFactory.createNativeTransaction({
      chainType: ChainType.POLYGON,
      id: v4(),
      request,
      indexingId: receipt.indexingId,
      txHash: receipt.txHash,
    });

    return success(transaction);
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

  private async broadcast(
    request: CreatePublicSetProfileMetadataUriRequest,
  ): PromiseResult<RelayReceipt, RelayError> {
    const { data } = await this.apolloClient.mutate<
      CreateSetProfileMetadataViaDispatcherData,
      CreateSetProfileMetadataViaDispatcherVariables
    >({
      mutation: CreateSetProfileMetadataViaDispatcherDocument,
      variables: { request },
    });

    if (data.result.__typename === 'RelayError') {
      if (data.result.reason === RelayErrorReasons.Rejected) {
        return failure(new RelayError(RelayErrorReason.REJECTED));
      }
      return failure(new RelayError(RelayErrorReason.UNSPECIFIED));
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
