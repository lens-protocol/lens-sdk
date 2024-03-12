import { BaseUploader } from '@lens-protocol/react';

/**
 * The Uploader class let you define your own file upload strategy.
 *
 * ## Stateless Uploader
 *
 * In case you don't need to tied the upload of one file to upload of another,
 * you can use a stateless uploader.
 *
 * Define an `UploadHandler` function that takes a `File` and returns a `Promise` of a `string`.
 *
 * ```ts
 * const uploader = new Uploader(async (file) => {
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
 *   async addFile(file: File) {
 *     this.files.push(file);
 *
 *     return computeFinalURI(file);
 *   }
 *
 *   async finalize() {
 *     // Upload all files
 *   }
 * }
 *
 * const uploader = new MyUploader();
 * ```
 */
export class Uploader extends BaseUploader {
  protected override isLocalFile(value: string): boolean {
    return !!value && value.startsWith('blob:');
  }
}
