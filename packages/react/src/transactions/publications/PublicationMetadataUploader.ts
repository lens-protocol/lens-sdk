import { PublicationMetadata, URI } from '@lens-protocol/metadata';
import { PromiseResult, assertError, failure, success, update } from '@lens-protocol/shared-kernel';

import { IUploader, UploadError } from './IUploader';
import { resolveResourcePaths } from './paths';

export class PublicationMetadataUploader {
  constructor(private readonly uploader: IUploader) {}

  async upload(metadata: PublicationMetadata): PromiseResult<URI, UploadError> {
    try {
      await this.uploader.initialize();

      const file = await this.prepare(metadata);
      const uri = await this.uploader.addFile(file);

      await this.uploader.finalize();

      return success(uri);
    } catch (err) {
      assertError(err);

      if (err instanceof UploadError) {
        return failure(err);
      }
      return failure(new UploadError('Failed to upload metadata', { cause: err }));
    }
  }

  private async prepare(metadata: PublicationMetadata): Promise<File> {
    const paths = resolveResourcePaths(metadata);

    const updated = await update(metadata, paths, async (uri, path) =>
      this.uploader.addURI(path, uri),
    );

    const blob = new Blob([JSON.stringify(updated)], { type: 'application/json' });

    return new File([blob], 'metadata.json');
  }
}
