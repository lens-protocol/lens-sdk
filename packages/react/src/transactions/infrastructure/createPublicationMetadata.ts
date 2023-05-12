import {
  PublicationMetadata,
  PublicationMainFocus,
  PublicationMetadataDisplayTypes,
  PublicationMetadataMediaInput,
  PublicationContentWarning,
} from '@lens-protocol/api-bindings';
import {
  CollectablePolicyConfig,
  CollectPolicyType,
  ContentFocus,
  CreateCommentRequest,
  CreatePostRequest,
  MediaObject,
  NftAttribute,
  NoCollectPolicyConfig,
} from '@lens-protocol/domain/use-cases/publications';
import { assertNever, Overwrite } from '@lens-protocol/shared-kernel';
import { v4 } from 'uuid';

type CreatePublicationRequest = CreatePostRequest | CreateCommentRequest;

type CollectablePublicationRequest = Overwrite<
  CreatePublicationRequest,
  { collect: CollectablePolicyConfig }
>;

type NonCollectablePublicationRequest = Overwrite<
  CreatePublicationRequest,
  { collect: NoCollectPolicyConfig }
>;

function mapMetaAttributes(attributes: NftAttribute[]) {
  return attributes.map(({ displayType, value, ...rest }) => {
    return {
      ...rest,
      value: value.toString(),
      displayType: PublicationMetadataDisplayTypes[displayType],
    };
  });
}

function mapMedia(media: MediaObject): PublicationMetadataMediaInput {
  return {
    item: media.url,
    type: media.mimeType,
    ...(media.altTag && { altTag: media.altTag }),
    ...(media.cover && { cover: media.cover }),
  };
}

function essentialFields(request: CreatePublicationRequest) {
  return {
    metadata_id: v4(),
    version: '2.0.0',
    locale: request.locale,
    mainContentFocus: PublicationMainFocus[request.contentFocus],
  } as const;
}

function optionalFields(request: CreatePublicationRequest) {
  return {
    ...(request.appId && { appId: request.appId }),
    ...(request.contentWarning && {
      contentWarning: PublicationContentWarning[request.contentWarning],
    }),
    ...(request.tags && { tags: request.tags }),
  } as const;
}

function contentFields(request: CreatePublicationRequest) {
  switch (request.contentFocus) {
    case ContentFocus.VIDEO:
    case ContentFocus.IMAGE:
    case ContentFocus.AUDIO:
    case ContentFocus.LINK:
    case ContentFocus.ARTICLE:
      return {
        content: request.content,
        media: request.media?.map(mapMedia),
      } as const;

    case ContentFocus.TEXT_ONLY:
      return {
        content: request.content,
      } as const;

    case ContentFocus.EMBED:
      return {
        animation_url: request.animationUrl,
        content: request.content,
        media: request.media?.map(mapMedia),
      } as const;
  }
}

function resolveNonCollectableMetadata(
  request: NonCollectablePublicationRequest,
): PublicationMetadata {
  return {
    ...essentialFields(request),
    ...optionalFields(request),
    ...contentFields(request),
    name: 'none', // although "name" is not needed when a publication is not collectable, Publication Metadata V2 schema requires it ¯\_(ツ)_/¯
    attributes: [],
  };
}

function resolveCollectableMetadata(request: CollectablePublicationRequest): PublicationMetadata {
  return {
    ...essentialFields(request),
    ...optionalFields(request),
    ...contentFields(request),
    attributes: mapMetaAttributes(request.collect.metadata.attributes),
    description: request.collect.metadata.description,
    name: request.collect.metadata.name,
    ...(request.collect.metadata.externalUrl && {
      external_url: request.collect.metadata.externalUrl,
    }),
    ...(request.collect.metadata.image && { image: request.collect.metadata.image }),
    ...(request.collect.metadata.imageMimeType && {
      imageMimeType: request.collect.metadata.imageMimeType,
    }),
  };
}

export function createPublicationMetadata(
  request: CreatePostRequest | CreateCommentRequest,
): PublicationMetadata {
  switch (request.collect.type) {
    case CollectPolicyType.NO_COLLECT:
      return resolveNonCollectableMetadata(request as NonCollectablePublicationRequest);

    case CollectPolicyType.CHARGE:
    case CollectPolicyType.FREE:
      return resolveCollectableMetadata(request as CollectablePublicationRequest);

    default:
      assertNever(request.collect, `Unexpected collect policy type`);
  }
}
