import { CausedError, assertError } from '@lens-protocol/shared-kernel';

export type MetadataUploadHandler = (data: unknown) => Promise<string>;

export class FailedUploadError extends CausedError {
  name = 'FailedUploadError' as const;
}

export class MetadataUploadAdapter {
  constructor(readonly handler: MetadataUploadHandler) {}

  async upload(data: unknown): Promise<string> {
    try {
      return await this.handler(data);
    } catch (err: unknown) {
      assertError(err);

      throw new FailedUploadError('Cannot upload metadata', { cause: err });
    }
  }
}
