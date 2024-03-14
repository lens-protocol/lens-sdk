import { PublicationMetadata, URI } from '@lens-protocol/metadata';
import { PromiseResult, assertError, failure, success, update } from '@lens-protocol/shared-kernel';

import { IUploader, UploadError } from './IUploader';
import { resolveResourcePaths } from './paths';

export class PublicationMetadataUploader {
  constructor(private readonly uploader: IUploader) {}

  async upload(metadata: PublicationMetadata): PromiseResult<URI, UploadError> {
    const updated = await this.prepare(metadata);

    if (updated.isFailure()) {
      return updated;
    }

    const blob = new Blob([JSON.stringify(updated.value)], { type: 'application/json' });
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

  private async prepare(
    metadata: PublicationMetadata,
  ): PromiseResult<PublicationMetadata, UploadError> {
    const paths = resolveResourcePaths(metadata);

    try {
      const updated = await update(metadata, paths, async (value, path) => {
        const result = await this.uploader.addURI(path, value);
        return result.unwrap();
      });

      return success(updated);
    } catch (err) {
      assertError(err);

      if (err instanceof UploadError) {
        return failure(err);
      }

      return failure(new UploadError('Failed to upload metadata', { cause: err }));
    }
  }
}
