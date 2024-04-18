/*
 * @jest-environment node
 */
import * as raw from '@lens-protocol/metadata';
import { InMemoryStorageProvider } from '@lens-protocol/storage';
import { Wallet } from 'ethers';

import { CannotDecryptError } from '../CannotDecryptError';
import { DecryptionContext, GatedClient } from '../GatedClient';
import {
  mockEoaOwnershipCondition,
  mockProfileId,
  mockProfileOwnershipCondition,
  mockPublicationMetadata,
} from '../__helpers__/mocks';
import { testing } from '../environments';
import { EncryptedFragmentOfAnyPublicationMetadata } from '../graphql';
import * as gql from '../graphql/__helpers__/mocks';
import { webCryptoProvider } from '../web';

jest.retryTimes(3, { logErrorsBeforeRetry: true });

const signer = Wallet.createRandom();

const ownerId = mockProfileId();
const knownAddress = raw.toEvmAddress(signer.address);

const rawMetadata = mockPublicationMetadata();

function setupTestScenario() {
  const client = new GatedClient({
    authentication: {
      domain: 'localhost',
      uri: 'https://localhost/login',
    },
    signer,
    environment: testing,
    storageProvider: new InMemoryStorageProvider(),
    encryptionProvider: webCryptoProvider(),
  });

  return { client };
}

const rawAccessCondition: raw.AccessCondition = raw.orCondition([
  mockProfileOwnershipCondition({ profileId: ownerId }),
  mockEoaOwnershipCondition({
    address: knownAddress,
  }),
]);

describe(`Given an instance of the ${GatedClient.name}`, () => {
  describe(`when calling the "${GatedClient.prototype.encryptPublicationMetadata.name}" method`, () => {
    it(`should return the expected raw PublicationMetadata`, async () => {
      const { client } = setupTestScenario();

      const result = await client.encryptPublicationMetadata(rawMetadata, rawAccessCondition);

      expect(result.unwrap()).toMatchObject({
        $schema: 'https://json-schemas.lens.dev/publications/article/3.0.0.json',
        lens: {
          content: expect.not.stringContaining(rawMetadata.lens.content as string),
          locale: 'en-US',
          mainContentFocus: 'ARTICLE',
          encryptedWith: {
            provider: raw.EncryptionProvider.LIT_PROTOCOL,
            encryptionKey: expect.stringMatching(/^\w{368}$/),
            accessCondition: rawAccessCondition,
          },
        },
      });
    });
  });

  describe(`when calling the "${GatedClient.prototype.decryptPublicationMetadataFragment.name}" method`, () => {
    const { client } = setupTestScenario();
    const context: DecryptionContext = {
      profileId: mockProfileId(),
    };
    let encrypted: raw.PublicationMetadata;

    beforeAll(async () => {
      const encryptionResult = await client.encryptPublicationMetadata(
        rawMetadata,
        rawAccessCondition,
      );
      encrypted = encryptionResult.unwrap();
    });

    it(`should throw an ${CannotDecryptError.name} if it cannot determine the metadata type`, async () => {
      const result = await client.decryptPublicationMetadataFragment(
        {} as EncryptedFragmentOfAnyPublicationMetadata,
        context,
      );

      return expect(() => result.unwrap()).toThrow(CannotDecryptError);
    });

    it(`should return the decrypted fragment`, async () => {
      // setup
      // simulate the transcription process done by the indexer and Lens API
      const encryptedFragment = gql.mockEncryptedArticleMetadataV3Fragment({
        content: encrypted.lens.content as string,
        encryptedWith: gql.mockPublicationMetadataLitEncryption({
          encryptionKey: encrypted.lens.encryptedWith?.encryptionKey,
          encryptedPaths: encrypted.lens.encryptedWith?.encryptedPaths,
          accessCondition: gql.mockRootCondition({
            criteria: [
              gql.mockProfileOwnershipCondition({ profileId: ownerId }),
              gql.mockEoaOwnershipCondition({ address: knownAddress }),
            ],
          }),
        }),
      });

      // exercise
      const result = await client.decryptPublicationMetadataFragment(encryptedFragment, context);

      // verify
      expect(result.unwrap()).toMatchObject({
        content: rawMetadata.lens.content,
      });
    });
  });
});
