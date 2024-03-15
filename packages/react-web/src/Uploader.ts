import { BaseUploader } from '@lens-protocol/react';

/**
 * Creates a [Blob URI](https://w3c.github.io/FileAPI/#blob-url) from the given file.
 *
 * Internally it uses `URL.createObjectURL` and other internals to create a URI that
 * can be referenced by a DOM attribute (e.g. `src` of an `img` tag), and at the same
 * time retains some critical information about the file (e.g. its original name).
 *
 * @param file - a `File` object as obtained from an `input` element or a `FileList`
 * @returns a Blob URI as a string
 */
export function fileToUri(file: File): string {
  return URL.createObjectURL(file) + '#' + encodeURIComponent(file.name);
}

/**
 * {@inheritDoc BaseUploader}
 */
export class Uploader extends BaseUploader {
  protected override isLocalFile(value: string): boolean {
    return !!value && value.startsWith('blob:');
  }
}
