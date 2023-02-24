import { ProfileMetadata } from '@lens-protocol/api-bindings';
import { assertError } from '@lens-protocol/shared-kernel';

import { FailedUploadError, IMetadataUploader } from '../adapters/IMetadataUploader';
import { MetadataUploadHandler } from '../adapters/MetadataUploadHandler';

export class ProfileMetadataUploader implements IMetadataUploader<ProfileMetadata> {
  constructor(readonly handler: MetadataUploadHandler) {}

  async upload(data: ProfileMetadata): Promise<string> {
    try {
      return await this.handler(data);
    } catch (err: unknown) {
      assertError(err);

      throw new FailedUploadError('Cannot upload metadata', { cause: err });
    }
  }
}
