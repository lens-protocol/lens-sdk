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
import { lensPeriphery } from '@lens-protocol/blockchain-bindings';
import { NativeTransaction, Nonce, ProfileId } from '@lens-protocol/domain/entities';
import {
  IProfileDetailsCallGateway,
  UpdateProfileDetailsRequest,
} from '@lens-protocol/domain/use-cases/profile';
import {
  IUnsignedProtocolCallGateway,
  BroadcastingError,
  BroadcastingErrorReason,
  SupportedTransactionRequest,
  RequestFallback,
  Data,
} from '@lens-protocol/domain/use-cases/transactions';
import { ChainType, failure, never, PromiseResult, success } from '@lens-protocol/shared-kernel';
import { v4 } from 'uuid';

import { UnsignedProtocolCall } from '../../../wallet/adapters/ConcreteWallet';
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
  ): PromiseResult<NativeTransaction<T>, BroadcastingError> {
    const requestArg = await this.resolveCreateSetProfileMetadataUriRequest(request);
    const result = await this.broadcast(requestArg);

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
  ): Promise<UnsignedProtocolCall<T>> {
    const requestArg = await this.resolveCreateSetProfileMetadataUriRequest(request);

    const data = await this.createTypedData(requestArg, nonce);

    return UnsignedProtocolCall.create({
      id: data.result.id,
      request,
      typedData: omitTypename(data.result.typedData),
      fallback: this.createRequestFallback(data),
    });
  }

  private async broadcast(
    requestArg: CreatePublicSetProfileMetadataUriRequest,
  ): PromiseResult<RelayReceipt, BroadcastingError> {
    const { data } = await this.apolloClient.mutate<
      CreateSetProfileMetadataViaDispatcherData,
      CreateSetProfileMetadataViaDispatcherVariables
    >({
      mutation: CreateSetProfileMetadataViaDispatcherDocument,
      variables: {
        request: requestArg,
      },
    });

    if (data.result.__typename === 'RelayError') {
      const typedData = await this.createTypedData(requestArg);
      const fallback = this.createRequestFallback(typedData);

      if (data.result.reason === RelayErrorReasons.Rejected) {
        return failure(new BroadcastingError(BroadcastingErrorReason.REJECTED, fallback));
      }
      return failure(new BroadcastingError(BroadcastingErrorReason.UNSPECIFIED, fallback));
    }

    return success({
      indexingId: data.result.txId,
      txHash: data.result.txHash,
    });
  }

  private async createTypedData(
    request: CreatePublicSetProfileMetadataUriRequest,
    nonce?: Nonce,
  ): Promise<CreateSetProfileMetadataTypedDataData> {
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

    return data;
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

  private createRequestFallback(data: CreateSetProfileMetadataTypedDataData): RequestFallback {
    const contract = lensPeriphery(data.result.typedData.domain.verifyingContract);
    const encodedData = contract.interface.encodeFunctionData('setProfileMetadataURI', [
      data.result.typedData.value.profileId,
      data.result.typedData.value.metadata,
    ]);
    return {
      contractAddress: data.result.typedData.domain.verifyingContract,
      encodedData: encodedData as Data,
    };
  }
}
