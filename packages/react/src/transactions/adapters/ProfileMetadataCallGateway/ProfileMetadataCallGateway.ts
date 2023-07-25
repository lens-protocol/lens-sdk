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
  SafeApolloClient,
  ProfileMetadata,
} from '@lens-protocol/api-bindings';
import { lensPeriphery } from '@lens-protocol/blockchain-bindings';
import { NativeTransaction, Nonce, ProfileId } from '@lens-protocol/domain/entities';
import { UpdateProfileDetailsRequest } from '@lens-protocol/domain/use-cases/profile';
import {
  IOnChainProtocolCallGateway,
  BroadcastingError,
  IDelegatedTransactionGateway,
} from '@lens-protocol/domain/use-cases/transactions';
import { ChainType, failure, never, PromiseResult, success } from '@lens-protocol/shared-kernel';
import { v4 } from 'uuid';

import {
  MediaTransformsConfig,
  mediaTransformConfigToQueryVariables,
} from '../../../mediaTransforms';
import { UnsignedProtocolCall } from '../../../wallet/adapters/ConcreteWallet';
import { IMetadataUploader } from '../IMetadataUploader';
import { ITransactionFactory } from '../ITransactionFactory';
import {
  Data,
  SelfFundedProtocolTransactionRequest,
} from '../SelfFundedProtocolTransactionRequest';
import { handleRelayError, OnChainBroadcastReceipt } from '../relayer';
import { createProfileMetadata } from './createProfileMetadata';

export class ProfileMetadataCallGateway
  implements
    IDelegatedTransactionGateway<UpdateProfileDetailsRequest>,
    IOnChainProtocolCallGateway<UpdateProfileDetailsRequest>
{
  constructor(
    private readonly apolloClient: SafeApolloClient,
    private readonly transactionFactory: ITransactionFactory<UpdateProfileDetailsRequest>,
    private readonly uploader: IMetadataUploader<ProfileMetadata>,
    private readonly mediaTransforms: MediaTransformsConfig,
  ) {}

  async createDelegatedTransaction(
    request: UpdateProfileDetailsRequest,
  ): PromiseResult<NativeTransaction<UpdateProfileDetailsRequest>, BroadcastingError> {
    const result = await this.broadcast(request);

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

  async createUnsignedProtocolCall(
    request: UpdateProfileDetailsRequest,
    nonce?: Nonce,
  ): Promise<UnsignedProtocolCall<UpdateProfileDetailsRequest>> {
    const requestArg = await this.resolveCreateSetProfileMetadataUriRequest(request);

    const data = await this.createTypedData(requestArg, nonce);

    return UnsignedProtocolCall.create({
      id: data.result.id,
      request,
      typedData: omitTypename(data.result.typedData),
      fallback: this.createRequestFallback(request, data),
    });
  }

  private async broadcast(
    request: UpdateProfileDetailsRequest,
  ): PromiseResult<OnChainBroadcastReceipt, BroadcastingError> {
    const requestArg = await this.resolveCreateSetProfileMetadataUriRequest(request);

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
      const fallback = this.createRequestFallback(request, typedData);

      return handleRelayError(data.result, fallback);
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
        ...mediaTransformConfigToQueryVariables(this.mediaTransforms),
      },
    });

    return data.result ?? never(`Cannot update profile "${profileId}: profile not found`);
  }

  private createRequestFallback(
    request: UpdateProfileDetailsRequest,
    data: CreateSetProfileMetadataTypedDataData,
  ): SelfFundedProtocolTransactionRequest<UpdateProfileDetailsRequest> {
    const contract = lensPeriphery(data.result.typedData.domain.verifyingContract);
    const encodedData = contract.interface.encodeFunctionData('setProfileMetadataURI', [
      data.result.typedData.message.profileId,
      data.result.typedData.message.metadata,
    ]);
    return {
      ...request,
      contractAddress: data.result.typedData.domain.verifyingContract,
      encodedData: encodedData as Data,
    };
  }
}
