import * as gql from '@lens-protocol/api-bindings';
import * as metadata from '@lens-protocol/metadata';
import { URI, never } from '@lens-protocol/shared-kernel';

import { appId, publicationId } from '../../utils';

function metadataCommon(lens: metadata.PublicationMetadata['lens']) {
  return {
    appId: lens.appId ?? null,
    attributes: lens.attributes?.map(metadataAttribute) ?? null,
    contentWarning: null,
    encryptedWith: null,
    hideFromFeed: false,
    id: lens.id,
    locale: lens.locale,
    marketplace: null,
    rawURI: '' as URI,
    tags: null,
  };
}

function encryptableImageSet(uri: string): gql.EncryptableImageSet {
  return {
    __typename: 'EncryptableImageSet',
    raw: {
      __typename: 'EncryptableImage',
      uri,
      height: null,
      mimeType: null,
      width: null,
    },
    optimized: null,
    small: null,
    medium: null,
  };
}

function publicationMetadataMediaImage(
  image: metadata.MediaImage,
): gql.PublicationMetadataMediaImage {
  return {
    __typename: 'PublicationMetadataMediaImage',
    image: encryptableImageSet(image.item),
    altTag: image.altTag ?? null,
    attributes: image.attributes?.map(metadataAttribute) ?? null,
    license: image.license ? publicationMetadataLicenseType(image.license) : null,
  };
}

function metadataAttribute(attribute: metadata.MetadataAttribute): {
  type: gql.MetadataAttributeType;
  key: string;
  value: string;
} {
  return {
    type: attribute.type as unknown as gql.MetadataAttributeType,
    key: attribute.key,
    value: attribute.value,
  };
}

function publicationMetadataMediaVideo(
  video: metadata.MediaVideo,
): gql.PublicationMetadataMediaVideo {
  return {
    __typename: 'PublicationMetadataMediaVideo',
    video: {
      __typename: 'EncryptableVideoSet',
      optimized: null,
      raw: {
        __typename: 'EncryptableVideo',
        mimeType: null,
        uri: video.item,
      },
    },
    altTag: video.altTag ?? null,
    attributes: video.attributes?.map(metadataAttribute) ?? null,
    cover: video.cover ? encryptableImageSet(video.cover) : null,
    duration: video.duration ?? null,
    license: video.license ? publicationMetadataLicenseType(video.license) : null,
  };
}

function publicationMetadataMediaAudio(
  audio: metadata.MediaAudio,
): gql.PublicationMetadataMediaAudio {
  return {
    __typename: 'PublicationMetadataMediaAudio',
    audio: {
      __typename: 'EncryptableAudioSet',
      raw: {
        __typename: 'EncryptableAudio',
        mimeType: null,
        uri: audio.item,
      },
      optimized: null,
    },
    attributes: audio.attributes?.map(metadataAttribute) ?? null,
    license: audio.license ? publicationMetadataLicenseType(audio.license) : null,
    artist: audio.artist ?? null,
    cover: audio.cover ? encryptableImageSet(audio.cover) : null,
    credits: audio.credits ?? null,
    duration: audio.duration ?? null,
    genre: audio.genre ?? null,
    lyrics: audio.lyrics ?? null,
    recordLabel: audio.recordLabel ?? null,
  };
}

function publicationMetadataMedia(
  media: metadata.AnyMedia,
):
  | gql.PublicationMetadataMediaAudio
  | gql.PublicationMetadataMediaImage
  | gql.PublicationMetadataMediaVideo {
  switch (true) {
    case media.type in metadata.MediaAudioMimeType:
      return publicationMetadataMediaAudio(media as metadata.MediaAudio);

    case media.type in metadata.MediaImageMimeType:
      return publicationMetadataMediaImage(media as metadata.MediaImage);

    case media.type in metadata.MediaVideoMimeType:
      return publicationMetadataMediaVideo(media as metadata.MediaVideo);
  }
  never(media.type);
}

