import {
  CreateCommentRequest,
  CreatePostRequest,
} from '@lens-protocol/domain/use-cases/publications';
import { assertError, Url } from '@lens-protocol/shared-kernel';

import { FailedUploadError, IMetadataUploader } from '../adapters/IMetadataUploader';
import { MetadataUploadHandler } from '../adapters/MetadataUploadHandler';
import { createPublicationMetadata } from './createPublicationMetadata';

export class PublicationMetadataUploader<T extends CreatePostRequest | CreateCommentRequest>
  implements IMetadataUploader<T>
{
  constructor(private readonly handler: MetadataUploadHandler) {}

  async upload(request: T): Promise<Url> {
    try {
      const metadata = createPublicationMetadata(request);
      return await this.handler(metadata);
    } catch (err: unknown) {
      assertError(err);

      throw new FailedUploadError('Cannot upload metadata', { cause: err });
    }
  }
}
