import { AppId, ProfileId, PublicationId } from '@lens-protocol/domain/entities';
import { Data, URI, URL } from '@lens-protocol/shared-kernel';

/**
 * Ensures that the given value is a valid AppId
 *
 * @group Helpers
 */
export function appId(value: string): AppId {
  // for now just asserts the type, in future it will enforce a format
  return value as AppId;
}

/**
 * Ensures that the given value is a valid ProfileId
 *
 * @group Helpers
 */
export function profileId(id: string): ProfileId {
  // for now just asserts the type, in future it will enforce a format
  return id as ProfileId;
}

/**
 * Ensures that the given value is a valid PublicationId
 *
 * @group Helpers
 */
export function publicationId(id: string): PublicationId {
  // for now just asserts the type, in future it will enforce a format
  return id as PublicationId;
}

/**
 * Ensures that the given value is a DataHexString
 *
 * @group Helpers
 */
export function data(value: string): Data {
  // for now just asserts the type, in future it will enforce a format
  return value as Data;
}

/**
 * Ensures that the given value is a valid URL
 *
 * @group Helpers
 */
export function url(value: string): URL {
  // for now just asserts the type, in future it will enforce a format
  return value as URL;
}

/**
 * Ensures that the given value is a valid URI
 *
 * @group Helpers
 */
export function uri(value: string): URI {
  // for now just asserts the type, in future it will enforce a format
  return value as URI;
}
