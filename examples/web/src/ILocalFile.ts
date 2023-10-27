import { MediaImageMimeType } from '@lens-protocol/metadata';

export interface ILocalFile<T extends MediaImageMimeType> extends File {
  type: T;
}
