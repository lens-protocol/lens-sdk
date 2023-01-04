import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import {
  CollectModuleParams,
  CreatePublicPostRequest as CreatePublicPostRequestArg,
  CreatePostTypedDataDocument,
  CreatePostTypedDataMutation,
  CreatePostTypedDataMutationVariables,
  CreatePostViaDispatcherDocument,
  CreatePostViaDispatcherMutation,
  CreatePostViaDispatcherMutationVariables,
  omitTypename,
  PublicationMainFocus,
  PublicationMetadataDisplayTypes,
  PublicationMetadataMediaInput,
  PublicationMetadataV2Input,
  ReferenceModuleParams,
} from '@lens-protocol/api-bindings';
import {
  NativeTransaction,
  Nonce,
  TransactionError,
  TransactionErrorReason,
} from '@lens-protocol/domain/entities';
import {
  ChargeCollectPolicy,
  CollectPolicyType,
  CreatePostRequest,
  ICreatePostCallGateway,
  Media,
  NftAttribute,
  ReferencePolicy,
} from '@lens-protocol/domain/use-cases/publications';
import { SupportedTransactionRequest } from '@lens-protocol/domain/use-cases/transactions';
import {
  assertError,
  CausedError,
  ChainType,
  failure,
  invariant,
  success,
} from '@lens-protocol/shared-kernel';
import { v4 } from 'uuid';

import { UnsignedLensProtocolCall } from '../../wallet/adapters/ConcreteWallet';
import { AsyncRelayReceipt, ITransactionFactory } from './ITransactionFactory';
import { UploadHandler } from './UploadHandler';

export class FailedUploadError extends CausedError {
  name = 'FailedUploadError' as const;
}

function mapMetaAttributes(attributes: NftAttribute[]) {
  return attributes.map(({ displayType, value, ...rest }) => {
    return {
      ...rest,
      value: value.toString(),
      displayType: PublicationMetadataDisplayTypes[displayType],
    };
  });
}

function mapMedia(media: Media): PublicationMetadataMediaInput {
  return {
    item: media.url,
    type: media.mimeType,
  };
}

function createPublicationMetadata(request: CreatePostRequest): PublicationMetadataV2Input {
  const sharedMetadata = {
    version: '2.0.0',
    metadata_id: v4(),

    content: request.content,
    media: request.media?.map(mapMedia),
    locale: request.locale,
    mainContentFocus: PublicationMainFocus[request.contentFocus],
  };

  switch (request.collect.type) {
    case CollectPolicyType.CHARGE:
    case CollectPolicyType.FREE:
      return {
        ...sharedMetadata,

        attributes: mapMetaAttributes(request.collect.metadata.attributes),
        description: request.collect.metadata.description,
        name: request.collect.metadata.name,
      };

    case CollectPolicyType.NO_COLLECT:
      return {
        ...sharedMetadata,

        name: 'none', // although "name" is not needed when a publication is not collectable, out Publication Metadata V2 schema requires it ¯\_(ツ)_/¯
        attributes: [],
      };
  }
}

function resolveCollectModuleFeeParams(collect: ChargeCollectPolicy) {
  return {
    amount: {
      currency: collect.fee.asset.address,
      value: collect.fee.toSignificantDigits(),
    },
    followerOnly: collect.followersOnly,
    recipient: collect.recipient,
    referralFee: collect.mirrorReward,
  };
}

function resolveChargeCollectModule(collect: ChargeCollectPolicy): CollectModuleParams {
  if (collect.collectLimit && collect.timeLimited) {
    return {
      limitedTimedFeeCollectModule: {
        ...resolveCollectModuleFeeParams(collect),
        collectLimit: collect.collectLimit.toString(),
      },
    };
  }
  if (collect.collectLimit) {
    return {
      limitedFeeCollectModule: {
        ...resolveCollectModuleFeeParams(collect),
        collectLimit: collect.collectLimit.toString(),
      },
    };
  }
  if (collect.timeLimited) {
    return {
      timedFeeCollectModule: resolveCollectModuleFeeParams(collect),
    };
  }
  return {
    feeCollectModule: resolveCollectModuleFeeParams(collect),
  };
}