function publicationMetadataTransactionType(
  type: metadata.MetadataTransactionType,
): gql.PublicationMetadataTransactionType {
  switch (type) {
    case metadata.MetadataTransactionType.ERC20:
      return gql.PublicationMetadataTransactionType.Erc20;

    case metadata.MetadataTransactionType.ERC721:
      return gql.PublicationMetadataTransactionType.Erc721;

    case metadata.MetadataTransactionType.OTHER:
    default:
      return gql.PublicationMetadataTransactionType.Other;
  }
}

function publicationMetadataLicenseType(
  license: metadata.MetadataLicenseType,
): gql.PublicationMetadataLicenseType | null {
  if (license in metadata.MetadataLicenseType) {
    return license as unknown as gql.PublicationMetadataLicenseType;
  }
  return null;
}

function publicationMetadata({
  $schema,
  lens,
}: metadata.PublicationMetadata): gql.Post['metadata'] {
  switch ($schema) {
    case metadata.PublicationSchemaId.ARTICLE_LATEST:
      return {
        __typename: 'ArticleMetadataV3',
        title: lens.title ?? never(),
        content: lens.content,
        attachments: lens.attachments?.map(publicationMetadataMedia) ?? null,

        ...metadataCommon(lens),
      };
    case metadata.PublicationSchemaId.TEXT_ONLY_LATEST:
      return {
        __typename: 'TextOnlyMetadataV3',
        content: lens.content,
        ...metadataCommon(lens),
      };
    case metadata.PublicationSchemaId.IMAGE_LATEST:
      return {
        __typename: 'ImageMetadataV3',
        content: lens.content ?? '',
        asset: publicationMetadataMediaImage(lens.image),
        attachments: lens.attachments?.map(publicationMetadataMedia) ?? null,
        title: lens.title ?? '',
        ...metadataCommon(lens),
      };
    case metadata.PublicationSchemaId.VIDEO_LATEST:
      return {
        __typename: 'VideoMetadataV3',
        content: lens.content ?? '',
        asset: publicationMetadataMediaVideo(lens.video),
        isShortVideo: lens.mainContentFocus === metadata.PublicationMainFocus.SHORT_VIDEO,
        attachments: lens.attachments?.map(publicationMetadataMedia) ?? null,
        title: lens.title ?? '',
        ...metadataCommon(lens),
      };
    case metadata.PublicationSchemaId.AUDIO_LATEST:
      return {
        __typename: 'AudioMetadataV3',
        content: lens.content ?? '',
        asset: publicationMetadataMediaAudio(lens.audio),
        title: lens.title ?? '',
        attachments: lens.attachments?.map(publicationMetadataMedia) ?? null,
        ...metadataCommon(lens),
      };
    case metadata.PublicationSchemaId.TRANSACTION_LATEST:
      return {
        __typename: 'TransactionMetadataV3',
        content: lens.content ?? '',
        chainId: lens.chainId,
        txHash: lens.txHash,
        type: publicationMetadataTransactionType(lens.type),
        attachments: lens.attachments?.map(publicationMetadataMedia) ?? null,
        ...metadataCommon(lens),
      };
    case metadata.PublicationSchemaId.EMBED_LATEST:
      return {
        __typename: 'EmbedMetadataV3',
        content: lens.content ?? '',
        embed: lens.embed,
        attachments: lens.attachments?.map(publicationMetadataMedia) ?? null,
        ...metadataCommon(lens),
      };
    case metadata.PublicationSchemaId.LINK_LATEST:
      return {
        __typename: 'LinkMetadataV3',
        content: lens.content ?? '',
        sharingLink: lens.sharingLink,
        attachments: lens.attachments?.map(publicationMetadataMedia) ?? null,
        ...metadataCommon(lens),
      };
    case metadata.PublicationSchemaId.MINT_LATEST:
      return {
        __typename: 'MintMetadataV3',
        content: lens.content ?? '',
        mintLink: lens.mintLink,
        attachments: lens.attachments?.map(publicationMetadataMedia) ?? null,
        ...metadataCommon(lens),
      };

    case metadata.PublicationSchemaId.SPACE_LATEST:
      return {
        __typename: 'SpaceMetadataV3',
        content: lens.content ?? '',
        link: lens.link,
        startsAt: lens.startsAt,
        title: lens.title,
        attachments: lens.attachments?.map(publicationMetadataMedia) ?? null,
        ...metadataCommon(lens),
      };
    case metadata.PublicationSchemaId.LIVESTREAM_LATEST:
      return {
        __typename: 'LiveStreamMetadataV3',
        content: lens.content ?? '',
        liveURL: lens.liveUrl,
        playbackURL: lens.playbackUrl,
        checkLiveAPI: lens.checkLiveAPI ?? null,
        startsAt: lens.startsAt,
        attachments: lens.attachments?.map(publicationMetadataMedia) ?? null,
        title: lens.title ?? '',
        endsAt: lens.endsAt ?? '',
        ...metadataCommon(lens),
      };
    case metadata.PublicationSchemaId.THREE_D_LATEST:
      return {
        __typename: 'ThreeDMetadataV3',
        content: lens.content ?? '',
        assets: lens.assets.map((asset) => ({
          __typename: 'ThreeDMetadataV3Asset',
          uri: asset.uri,
          zipPath: asset.zipPath ?? null,
          playerURL: asset.playerUrl,
          format: asset.format,
          license: asset.license ? publicationMetadataLicenseType(asset.license) : null,
        })),
        attachments: lens.attachments?.map(publicationMetadataMedia) ?? null,
        ...metadataCommon(lens),
      };
    case metadata.PublicationSchemaId.CHECKING_IN_LATEST:
      return {
        __typename: 'CheckingInMetadataV3',
        content: lens.content ?? '',
        location: lens.location,
        geographic: null,
        attachments: lens.attachments?.map(publicationMetadataMedia) ?? null,
        ...metadataCommon(lens),
      };
    case metadata.PublicationSchemaId.EVENT_LATEST:
      return {
        __typename: 'EventMetadataV3',
        links: lens.links ?? null,
        location: lens.location,
        geographic: null,
        startsAt: lens.startsAt,
        endsAt: lens.endsAt,
        attachments: lens.attachments?.map(publicationMetadataMedia) ?? null,
        ...metadataCommon(lens),
      };
    case metadata.PublicationSchemaId.STORY_LATEST:
      return {
        __typename: 'StoryMetadataV3',
        asset: publicationMetadataMedia(lens.asset),
        content: lens.content ?? '',
        ...metadataCommon(lens),
      };
  }
}

