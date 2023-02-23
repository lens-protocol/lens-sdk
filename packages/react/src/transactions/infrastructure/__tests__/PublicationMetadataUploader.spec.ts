import { faker } from '@faker-js/faker';
import { PublicationMainFocus } from '@lens-protocol/api-bindings';
import { mockCreateCommentRequest, mockCreatePostRequest } from '@lens-protocol/domain/mocks';

import { FailedUploadError } from '../../adapters/IMetadataUploader';
import { MetadataUploadHandler } from '../../adapters/MetadataUploadHandler';
import { PublicationMetadataUploader } from '../PublicationMetadataUploader';

function setupTestScenario({ uploadHandler }: { uploadHandler: MetadataUploadHandler }) {
  return new PublicationMetadataUploader(uploadHandler);
}

const url = faker.internet.url();
const successfulUploadHandler = jest.fn().mockResolvedValue(url);
const failingUploadHandler = jest.fn().mockRejectedValue(new Error('Unknown error'));

describe(`Given an instance of the ${PublicationMetadataUploader.name}`, () => {
  describe(`when the "${PublicationMetadataUploader.prototype.upload.name}" method is invoked`, () => {
    describe.each([
      { request: 'CreatePostRequest', mockPublication: mockCreatePostRequest },
      { request: 'CreateCommentRequest', mockPublication: mockCreateCommentRequest },
    ])('with a $request', ({ mockPublication }) => {
      const request = mockPublication();

      it('should upload the expected publication metadata using the provided upload handler', async () => {
        const uploader = setupTestScenario({ uploadHandler: successfulUploadHandler });

        const result = await uploader.upload(request);

        expect(result).toEqual(url);
        expect(successfulUploadHandler).toHaveBeenCalledWith(
          expect.objectContaining({
            content: request.content,
            mainContentFocus: PublicationMainFocus[request.contentFocus],
          }),
        );
      });

      it(`should throw a ${FailedUploadError.name} if the upload fails`, async () => {
        const request = mockPublication();
        const uploader = setupTestScenario({ uploadHandler: failingUploadHandler });

        await expect(() => uploader.upload(request)).rejects.toThrow(FailedUploadError);
      });
    });
  });
});
