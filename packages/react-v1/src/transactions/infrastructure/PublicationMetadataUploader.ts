import { PublicationMetadata } from '@lens-protocol/api-bindings';
import {
  CreateCommentRequest,
  CreatePostRequest,
} from '@lens-protocol/domain/use-cases/publications';
import { Url } from '@lens-protocol/shared-kernel';

import { IMetadataUploader } from '../adapters/IMetadataUploader';
import { MetadataUploadHandler } from '../adapters/MetadataUploadHandler';
import { MetadataUploaderErrorMiddleware } from './MetadataUploaderErrorMiddleware';
import { createPublicationMetadata } from './createPublicationMetadata';

export class PublicationMetadataUploader<T extends CreatePostRequest | CreateCommentRequest>
  implements IMetadataUploader<T>
{
  private constructor(private readonly uploader: IMetadataUploader<PublicationMetadata>) {}

  async upload(request: T): Promise<Url> {
    const metadata = createPublicationMetadata(request);

    return this.uploader.upload(metadata);
  }

  static create(handler: MetadataUploadHandler) {
    return new PublicationMetadataUploader(new MetadataUploaderErrorMiddleware(handler));
  }
}
