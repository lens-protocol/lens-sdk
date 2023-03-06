/*
 * @jest-environment node
 */
import { faker } from '@faker-js/faker';
import { PublicationMainFocus } from '@lens-protocol/api-bindings';
import { DecryptionCriteria, ProfileId } from '@lens-protocol/domain/entities';
import {
  mockAddressOwnershipCriterion,
  mockCreateCommentRequest,
  mockCreatePostRequest,
} from '@lens-protocol/domain/mocks';
import { GatedClient } from '@lens-protocol/gated-content';
import { webCryptoProvider } from '@lens-protocol/gated-content/web';
import { InMemoryStorageProvider } from '@lens-protocol/storage';
import { Wallet } from 'ethers';

import { staging } from '../../../environments';
import { MetadataUploadHandler } from '../../adapters/MetadataUploadHandler';
import { EncryptedPublicationMetadataUploader } from '../EncryptedMetadataUploader';

const signer = Wallet.createRandom();

function setupTestScenario({ uploadHandler }: { uploadHandler: MetadataUploadHandler }) {
  return EncryptedPublicationMetadataUploader.create({
    config: {
      domain: 'localhost',
      uri: 'https://localhost/login',
    },

    encryptionProvider: webCryptoProvider(),
    environment: staging,
    signer,
    storageProvider: new InMemoryStorageProvider(),
    upload: uploadHandler,
  });
}

const url = faker.internet.url();
const successfulUploadHandler = jest.fn().mockResolvedValue(url);
// const failingUploadHandler = jest.fn().mockRejectedValue(new Error('Unknown error'));

function expectedAccessCondition(request: { profileId: ProfileId }) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return expect.objectContaining({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    or: expect.objectContaining({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      criteria: expect.arrayContaining([
        expect.objectContaining({
          profile: { profileId: request.profileId },
        }),
        expect.objectContaining({
          eoa: { address: signer.address },
        }),
      ]),
    }),
  });
}

function assertHasDecryptionCriteria(request: {
  decryptionCriteria?: DecryptionCriteria;
}): asserts request is { decryptionCriteria: DecryptionCriteria } {
  if (!request.decryptionCriteria) {
    throw new Error('Missing decryption criteria');
  }
}

describe(`Given an instance of the ${EncryptedPublicationMetadataUploader.name}`, () => {
  describe(`when the "${EncryptedPublicationMetadataUploader.prototype.upload.name}" method is invoked`, () => {
    describe.each([
      { request: 'CreateEncryptedPostRequest', mockPublication: mockCreatePostRequest },
      { request: 'CreateEncryptedCommentRequest', mockPublication: mockCreateCommentRequest },
    ])('with a $request', ({ mockPublication }) => {
      const request = mockPublication({
        decryptionCriteria: mockAddressOwnershipCriterion({ address: signer.address }),
      });

      it(`should:
          - create AccessCondition criteria
          - create Publication Metadata
          - use the ${GatedClient.name} to encrypt the metadata
          - eventually upload the metadata using the provided upload handler`, async () => {
        const uploader = setupTestScenario({ uploadHandler: successfulUploadHandler });

        assertHasDecryptionCriteria(request);
        const result = await uploader.upload(request);

        expect(result).toEqual(url);
        expect(successfulUploadHandler).toHaveBeenCalledWith(
          expect.objectContaining({
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            encryptionParams: expect.objectContaining({
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              accessCondition: expectedAccessCondition(request),
            }),
            content: 'This publication is gated.',
            mainContentFocus: PublicationMainFocus[request.contentFocus],
          }),
        );
      });
    });
  });
});
