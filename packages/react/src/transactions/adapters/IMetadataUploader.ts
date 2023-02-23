import { Url, CausedError } from '@lens-protocol/shared-kernel';

export class FailedUploadError extends CausedError {
  name = 'FailedUploadError' as const;
}

export interface IMetadataUploader<T> {
  upload(request: T): Promise<Url>;
}
