import { faker } from '@faker-js/faker';
import { InvariantError } from '@lens-protocol/shared-kernel';
import { when } from 'jest-when';

import { FailedUploadError } from '../../adapters/IMetadataUploader';
import { MetadataUploaderErrorMiddleware } from '../MetadataUploaderErrorMiddleware';

const payload = {};
const uploadHandler = jest.fn();

describe(`Given an instance of the ${MetadataUploaderErrorMiddleware.name}`, () => {
  describe(`when the "${MetadataUploaderErrorMiddleware.prototype.upload.name}" method is invoked`, () => {
    it('should upload the metadata using the provided upload handler', async () => {
      const url = faker.internet.url();
      when(uploadHandler).calledWith(payload).mockResolvedValue(url);

      const middleware = new MetadataUploaderErrorMiddleware(uploadHandler);

      const actual = await middleware.upload(payload);

      expect(actual).toBe(url);
    });

    it.each(['not a valid url', '//missing-protocol.com', null, undefined, {}])(
      `should throw a ${InvariantError.name} if the upload handler returns a "%s"`,
      async (url) => {
        when(uploadHandler).calledWith(payload).mockResolvedValue(url);
        const middleware = new MetadataUploaderErrorMiddleware(uploadHandler);

        await expect(() => middleware.upload(payload)).rejects.toThrow(InvariantError);
      },
    );

    it(`should throw a ${FailedUploadError.name} if the upload fails`, async () => {
      when(uploadHandler).calledWith(payload).mockRejectedValue(new Error('Unknown error'));
      const middleware = new MetadataUploaderErrorMiddleware(uploadHandler);

      await expect(() => middleware.upload(payload)).rejects.toThrow(FailedUploadError);
    });
  });
});
