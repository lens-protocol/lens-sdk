import { LegacyPublicationMetadataDecryptor } from '../encryption';
import * as gql from '../graphql/__helpers__/mocks';
import { webCryptoProvider } from '../web';

describe(`Given the encryption helpers`, () => {
  describe(`when using an instance of the ${LegacyPublicationMetadataDecryptor.name}`, () => {
    const provider = webCryptoProvider();

    it('should be able to decrypt LegacyPublicationMetadata fragments', async () => {
      // setup
      const clearTextString = 'clear text string';
      const cipher = await provider.createCipher();
      const encryptedString = await cipher.encrypt(clearTextString);
      const decryptor = new LegacyPublicationMetadataDecryptor(cipher);

      const encryptedFragment = gql.mockEncryptedFragmentOfLegacyPublicationMetadata({
        marketplace: {
          __typename: 'MarketplaceMetadata',
          image: gql.mockImageSetFragment(),
          externalURL: 'https://example.com/external',
          animationUrl: 'https://example.com/animation.gif',
        },
        content: 'Any placeholder text as per v2 spec',
        media: [
          gql.mockLegacyAudioItemFragment(),
          gql.mockLegacyImageItemFragment({
            altTag: 'Any placeholder text as per v2 spec',
          }),
          gql.mockLegacyVideoItemFragment({
            altTag: 'Any placeholder text as per v2 spec',
          }),
        ],

        encryptedWith: gql.mockPublicationMetadataV2Encryption({
          encryptedFields: gql.mockPublicationMetadataV2EncryptedFields({
            content: encryptedString,
            image: encryptedString,
            animationUrl: encryptedString,
            externalUrl: encryptedString,
            media: [
              gql.mockEncryptedMedia({
                uri: encryptedString,
              }),
              gql.mockEncryptedMedia({
                altTag: encryptedString,
                uri: encryptedString,
              }),
              gql.mockEncryptedMedia({
                altTag: encryptedString,
                uri: encryptedString,
              }),
            ],
          }),
        }),
      });

      // exercise
      const decryptedFragment = await decryptor.decrypt(encryptedFragment);

      // verify
      expect(decryptedFragment).toMatchObject({
        content: clearTextString,
        marketplace: {
          __typename: 'MarketplaceMetadata',
          animationUrl: clearTextString,
          externalURL: clearTextString,
          image: {
            __typename: 'ImageSet',
            raw: {
              __typename: 'Image',
              uri: clearTextString,
            },
          },
        },
        media: [
          {
            __typename: 'LegacyAudioItem',
            audio: {
              __typename: 'AudioSet',
              raw: {
                __typename: 'Audio',
                uri: clearTextString,
              },
            },
          },
          {
            __typename: 'LegacyImageItem',
            altTag: clearTextString,
            image: {
              __typename: 'ImageSet',
              raw: {
                __typename: 'Image',
                uri: clearTextString,
              },
            },
          },
          {
            __typename: 'LegacyVideoItem',
            altTag: clearTextString,
            video: {
              __typename: 'VideoSet',
              raw: {
                __typename: 'Video',
                uri: clearTextString,
              },
            },
          },
        ],
      });
    });
  });
});
