/*
 * @jest-environment node
 */
import { faker } from '@faker-js/faker';
import { PublicationMainFocus } from '@lens-protocol/api-bindings';
import { DecryptionCriteria } from '@lens-protocol/domain/entities';
import {
  mockAddressOwnershipCriterion,
  mockCreateCommentRequest,
  mockCreatePostRequest,
} from '@lens-protocol/domain/mocks';
import { GatedClient } from '@lens-protocol/gated-content';
import { webCryptoProvider } from '@lens-protocol/gated-content/web';
import { InMemoryStorageProvider } from '@lens-protocol/storage';
import { Wallet } from 'ethers';
import { mock } from 'jest-mock-extended';

import { staging } from '../../../environments';
import { MetadataUploadHandler } from '../../adapters/MetadataUploadHandler';
import {
  AccessConditionBuilderFactory,
  IPublicationIdPredictor,
} from '../AccessConditionBuilderFactory';
import { EncryptedPublicationMetadataUploader } from '../EncryptedPublicationMetadataUploader';
import { createGatedClient } from '../createGatedClient';

const signer = Wallet.createRandom();

function setupTestScenario({ uploadHandler }: { uploadHandler: MetadataUploadHandler }) {
  const client = createGatedClient({
    config: {
      domain: 'localhost',
      uri: 'https://localhost/login',
    },
    environment: staging,
    signer,
    encryptionProvider: webCryptoProvider(),
    storageProvider: new InMemoryStorageProvider(),
  });

  const publicationIdPredictor = mock<IPublicationIdPredictor>();

  const accessConditionBuilderFactory = new AccessConditionBuilderFactory(
    staging.chains,
    publicationIdPredictor,
  );

  const uploader = EncryptedPublicationMetadataUploader.create(
    client,
    accessConditionBuilderFactory,
    uploadHandler,
  );

  return { uploader };
}

const url = faker.internet.url();
const uploadHandler = jest.fn().mockResolvedValue(url);

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
      {
        request: 'CreateEncryptedPostRequest',
        mockCreatePublicationRequest: mockCreatePostRequest,
      },
      {
        request: 'CreateEncryptedCommentRequest',
        mockCreatePublicationRequest: mockCreateCommentRequest,
      },
    ])('with a $request', ({ mockCreatePublicationRequest }) => {
      const request = mockCreatePublicationRequest({
        decryptionCriteria: mockAddressOwnershipCriterion({ address: signer.address }),
      });
      assertHasDecryptionCriteria(request);

      it(`should:
          - create AccessCondition criteria
          - create Publication Metadata
          - use the ${GatedClient.name} to encrypt the metadata
          - eventually upload the metadata using the provided upload handler`, async () => {
        const { uploader } = setupTestScenario({ uploadHandler });

        const result = await uploader.upload(request);

        expect(result).toEqual(url);
        expect(uploadHandler).toHaveBeenCalledWith(
          expect.objectContaining({
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            encryptionParams: expect.objectContaining({
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              accessCondition: {
                or: {
                  criteria: [
                    {
                      profile: { profileId: request.profileId },
                    },
                    {
                      eoa: { address: signer.address },
                    },
                  ],
                },
              },
            }),
            content: 'This publication is gated.',
            mainContentFocus: PublicationMainFocus[request.contentFocus],
          }),
        );
      });
    });
  });
});
