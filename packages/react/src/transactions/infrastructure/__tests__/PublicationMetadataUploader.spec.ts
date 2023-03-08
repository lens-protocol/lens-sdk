import { faker } from '@faker-js/faker';
import { PublicationMainFocus } from '@lens-protocol/api-bindings';
import { mockCreateCommentRequest, mockCreatePostRequest } from '@lens-protocol/domain/mocks';

import { MetadataUploadHandler } from '../../adapters/MetadataUploadHandler';
import { PublicationMetadataUploader } from '../PublicationMetadataUploader';

function setupTestScenario({ uploadHandler }: { uploadHandler: MetadataUploadHandler }) {
  return new PublicationMetadataUploader(uploadHandler);
}

const url = faker.internet.url();
const uploadHandler = jest.fn().mockResolvedValue(url);

describe(`Given an instance of the ${PublicationMetadataUploader.name}`, () => {
  describe(`when the "${PublicationMetadataUploader.prototype.upload.name}" method is invoked`, () => {
    describe.each([
      { request: 'CreatePostRequest', mockPublication: mockCreatePostRequest },
      { request: 'CreateCommentRequest', mockPublication: mockCreateCommentRequest },
    ])('with a $request', ({ mockPublication }) => {
      const request = mockPublication();

      it('should upload the expected publication metadata using the provided upload handler', async () => {
        const uploader = setupTestScenario({ uploadHandler });

        const result = await uploader.upload(request);

        expect(result).toEqual(url);
        expect(uploadHandler).toHaveBeenCalledWith(
          expect.objectContaining({
            content: request.content,
            mainContentFocus: PublicationMainFocus[request.contentFocus],
          }),
        );
      });
    });
  });
});
