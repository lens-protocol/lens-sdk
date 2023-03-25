/*
 * @jest-environment node
 */
import {
  AccessCondition,
  EncryptedFieldsOutput,
  EncryptionProvider,
  LeafCondition,
} from '@lens-protocol/api-bindings';
import {
  mockEncryptionParamsOutputFragment,
  mockEoaOwnershipAccessCondition,
  mockMetadataOutputFragment,
  mockProfileOwnershipAccessCondition,
  mockPublicationMetadata,
  mockEncryptedFieldsOutputFragment,
} from '@lens-protocol/api-bindings/mocks';
import { mockProfileId } from '@lens-protocol/domain/mocks';
import { InMemoryStorageProvider } from '@lens-protocol/storage';
import { Wallet } from 'ethers';

import { GatedClient } from '../GatedClient';
import { testing } from '../__helpers__/env';
import { webCryptoProvider } from '../web';

const ownerId = mockProfileId();

const metadata = mockPublicationMetadata({
  content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
});
const signer = Wallet.createRandom();

const eoaOwnershipAccessCondition = mockEoaOwnershipAccessCondition({
  address: signer.address,
});
const profileOwnershipAccessCondition = mockProfileOwnershipAccessCondition({ profileId: ownerId });
const accessCondition: AccessCondition = {
  or: {
    criteria: [
      profileOwnershipAccessCondition as LeafCondition,
      eoaOwnershipAccessCondition as LeafCondition,
    ],
  },
};

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

describe(`Given an instance of the ${GatedClient.name}`, () => {
  describe(`when calling the "${GatedClient.prototype.encryptPublication.name}" method`, () => {
    it(`should return the expected GatedPublicationMetadata`, async () => {
      const { client } = setupTestScenario();

      const result = await client.encryptPublication(metadata, accessCondition);

      expect(result.unwrap()).toMatchObject({
        ...metadata,

        content: 'This publication is gated.',

        encryptionParams: {
          accessCondition,
          providerSpecificParams: {
            encryptionKey: expect.any(String),
          },
          encryptionProvider: EncryptionProvider.LitProtocol,
          encryptedFields: {
            content: expect.any(String),
          },
        },
      });
    });
  });

  describe(`when calling the "${GatedClient.prototype.decryptPublication.name}" method`, () => {
    it(`should be able to decrypt and return the expected MetadataOutput`, async () => {
      // setup
      const { client } = setupTestScenario();
      const encryptionResult = await client.encryptPublication(metadata, accessCondition);
      const encrypted = encryptionResult.unwrap();

      // simulate the transcription process done by the indexer and Lens API
      const metadataFragment = mockMetadataOutputFragment({
        content: encrypted.content,
      });
      const encryptionParams = mockEncryptionParamsOutputFragment({
        ownerId,
        others: [eoaOwnershipAccessCondition],
        encryptionKey: encrypted.encryptionParams.providerSpecificParams.encryptionKey,
        encryptedFields: mockEncryptedFieldsOutputFragment(
          // this assertion is safe as EncryptedFields is a subset of EncryptedFieldsOutput
          encrypted.encryptionParams.encryptedFields as EncryptedFieldsOutput,
        ),
      });

      // exercise
      const decryptionResult = await client.decryptPublication(metadataFragment, encryptionParams);

      // verify
      expect(decryptionResult.unwrap()).toMatchObject({
        content: metadata.content,
      });
    });
  });
});
