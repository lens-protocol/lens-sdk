import { faker } from '@faker-js/faker';
import {
  PublicationMainFocus,
  PublicationMetadata,
  PublicationMetadataDisplayTypes,
  PublicationContentWarning,
} from '@lens-protocol/api-bindings';
import {
  mockChargeCollectPolicyConfig,
  mockCreateCommentRequest,
  mockCreatePostRequest,
  mockDateMetadataAttribute,
  mockFreeCollectPolicyConfig,
  mockMediaObject,
  mockMetadataImage,
  mockNftMetadata,
  mockNoCollectPolicyConfig,
  mockNumberMetadataAttribute,
  mockStringMetadataAttribute,
} from '@lens-protocol/domain/mocks';
import {
  CollectPolicyType,
  ContentFocus,
  ContentWarning,
  CreateCommentRequest,
  CreatePostRequest,
  ImageType,
  MediaObject,
} from '@lens-protocol/domain/use-cases/publications';

import { appId as toAppId } from '../../../utils';
import { createPublicationMetadata } from '../createPublicationMetadata';

const animationUrl = faker.image.imageUrl();
const content = faker.lorem.sentence();
const media = [
  mockMediaObject({
    altTag: 'media',
    cover: faker.image.imageUrl(),
  }),
];
const dateNftAttribute = mockDateMetadataAttribute();
const numberNftAttribute = mockNumberMetadataAttribute();
const stringNftAttribute = mockStringMetadataAttribute();
const image = mockMetadataImage();
const nftMetadata = mockNftMetadata({
  attributes: [dateNftAttribute, numberNftAttribute, stringNftAttribute],
  description: faker.lorem.sentence(),
  externalUrl: faker.internet.url(),
  image: faker.image.imageUrl(),
  imageMimeType: ImageType.JPEG,
});

function toPublicationMetadataMediaItem(media: MediaObject) {
  return {
    item: media.url,
    type: media.mimeType,
    ...(media.altTag && { altTag: media.altTag }),
    ...(media.cover && { cover: media.cover }),
  };
}

