import { Wallet } from '@ethersproject/wallet';
import { faker } from '@faker-js/faker';
import { CannotDecryptError, isEncryptedPublicationMetadata } from '@lens-protocol/gated-content';
import * as metadata from '@lens-protocol/metadata';
import { invariant } from '@lens-protocol/shared-kernel';

import {
  authenticate,
  collect,
  createOrGetProfile,
  enableLensProfileManager,
  postOnchainViaLensManager,
} from '../../__helpers__/setup';
import { PostFragment } from '../../graphql';
import { LensClient } from '../LensClient';
import { createGatedLensClient } from '../__helpers/setup';

jest.retryTimes(3, { logErrorsBeforeRetry: true });

const signer = new Wallet('0xd6e6257e8cf0f321ad0f798dd0b121a7eb4fe9c7c51994e843c0a1ed05867a5f');

const signerWithNoProfile = new Wallet(
  'dc377a505ab51735b73656ddfd5abc01fb9d26544b71d9188ecd74c70a22cb6d',
);

describe(`Given an instance of "gated.${LensClient.name}"`, () => {
  const initialPostMetadata = metadata.image({
    image: {
      item: faker.internet.url(),
      type: metadata.MediaImageMimeType.JPEG,
    },
    content: metadata.toMarkdown(faker.lorem.sentence()),
    hideFromFeed: true,
  });
  const publicationAuthorHandle = 'nandos2';

  describe('and a token-gated post', () => {
    let post: PostFragment;

    beforeAll(async () => {
      const client = createGatedLensClient(signer);
      const profile = await createOrGetProfile(signer, client, publicationAuthorHandle);

      await authenticate(signer, client, profile);

      await enableLensProfileManager(signer, client, profile);

      const condition = metadata.profileOwnershipCondition({
        profileId: profile.id,
      });

      const encrypted = await client.gated.encryptPublicationMetadata(
        initialPostMetadata,
        condition,
      );

      post = await postOnchainViaLensManager(signer, client, encrypted.unwrap());
    }, 60_000);

    describe('when decrypted by the publication author', () => {
      it('should return the decrypted metadata', async () => {
        const client = createGatedLensClient(signer);
        const profile = await createOrGetProfile(signer, client, publicationAuthorHandle);

        await authenticate(signer, client, profile);

        invariant(
          isEncryptedPublicationMetadata(post.metadata),
          'Metadata is not encrypted. This is likely an API issue.',
        );

        const decrypted = await client.gated.decryptPublicationMetadataFragment(post.metadata);

        expect(decrypted.unwrap()).toMatchObject({
          asset: {
            image: {
              raw: {
                uri: initialPostMetadata.lens.image.item,
              },
            },
          },
          content: initialPostMetadata.lens.content,
        });
      }, 60_000);
    });

    describe('when decrypted by just a wallet that meets the token-gated conditions', () => {
      it('should return the decrypted metadata', async () => {
        const authenticatedWithOnlyWalletClient = createGatedLensClient(signer);

        await authenticate(signer, authenticatedWithOnlyWalletClient);

        invariant(
          isEncryptedPublicationMetadata(post.metadata),
          'Metadata is not encrypted. This is likely an API issue.',
        );

        const decrypted =
          await authenticatedWithOnlyWalletClient.gated.decryptPublicationMetadataFragment(
            post.metadata,
          );

        expect(decrypted.unwrap()).toMatchObject({
          asset: {
            image: {
              raw: {
                uri: initialPostMetadata.lens.image.item,
              },
            },
          },
          content: initialPostMetadata.lens.content,
        });
      });
    });

    describe('when decrypted by just a wallet that does not meet the token-gated conditions', () => {
      it(`should throw a ${CannotDecryptError.name} error`, async () => {
        const authenticatedWithOnlyWalletClient = createGatedLensClient(signerWithNoProfile);

        await authenticate(signer, authenticatedWithOnlyWalletClient);

        invariant(
          isEncryptedPublicationMetadata(post.metadata),
          'Metadata is not encrypted. This is likely an API issue.',
        );

        const decryptedResult =
          await authenticatedWithOnlyWalletClient.gated.decryptPublicationMetadataFragment(
            post.metadata,
          );

        const isFailure = decryptedResult.isFailure();

        invariant(isFailure && decryptedResult.error, 'Expected decryption to fail with an error');

        expect(decryptedResult.error).toBeInstanceOf(CannotDecryptError);
      });
    });
  });

  describe('and a token-gated post with collect conditions', () => {
    // TODO complete once collect is fixed at the API level
    it.skip('should be decryptable via the collect condition', async () => {
      const client = createGatedLensClient(signer);
      const profile = await createOrGetProfile(signer, client, publicationAuthorHandle);

      const condition = metadata.collectCondition({
        publicationId: await client.publication.predictNextOnChainPublicationId({
          from: profile.id,
        }),
        thisPublication: true,
      });
      const encrypted = await client.gated.encryptPublicationMetadata(
        initialPostMetadata,
        condition,
      );

      const post = await postOnchainViaLensManager(signer, client, encrypted.unwrap());

      const collector = await createOrGetProfile(signer, client, 'bobthebuilder2');

      await authenticate(signer, client, collector);
      await enableLensProfileManager(signer, client, collector);
      await collect(client, post.id);

      // invariant(
      //   isEncryptedPublicationMetadata(post.metadata),
      //   'Metadata is not encrypted. This is likely an API issue.',
      // );

      // const decrypted = await client.gated.decryptPublicationMetadataFragment(post.metadata);

      // expect(decrypted.unwrap()).toMatchObject({
      //   content: initial.lens.content,
      // });
    }, 60_000);
  });
});
