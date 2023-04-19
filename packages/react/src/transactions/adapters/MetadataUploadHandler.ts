import { Url } from '@lens-protocol/shared-kernel';

/**
 * A function that uploads metadata to a remote server and returns the URL of the uploaded file.
 *
 * The URL provided MUST be publicly accessible in the Internet and served as `Content-Type: application/json`.
 *
 * @param data - The metadata to upload, an opaque JS Object safe for serialization
 * @returns The URL where the JSON file will be served from
 */
export type MetadataUploadHandler = (data: unknown) => Promise<Url>;