export function post({
  by,
  with: meta,
}: {
  by: gql.Profile;
  with: metadata.PublicationMetadata;
}): gql.Post {
  const id = publicationId(meta.lens.id);

  return {
    __typename: 'Post',
    id,
    by,
    createdAt: new Date().toISOString(),
    metadata: publicationMetadata(meta),
    isEncrypted: meta.lens.encryptedWith !== null,
    hashtagsMentioned: [],
    profilesMentioned: [],
    isHidden: false,
    momoka: null,
    openActionModules: [],
    operations: {
      __typename: 'PublicationOperations',
      id,
      canCollect: gql.TriStateValue.No,
      canComment: gql.TriStateValue.No,
      canDecrypt: {
        __typename: 'CanDecryptResponse',
        result: true,
        reasons: null,
        extraDetails: null,
      },

      isNotInterested: false,
      hasBookmarked: false,
      hasReported: false,
      canMirror: gql.TriStateValue.No,
      canQuote: gql.TriStateValue.No,
      hasMirrored: false,
      hasQuoted: false,
      hasUpvoted: false,
      hasDownvoted: false,
      hasCollected: {
        __typename: 'OptimisticStatusResult',
        value: false,
        isFinalisedOnchain: true,
      },
    },
    publishedOn: meta.lens.appId
      ? {
          __typename: 'App',
          id: appId(meta.lens.appId),
        }
      : null,
    referenceModule: null,
    stats: {
      __typename: 'PublicationStats',
      id,
      bookmarks: 0,
      collects: 0,
      comments: 0,
      downvotes: 0,
      mirrors: 0,
      quotes: 0,
      upvotes: 0,
    },
    globalStats: {
      __typename: 'PublicationStats',
      id,
      bookmarks: 0,
      collects: 0,
      comments: 0,
      downvotes: 0,
      mirrors: 0,
      quotes: 0,
      upvotes: 0,
    },
    txHash: null,
  };
}
