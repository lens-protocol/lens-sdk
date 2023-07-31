/* eslint-disable no-console */
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
  MetadataAttribute,
} from '@lens-protocol/domain/use-cases/publications';
import { assertNever, Overwrite } from '@lens-protocol/shared-kernel';
import { v4 } from 'uuid';

type CreatePublicationRequest = CreatePostRequest | CreateCommentRequest;

type CollectablePublicationRequest = Overwrite<
  CreatePublicationRequest,
  { collect: CollectablePolicyConfig }
>;

function mapMetadataAttributes(attributes: MetadataAttribute[]) {
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

function metadataImage(request: CreatePublicationRequest) {
  if (!request.image) {
    return undefined;
  }
  return {
    image: request.image.url,
    imageMimeType: request.image.mimeType,
  } as const;
}

function optionalFields(request: CreatePublicationRequest) {
  return {
    attributes: mapMetadataAttributes(request.attributes ?? []),
    ...(request.appId && { appId: request.appId }),
    ...(request.contentWarning && {
      contentWarning: PublicationContentWarning[request.contentWarning],
    }),
    ...(request.tags && { tags: request.tags }),
    ...metadataImage(request),
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

function resolveNonCollectableMetadata() {
  return {
    name: 'none', // although "name" is not needed when a publication is not collectable, Publication Metadata V2 schema requires it ¯\_(ツ)_/¯
  } as const;
}

function resolveDeprecatedCollectableMetadata(request: CollectablePublicationRequest) {
  return {
    attributes: mapMetadataAttributes(request.collect.metadata.attributes ?? []),
    image: request.collect.metadata.image,
    imageMimeType: request.collect.metadata.imageMimeType,
  } as const;
}

function resolveCollectableMetadata(request: CollectablePublicationRequest) {
  if ('attributes' in request.collect.metadata && 'attributes' in request) {
    console.warn(
      'Both "attributes" and "collect.metadata.attributes" are provided. Using "collect.metadata.attributes"',
    );
  }
  if ('image' in request.collect.metadata && 'image' in request) {
    console.warn(
      'Both "image" and "collect.metadata.image" are provided. Using "collect.metadata.image"',
    );
  }

  if ('imageMimeType' in request.collect.metadata && 'image' in request) {
    console.warn(
      'Both "image" and "collect.metadata.imageMimeType" are provided. Using "collect.metadata.image"',
    );
  }

  return {
    description: request.collect.metadata.description,
    name: request.collect.metadata.name,

    ...resolveDeprecatedCollectableMetadata(request),

    ...(request.collect.metadata.externalUrl && {
      external_url: request.collect.metadata.externalUrl,
    }),
  } as const;
}

function resolveCollectMetadata(request: CreatePublicationRequest) {
  switch (request.collect.type) {
    case CollectPolicyType.NO_COLLECT:
      return resolveNonCollectableMetadata();

    case CollectPolicyType.CHARGE:
    case CollectPolicyType.FREE:
      return resolveCollectableMetadata(request as CollectablePublicationRequest);

    default:
      assertNever(request.collect, `Unexpected collect policy type`);
  }
}

export function createPublicationMetadata(request: CreatePublicationRequest): PublicationMetadata {
  return {
    ...essentialFields(request),
    ...optionalFields(request),
    ...contentFields(request),
    ...resolveCollectMetadata(request),
  };
}
