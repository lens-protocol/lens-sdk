import {
  CausedError,
  IEquatableError,
  PromiseResult,
  URI,
  assertError,
  failure,
  success,
} from '@lens-protocol/shared-kernel';

import { uri } from '../../utils';

/**
 * A function that upload one file and returns the public URI.
 */
export type UploadHandler = (file: File) => Promise<string>;

/**
 * An error that occurs when uploading a file.
 */
export class UploadError extends CausedError implements IEquatableError {
  name = 'UploadError' as const;

  /**
   * @internal
   */
  constructor(message: string, { cause }: { cause?: Error } = {}) {
    super(message, { cause });
  }
}

/**
 * An object that can handle multiple file uploads.
 *
 * Use `Uploader` to create an instance of this interface.
 *
 * @internal
 */
export interface IUploader {
  addFile(file: File): PromiseResult<URI, UploadError>;

  finalize(): PromiseResult<void, UploadError>;
}

/**
 * @internal
 */
export abstract class BaseUploader implements IUploader {
  constructor(protected readonly handler?: UploadHandler) {}

  async addFile(file: File): PromiseResult<URI, UploadError> {
    if (this.handler) {
      try {
        const location = await this.handler(file);

        return success(uri(location));
      } catch (error) {
        assertError(error);
        return failure(new UploadError(`Failed to upload ${file.name}`, { cause: error }));
      }
    }
    throw new Error('Method not implemented.');
  }

  async addURI(value: string): PromiseResult<URI, UploadError> {
    if (this.isLocalFile(value)) {
      const response = await fetch(value);

      if (!response.ok) {
        return failure(new UploadError(`Cannot read file from ${value}`));
      }

      const blob = await response.blob();
      const file = new File([blob], value);
      return this.addFile(file);
    }
    return success(uri(value));
  }

  protected abstract isLocalFile(value: string): boolean;

  async finalize(): PromiseResult<void, UploadError> {
    return success();
  }
}
