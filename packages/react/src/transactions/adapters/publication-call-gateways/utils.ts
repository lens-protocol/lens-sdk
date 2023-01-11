import {
  CollectModuleParams,
  PublicationMainFocus,
  PublicationMetadataDisplayTypes,
  PublicationMetadataMediaInput,
  PublicationMetadataV2Input,
  ReferenceModuleParams,
} from '@lens-protocol/api-bindings';
import {
  ChargeCollectPolicy,
  CollectPolicyType,
  CreatePostRequest,
  CreateCommentRequest,
  CreateMirrorRequest,
  Media,
  NftAttribute,
  ReferencePolicy,
} from '@lens-protocol/domain/use-cases/publications';
import { v4 } from 'uuid';

export function mapMetaAttributes(attributes: NftAttribute[]) {
  return attributes.map(({ displayType, value, ...rest }) => {
    return {
      ...rest,
      value: value.toString(),
      displayType: PublicationMetadataDisplayTypes[displayType],
    };
  });
}

export function mapMedia(media: Media): PublicationMetadataMediaInput {
  return {
    item: media.url,
    type: media.mimeType,
  };
}

export function createPublicationMetadata(
  request: CreatePostRequest | CreateCommentRequest,
): PublicationMetadataV2Input {
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

export function resolveCollectModuleFeeParams(collect: ChargeCollectPolicy) {
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

export function resolveChargeCollectModule(collect: ChargeCollectPolicy): CollectModuleParams {
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

export function resolveCollectModule(
  request: CreatePostRequest | CreateCommentRequest,
): CollectModuleParams {
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

export function resolveReferenceModule(
  request: CreatePostRequest | CreateCommentRequest | CreateMirrorRequest,
): ReferenceModuleParams | undefined {
  if (request.reference === ReferencePolicy.FOLLOWERS_ONLY) {
    return {
      followerOnlyReferenceModule: true,
    };
  }
  return undefined;
}