function resolveCollectModule(request: CreatePostRequest): CollectModuleParams {
  switch (request.collect.type) {
    case CollectPolicyType.FREE:
      return {
        freeCollectModule: {
          followerOnly: request.collect.followersOnly,
        },
      };

    case CollectPolicyType.NO_COLLECT:
      return {
        revertCollectModule: true,
      };

    case CollectPolicyType.CHARGE:
      return resolveChargeCollectModule(request.collect);
  }
}

function resolveReferenceModule(request: CreatePostRequest): ReferenceModuleParams | undefined {
  if (request.reference === ReferencePolicy.FOLLOWERS_ONLY) {
    return {
      followerOnlyReferenceModule: true,
    };
  }
  return undefined;
}

export class PublicationCallGateway implements ICreatePostCallGateway {
  constructor(
    private readonly apolloClient: ApolloClient<NormalizedCacheObject>,
    private readonly transactionFactory: ITransactionFactory<SupportedTransactionRequest>,
    private readonly upload: UploadHandler,
  ) {}

  async createDelegatedTransaction<T extends CreatePostRequest>(
    request: T,
  ): Promise<NativeTransaction<T>> {
    return this.transactionFactory.createNativeTransaction({
      chainType: ChainType.POLYGON,
      id: v4(),
      request,
      asyncRelayReceipt: this.initiatePostCreation(
        request,
        await this.uploadPublicationMetadata(request),
      ),
    });
  }

  async createUnsignedProtocolCall<T extends CreatePostRequest>(
    request: T,
    nonce?: Nonce,
  ): Promise<UnsignedLensProtocolCall<T>> {
    return this.createPostCall(request, nonce);
  }

  private async initiatePostCreation(
    request: CreatePostRequest,
    contentURI: string,
  ): AsyncRelayReceipt {
    const { data } = await this.apolloClient.mutate<
      CreatePostViaDispatcherMutation,
      CreatePostViaDispatcherMutationVariables
    >({
      mutation: CreatePostViaDispatcherDocument,
      variables: {
        request: this.resolveCreatePostRequestArg(request, contentURI),
      },
    });

    invariant(data, 'Cannot create post via dispatcher');

    if (data.result.__typename === 'RelayError') {
      return failure(new TransactionError(TransactionErrorReason.REJECTED));
    }

    return success({
      indexingId: data.result.txId,
      txHash: data.result.txHash,
    });
  }

  private async createPostCall<T extends CreatePostRequest>(
    request: T,
    nonce?: Nonce,
  ): Promise<UnsignedLensProtocolCall<T>> {
    const { data } = await this.apolloClient.mutate<
      CreatePostTypedDataMutation,
      CreatePostTypedDataMutationVariables
    >({
      mutation: CreatePostTypedDataDocument,
      variables: {
        request: this.resolveCreatePostRequestArg(
          request,
          await this.uploadPublicationMetadata(request),
        ),
        options: nonce ? { overrideSigNonce: nonce } : undefined,
      },
    });

    invariant(data, 'Cannot generate typed data for post creation');

    return new UnsignedLensProtocolCall(
      data.result.id,
      request,
      omitTypename(data.result.typedData),
    );
  }

  private resolveCreatePostRequestArg(
    request: CreatePostRequest,
    contentURI: string,
  ): CreatePublicPostRequestArg {
    return {
      profileId: request.profileId,
      contentURI,
      collectModule: resolveCollectModule(request),
      referenceModule: resolveReferenceModule(request),
    };
  }

  private async uploadPublicationMetadata(request: CreatePostRequest): Promise<string> {
    try {
      return await this.upload(createPublicationMetadata(request));
    } catch (err: unknown) {
      assertError(err);
      throw new FailedUploadError('Cannot upload Publication Metadata', { cause: err });
    }
  }
}
