import { Wallet } from '@ethersproject/wallet';
import { faker } from '@faker-js/faker';
import { CannotDecryptError, isEncryptedPublicationMetadata } from '@lens-protocol/gated-content';
import * as metadata from '@lens-protocol/metadata';
import { invariant } from '@lens-protocol/shared-kernel';

import {
  authenticate,
  createOrGetProfile,
  enableLensProfileManager,
  postOnchainViaLensManager,
} from '../../__helpers__/setup';
import { PostFragment } from '../../graphql';
import { LensClient } from '../LensClient';
import { createGatedLensClient } from '../__helpers/setup';

jest.retryTimes(3, { logErrorsBeforeRetry: true });

const signer = new Wallet('0xd6e6257e8cf0f321ad0f798dd0b121a7eb4fe9c7c51994e843c0a1ed05867a5f');

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

      const condition = metadata.eoaOwnershipCondition({
        address: signer.address,
      });

      const encrypted = await client.gated.encryptPublicationMetadata(
        initialPostMetadata,
        condition,
      );

      post = await postOnchainViaLensManager(signer, client, encrypted.unwrap());
    }, 60_000);

    describe('when decrypted by a wallet that meets the token-gated conditions', () => {
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

    describe('when decrypted by a wallet that does NOT meet the token-gated conditions', () => {
      it(`should throw a ${CannotDecryptError.name} error`, async () => {
        const authenticatedWithOnlyWalletClient = createGatedLensClient(Wallet.createRandom());

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
});
