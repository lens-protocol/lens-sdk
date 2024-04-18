import { CausedError, IEquatableError, URI } from '@lens-protocol/shared-kernel';

import { uri } from '../../utils';

/**
 * A function that uploads one file and returns the public URI.
 *
 * @experimental
 */
export type UploadHandler = (file: File) => Promise<string>;

/**
 * An error that occurs when uploading a file.
 *
 * @experimental
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
 * Use `Uploader` class to create an instance of this interface.
 *
 * @experimental
 */
export interface IUploader {
  /**
   * Initializes a new upload session.
   *
   * Use this to reset any internal state and prepare for a new upload session.
   */
  initialize(): Promise<void>;
  /**
   * Takes one [File](https://developer.mozilla.org/en-US/docs/Web/API/File) and returns the public URI.
   *
   * The file could be uploaded immediately or stored in a queue to be uploaded later.
   */
  addFile(file: File): Promise<URI>;

  /**
   * Takes a name of the resource its current URI and returns the public URI.
   *
   * The URI could be a local file path or a remote URL.
   *
   * The resource could be copied immediately or stored in a queue to be uploaded later.
   */
  addURI(name: string, value: string): Promise<URI>;

  /**
   * Finalizes the upload process. This is called when all files for a given upload batch are added.
   */
  finalize(): Promise<void>;
}

/**
 * The Uploader class let you define your own file upload strategy.
 *
 * There are two types of uploaders you can define:
 * - Stateless uploader: This uploader handles each file individually. It's useful when you're uploading files through an API in your backend.
 * - Stateful uploader: This uploader handles multiple files at once. It's useful when you need to orchestrate the upload of several files simultaneously.
 *
 * ## Stateless Uploader
 *
 * In case you don't need to tie the upload of one file to the upload of another,
 * you can use a stateless uploader.
 *
 * Define an `UploadHandler` function that takes a `File` and returns a `Promise<string>`.
 *
 * ```ts
 * const uploader = new Uploader(async (file: File) => {
 *   const response = await fetch('https://example.com/upload', {
 *     method: 'POST',
 *     body: file,
 *   });
 *
 *   if (!response.ok) {
 *     throw new Error('Failed to upload');
 *   }
 *
 *   return response.headers.get('Location')!;
 * });
 * ```
 *
 * ## Stateful Uploader
 *
 * In case you need to create more complex upload strategies, you can extend the `Uploader` class.
 *
 * This is useful when you need to upload multiple files at once.
 *
 * ```ts
 * class MyUploader extends Uploader {
 *   private files: File[] = [];
 *
 *   async initialize() {
 *     this.files = [];
 *   }
 *
 *   async addFile(file: File) {
 *     this.files.push(file);
 *
 *     return computeFinalURI(file);
 *   }
 *
 *   async finalize() {
 *     // Upload all files according to your strategy
 *   }
 * }
 *
 * const uploader = new MyUploader();
 * ```
 *
 * You must override the `addFile` method with the logic to upload the file.
 *
 * You can also override the `initialize` and `finalize` methods to handle the upload session lifecycle.
 * Use the `initialize` method to prepare your uploader internal state (e.g. reset from a previous upload),
 * and the `finalize` method to, for example, perform a bulk upload of all files.
 */
export abstract class BaseUploader implements IUploader {
  constructor(protected readonly handler?: UploadHandler) {}

  /**
   * @internal
   */
  async initialize(): Promise<void> {}

  /**
   * @internal
   */
  async addFile(file: File): Promise<URI> {
    if (this.handler) {
      const location = await this.handler(file);

      return uri(location);
    }
    throw new Error('Method not implemented.');
  }

  /**
   * @internal
   */
  async addURI(name: string, value: string): Promise<URI> {
    if (this.isLocalFile(value)) {
      const response = await fetch(value);

      if (!response.ok) {
        throw new UploadError(`Cannot read file from ${value}`);
      }

      const blob = await response.blob();
      const file = new File([blob], name);
      return this.addFile(file);
    }
    return uri(value);
  }

  /**
   * @internal
   */
  async finalize(): Promise<void> {}

  /**
   * @internal
   */
  protected abstract isLocalFile(value: string): boolean;
}
