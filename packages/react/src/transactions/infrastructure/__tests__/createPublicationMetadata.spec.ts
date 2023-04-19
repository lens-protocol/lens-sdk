import { faker } from '@faker-js/faker';
import { PublicationMainFocus, PublicationMetadataDisplayTypes } from '@lens-protocol/api-bindings';
import {
  mockChargeCollectPolicy,
  mockCreateCommentRequest,
  mockCreatePostRequest,
  mockDateNftAttribute,
  mockFreeCollectPolicy,
  mockMediaObject,
  mockNftMetadata,
  mockNoCollectPolicy,
  mockNumberNftAttribute,
  mockStringNftAttribute,
} from '@lens-protocol/domain/mocks';
import { CollectPolicyType, ContentFocus } from '@lens-protocol/domain/use-cases/publications';

import { appId } from '../../../utils';
import { createPublicationMetadata } from '../createPublicationMetadata';

const content = faker.lorem.sentence();
const media = [
  mockMediaObject({
    altTag: 'media',
    cover: faker.image.imageUrl(),
  }),
];
const dateNftAttribute = mockDateNftAttribute();
const numberNftAttribute = mockNumberNftAttribute();
const stringNftAttribute = mockStringNftAttribute();
const nftMetadata = mockNftMetadata({
  attributes: [dateNftAttribute, numberNftAttribute, stringNftAttribute],
  description: faker.lorem.sentence(),
});
const contentFocus = ContentFocus.TEXT;

describe(`Given the ${createPublicationMetadata.name} helper`, () => {
  describe('when creating PublicationMetadata', () => {
    describe.each([
      { request: 'CreatePostRequest', mockPublication: mockCreatePostRequest },
      { request: 'CreateCommentRequest', mockPublication: mockCreateCommentRequest },
    ])('for a $request', ({ mockPublication }) => {
      describe.each([
        mockFreeCollectPolicy({ metadata: nftMetadata }),
        mockChargeCollectPolicy({ metadata: nftMetadata }),
      ])('with $type collect policy', (collectPolicyConfig) => {
        it('should return the expected metadata for collectable publications', () => {
          const request = mockPublication({
            appId: appId(faker.word.noun()),
            content,
            media,
            locale: 'en',
            contentFocus: ContentFocus.TEXT,
            collect: collectPolicyConfig,
          });

          const metadata = createPublicationMetadata(request);

          expect(metadata).toMatchObject({
            metadata_id: expect.any(String),
            version: '2.0.0',
            appId: expect.any(String),
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
            name: collectPolicyConfig.metadata.name,
            content: content,
            description: collectPolicyConfig.metadata.description,
            media: request.media?.map((m) => ({
              type: m.mimeType,
              item: m.url,
              altTag: m.altTag,
              cover: m.cover,
            })),
            locale: request.locale,
            mainContentFocus: PublicationMainFocus[contentFocus],
          });
        });
      });

      describe(`with ${CollectPolicyType.NO_COLLECT} collect policy`, () => {
        it(`should return the expected basic metadata for non-collectable publications`, () => {
          const request = mockPublication({
            content,
            media,
            locale: 'en',
            contentFocus: ContentFocus.TEXT,
            collect: mockNoCollectPolicy(),
          });

          const metadata = createPublicationMetadata(request);

          expect(metadata).toMatchObject({
            metadata_id: expect.any(String),
            version: '2.0.0',
            attributes: [],
            name: 'none', // although "name" is not needed when a publication is not collectable, our Publication Metadata V2 schema requires it ¯\_(ツ)_/¯
            content: content,
            media: request.media?.map((m) => ({
              type: m.mimeType,
              item: m.url,
              altTag: m.altTag,
              cover: m.cover,
            })),
            locale: request.locale,
            mainContentFocus: PublicationMainFocus[contentFocus],
          });
        });
      });

      describe(`without appId`, () => {
        it(`should return the metadata without appId field`, () => {
          const request = mockPublication({
            content,
            media,
            locale: 'en',
            contentFocus: ContentFocus.TEXT,
            collect: mockNoCollectPolicy(),
          });

          const metadata = createPublicationMetadata(request);

          expect(metadata).not.toHaveProperty('appId');
        });
      });

      describe(`with media`, () => {
        it(`should return the metadata.media with only defined fields`, () => {
          const request = mockPublication({
            content,
            media: [mockMediaObject()],
            locale: 'en',
            contentFocus: ContentFocus.TEXT,
            collect: mockNoCollectPolicy(),
          });

          const metadata = createPublicationMetadata(request);

          expect(metadata.media?.[0]).not.toHaveProperty('altTag');
          expect(metadata.media?.[0]).not.toHaveProperty('cover');
        });
      });
    });
  });
});
