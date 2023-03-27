import { AppId, ProfileId, PublicationId } from '@lens-protocol/domain/entities';

export const DEFAULT_PAGINATED_QUERY_LIMIT = 10;

export function appId(value: string): AppId {
  // for now just asserts the type, in future it will enforce a format
  return value as AppId;
}

export function profileId(id: string): ProfileId {
  // for now just asserts the type, in future it will enforce a format
  return id as ProfileId;
}

export function publicationId(id: string): PublicationId {
  // for now just asserts the type, in future it will enforce a format
  return id as PublicationId;
}
