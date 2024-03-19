import { BaseUploader } from '@lens-protocol/react';

/**
 * {@inheritDoc BaseUploader}
 */
export class Uploader extends BaseUploader {
  protected override isLocalFile(value: string): boolean {
    return !!value && value.startsWith('file:');
  }
}