describe(`Given the ${createPublicationMetadata.name} helper`, () => {
  describe('when creating PublicationMetadata', () => {
    describe.each([
      { request: 'CreatePostRequest', mockPublication: mockCreatePostRequest },
      { request: 'CreateCommentRequest', mockPublication: mockCreateCommentRequest },
    ])('from a $request', ({ mockPublication }) => {
      it('should return PublicationMetadata with the expected mandatory fields', () => {
        const request = mockPublication({ locale: 'it-IT' });

        const result = createPublicationMetadata(request);

        expect(result).toMatchObject({
          locale: 'it-IT',
          metadata_id: expect.any(String),
          version: '2.0.0',
        });
      });

      it('should support optional content-agnostic fields', () => {
        const appId = toAppId(faker.word.noun());
        const contentWarning = ContentWarning.NSFW;
        const tags = [faker.lorem.word()];
        const request = mockPublication({
          appId,
          contentWarning,
          tags,
        });

        const result = createPublicationMetadata(request);

        expect(result).toMatchObject({
          appId,
          contentWarning: PublicationContentWarning[contentWarning],
          tags,
        });
      });

      it(`should support 'attributes' and 'image'`, () => {
        const request = mockPublication({
          attributes: [dateNftAttribute, numberNftAttribute, stringNftAttribute],
          image,
        });

        const metadata = createPublicationMetadata(request);

        expect(metadata).toMatchObject({
          attributes: [
            {
              displayType: PublicationMetadataDisplayTypes[dateNftAttribute.displayType],
              traitType: dateNftAttribute.traitType,
              value: dateNftAttribute.value.toString(),
            },
            {
              displayType: PublicationMetadataDisplayTypes[numberNftAttribute.displayType],
              traitType: numberNftAttribute.traitType,
              value: numberNftAttribute.value.toString(),
            },
            {
              displayType: PublicationMetadataDisplayTypes[stringNftAttribute.displayType],
              traitType: stringNftAttribute.traitType,
              value: stringNftAttribute.value.toString(),
            },
          ],
          image: image.url,
          imageMimeType: image.mimeType,
        });
      });

      describe.each<{
        description: string;
        request: CreatePostRequest | CreateCommentRequest;
        expected: Partial<PublicationMetadata>;
      }>([
        {
          description: 'for a text-only publication',
          request: mockPublication({
            content,
            contentFocus: ContentFocus.TEXT_ONLY,
          }),
          expected: {
            content,
            mainContentFocus: PublicationMainFocus.TextOnly,
          },
        },
        {
          description: 'for an article publication',
          request: mockPublication({
            content,
            contentFocus: ContentFocus.ARTICLE,
          }),
          expected: {
            content,
          },
        },
        {
          description: 'for an article publication with attachments',
          request: mockPublication({
            content,
            contentFocus: ContentFocus.ARTICLE,
            media,
          }),
          expected: {
            content,
            media: media.map(toPublicationMetadataMediaItem),
          },
        },
        {
          description: 'for a link publication',
          request: mockPublication({
            content,
            contentFocus: ContentFocus.LINK,
          }),
          expected: {
            content,
          },
        },
        {
          description: 'for an audio publication',
          request: mockPublication({
            content,
            contentFocus: ContentFocus.AUDIO,
            media,
          }),
          expected: {
            content,
            media: media.map(toPublicationMetadataMediaItem),
          },
        },
        {
          description: 'for an image publication',
          request: mockPublication({
            content,
            contentFocus: ContentFocus.IMAGE,
            media,
          }),
          expected: {
            content,
            media: media.map(toPublicationMetadataMediaItem),
          },
        },
        {
          description: 'for a video publication',
          request: mockPublication({
            content,
            contentFocus: ContentFocus.IMAGE,
            media,
          }),
          expected: {
            content,
            media: media.map(toPublicationMetadataMediaItem),
          },
        },
        {
          description: 'for an embed publication',
          request: mockPublication({
            content,
            contentFocus: ContentFocus.EMBED,
            media,
            animationUrl,
          }),
          expected: {
            content,
            media: media.map(toPublicationMetadataMediaItem),
            animation_url: animationUrl,
          },
        },
      ])('$description', ({ request, expected }) => {
        it('should return the expected metadata', () => {
          const metadata = createPublicationMetadata(request);

          expect(metadata).toMatchObject({
            ...expected,
            mainContentFocus: PublicationMainFocus[request.contentFocus],
          });
        });
      });

      describe.each([
        mockFreeCollectPolicyConfig({ metadata: nftMetadata }),
        mockChargeCollectPolicyConfig({ metadata: nftMetadata }),
      ])('with $type collect policy', (collectPolicyConfig) => {
        it('should return the expected metadata for collectable publications', () => {
          const request = mockPublication({
            collect: collectPolicyConfig,
          });

          const metadata = createPublicationMetadata(request);

          expect(metadata).toMatchObject({
            name: collectPolicyConfig.metadata.name,
            description: collectPolicyConfig.metadata.description,
            external_url: nftMetadata.externalUrl,
          });
        });

        it('should be backwards compatible with the deprecated `collect.metadata.attributes`, `collect.metadata.image`, and `collect.metadata.imageMimeType`', () => {
          const request = mockPublication({
            collect: collectPolicyConfig,
          });

          const metadata = createPublicationMetadata(request);

          expect(metadata).toMatchObject({
            attributes: [
              {
                displayType: PublicationMetadataDisplayTypes[dateNftAttribute.displayType],
                traitType: dateNftAttribute.traitType,
                value: dateNftAttribute.value.toString(),
              },
              {
                displayType: PublicationMetadataDisplayTypes[numberNftAttribute.displayType],
                traitType: numberNftAttribute.traitType,
                value: numberNftAttribute.value.toString(),
              },
              {
                displayType: PublicationMetadataDisplayTypes[stringNftAttribute.displayType],
                traitType: stringNftAttribute.traitType,
                value: stringNftAttribute.value.toString(),
              },
            ],
            image: nftMetadata.image,
            imageMimeType: nftMetadata.imageMimeType,
          });
        });
      });

      describe(`with ${CollectPolicyType.NO_COLLECT} collect policy`, () => {
        it(`should return the expected basic metadata for non-collectable publications`, () => {
          const request = mockPublication({
            collect: mockNoCollectPolicyConfig(),
          });

          const metadata = createPublicationMetadata(request);

          expect(metadata).toMatchObject({
            name: 'none', // although "name" is not needed when a publication is not collectable, our Publication Metadata V2 schema requires it ¯\_(ツ)_/¯
          });
        });
      });
    });
  });
});
