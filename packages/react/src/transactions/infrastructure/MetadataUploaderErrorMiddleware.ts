import { assertError } from '@lens-protocol/shared-kernel';

import { FailedUploadError, IMetadataUploader } from '../adapters/IMetadataUploader';
import { MetadataUploadHandler } from '../adapters/MetadataUploadHandler';

export class MetadataUploaderErrorMiddleware<T> implements IMetadataUploader<T> {
  constructor(readonly handler: MetadataUploadHandler) {}

  async upload(data: T): Promise<string> {
    try {
      return await this.handler(data);
    } catch (err: unknown) {
      assertError(err);

      throw new FailedUploadError('Cannot upload metadata', { cause: err });
    }
  }
}
