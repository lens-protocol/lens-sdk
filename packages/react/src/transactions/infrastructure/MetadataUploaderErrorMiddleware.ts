import { Url, assertError, invariant } from '@lens-protocol/shared-kernel';

import { FailedUploadError, IMetadataUploader } from '../adapters/IMetadataUploader';
import { MetadataUploadHandler } from '../adapters/MetadataUploadHandler';

const validUrlRegex = /^[a-z]+:\/\/.+$/;

function isValidUrl(url: string): url is Url {
  return validUrlRegex.test(url);
}

export class MetadataUploaderErrorMiddleware<T> implements IMetadataUploader<T> {
  constructor(readonly handler: MetadataUploadHandler) {}

  async upload(data: T): Promise<Url> {
    const url = await this.attemptToUpload(data);

    invariant(
      isValidUrl(url),
      `Invalid upload url provided: ${url}\n\n` +
        `  Some examples of valid URLs are:\n` +
        `    - https://www.example.com/foobar\n` +
        `    - ipfs://QmXoypizjW3W\n` +
        `    - ar://f2dLOlSJgW-RsofpQ10JDth\n\n` +
        `  Check the the return statement of the "upload" function you provided`,
    );

    return url;
  }

  private async attemptToUpload(data: T): Promise<Url> {
    try {
      return await this.handler(data);
    } catch (err: unknown) {
      assertError(err);

      console.log('Failed to upload metadata', err);

      throw new FailedUploadError('Cannot upload metadata', { cause: err });
    }
  }
}
