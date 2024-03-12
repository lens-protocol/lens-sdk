import { PublicationMetadata, URI } from '@lens-protocol/metadata';
import { PromiseResult } from '@lens-protocol/shared-kernel';

import { IUploader, UploadError } from './IUploader';

export class PublicationMetadataUploader {
  constructor(private readonly uploader: IUploader) {}

  async upload(metadata: PublicationMetadata): PromiseResult<URI, UploadError> {
    const blob = new Blob([JSON.stringify(metadata)], { type: 'application/json' });
    const file = new File([blob], 'metadata.json');

    const single = await this.uploader.addFile(file);

    if (single.isFailure()) {
      return single;
    }

    const completion = await this.uploader.finalize();

    if (completion.isFailure()) {
      return completion;
    }

    return single;
  }
}
