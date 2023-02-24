import { Url } from '@lens-protocol/shared-kernel';

export type MetadataUploadHandler = (data: unknown) => Promise<Url>;
