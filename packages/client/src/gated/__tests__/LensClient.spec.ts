import { faker } from '@faker-js/faker';
import { isEncryptedPublicationMetadata } from '@lens-protocol/gated-content';
import * as metadata from '@lens-protocol/metadata';
import { invariant } from '@lens-protocol/shared-kernel';
import { Wallet } from 'ethers';

import {
  authenticate,
  collect,
  createOrGetProfile,
  enableLensProfileManager,
  postOnchainViaLensManager,
} from '../../__helpers__/setup';
import { ProfileFragment } from '../../graphql';
import { LensClient } from '../LensClient';
import { createGatedLensClient } from '../__helpers/setup';

jest.retryTimes(3, { logErrorsBeforeRetry: true });

const signer = new Wallet('0xd6e6257e8cf0f321ad0f798dd0b121a7eb4fe9c7c51994e843c0a1ed05867a5f');

describe.skip(`Given an instance of "gated.${LensClient.name}"`, () => {
  const client = createGatedLensClient(signer);
  let profile: ProfileFragment;

  beforeAll(async () => {
    profile = await createOrGetProfile(signer, client, 'nandos2');

    await authenticate(signer, client, profile);

    await enableLensProfileManager(signer, client, profile);
  }, 30_000);

  describe(`when testing encryption and decryption end-to-end`, () => {
    const initial = metadata.image({
      image: {
        item: faker.internet.url(),
        type: metadata.MediaImageMimeType.JPEG,
      },
      content: metadata.toMarkdown(faker.lorem.sentence()),
      hideFromFeed: true,
    });

    it('should be decryptable to the publication author', async () => {
      const condition = metadata.eoaOwnershipCondition({
        address: Wallet.createRandom().address,
      });
      const encrypted = await client.gated.encryptPublicationMetadata(initial, condition);

      const post = await postOnchainViaLensManager(signer, client, encrypted.unwrap());

      invariant(
        isEncryptedPublicationMetadata(post.metadata),
        'Metadata is not encrypted. This is likely an API issue.',
      );

      const decrypted = await client.gated.decryptPublicationMetadataFragment(post.metadata);

      expect(decrypted.unwrap()).toMatchObject({
        asset: {
          image: {
            raw: {
              uri: initial.lens.image.item,
            },
          },
        },
        content: initial.lens.content,
      });
    }, 60_000);

    // TODO complete once collect is fixed at the API level
    it.skip('should be decryptable via the collect condition', async () => {
      const condition = metadata.collectCondition({
        publicationId: await client.publication.predictNextOnChainPublicationId({
          from: profile.id,
        }),
        thisPublication: true,
      });
      const encrypted = await client.gated.encryptPublicationMetadata(initial, condition);

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
